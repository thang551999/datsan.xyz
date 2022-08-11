<template lang="html">
  <div v-loading.fullscreen.lock="loading" class="relative">
    <el-row :gutter="24">
      <el-col :sm="24" :md="16">
        <!-- main content -->
        <section class="detail-items">
          <h2 class="font-bold text-[1.25rem]">{{ place.name }}</h2>
          <span
            ><i class="el-icon-star-on text-[#fadb14]" v-for="i in place.star" :key="i" /> ({{
              place.comments.length
            }}
            đánh giá)</span
          >
          <p class="mb-[1.5em]">
            <i class="el-icon-location" />
            <span>
              {{ place.address }}
            </span>
          </p>
          <img
            class="w-full mb-[1em] object-contain h-[480px]"
            :src="place.imageDetails[0]"
            v-if="place.imageDetails"
          />
          <p v-html="place.description"></p>
        </section>

        <!-- comment -->
        <section class="detail-items">
          <p class="font-bold text-[1.25rem] mb-[1em]">Đánh giá {{ place.name }}</p>
          <div>
            <span class="text-[1.25rem] font-bold text-main mr-[0.5em]">{{ place.star }}</span>
            <span>
              <i class="el-icon-star-on text-[#fadb14]" v-for="i in place.star" :key="'star' + i" />
              ({{ place.comments.length }}
              đánh giá)
            </span>

            <div class="rounded-[5px] border border-[#e5e5e5] p-[1em]">
              <div class="flex items-center mb-[0.5em] font-[700]">
                Voting <el-rate class="ml-[0.5em]" v-model="comment.star"></el-rate>
              </div>
              <el-form>
                <el-row :gutter="12">
                  <el-col :md="24">
                    <el-input
                      type="textarea"
                      rows="4"
                      placeholder="Nhập bình luận của bạn"
                      class="w-full h-[120px] border-1"
                      v-model="comment.comment"
                    />
                  </el-col>
                  <!-- <el-col :md="8">
                    <el-form-item>
                      <el-input placeholder="Họ và tên" />
                    </el-form-item>

                    <el-form-item>
                      <el-input placeholder="Số điện thoại" />
                    </el-form-item>
                  </el-col> -->
                </el-row>
                <div class="w-full mx-auto pc:w-fit">
                  <el-button type="primary" class="w-full px-[4em]" @click="createComment">Gửi đánh giá</el-button>
                </div>
              </el-form>
            </div>
          </div>
        </section>

        <!-- comment list -->
        <section class="detail-items" v-if="place.comments.length">
          <p class="font-bold text-[1.25rem] mb-[1em]">Đánh giá/Bình luận</p>

          <div
            class="flex p-1 mb-3 rounded-md border-[#ededed] border"
            v-for="(item, i) in place.comments"
            :key="'comment' + i"
          >
            <el-avatar icon="el-icon-user-solid" class="mr-2 avt-image" />
            <div>
              <span class="font-[500]">Username</span>
              <div>
                <i class="el-icon-star-on text-[#fadb14]" v-for="i in item.star" :key="i" />
              </div>
              <p>{{ item.comment }}</p>
            </div>
          </div>
        </section>
      </el-col>
      <!-- Booking time -->
      <el-col :sm="24" :md="8">
        <section>
          <p class="font-bold text-[1.5rem] mb-[1em]">Đặt sân</p>
          <div class="border rounded-lg p-[1em] border-[#e5e5e5] text-center">
            <p class="flex items-center justify-center card-name">
              <img src="@/icons/time.svg" alt="" class="icon-class" />
              Chọn thời gian
            </p>

            <el-date-picker
              v-model="form.orderDay"
              type="date"
              placeholder="Pick a day"
              class="mb-[1em] w-100"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
              @change="changeDay"
              :pickerOptions="pickerOptions"
            >
            </el-date-picker>
            <el-row :gutter="24" class="mb-[1em]" v-if="time.length">
              <el-col :span="8" v-for="item in time" :key="item.time" class="mb-[1em]">
                <el-checkbox
                  v-model="form.timeBooks"
                  border
                  class="w-full"
                  :label="item.time"
                  :disabled="!item.isReady"
                  @change="_getPrice"
                >
                  {{ item.time }}
                </el-checkbox>
              </el-col>
            </el-row>

            <div v-if="!isDayOff">
              <section class="detail-items" v-if="place.services.length">
                <p class="flex items-center justify-center card-name">
                  <img src="@/icons/more.svg" alt="" class="icon-class" />
                  Tiện ích
                </p>

                <div v-for="(service, index) in place.services" :key="service.id" class="mb-[1em]">
                  <el-checkbox
                    v-model="form.services"
                    border
                    class="flex items-center w-full"
                    :label="index"
                    @change="_getPrice"
                  >
                    <div class="flex flex-1">
                      <p class="mr-auto">{{ service.name }}</p>
                      <p>+{{ service.price | formatMoney }}</p>
                    </div>
                  </el-checkbox>
                </div>
              </section>

              <!-- Voucher -->
              <section class="detail-items" v-if="place.voucherCreate.length">
                <p class="flex items-center justify-center card-name">
                  <img src="@/icons/voucher.svg" alt="" class="icon-class" />
                  Voucher
                </p>

                <div v-for="(voucher, index) in place.voucherCreate" :key="voucher.id" class="mb-[1em]">
                  <el-checkbox
                    v-model="form.voucher"
                    class="flex items-center w-full h-auto"
                    :label="index"
                    border
                    @change="_getPrice"
                    v-if="isVoucherAvailable(voucher.isActive, voucher.endDate, voucher.amount)"
                  >
                    <div>
                      <div class="flex mb-[4px]">
                        <p class="mr-auto w-[80%] text-left">{{ voucher.name }}</p>
                        <p v-if="voucher.type === voucherType.PERCENT">-{{ voucher.value }}%</p>
                        <p v-else>-{{ voucher.value | formatMoney }}</p>
                      </div>
                      <p class="text-left">Ngày hết hạn: {{ voucher.endDate }}</p>
                      <p class="mt-1 text-left">Số lượng voucher còn: {{ voucher.amount }}</p>
                    </div>
                  </el-checkbox>
                </div>
              </section>

              <!-- Phone -->
              <section class="border-none detail-items" v-if="place.voucherCreate">
                <p class="card-name">Số điện thoại liên hệ</p>
                <el-input v-model="form.phoneNumber"></el-input>
              </section>
            </div>

            <div v-else>
              <p class="text-center text-[white] bg-warning py-[0.5rem] rounded-md text-lg">
                {{ this.message }}
              </p>
            </div>
          </div>
        </section>
      </el-col>
    </el-row>

    <!-- fixed price bar -->
    <div
      v-if="price && Object.keys(price).length"
      class="fixed bottom-0 left-0 border-t-2 border-main fixed-bar py-[1rem] w-full bg-[white] px-[1em] z-10"
    >
      <!-- <div class="absolute top-[-15%] bg-blue text-[white] py-[4px] px-[18px] right-[5%] rounded-lg text-xl cursor-pointer">
        <i class="el-icon-arrow-down"></i>
      </div> -->

      <div class="absolute top-[-15%] bg-main text-[white] p-[8px] left-[5%] rounded-lg px-[2em]">Giá tiền</div>
      <!-- main price -->
      <div class="flex items-center w-full">
        <div class="w-[60%] mx-[1em]">
          <div class="flex items-center py-[0.5em] w-full">
            <div class="w-[60%] flex items-center">
              <img src="@/icons/fee.svg" class="icon-class" alt="" />
              <span class="font-[700]">Phí thuê sân + Tiện ích</span>
            </div>
            <span class="flex-1 text-right text-main">{{ price.money | formatMoney }}</span>
          </div>
          <div class="flex items-center py-[0.5em] w-full">
            <div class="w-[60%] flex items-center">
              <img src="@/icons/fee.svg" class="icon-class" alt="" />
              <span class="font-[700]">Phí dịch vụ</span>
            </div>
            <span class="flex-1 text-right text-main">{{ price.gasFee | formatMoney }}</span>
          </div>
          <div class="flex items-center py-[0.5em] w-full">
            <div class="w-[60%] flex items-center">
              <img src="@/icons/voucher.svg" class="icon-class" alt="" />
              <span class="font-[700]">Voucher</span>
            </div>
            <span class="flex-1 text-right text-main">-{{ price.moneyDown | formatMoney }}</span>
          </div>
        </div>
        <div class="w-[20%] text-center border-main border-r-[1px] border-l-[1px] mx-[1em]">
          <p class="mb-[0.5em] text-xl font-[600]">Số tiền cần thanh toán</p>
          <p class="text-xl font-bold text-main" v-if="price.moneyRes">{{ price.moneyRes | formatMoney }}</p>
          <p class="text-xl font-bold text-main" v-else>0 VND</p>
        </div>

        <el-button type="success" class="w-[140px] h-[40px] mx-[1em] flex-1" @click="sendFormData">Đặt sân</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getPlaceById, getTime, createComment } from '@/api/place'
