<template>
  <div>
    <el-form
      ref="form"
      class="custom-form"
      :inline="true"
      :lable-width="labelWidth"
      :model="sizeForm"
      :rules="ownRules"
      v-bind="$props"
    >
      <template v-for="item in columns">
        <slot v-if="item.slot" :name="item.prop" />
        <el-form-item
          v-else-if="!item.hidden"
          :key="item.prop"
          :label="$t(item.label)"
          :style="{width: item.width || '48%'}"
          v-bind="item.props"
          :prop="item.prop"
        >
          <!-- 开关 type: 'switch' -->
          <el-switch v-if="item.type === 'switch'" v-model="sizeForm[item.prop]" :disabled="type == 'preview'" v-bind="item.attrs" active-color="#13ce66" inactive-color="#ff4949" />
          <!-- 选择框 传入 enums: [] -->
          <el-select
            v-else-if="item.enums"
            v-model="sizeForm[item.prop]"
            :disabled="type == 'preview'"
            style="width: 100%"
            :clearable="true"
            :placeholder="'请选择' + $t(item.label)"
            v-bind="item.attrs"
            v-on="item.on"
          >
            <el-option
              v-for="item1 in item.enums"
              :key="item1.value"
              :label="$t(item1.label)"
              :value="item1.value"
            />
          </el-select>
          <!-- 日期时间选择器 -->
          <el-date-picker
            v-else-if="item.type === 'dateTime'"
            v-model="sizeForm[item.prop]"
            v-bind="item.attrs"
            type="datetime"
            :placeholder="'请选择' + $t(item.label)"
            v-on="item.on"
          />
          <!-- 时间选择器 -->
          <el-time-picker
            v-else-if="item.type === 'timepicker'"
            v-model="sizeForm[item.prop]"
            v-bind="item.attrs"
            :placeholder="'请选择' + $t(item.label)"
            v-on="item.on"
          />
          <!-- 文本框或者textarea 可传入 type: textarea -->
          <el-input
            v-else
            v-model="sizeForm[item.prop]"
            :type="item.type || 'text'"
            :disabled="type == 'preview'"
            v-bind="item.attrs"
            :placeholder="$t('请输入') + $t(item.label)"
            :clearable="true"
            v-on="item.on"
          >
            <slot v-if="item.append" slot="append">{{ item.append }}</slot>
          </el-input>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>

//  * 选择模态框
//  *  model: 'machine', // machine, mould, order, plastic, product
// 	fields: { // 可传入键值对，键为sizeForm中的键名，值是选中数据的键名
// 		machineKey: 'machineKey',
// 		machineId: 'id',
// 	}
// 	multiple: true, // 多选请指定onChange事件
// 	onChange(rows) {
// 		// ...
// 	}

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
    sizeForm: {
      type: Object,
      default() {
        return {}
      },
      required: true
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    type: {
      type: String,
      default: 'edit', //
      validator(val) {
        return val == '' || ['edit', 'preview'].indexOf(val) > -1
      }
    },
    rules: {
      type: Object
    }
  },
  data() {
    return {
      ownRules: {},
      modelMultiple: false,

      modalData: {},
      dictbizList: {},
      modelList: []
    }
  },
  computed: {},
  watch: {
    columns: {
      handler(columns) {
        let rules = this.rules || {}
        rules = Object.assign(rules)
        // 遍历 获取使用到的字典列表，将所有必填的参数放到rules中
        columns && columns.forEach((item) => {
          if (item.required) {
            if (!rules[item.prop]) {
              rules[item.prop] = []
            }
            rules[item.prop].push({
              required: true,
              message: (item.enums || item.model || item.dictbizName ? this.$t('请选择') : this.$t('请输入')) + this.$t(item.label),
              trigger: 'change'
            })
          }
        })
        this.ownRules = rules
        this.$nextTick(() => {
          this.reset()
        })
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {},
  methods: {
    needModal(name) {
      return this.modelList.includes(name)
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            return resolve()
          }
          return reject()
        })
      })
    },
    reset() {
      this.$refs.form.clearValidate()
    },
    resetFields() {
      this.$refs.form.resetFields()
    },
    handleSelectModel(item) {
      if (this.type == 'preview') return
      if (item.model === 'device' && this.sizeForm.deviceType === '') {
        this.$message.warning(this.$t('请选择设备类型'))
        return
      }
      this.modalData = item
      const { model, multiple } = item
      this.modelMultiple = multiple || false
      this.$refs[model].open()
    },
    handleRemoveSelect(item) {
      const { modalData } = this
      Object.entries(modalData.fields).forEach((item) => {
        this.sizeForm[item[0]] = ''
      })
    },
    successful(rows) {
      const { modalData } = this
      console.log(rows)
      if (!modalData.onChange) {
        Object.entries(modalData.fields).forEach((item) => {
          this.sizeForm[item[0]] = rows[item[1]]
        })
      } else {
        this.modalData.onChange(rows)
      }
    }
  }
}
</script>
<style lang="scss">
.model-clear{
	display: none!important;
}
.el-input:hover{
	.model-clear{
		display: block!important;
	}
}
</style>
