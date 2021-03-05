<template>
  <el-form
    ref="form"
    class="search-form search-form2"
    :inline="true"
    :lable-width="labelWidth"
    :model="listQuery"
    v-bind="$props"
  >
    <template v-for="item in columns1">
      <slot v-if="item.slot" :name="item.prop" />
      <template v-else>
        <el-form-item
          v-if="item.prop=='createTime'"
          :key="item.prop"
          :label="item.label"
          class="flex-form-item"
          :prop="item.prop"
        >
          <el-date-picker
            v-model="listQuery.startTime"
            type="date"
            :default-value="listQuery.endTime"
            :picker-options="pickerOptions1"
            placeholder="开始日期"
          />
          <el-date-picker
            v-model="listQuery.endTime"
            type="date"
            :default-value="listQuery.startTime"
            :picker-options="pickerOptions2"
            placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item
          v-else-if="item.prop !== 'createTime'"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
        >
          <el-select
            v-if="item.enums"
            v-model="listQuery[item.prop]"
            :label="item.label"
            :clearable="true"
            :placeholder="'请选择'"
          >
            <el-option
              v-for="item1 in item.enums"
              :key="item1.value"
              :label="item1.label"
              :value="item1.value"
            />
          </el-select>
          <!-- 选择字典下拉框 传入 dictbizName: 'deviceType' -->
          <el-select
            v-else-if="item.dictbizName"
            v-model="listQuery[item.prop]"
            style="width: 100%"
            :clearable="true"
            :placeholder="'请选择' + item.label"
          >
            <el-option
              v-for="item1 in dictbizList[item.dictbizName]"
              :key="item1.label"
              :label="item1.label"
              :value="item1.value"
            />
          </el-select>
          <el-input
            v-else
            v-model="listQuery[item.prop]"
            :placeholder="'请输入' + item.label"
            :clearable="true"
          />
        </el-form-item>
      </template>
    </template>
    <!-- 和1完全一样 -->
    <template v-for="item in showColumns2">
      <slot v-if="item.slot" :name="item.prop" />
      <template v-else>
        <el-form-item
          v-if="item.prop=='createTime'"
          :key="item.prop"
          :label="item.label"
          class="flex-form-item"
          :prop="item.prop"
        >
          <el-date-picker
            v-model="listQuery.startTime"
            type="date"
            :default-value="listQuery.endTime"
            :picker-options="pickerOptions1"
            placeholder="开始日期"
          />
          <el-date-picker
            v-model="listQuery.endTime"
            type="date"
            :default-value="listQuery.startTime"
            :picker-options="pickerOptions2"
            placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item
          v-else-if="item.prop !== 'createTime'"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
        >
          <el-select
            v-if="item.enums"
            v-model="listQuery[item.prop]"
            :label="item.label"
            :clearable="true"
            :placeholder="'请选择'"
          >
            <el-option
              v-for="item1 in item.enums"
              :key="item1.value"
              :label="item1.label"
              :value="item1.value"
            />
          </el-select>
          <!-- 选择字典下拉框 传入 dictbizName: 'deviceType' -->
          <el-select
            v-else-if="item.dictbizName"
            v-model="listQuery[item.prop]"
            style="width: 100%"
            :clearable="true"
            :placeholder="'请选择' + item.label"
          >
            <el-option
              v-for="item1 in dictbizList[item.dictbizName]"
              :key="item1.label"
              :label="item1.label"
              :value="item1.value"
            />
          </el-select>
          <el-input
            v-else
            v-model="listQuery[item.prop]"
            :placeholder="'请输入' + item.label"
            :clearable="true"
          />
        </el-form-item>
      </template>
    </template>

    <!-- 右侧按钮组 -->
    <el-form-item class="search-btns">
      <el-button type="primary" @click="queryList">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
      <span
        v-if="columns.length > showLength"
        class="link ml20"
        @click="showMoreQuery = !showMoreQuery"
      >{{ showMoreQuery ? '收起':'展开' }}<i
        :class="showMoreQuery ? 'el-icon-arrow-up': 'el-icon-arrow-down'"
      /></span>
    </el-form-item>
  </el-form>
</template>

<script>
import { deepClone } from '@/utils/index'

export default {
  name: 'ZgQuery',
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    listQuery: {
      type: Object,
      default() {
        return { obj: {}}
      },
      required: true
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    showLength: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      columns1: [],
      columns2: [],
      modelList: [],
      modelMultiple: false,
      modalData: {},
      showMoreQuery: false,
      pickerOptions1: {
        disabledDate: (time) => {
          const { endTime } = this.listQuery
          if (!endTime) {
            return time.getTime() > Date.now()
          }
          return (
            time.getTime() > endTime || time.getTime() > Date.now()
          )
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          const { startTime } = this.listQuery
          return (
            time.getTime() < startTime ||
						time.getTime() > Date.now()
          )
        }
      }
    }
  },
  computed: {
    showColumns2() {
      if (this.showMoreQuery) {
        return this.columns2
      }
      return []
    }
  },
  watch: {
    columns: {
      handler(val) {
        const newVal = deepClone(val)
        if (val.length) {
          this.columns1 = newVal.splice(0, this.showLength)
          this.columns2 = newVal
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {},
  methods: {
    resetForm() {
      this.listQuery.startTime = ''
      this.listQuery.endTime = ''
      Object.keys(this.listQuery).forEach((item) => {
        this.listQuery[item] = ''
      })
      this.$emit('resetForm')
    },
    queryList() {
      const table = this.$parent.$refs.table

      if (this.$listeners.queryList) {
        this.$emit('queryList')
      } else {
        if (table) {
          table.getList()
        } else {
          this.$parent.getList && this.$parent.getList()
        }
      }
    }
  }
}
</script>
<style lang="scss">
.search-form {
	position: relative;
	padding-right: 230px;
	display: flex;
	flex-wrap: wrap;
	.el-form-item {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 10px;
		width: 48% !important;
		.el-form-item__content {
			flex: 1;
		}
	}
	.search-btns {
		position: absolute;
		right: 0;
		top: 0;
		width: auto !important;
		.el-form-item__content .link {
			margin-left: 20px;
			display: inline-block;
			cursor: pointer;
			user-select: none;
		}
	}
	.el-select {
		width: 100%;
	}
}
</style>
