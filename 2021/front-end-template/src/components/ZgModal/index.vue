<template>
  <el-dialog
    class="middle-dialog"
    v-bind="$attrs"
    :title="title"
    :top="top"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="handleClose"
    v-on="$listeners"
  >
    <div style="max-height: calc(100% - 50px - 250px); overflow-y: auto">
      <slot />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="closeText" @click="handleClose">{{ closeText }}</el-button>
      <el-button v-if="confirmText" type="primary" @click="handleSuccess">{{ confirmText }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ZgModal',
  inheritAttrs: false,
  props: {
    visible: Boolean,
    top: {
      type: [String, Number],
      default: '50px'
    },
    closeText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    title: {
      type: String,
	    default: '提示'
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    handleSuccess() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__body{
	padding-bottom: 0;
	padding-top: 10px;
}
</style>
