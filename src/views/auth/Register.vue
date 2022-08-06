<template lang="html">
  <div class="main-container">
    <main
      class="bg-[white] rounded-lg px-[2em] py-[2em] max-w-[720px] mx-auto box-shadow-1"
    >
      <p class="text-center mb-[2em] font-bold text-xl">
        Chào mừng bạn đến với thế giới thể thao
      </p>
      <el-form
        label-position="left"
        label-width="160px"
        :model="form"
        :rules="rules"
        class="mb-[1em]"
        ref="form"
      >
        <el-row>
          <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="Họ và tên" prop="fullName">
              <el-input v-model="form.fullName" />
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="Số điện thoại" prop="phone">
              <el-input v-model="form.phone" class="w-full" />
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="Email" prop="email">
              <el-input v-model="form.email" class="w-full" />
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="Password" prop="password">
              <el-input
                v-model="form.password"
                class="w-full"
                type="password"
              />
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="Nhập lại password" prop="password_confirm">
              <el-input
                v-model="form.password_confirm"
                type="password"
                class="w-full"
              />
            </el-form-item>
          </el-col>

<!--       
          <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="Địa chỉ">
              <el-input v-model="form.address" class="w-full" />
            </el-form-item>
          </el-col> -->

          <el-col :sm="24" :md="24" :lg="24">
            <el-form-item
              label="Bạn có muốn đăng ký làm chủ sân"
              labelWidth="240px"
            >
              <el-radio-group v-model="form.role">
                <el-radio label="1" border class="w-[100px] text-center"
                  >Không</el-radio
                >
                <el-radio label="2" border class="w-[100px] text-center"
                  >Có</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.role==2">
            <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="Số tài khoản">
              <el-input v-model="form.stk" class="w-full" />
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="Ngân hàng (SymBol)">
              <el-input v-model="form.bankSymbol" class="w-full" />
            </el-form-item>
          </el-col>
           <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="Địa chỉ">
              <el-input v-model="form.address" class="w-full" />
            </el-form-item>
          </el-col>
</el-row>
        <div class="text-center mt-1-em">
          <el-button
            type="success"
            icon="el-icon-circle-check"
            @click="createUser"
            :loading="loading"
          >
            Đăng ký ngay
          </el-button>
        </div>
      </el-form>

      <p class="text-center">
        Bạn đã có tài khoản?
        <router-link to="/auth/login" class="text-main"
          >Đăng nhập ngay</router-link
        >
      </p>
    </main>
  </div>
</template>
<script>
import { register } from "@/api/auth";
export default {
  data() {
    return {
      loading: false,
      form: {
        fullName: "",
        phone: "",
        email: "",
        address: "",
        password: "",
        password_confirm: "",
        role: "1",
        stk: '',
        bankSymbol: ''
      },

      rules: {
        email: {
          required: true,
          message: "Email không được bỏ trống",
          trigger: "blur",
        },

        phone: {
          required: true,
          message: "Số điện thoại không được bỏ trống",
          trigger: "blur",
        },

        password: {
          required: true,
          message: "Password không được bỏ trống",
          trigger: "blur",
        },
        password_confirm: {
          required: true,
          message: "Password không được bỏ trống",
          trigger: "blur",
        },

        fullName: {
          required: true,
          message: "Họ và tên không được bỏ trống",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    async createUser() {
      try {
        this.loading = true;
        const isValid = await this.$refs.form.validate();
        if (!isValid)
          throw new Error("Vui lòng kiểm tra lại thông tin đã nhập");
        if (this.form.role == 2) {
          const sendData = {
            email: this.form.email,
            password: this.form.password,
            role: 2,
            fullName: this.form.fullName,
            phone: this.form.phone,
            address: this.form.address,
            ownerPlace: {
              address: this.form.address,
              phone: this.form.phone,
              stk: this.form.stk,
              bankSymbol: this.form.bankSymbol,
              // fullName: this.form.fullName,
            },
          };
          await register(sendData);
          this.$vmess.success("Chúc mừng bạn đã đăng ký thành công!");
          // this.$router.push("/login");
        } else {
          const sendData = {
            email: this.form.email,
            password: this.form.password,
            role: 1,
            fullName: this.form.fullName,
            phone: this.form.phone,
          };
          await register(sendData);
          this.$vmess.success("Chúc mừng bạn đã đăng ký thành công!");
          // this.$router.push("/login");
        }
      } catch (e) {
        this.$vmess.error(e.response.data.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-form-item__label {
  font-weight: 600;
}

.main-container {
  background: url("../../assets/login-bg.jpg") no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
}
</style>
