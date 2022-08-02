<template lang="html">
  <div>
    <p class="font-bold text-[1.5em]">{{ news.title }}</p>
    <p class="mb-[1em] italic text-sm">Admin - 25/11/2022</p>
    <div>
      <el-image class="w-full mb-4" :src="news.image" lazy fit="cover" v-if="news.image"> </el-image>
    </div>
    <p class="news" v-html="news.content"></p>
  </div>
</template>
<script>
import { getNewsById } from '@/api/news'
export default {
  name: 'NewDetail',
  data() {
    return {
      news: {},
      loading: true
    }
  },
  async created() {
    await this.getNewsDetail()
  },

  methods: {
    async getNewsDetail() {
      try {
        const res = await getNewsById(this.$route.params.id)
        this.news = res.data.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss">
.news img {
  // width: 100%;
  margin: 0 auto;
}
</style>
