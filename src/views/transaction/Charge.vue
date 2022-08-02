<template lang="html">
  <div>
    <header class="header pl-[4em] border-b border-[#e5e5e5] mb-[4em] relative">
      <p class="italic capitalize text-[1.5rem]">Nạp tiền vào tài khoản</p>
    </header>

    <main>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <img src="@/assets/vnpay.png" alt="" class="w-full" />
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <div class="py-[2em] px-[1em] box-shadow-1 rounded-lg">
            <p class="font-bold text-xl mb-[1em] text-center">Nạp tiền vào tài khoản của bạn</p>
            <el-form :model="form" ref="form" :rules="rules">
              <el-form-item label="Số tiền cần nạp" prop="amount">
                <el-input v-model="form.amount" placeholder="Nhập vào số tiền cần nạp" show-word-limit maxlength="10" />
              </el-form-item>
            </el-form>
            <el-button :loading="loading" type="success" @click.native.prevent="createPayment">Nạp ngay</el-button>
          </div>
        </el-col>
      </el-row>
    </main>
  </div>
</template>
<script>
import { createPayment } from '@/api/payment'
export default {
  data() {
    return {
      loading: false,
      form: {
        amount: ''
      },

      rules: {
        amount: [
          {
            required: true,
            message: 'Số tiền không được bỏ trống',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]*$/,
            message: 'Nhập vào số tiền hợp lệ',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    async createPayment() {
      try {
        this.loading = true
        const isValid = await this.$refs.form.validate()
        if (isValid) {
          const { data } = await createPayment(this.form)
          location.href = data.url
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header::before {
  width: 0.5rem;
  height: 4rem;
}
</style>
