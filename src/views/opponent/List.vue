<template lang="html">
  <div>
    <header class="header pl-[4em] border-b border-[#e5e5e5] mb-[4em] relative flex items-center py-[4px]">
      <p class="italic capitalize text-[1.5rem] mr-auto">Tìm đối thủ xứng tầm</p>
      <el-button type="success" @click="$router.push({ name: 'AddNewOpponent' })">Tạo mới</el-button>
    </header>
    <main class="content-main-container">
      <el-row :gutter="24" type="flex" class="flex-wrap">
        <el-col :xs="12" :md="12" :sm="12" :lg="12" :xl="12" class="mb-[1em]" v-for="(item, i) in results" :key="i">
          <div class="h-full card-item">
            <p class="text-lg font-bold text-main min-h-[40px]">{{ item.title }}</p>

            <p class="flex-shrink-0 mr-[4px]">Nội dung:</p>
            <p class="ml-1" v-html="item.content"></p>
            <p class="flex items-center card-name">
              <img src="@/icons/phone.svg" alt="" class="icon-class" />
              <span class="ml-1 font-[600]">{{ item.phone }}</span>
            </p>
            <p class="text-sm italic">Đăng bởi: {{ item.user }}</p>
          </div>
        </el-col>
      </el-row>

      <el-pagination
        :hide-on-single-page="true"
        align="center"
        background
        :total="total"
        :page-size="limit"
        :current-page="page"
        layout="prev, pager, next"
        class="py-[1em]"
        @current-change="changePage"
      />
    </main>
  </div>
</template>
<script>
import { findOpponent } from '@/api/opponent'
export default {
  data() {
    return {
      loading: false,
      isOpen: false,
      total: 0,
      page: 1,
      limit: 20,
      reloadPagination: 1,
      results: []
    }
  },
  async created() {
    await this.findOpponent()
  },
  methods: {
    async findOpponent() {
      try {
        const res = await findOpponent({
          page: this.page,
          pageSize: this.limit
        })
        this.results = res.data.data.records.map((item) => {
          return {
            image: item.image,
            user: item?.user?.fullName,
            phone: item.phone,
            title: item.title,
            content: item.content
          }
        })
        this.total = res.data.data.total
      } catch (e) {
        console.log(e)
      }
    },
    async changePage(page) {
      this.page = page
      await this.findOpponent()
    }
  }
}
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
