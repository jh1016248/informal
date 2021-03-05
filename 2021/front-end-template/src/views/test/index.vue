<template>
  <div class="app-container">
    <zg-query
      :columns="queryColumns"
      :list-query.sync="listQuery"
      label-width="120px"
    />

    <div style="margin-bottom: 20px;">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="showCreate = true">新增
      </el-button>
      <el-button
        v-if="multipleSelection.length > 0"
        icon="el-icon-delete"
        type="danger"
        size="medium"
        plain
        @click="handleRemove()"
      >删除</el-button>
    </div>
    <zg-table
      ref="table"
      :list-query="listQuery"
      :columns="tableColumns"
      :important-color="true"
      :default-sort="{prop: 'machineKey', order: 'descending'}"
      :highlight-current-row="true"
      :show-data-count-bar="true"
      :show-pagination="true"
      :click-auto-select="true"
      :multiple-selection.sync="multipleSelection"
      :before-merge-list-query="beforeMergeListQuery"
      :merge-data-fn="mergeDataFn"
      :fetch-list="fetchList"
    >
      <template #operation="{row}">
        <el-button type="text" @click="handleDetail(row)">详情</el-button>
        <el-button type="text" @click="handleEdit(row)">编辑</el-button>
        <el-button type="text" style="color: red;" @click="handleRemove(row.id)">删除</el-button>
      </template>
    </zg-table>
  </div>
</template>

<script>
import { Supervise } from '@/config/options'

export default {
  data() {
    return {
    //   fetchList,
      multipleSelection: [],
      queryColumns: [
        { label: '设备类型', prop: 'machineKey' },
        { label: '监管内容', prop: 'venderName', enums: Supervise.equipmentType },
        { label: '启用状态', prop: 'unitType1', enums: Supervise.disabled },
        { label: '监管内容', prop: 'venderName1', enums: Supervise.equipmentType },
        { label: '启用状态', prop: 'unitType', enums: Supervise.disabled }
      ],
      listQuery: {
        machineKey: '',
        vender: '',
        unitType: '',
        onlineStatus: '',
        machineStatus: '',
        startTime: '',
        endTime: ''
      },
      tableColumns: [
        { label: '设备内部编号', prop: 'machineKey', slot: true, sortable: true, headerSlot: 'machineKeyHeader' },
        { label: '设备厂家', prop: 'vender' },
        { label: '设备型号', prop: 'unitType' },
        { label: '联网状态', prop: 'qrcode' },
        { label: '创建时间', prop: 'createTime' },
        { label: '操作', prop: 'operation', slot: true }
      ],
      currentRow: {}
    }
  },
  mounted() {},
  methods: {
    fetchList() {
      return new Promise((resolve, reject) => {
        const data = {
          result: {
            records: [
              {
                barrelTemperature: '',
                clampingStroke: '700',
                clampingWay: '',
                collectorType: 'KqServer_C',
                createBy: '1226702918539051010',
                createTime: '2021-01-04 10:19:53',
                cuid: '1215563792028860418',
                dieHeight: '',
                ejectingForce: '',
                ejectionStroke: '',
                fromTheTemplate: '',
                heatingPower: '',
                id: '1345917836764422145',
                identificationCode: '',
                injectionSpeed: '',
                ipAddress: '192.168.111.180',
                isDel: 0,
                lastTime: null,
                leverFromInside: '755*755',
                machineKey: '1',
                machineStatus: 3,
                maintenancePeriod: null,
                maximumHoldingPressure: '',
                maximumInjectionPressure: '170',
                mouldForce: '3900',
                name: '192.168.111.180',
                networkSegment: '',
                nozzleContactForce: '',
                nozzleJourney: '',
                nozzleType: '',
                onlineStatus: 5,
                parallelProduction: 0,
                picture: '',
                plasticizingCapacity: '',
                port: null,
                protocolType: 'opcda2',
                qrCodeUrl: 'http://m0.smartcloud40.cn/M00/00/19/rBKTu1_ye0qAMaY_AAYTCbtRARY199.jpg',
                screwBarrelCategory: '',
                screwSpeed: '',
                screwTheTrip: '320',
                series: 'MAIIS',
                serverIpAddress: '127.0.0.1',
                serverName: '192.168.111.180',
                serverParam: '192.168.111.180',
                serverPassword: 'admin123@',
                serverPort: 8533,
                serverUsername: 'Administrator',
                size: '',
                subnetMask: '',
                templateSize: '',
                templateSpeed: '',
                theInjectionRate: '',
                theInjectionVolume: '',
                theScrewDiameter: '70',
                theoreticalInjectionVlume: '',
                thimblePosition: '',
                unitType: 'MA3900II/2100h',
                updateBy: null,
                updateTime: '2021-01-04 10:19:54',
                vender: '海天',
                weight: '',
                workshopId: '1351490078357434370',
                workshopName: '车间1'
              }
            ],
            total: 1
          }
        }
        resolve(data)
      })
    },
    getList() {
      this.$refs.table.reset()
    },
    handleRemove(ids = '') {
      this.$confirm('确定删除吗' + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
        })
    },
    handleDetail(id) {
      this.$router.push(`/test/detail/${id}`)
    },
    handleEdit(id) {
      this.$router.push(`/machine/edit/${id}`)
    },
    beforeMergeListQuery(listQuery) {
      console.log('----请求前处理,处理后返回请求参数----')
      console.log(listQuery)
      return listQuery
    },
    mergeDataFn(records) {
      console.log('----请求成功后，处理返回的数据-----')
      console.log(records)
      return records
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
