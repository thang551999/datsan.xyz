<template lang="html">
  <div class="text-center">
    <img src="@/icons/check_mark.png" alt="" class="w-[120px] mx-auto" />
    <p class="text-main text-[32px] mb-2">Kích hoạt tài khoản thành công</p>
    <p class="text-[24px] mb-[2rem]">Hãy đăng nhập để tiếp tục sử dụng hệ thống</p>
    <el-button type="primary" @click="$router.push({ name: 'Login' })">Đăng nhập</el-button>
  </div>
</template>
<script>
export default {}
</script>
<style lang=""></style>
