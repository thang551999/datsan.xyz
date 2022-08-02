<template lang="html">
  <div class="text-center">
    <img src="@/icons/check_mark.png" alt="" class="w-[120px] mx-auto" />
    <p class="text-main text-[32px] mb-2">Thanh toán thành công</p>
    <p class="text-[24px] mb-[2rem]">Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi</p>
    <el-button type="success" icon="el-icon-back" @click="$router.push({ name: 'HomeMain' })">Home</el-button>
  </div>
</template>
<script>
export default {}
</script>
<style lang=""></style>
