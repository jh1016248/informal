<template>
	<div>
        <div class="img-list">
            <div class="item" v-for="(item, index) in list" :style="{ width: imgWidth, height: imgWidth }" :key="index" @click="handleImg(index)">
                <img :src="item" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            required: true,
        },
        imgWidth: {
            type: String,
            default: '120px'
        }
    },
    data() {
        return {
            visible: false,
            initialIndex: 0,
        }
    },
    methods: {
        handleImg(index) {
            this.$hevueImgPreview({
                multiple: true, // 开启多图预览模式
                nowImgIndex: index, // 多图预览，默认展示第二张图片
                imgList: this.list, // 需要预览的多图数组
                mainBackground: 'rgba(0, 0, 0, .5)', // 整体背景颜色
                closeColor: 'rgba(255,255,255,.5)'
            })
        },
    },
}
</script>

<style lang="scss">
.img-list{
    text-align: left;
    .item{
        display: inline-block;
        position: relative;
        width: 120px;
        height: 120px;
        border: 1px solid #ccc;
        margin: 0 10px 10px 0;
        cursor: pointer;
        img{
            max-width: 100%;
            max-height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }
    }
}
.el-carousel__button{
    background: rgba(0,0,0,.3)
}
</style>