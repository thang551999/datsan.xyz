<template lang="html">
  <footer>
    <div class="w-full">
      <el-row>
        <el-col :span="8">
          <h3>Liên hệ</h3>
          <ul>
            <li><i class="el-icon-location"></i><span>Số 5A Trung Hòa, Thanh Xuân, Cầu Giấy</span></li>
            <li><i class="el-icon-phone-outline"></i><a href="tel:033869333">033 869 333</a></li>
          </ul>
        </el-col>
        <el-col :span="8">
          <h3>Chính sách bảo mật</h3>
          <ul>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Điều khoản sử dụng</a></li>
            <li><a href="#">Tuyển dụng</a></li>
          </ul>
        </el-col>
        <el-col :span="8">
          <h3>Kết nối với chúng tôi</h3>
          <div class="flex">
            <a href="#" class="mr-2"> <img src="@/icons/fb.svg" /></a>
            <a href="#" class="mr-2"> <img src="@/icons/zalo.svg" /></a>
            <a href="#" class="mr-2"> <img src="@/icons/youtube.svg" /></a>
          </div>
        </el-col>
      </el-row>
    </div>
    <p class="text-center bg-[#1f2d4f] text-[white] w-full py-[1em]">Thế giới thế thao © 2022</p>
  </footer>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
i {
  margin-right: 4px;
}

li {
  margin-bottom: 8px;
}
footer {
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  margin-top: 28px;
}

footer > div {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 2em 1.25rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
}
</style>
