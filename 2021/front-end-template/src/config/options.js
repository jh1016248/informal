export const IntelligentSupervisionReport = {
    MonitoringParameters: [
        // { label: '注塑时间', value: 1 },
        // { label: '注塑压力', value: 2 },
        // { label: 'VP压力', value: 3 },
        // { label: 'VP位置', value: 4 },
        // { label: '最终行程', value: 5 },
        { label: '生产周期稳定性', value: 0 }, //Stability
        { label: '注塑时间稳定性', value: 1 },
        { label: '最大射压稳定性', value: 2 },
        { label: '最终行程稳定性', value: 3 },
        { label: '保压转换位置稳定性', value: 4 },
        { label: '保压转换压力稳定性', value: 5 },
        { label: '塑化时间稳定性', value: 6 }
    ],
    type: [
        // { label: 'OEE报告', value: 1 }, 
        { label: '生产报告', value: 1 },
        { label: '生产稳定报告', value: 2 },
    ]
};

export const Task = {
    beanType: [
        { label: 'test', value: -1 },
        { label: '工艺稳定性计算', value: 0 },
        { label: '按日期计算保养单', value: 1 },
        { label: '根据模次计算保养单', value: 2 },
        { label: '处理cycle数据', value: 3 },
    ],
    supervisionBeanType: [
        { label: '监控告警下发', value: 4 },
        { label: 'OEE监管', value: 10 },
        { label: '产量监管', value: 11 },
        { label: '工艺稳定性告警', value: 12 },
        { label: '工艺监管', value: 13 },
        { label: '行程监管', value: 14 },
    ],
    status: [
        { label: '暂停', value: 0 },
        { label: '正常', value: 1 },
        { label: '停止', value: 2 },
        { label: '完成', value: 3 },
    ],
}

export const Machine = {
    machineStatus: [
        { label: '手动', value: 0 },
        { label: '半自动', value: 1 },
        { label: '全自动', value: 2 },
        { label: '其他', value: 3 },
    ],
    machineStatusList: [
        { value: 0, label: '手动' },
        { value: 1, label: '半自动' },
        { value: 2, label: '全自动' },
        { value: 3, label: '其他' },
    ],
    onlineStatusList: [
        { value: 0, label: '未联网' },
        { value: 1, label: '离线-未知原因' },
        { value: 2, label: '离线-第三方服务异常' },
        { value: 3, label: '离线-服务器异常' },
        { value: 4, label: '离线-第三方硬件异常' },
        { value: 5, label: '在线' },
    ],
    parallelProduction: [
        { value: 0, label: '否' },
        { value: 1, label: '是' },
    ]
}
export const Order = {
    orderStatus: [
        { value: 0, label: '待生产' },
        { value: 1, label: '生产中' },
        { value: 2, label: '已完成' },
        { value: 3, label: '暂停' },
        { value: 4, label: '换模中' },
    ],
}

export const SpotCheckRules = {
    type: [
        { label: '按日历', value: 0 },
        { label: '按周期', value: 1 },
    ],
    productionType: [
        { label: '生产启动点检', value: 0 },
        { label: '生产结束点检', value: 1 },
    ],
    productionEquipmentType: [
        { label: '注塑机', value: 0 },
        { label: '模具', value: 1 },
        { label: '辅助设备', value: 2 },
        { label: '测量设备', value: 3 },
    ],
    equipmentType: [
        { label: '注塑机', value: 0 },
        { label: '模具', value: 1 },
    ]
}

export const Supervise = {
    equipmentType: [
        { label: '注塑机', value: 0 },
        { label: '模具', value: 1 },
    ],
    
    disabled: [
        { label: '未启用', value: 0 },
        { label: '启用', value: 1 },
    ],
    level: [
        { label: '级别1', value: 0 },
        { label: '级别2', value: 1 },
    ],
    frequency: [
        { label: '立即通知', value: 0 },
        { label: '1小时/次', value: 1 },
        { label: '2小时/次', value: 2 },
        { label: '3小时/次', value: 3 },
        { label: '5小时/次', value: 5 },
        { label: '6小时/次', value: 6 },
        { label: '8小时/次', value: 8 },
        { label: '1天/次', value: 24 },
        { label: '自定义', value: -1 },
    ],
    loopCount: [
        { label: '1次', value: 0 },
        { label: '3次', value: 1 },
    ],
    countTime: [
        { value: 1, label: '是' },
        { value: 0, label: '否' },
    ],
    pinlv: [
        { label: '1小时/次', value: 0 },
        { label: '2小时/次', value: 1 },
        { label: '3小时/次', value: 2 },
        { label: '1天/次', value: 3 },
    ],

    superviseEnable: [
        { label: '禁用', value: 0 },
        { label: '启用', value: 1 },
        { label: '查全部', value: 2 },
    ],

    rank: [
        { label: '告知', value: 1 },
        { label: '提醒', value: 2 },
        { label: '警报', value: 3 },
    ],

    mode: [
        { label: 'APP消息', value: 0 },
        { label: '电子邮件', value: 1 },
    ],

    alarmState: [
        { label: '失败', value: 0 },
        { label: '成功', value: 1 },
    ],
    confirmState: [
        { label: '不需要', value: 0 },
        { label: '已确认', value: 1 },
        { label: '未确认', value: 2 },
        { label: '查全部', value: 3 },
    ]
}

export const SuperviseLog = {
}

