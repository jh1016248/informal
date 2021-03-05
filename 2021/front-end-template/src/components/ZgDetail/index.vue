<template>
	<div>
		<el-form ref="form" class="custom-form detail-form label240" v-bind="$props" label-position="right" :inline="true" :model="detail"
			:label-width="labelWidth">
			<div class="edit-btn" v-if="editPath">
				<el-button type="primary" style="float: right; " @click="$router.push(editPath)">
					{{$t('编辑')}}
				</el-button>
			</div>
			<el-form-item :label="$labelT('所属企业')" v-if="showCuid && $store.getters.isAdmin" style="margin-top: -40px;  width: 48%">
				<span>{{$store.getters.getDeptNameByCuid(detail.cuid)}}</span>
			</el-form-item>
            <template v-for="column in columns">
			    <div class="custom-title">
                    {{$t(column.title)}}
                    <slot :name="column.titleAction" v-if="column.titleAction"></slot>
                </div>
                <el-form-item v-for="item in column.items" :label="item.label ? $labelT(item.label) : ''" :style="{width: item.width || '48%'}">
                    <template v-if="item.slot">
                        <slot :name="item.prop"></slot>
                    </template>
                    <img v-else-if="item.type == 'image' && detail[item.prop]" :src="detail[item.prop]" 
                        style="max-width: 200px; max-height: 200px" :alt="item.label"
					    @click="visibleImg = detail[item.prop]">
                    <span v-else-if="item.enums">
                        {{$t(getOptionsValue(item.enums, detail[item.prop]))}}
                    </span>
                    <span v-else-if="item.dictbizName">
                        {{$t(getOptionsValue(dictbizList[item.dictbizName], detail[item.prop]))}}
                    </span>
                    <span v-else>{{detail[item.prop] ? (item.i18n ? $t(detail[item.prop]) : detail[item.prop]) : '-'}}</span>
                    <span v-if="item.append">({{item.append}})</span>
                </el-form-item>
            </template>
		</el-form>
		<image-view :src="visibleImg" :dialogVisible='visibleImg != ""' @hideDialog='visibleImg = ""' />
	</div>
</template>

<script>
import ImageView from "@/components/Dialog/ImageView";
export default {
    name: "ZgQuery",
    components: {
        ImageView
    },
	props: {
        labelWidth: {
            type: String,
            default: '200px',
        },
		detail: {
            type: Object,
            default() {return {}},
            reuqired: true,
        },
        columns: {
            type: Array,
            default() {
                return []
            },
            reuqired: true,
        },
        editPath: {
            type: String,
            default: '',
        },
        showCuid: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        columns: {
            handler(columns) {
				// 遍历 获取使用到的字典列表，将所有必填的参数放到rules中
				let dictbizs = []
                columns.forEach(column => {
                    column.items.forEach(item => {
                        if(item.dictbizName) {
                            dictbizs.push(item.dictbizName)
                        }
                    })
                })
				dictbizs.length && this.getDictbizEnums(dictbizs)
            },
            immediate: true
        },
    },
	data() {
		return {
            visibleImg: '',
		};
	},
	methods: {},
	mounted() {},
};
</script>
<style lang="scss">
.detail-form{
    .el-form-item{
        margin-bottom: 3px;    
    }
}
</style>