import { applyVoucher, order } from '@/api/order'
import { getDay } from '@/utils/day'
import { VOUNCHER_TYPE } from '@/utils/constants'

export default {
  name: 'Detail',
  async created() {
    try {
      this.form.orderDay = getDay(Date.now())
      await this.getData(this.form.orderDay)
    } catch (e) {
      console.log(e)
    }
  },
  data() {
    return {
      loading: false,
      voucherType: VOUNCHER_TYPE,
      isOpenPrice: false,
      isDayOff: false,
      message: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      form: {
        orderDay: '',
        timeBooks: [],
        services: [],
        voucher: [],
        phoneNumber: ''
      },

      comment: {
        star: 0,
        comment: ''
      },

      place: {
        services: [],
        voucherCreate: [],
        comments: []
      },
      time: [],
      price: {}
    }
  },

  methods: {
    async getData(day) {
      const [stadium] = await Promise.all([getPlaceById(this.$route.params.id), this._getTime(day)])

      this.place = stadium.data.data
    },

    /**
     *
     * @param {Datetime} day format "yyyy/MM/dd"
     */
    async changeDay(day) {
      this.form.timeBooks = []
      this.price = {}
      await this._getTime(day)
    },

    async sendFormData() {
      try {
        this.loading = true
        await this._placeOrder()
      } catch (e) {
        this.$vmess.error('There is an error')
      } finally {
        this.loading = false
      }
    },

    async createComment() {
      try {
        const sendData = {
          ...this.comment,
          place: { id: this.place.id }
        }
        await createComment(sendData)
        this.form.orderDay = getDay(Date.now())
        await this.getData(this.form.orderDay)
        this.comment = ''
        this.$vmess.success('Cảm ơn bạn đã gửi đánh giá')
      } catch (e) {
        console.log(e)
      }
    },

    async _getPrice() {
      const formData = this._createFormData()
      const res = await applyVoucher(formData)
      this.price = {
        ...res.data,
        moneyRes: this._getMoney(res.data)
      }
    },

    async _placeOrder() {
      const formData = this._createFormData()

      if (!this.$store.getters['token']) {
        return this.$vmess.error('Xin vui lòng đăng nhập để thực hiện chức năng này')
      }

      if (this.price.moneyRes > this.$store.getters['money']) {
        this.$vmess.error('Bạn không đủ tiền để đặt sân! Hãy nạp thêm tiền để tiếp tục')
        return false
      }

      const phonePattern = /^[0-9]{10}$/

      if (!phonePattern.test(this.form.phoneNumber)) {
        this.$vmess.error('Nhập vào số điện thoại đúng định dạng và bao gồm 10 kí tự')
        return false
      }
      await order(formData)
      this.price = {}
      this._resetForm()
      this.form.orderDay = getDay(Date.now())
      await this.getData(this.form.orderDay)

      this.$vmess.success('Chúc mừng bạn đã đặt sân thành công!!')
    },

    _createFormData() {
      return {
        ...this.form,
        services: this.form.services?.map((item) => {
          return this.place.services[item]
        }),

        voucher: this.form.voucher?.map((item) => {
          return this.place.voucherCreate[item]
        }),

        place: {
          id: this.place.id
        }
      }
    },

    _getMoney(data) {
      const moneyRes = Number(data.money) + Number(data.gasFee) - Number(data.moneyDown)
      if (moneyRes >= 0) {
        return moneyRes
      } else {
        return 0
      }
    },

    _resetForm() {
      this.form = {
        orderDay: '',
        timeBooks: [],
        services: [],
        voucher: [],
        phoneNumber: ''
      }
    },

    async _getTime(day) {
      this.time = []
      const res = await getTime(this.$route.params.id, { day })
      if (res.data.data.messgae) {
        this.isDayOff = true
        this.message = res.data.data.messgae
        return false
      }
      this.isDayOff = false
      this.time = res.data.data
    },

    isVoucherAvailable(isActive, endDate, amount) {
      if (!isActive) return false
      if (amount <= 0) return false
      if (new Date(endDate) < new Date()) return false
      return true
    }
  }
}
</script>
<style lang="css" scoped>
.detail-items {
  @apply border-b-[1px] border-[#e5e5e5] mb-[1.5em] pb-[1.5em];
}

.w-100 {
  width: 100% !important;
}

::v-deep .el-checkbox__label {
  flex: 1;
}

::v-deep .el-checkbox__input {
  display: none;
}

::v-deep .el-checkbox.is-bordered {
  height: auto;
}

::v-deep .el-checkbox.is-bordered.is-checked {
  border-color: #21ba45;
}

::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #21ba45;
}

.card-name {
  @apply font-bold text-[1.25rem] mb-[1em] border-x-4 py-[0.5em];
  border-color: #21ba45;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.fixed-bar {
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
}

.icon-class {
  height: 30px;
  margin-right: 0.25em;
}
</style>
<style>
.circular {
  margin: 0 auto;
}
</style>
