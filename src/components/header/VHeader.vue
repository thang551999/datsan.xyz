<template lang="html">
  <header class="p-[1em] mb-[1.5em] box-shadow-1 flex justify-between items-center">
    <div @click="$router.push('/home')">
      <img src="@/assets/logo.png" alt="" class="h-[40px] cursor-pointer" />
    </div>

    <div class="flex items-center">
      <p
        class="mr-[1.5em] hover:text-main cursor-pointer flex items-center"
        @click="$router.push({ name: 'NewsList' })"
      >
        <img src="@/icons/news.svg" class="icon-class" />
        <span>Tin tức</span>
      </p>

      <p
        class="mr-[1.5em] hover:text-main cursor-pointer flex items-center"
        @click="$router.push({ name: 'FindOpponent' })"
      >
        <img src="@/icons/search.svg" class="icon-class" />
        <span>Tìm đối</span>
      </p>

      <p
        class="mr-[1.5em] hover:text-main cursor-pointer flex items-center"
        @click="$router.push({ name: 'Login' })"
        v-if="!token"
      >
        <img src="@/icons/user.svg" class="icon-class" />
        <span>Đăng nhập</span>
      </p>

      <div class="flex items-center right-menu" v-else>
        <p class="mr-[1.5em] hover:text-main cursor-pointer flex items-center">
          <img src="@/icons/coin.svg" class="icon-class" />
          <span>{{ money | formatNumber }}</span>
        </p>
        <el-dropdown class="avatar-container" trigger="click">
          <div class="flex items-center avatar-wrapper no-select">
            <el-avatar icon="el-icon-user-solid" class="avt-image" />
            <span>{{ name }}</span>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="$router.push({ name: 'Charge' })">
              <span style="display: block">Nạp tiền</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="$router.push({ name: 'PaymentHistory' })">
              <span style="display: block">Lịch sử đặt hàng</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="$router.push({ name: 'UserInfor' })">
              <span style="display: block">Thông tin cá nhân</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">
              <span style="display: block">Đăng xuất</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <p
        class="mr-[1.5em] hover:text-main cursor-pointer flex items-center"
        @click="$router.push({ name: 'Register' })"
        v-if="!token"
      >
        <img src="@/icons/register.svg" class="icon-class" />
        <span>Đăng ký</span>
      </p>
    </div>
  </header>
</template>
<script>
export default {
  name: 'VHeader',

  computed: {
    name() {
      return this.$store.getters['name']
    },

    token() {
      return this.$store.getters['token']
    },

    money() {
      return this.$store.getters['money']
    }
  },

  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-class {
  height: 24px;
  margin-right: 4px;
}
.right-menu {
  float: right;
  height: 100%;
  line-height: 40px;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      cursor: pointer;
      font-weight: 600;
      position: relative;

      .avt-image {
        margin-right: 8px;
      }
    }
  }
}
</style>
