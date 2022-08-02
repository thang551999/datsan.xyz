<template lang="html">
  <div>
    <header class="header pl-[4em] border-b border-[#e5e5e5] mb-[4em] relative flex items-center py-[4px]">
      <p class="italic capitalize text-[1.5rem] mr-auto">Tìm đối thủ xứng tầm</p>
    </header>
    <main class="content-main-container">
      <div class="bg-[white] rounded-md p-[0.5em] box-shadow-1">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="Tiêu đề " prop="title">
            <el-input v-model="form.title" class="w-100" maxlength="300" show-word-limit placeholder="Tiêu đề" />
          </el-form-item>

          <el-form-item label="Số điện thoại" prop="phone">
            <el-input v-model="form.phone" class="w-100" maxlength="20" show-word-limit placeholder="Tiêu đề" />
          </el-form-item>

          <p class="mb-3">Nội dung bài viết</p>
          <v-editor v-model="form.content" class="mb-[1em]" />

          <div class="mb-1-em">
            <p class="mb-[1em]">Ảnh chi tiết</p>

            <el-upload class="upload-demo" action="https://apis.datsan.xyz/upload/s3" :file-list="fileList" list-type="picture" :auto-upload="false">
              <el-button size="small" type="primary">Click to upload</el-button>
              <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
          </div>
        </el-form>

        <div class="text-right mt-1-em">
          <el-button icon="el-icon-circle-close">Cancel</el-button>
          <el-button type="primary" icon="el-icon-circle-check" @click="onSubmit">Save</el-button>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { createFindOpponent } from '@/api/opponent';
export default {
  data() {
    return {
      fileList: [],
      form: {
        content: '',
        title: '',
        phone: '',
        image: '',
      },
      rules: {
        title: [
          {
            required: true,
            message: 'Vui lòng nhập tiêu đề bài viết',
            trigger: 'blur',
          },
        ],
        phone: [
          {
            required: true,
            message: 'Vui lòng nhập số điện thoại',
            trigger: 'blur',
          },
        ],
      },
    };
  },

  methods: {
    async onSubmit() {
      try {
        await this.$refs.form.validate();
        await createFindOpponent(this.form);
        this.$vmess.success('Tạo bài tìm đối thủ thành công');
        this.$router.push({ name: 'FindOpponent' });
      } catch (e) {
        this.$vmess.error('Đã có lỗi xảy ra xin vui lòng thử lại sau');
      }
    },
    handleUploadSuccess(e) {
      this.form.image = e.data;
    },
  },
};
</script>
<style lang="scss" scoped>
.header::before {
  width: 0.4rem;
  height: 3rem;
  position: absolute;
  top: 45%;
  left: 1.1rem;
  background-color: #172948;
  content: '';
  -webkit-transform: translateY(-50%) skew(-15deg);
  transform: translateY(-50%) skew(-15deg);
}

.card-item {
  border: 1px solid #ededed;
  padding: 0.5em;
  border-radius: 10px;
  margin-bottom: 1em;
  cursor: pointer;

  > p {
    margin-bottom: 0.5rem;
  }
}
.card-item:hover {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.icon-class {
  height: 20px;
  margin-right: 0.25em;
}
</style>