export const MaintainRule = {
    deviceType: [
        { label: '注塑机', value: 0 },
        { label: '模具', value: 1 },
        { label: '辅助设备', value: 2 },
        { label: '测试仪器', value: 3 },
    ],
    maintainWay: [
        { label: '按日历', value: 1 },
        { label: '按周期', value: 2 },
        { label: '固定每个月的一天', value: 3 },
        { label: '固定星期几', value: 4 },
    ],
    weeks: [
        { label: '星期一', value: 1 },
        { label: '星期二', value: 2 },
        { label: '星期三', value: 3 },
        { label: '星期四', value: 4 },
        { label: '星期五', value: 5 },
        { label: '星期六', value: 6 },
        { label: '星期天', value: 7 },
    ],
}

export const SpotCheck = {
    checkRule: [
        { label: '按日历', value: 0 },
        { label: '按周期', value: 1 },
        { label: '固定星期几', value: 2 },
        { label: '固定每个月的一天', value: 3 },
    ],
    checkType: [
        { label: '计划性点检', value: 0 },
        { label: '生产性点检', value: 1 },
    ],
    status: [
        { label: '待点检', value: 0 },
        { label: '点检中', value: 1 },
        { label: '已完成', value: 2 },
        // { label: '待审核', value: 3 },
        { label: '关闭', value: 4 },
        // { label: '未逾期待点检', value: 5 },
        // { label: '逾期待点检', value: 6 },
        // { label: '审核驳回', value: 7 },
    ],
    productionOrderStatus: [
        { label: '待点检', value: 0 },
        { label: '点检中', value: 1 },
        { label: '已完成', value: 2 },
        // { label: '待审核', value: 3 },
        // { label: '关闭', value: 4 },
        // { label: '未逾期待点检', value: 5 },
        // { label: '逾期待点检', value: 6 },
        // { label: '审核驳回', value: 7 },
    ],
    tenporaryStatus: [
        { label: '待点检', value: 0 },
        { label: '点检中', value: 1 },
        { label: '已完成', value: 2 },
    ],
    productionCheckRule: [
        { label: '生产启动点检', value: 4 },
        { label: '生产结束点检', value: 5 },
    ]
}

export const Maintain = {
    deviceRecordsTemporaryStatus: [
        { label: '待保养', value: 1 },
        { label: '保养中', value: 2 },
        { label: '已完成', value: 3 },
    ],
    maintainStatus: [
        { label: '未逾期待保养', value: 1 },
        { label: '逾期待保养', value: 2 },
        { label: '保养中', value: 3 },
        { label: '已完成', value: 4 },
        { label: '关闭', value: 5 },
        // { label: '待审核', value: 6 },
        // { label: '审核驳回', value: 7 },
    ],
    detailMaintainStatus: [
        { label: '待保养', value: 1 },
        { label: '已完成', value: 2 },
    ],
}

export const Repair = {
    repairStatus: [
        { label: '待维修', value: 1 },
        { label: '维修中', value: 2 },
        { label: '已完成', value: 3 },
    ]
}

// 质检
export const Quality = {
    checkType: [ // 质检类型
        { label: '首检', value: 0 },
        // { label: '末检', value: 1 },
        // { label: '抽检', value: 2 },
    ],
    status: [
        { label: '待检验', value: 0 },
        { label: '检验中', value: 1 },
        { label: '通过', value: 2 },
        { label: '不通过', value: 3 },
    ],
    spotCheckMode: [  // 抽检方式
        { label: '按时间', value: 0 },
        { label: '按数量', value: 1 },
        { label: '手动发起', value: 2 },
    ],
    result: [  // 质检结果
        { label: '通过', value: 0 },
        { label: '不通过', value: 1 },
    ]
}

// 停机原因
export const Shutdown = {
    type: [
        { label: '设备', value: 0 },
        { label: '模具', value: 1 },
        { label: '物料', value: 2 },
        { label: '人工', value: 3 },
        { label: '无计划', value: 4 },
        { label: '产品品质', value: 5 },
        { label: '其他', value: 6 },
    ],
    inputType: [
        { label: '上报', value: 2},
        { label: '补录', value: 1 },
    ],
    // 录入操作记录操作字段
    operateType: [
        { label: '录入停机原因', value: 1 },
        { label: '撤销离线停机', value: 2 },
        { label: '上报开始停机', value: 3 },
        { label: '上报结束停机', value: 4 },
        { label: '自动结束停机', value: 5 },
    ],
}


// 发布日志
export const ReleaseLog = {
    releaseBranch: [
        { label: 'master', value: 'master' },
        { label: 'develop', value: 'develop' },
    ],
}


// 生产建模
export const productionModeling = {
    
}

// 统计报表
export const ReportForm = {
    productionState: [ // 生产状态
        // { label: '待生产', value: 0 },
        { label: '生产中', value: 1 },
        { label: '已完成', value: 2 },
        { label: '暂停', value: 3 },
        { label: '换模中', value: 4 },
    ]
}

let months = [];
for(let i = 1; i < 32; i++) {
    months.push({
        label: i + '号',
        value: i
    })
}
export const Common = {
    months,
    weeks: [
        { label: '星期一', value: 1 },
        { label: '星期二', value: 2 },
        { label: '星期三', value: 3 },
        { label: '星期四', value: 4 },
        { label: '星期五', value: 5 },
        { label: '星期六', value: 6 },
        { label: '星期天', value: 7 },
    ],
    disabled: [
        { value: 1, label: '是' },
        { value: 0, label: '否' },
    ],
}