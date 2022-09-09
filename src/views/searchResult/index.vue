<template>
  <div class="result">
    <van-nav-bar title="搜索结果"  left-arrow @click-left="$router.go(-1)" />
    <!-- 搜索结果显示 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in resultList"
        :key="index"
        :title="item.title"
        @click="$router.push(`home/detail?id=${item.art_id}`)"
      />
    </van-list>
  </div>
</template>

<script>
import { searchAPI } from "@/api";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      resultList: [],
    };
  },

  methods: {
    async onLoad() {
      const res = await searchAPI({
        page: this.page,
        per_page: this.per_page,
        q: this.$route.query.key,
      });
      // console.log(res);
      this.resultList.push(...res.data.data.results) ;
      this.loading = false

      const total = res.data.data.total_count
      if (this.resultList.length >= total) this.finished = true
    },
  },

 async created() {},
};
</script>

<style lang="less">
.result {
}
</style>