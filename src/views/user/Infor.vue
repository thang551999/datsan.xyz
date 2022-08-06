<template>
  <section class="card-item">
    <p
      class="px-[1rem] font-[600] text-lg py-[0.5rem] border-b border-[#c8c8c8]"
    >
      Thông tin cơ bản
    </p>
    <div class="flex px-[1rem] py-[1rem] border-b border-[#dfdfdf]">
      <p class="w-[180px]">Tên</p>
      <p>{{ user.name }}</p>
    </div>
    <div class="flex px-[1rem] py-[1rem] border-b border-[#dfdfdf]">
      <p class="w-[180px]">Số điện thoại</p>
      <p>{{ user.phoneNumber }}</p>
    </div>
    <div class="flex px-[1rem] py-[1rem] border-b border-[#dfdfdf]">
      <p class="w-[180px]">Địa chỉ</p>
      <p>{{ user.address }}</p>
    </div>
    <div class="flex px-[1rem] py-[1rem]">
      <p class="w-[180px]">Số coin</p>
      <p>{{ user.money | formatNumber }}</p>
    </div>
    <div class="save-profile">
      <el-button
        :loading="loading"
        type="success"
        @click.native.prevent="createPayment"
        >Lưu</el-button
      >
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      address: "",
      fullName: "",
      money: "",
    };
  },
  
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
};
</script>
<style lang="css">
.save-profile {
  display: flex;
  justify-content: center;
}
</style>
