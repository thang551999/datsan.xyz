<template lang="html">
  <div>
    <el-dialog
      title="Bạn muốn khiếu nại đơn hàng này"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <el-form ref="form" :model="form" label-width="100px" label-position="top">
          <el-form-item label="Nội dung khiếu nại">
            <el-input type="textarea" v-model="form.content" :rows="4" placeholder="Nhập nội dung khiếu nại"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="text-right">
        <el-button type="primary" @click="reportOrder">Khiếu nại</el-button>
        <el-button @click="handleClose">Hủy</el-button>
      </div>
    </el-dialog>

    <header class="header pl-[4em] border-b border-[#e5e5e5] mb-[4em] relative">
      <p class="italic capitalize text-[1.5rem]">Lịch sử đặt hàng</p>
    </header>

    <div class="content-main-container">
      <div class="bg-white box-shadow-1 p-[0.5em] rounded-md">
        <v-table
          :table-data="results"
          :columns="cols"
          :limit="limit"
          :page="page"
          :total="total"
          @onChangePage="changePage"
        >
          <template #status="{ row }">
            <div
              class="text-center bg-[#00b5ad] text-[white] rounded-lg py-[0.5rem] w-[80px] mx-auto"
              v-if="row.status"
            >
              Done
            </div>
            <el-tag type="warning" v-else>Waiting</el-tag>
          </template>

          <template #time="{ row }">
            <div>
              <el-tag v-for="item in row.time" :key="item" class="mb-2 mr-2" type="success">{{ item }}</el-tag>
            </div>
          </template>

          <template #totalMoney="{ row }">
            <div>
              <p class="text-center" v-if="row.totalMoney">
                {{ row.totalMoney | formatMoney }}
              </p>
              <p class="text-center" v-else>0 VND</p>
            </div>
          </template>

          <template #action="{ pos }">
            <div class="text-center">
              <el-button type="danger" class="bg-[#F56C6C]" icon="el-icon-warning" @click="confirmReport(pos)" circle>
              </el-button>
            </div>
          </template>
        </v-table>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable no-unused-vars -->
<script>
import { getOrder, reportOrder } from '@/api/order'
export default {
  async created() {
    await this.getData()
  },

  data() {
    return {
      loading: false,
      isOpen: false,
      total: 1,
      page: 1,
      limit: 10,
      gas: 10,
      results: [],
      rawData: [],
      dialogVisible: false,
      selectedData: {},
      form: {
        content: ''
      },

      cols: [
        {
          prop: 'name',
          label: 'Sân',
          minWidth: '200'
        },
        {
          prop: 'time',
          label: 'Thời gian',
          minWidth: '200'
        },
        {
          prop: 'totalMoney',
          label: 'Tổng tiền',
          minWidth: '100'
        },
        {
          prop: 'status',
          label: 'Trạng thái',
          minWidth: '100'
        },
        {
          prop: 'dayOrder',
          label: 'Ngày đặt',
          minWidth: '100'
        },
        {
          prop: 'action',
          label: '',
          minWidth: '100'
        }
      ]
    }
  },

  methods: {
    confirmReport(pos) {
      this.selectedData = this.rawData[pos]
      this.dialogVisible = true
    },

    handleClose() {
      this.dialogVisible = false
      this.form.content = ''
    },

    async changePage(page) {
      this.page = page
      await this.getData()
    },

    async getData() {
      try {
        this.results = []
        const res = await getOrder({
          pageSize: this.limit,
          page: this.page
        })
        if (res.data.records.length) {
          this.rawData = res.data.records
          this.results = res.data.records.map((item) => {
            return {
              dayOrder: item.dayOrder,
              status: item.status,
              name: item.place?.name,
              time: this._getTime(item.timeBlocks),
              totalMoney: item.totalPrice
            }
          })
          this.total = res.data.total
        }
      } catch (error) {
        console.log(error)
      }
    },

    async reportOrder() {
      try {
        await reportOrder({
          order: this.selectedData,
          images: [],
          content: this.form.content
        })
        this.$vmess.success('Đã gửi báo cáo thành công')
        this.dialogVisible = false
        this.form.content = ''
      } catch (error) {
         this.$vmess.error('Đơn hàng đã gửi báo cáo')
        console.log(error)
      }
    },

    _getTime(times) {
      if (!times) return ''
      return times.map((item) => {
        return item.timeStart
      })
    },

    _getMoney(money) {
      return money.money + money.gasFee - money.downPrice
    }
  }
}
</script>
<style lang="css" scoped>
.header::before {
  width: 0.4rem;
  height: 3rem;
}
</style>
