<template lang="html">
  <div>
    <header class="header pl-[4em] border-b border-[#e5e5e5] mb-[4em]">
      <p class="italic capitalize text-[2.5rem]">Tin tức</p>
      <p class="text-[#172948] text-[2.5rem] italic font-semibold uppercase">Thế giới thể thao</p>
    </header>

    <section v-if="Object.keys(results).length">
      <div v-for="(news, key, index) in results" :key="index + 'type'">
        <p class="card-header">{{ key }}</p>
        <el-row :gutter="24" class="mb-[2em]">
          <el-col :xs="12" :md="6" :sm="12" :lg="6" :xl="6" class="mb-[1em]" v-for="item in news" :key="item.id">
            <NewsItem :initData="item" />
          </el-col>
        </el-row>
      </div>
    </section>
    <el-empty description="No result" v-else></el-empty>
    <el-pagination
      :key="reloadPagination"
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
  </div>
</template>
<script>
import NewsItem from './NewsItem'
import { getNews } from '@/api/news'

export default {
  name: 'NewList',
  components: { NewsItem },
  async created() {
    await this.getNews()
  },
  data() {
    return {
      loading: false,
      isOpen: false,
      total: 1,
      page: 1,
      limit: 20,
      reloadPagination: 1,
      results: []
    }
  },
  watch: {
    page(val) {
      this.page = val
      this.reloadPagination += 1
    }
  },
  methods: {
    async changePage(page) {
      this.page = page
      await this.getNews()
    },
    async getNews() {
      try {
        const res = await getNews({
          page: this.page,
          pageSize: this.limit
        })
        this.results = res.data.data.records.reduce((preData, item) => {
          preData[item.typeArticle.title] = preData[item.typeArticle.title] || []
          preData[item.typeArticle.title].push({
            id: item.id,
            image: item.image,
            title: item.title,
            type: item.typeArticle.title
          })
          return preData
        }, {})

        this.total = res.data.data.total
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss">
.header {
  position: relative;
}

.header::before {
  position: absolute;
  top: 45%;
  left: 1.1rem;
  width: 0.6rem;
  height: 7rem;
  background-color: #172948;
  content: '';
  -webkit-transform: translateY(-50%) skew(-15deg);
  transform: translateY(-50%) skew(-15deg);
}
</style>
