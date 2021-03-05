<template>
  <div>
    <div class="data-count-bar">
      <i class="fa fa-paper-plane" />
      <span>
        当前页共有<span class="c-blue">{{ tableData && tableData.length || 0 }}</span>条数据 ，已选择<span>{{ multipleSelection.length }}</span>条数据。
      </span>
      <span v-if="multipleSelection.length > 0" class="c-blue link" @click="handleEmptySelection">清空</span>
    </div>
    <el-table
      ref="table"
      :span-method="spanMethod"
      empty-text="暂无数据"
      :class="importantColor ? 'important-hover-table' : ''"
      :max-height="height"
      :bind="$props"
      :loading="myloading || loading"
      :data="tableData"
      :border="border"
      :highlight-current-row="highlightCurrentRow || single"
      row-key="id"
      :default-sort="defaultSort"
      v-on="$listeners"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
    >
      <el-table-column v-if="multiple" type="selection" width="50" />
      <el-table-column v-else-if="single" type="selection" width="50">
        <template slot-scope="scope">
          <el-radio v-model="singleId" class="radio-no-label" :label="scope.row.id" />
          <div style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; cursor:pointer" />
        </template>
      </el-table-column>
      <template v-for="(col, index) in columns">
        <!-- 操作列/自定义列 -->
        <el-table-column
          v-if="col.slot"
          :key="index"
          :label="col.label"
          :width="col.width"
          align="center"
          :fixed="col.fixed"
        >
          <template v-if="col.headerSlot" slot="header">
            <slot :name="col.headerSlot" />
          </template>
          <template slot-scope="scope">
            <slot :name="col.prop" v-bind="scope" />
          </template>
        </el-table-column>
        <!-- 普通列 传入enums的 -->
        <el-table-column
          v-else-if="col.enums"
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          align="center"
          :fixed="col.fixed"
        >
          <template slot-scope="scope">
            {{ getEnumLabel(col.enums, scope.row[col.prop]) }}
          </template>
        </el-table-column>
        <!-- 排序普通列 -->
        <el-table-column
          v-else-if="col.sortable && col.sortMethod"
          :key="index"
          :label="col.label"
          :width="col.width"
          align="center"
          :fixed="col.fixed"
          :sortable="col.sortable"
          :sort-method="col.sortMethod"
          :formatter="col.formatter"
        />
        <!-- 普通列 -->
        <el-table-column
          v-else
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          align="center"
          :fixed="col.fixed"
          :sortable="col.sortable"
        >
          <template v-if="col.headerSlot" slot="header">
            <slot :name="col.headerSlot" />
          </template>
          <template slot-scope="scope">
            {{ scope.row[col.prop] }} {{ col.append || '' }}
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 是否调用分页 -->
    <pagination
      v-if="showPagination"
      style="text-align: right;"
      :total="total"
      :page.sync="paginationData.currentPage"
      :limit.sync="paginationData.size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'ZgTable',
  components: {
    Pagination
  },
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    listQuery: {
      type: Object
    },
    multipleSelection: {
      type: Array,
      default() {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    fetchList: { // 发起请求方法
      type: Function
    },
    mergeDataFn: { // 获取数据后，处理一遍
      type: Function
    },
    showDataCountBar: { // 展示数据选择情况
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '500px'
    },
    importantColor: { // important-hover-table 类名
 			type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    clickAutoSelect: { // 点击即选中
      type: Boolean,
      default: false
    },
    beforeMergeListQuery: { // 请求前调整请求参数
      type: Function
    },
    spanMethod: {
      type: Function
    },
    list: { // 可直接传list不需要fetchList方法
      type: Array
    },
    single: { // 是否单选
      type: Boolean,
      default: false
    },
    currentRow: { // 单选选中行
      type: Object
    },
    highlightCurrentRow: { // 高亮当前行
      type: Boolean
    },
    defaultSort: {
      type: Object
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      tableData: [],
      myloading: false,
      paginationData: {
        currentPage: 1,
        size: 10
      },
      total: 0,
      singleId: ''
    }
  },
  watch: {
    list: {
      handler(list) {
        this.tableData = list
      },
      immediate: true
    },
    currentRow: {
      handler(row) {
        this.singleId = row.id
        this.$refs.table.setCurrentRow(row)
      },
      deep: true
    },
    singleId(val, oldVal) {
      const row = this.tableData.find(item => item.id == val)
      this.$refs.table.setCurrentRow(row)
    },
  },
  mounted() {
    if (this.fetchList) {
      this.getList()
    } else {
      this.tableData = this.list
    }
  },
  methods: {
    getList() {
      if (!this.fetchList) { return }
      this.myloading = true

      let formData = {
        ...this.paginationData,
        obj: {
          ...this.listQuery
        }
      }
      if (this.beforeMergeListQuery && typeof this.beforeMergeListQuery === 'function') {
        formData = this.beforeMergeListQuery(formData)
      }
      this.fetchList(formData)
        .then(({ result }) => {
          this.myloading = false
          if (typeof this.mergeDataFn === 'function') {
            this.tableData = this.mergeDataFn(result.records || result)
          } else {
            this.tableData = result.records
          }
          this.$emit('update:list', this.tableData)
          this.total = result.total
        })
        .catch(() => {
          this.myloading = false
        })
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    toggleRowSelection(row) {
      this.$refs.table.toggleRowSelection(row)
    },
    handleSelectionChange(val) {
      this.$emit('update:multipleSelection', val)
    },
    handleEmptySelection() {
      this.clearSelection()
      this.$emit('update:multipleSelection', [])
      this.$refs.table.setCurrentRow()
      this.singleId = ''
    },
    getEnumLabel(list, val) {
      const item = list.filter((item) => item.value == val)
      if (!item.length) {
        return ''
      }
      return item[0].label
    },
    reset() {
      this.getList()
      this.handleEmptySelection()
    },
    rowClick(row) {
      // this.$refs.table.toggleRowSelection(row)
      if (this.clickAutoSelect) {
        this.toggleRowSelection(row)
        this.$emit('update:currentRow', row)
      }
      this.$emit('row-click', row)
    }
  }
}
</script>
<style lang="scss">
.pagination {
	text-align: right;
}
.data-count-bar{
    box-sizing: border-box;
    margin-bottom: 14px;
    background: #e6f7ff;
    border: 1px solid #91d5ff;
    height: 40px;
    line-height: 38px;
    padding-left: 17px;
    border-radius: 3px;
    .fa-paper-plane{
        color: #1890ff;
        margin-right: 14px;
    }
    >span{
        margin: 0 2px;
    }
}
.c-blue{
    color: #1890ff;
}

</style>
