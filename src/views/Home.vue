<template lang="html">
  <div>
    <div class="mb-[1em]"></div>

    <p class="font-bold text-[1.25rem] py-[1em]">Tìm kiếm sân ngay</p>
    <div class="form-search p-[2em] flex items-center w-full mb-[2em] rounded-lg border border-[#ededed]">
      <!-- Search form -->
      <el-form class="w-full">
        <el-row :gutter="12">
          <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5" class="mb-[1em]">
            <el-form-item>
              <el-select
                placeholder="Chọn Tỉnh/Thành phố"
                class="w-full"
                v-model="filters.cityCode"
                @change="onCityChange"
                ref="city"
                clearable
              >
                <el-option
                  v-for="(city, i) in cities"
                  :key="'city' + i"
                  :value="city.code"
                  :label="city.name_with_type"
                  >{{ city.name_with_type }}</el-option
                >
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5" class="mb-[1em]">
            <el-form-item>
              <el-select
                placeholder="Chọn Quận/Huyện"
                class="w-full"
                v-model="filters.districtCode"
                :disabled="!filters.cityCode"
                ref="district"
                clearable
              >
                <el-option
                  v-for="(item, i) in districts"
                  :key="'district' + i"
                  :value="item.code"
                  :label="item.name_with_type"
                  >{{ item.name_with_type }}</el-option
                >
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="mb-[1em]">
            <el-form-item>
              <el-select placeholder="Chọn Sân" class="w-full" v-model="filters.typePlace">
                <el-option v-for="(item, i) in types" :key="'type' + i" :value="item.id" :label="item.name">{{
                  item.name
                }}</el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7" class="mb-[1em]" v-model="filters.stadium_name">
            <el-form-item>
              <el-input placeholder="Nhập vào tên sân" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3" class="mb-[1em]">
            <el-button type="success" class="w-full" @click="search">Tìm kiếm</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div v-if="!isSearch">
      <section v-for="(item, i) in places" :key="'type' + i">
        <div v-if="item.place.length">
          <p class="card-header">{{ item.name }}</p>
          <el-row :gutter="24" class="mb-[2em] flex-wrap" type="flex">
            <el-col
              :xs="12"
              :md="12"
              :sm="12"
              :lg="6"
              :xl="6"
              v-for="(place, i) in item.place"
              :key="'stadium' + i"
              class="mb-[1em]"
            >
              <v-card :init-data="place" class="h-full" />
            </el-col>
          </el-row>
        </div>
      </section>
    </div>

    <div v-else-if="searchResults.length">
      <el-row :gutter="24" class="mb-[2em] flex-wrap" type="flex">
        <el-col
          :xs="12"
          :md="12"
          :sm="12"
          :lg="6"
          :xl="6"
          v-for="(place, i) in searchResults"
          :key="'stadium' + i"
          class="mb-[1em]"
        >
          <v-card :init-data="place" />
        </el-col>
      </el-row>
    </div>

    <el-empty v-else description="Không có kết quả "></el-empty>
  </div>
</template>
<script>
import { getPlace } from '@/api/place'
import { getAddress, search } from '@/api/address'
export default {
  name: 'HomeView',
  async created() {
    try {
      await Promise.all([this.getCities(), this.initData()])
    } catch (e) {
      this.$vmess.error('Đã có lỗi xảy ra xin vui lòng thử  lại sau')
    }
  },

  data() {
    return {
      filters: {
        cityCode: null,
        districtCode: null,
        typePlace: null,
        stadium_name: null
      },
      isSearch: false,
      places: [],
      searchResults: [],
      types: [],
      cities: [],
      districts: []
    }
  },

  methods: {
    async initData() {
      const { data } = await getPlace()
      this.places = data.data

      this.types = data.data.map((item) => {
        return {
          id: item.id,
          name: item.name
        }
      })
    },

    async getCities() {
      const { data } = await getAddress()
      this.cities = data
    },

    async onCityChange() {
      try {
        if (!this.filters.cityCode) {
          this.filters.districtCode = null
          return false
        }
        const { data } = await getAddress({ cityCode: this.filters.cityCode })
        this.districts = data
      } catch (e) {
        this.$vmess.error('Đã có lỗi xảy ra xin vui lòng thử  lại sau')
      }
    },

    async search() {
      try {
        this.isSearch = true
        await this.$nextTick()
        let address = ''
        if (this.$refs.city.selectedLabel) {
          address = this.$refs.city.selectedLabel
        }

        if (this.$refs.district.selectedLabel) {
          address += `, ${this.$refs.district.selectedLabel}`
        }
        const { data } = await search({
          page: 1,
          pageSize: 20,
          address: address,
          name: this.filters.stadium_name,
          typePlace: this.filters.typePlace
        })

        this.searchResults = data.data.records
      } catch (e) {
        this.$vmess.error('Đã có lỗi xảy ra xin vui lòng thử  lại sau')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item {
  margin-bottom: 0;
}
</style>
