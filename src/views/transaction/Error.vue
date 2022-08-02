<template lang="html">
  <div class="text-center">
    <img src="@/icons/error.svg" alt="" class="w-[120px] mx-auto" />
    <p class="text-warning text-[32px] mb-2">Thanh toán thất bại</p>
    <p class="text-[24px] mb-[2rem]">Thanh toán của quý khách không thành công! Xin vui lòng thử lại sau</p>
    <el-button type="success" icon="el-icon-back" @click="$router.push({ name: 'HomeMain' })">Home</el-button>
  </div>
</template>
<script>
export default {}
</script>
<style lang=""></style>
