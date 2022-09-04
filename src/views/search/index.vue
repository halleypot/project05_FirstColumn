<template>
  <div class="search">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.go(-1)" />
    <van-search
      v-model="key"
      show-action
      autofocus
      shape="round"
      placeholder="请输入搜索关键词"
      @input="getTips"
    >
      <template #action>
        <div @click.enter="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- history -->
    <van-cell-group v-if="!key">
      <van-cell title="历史记录">
        <template #default>
          <van-icon name="cross" @click="clearHistory" />
        </template>
      </van-cell>
      <van-cell v-for="(item, index) in history" :key="index" :title="item" />
    </van-cell-group>

    <!-- association search -->
    <van-cell-group v-else>
      <van-cell title="搜索提示" />
      <van-cell v-for="(item, index) in associationList" :key="index">
        <template #title>
          <span v-html="item.title"></span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { searchSuggestionAPI } from "@/api";
export default {
  data() {
    return {
      key: "",
      associationList: [],
      timerId: null,
      history: JSON.parse(localStorage.getItem("history")) || [],
    };
  },

  methods: {
    getTips() {
      // 防抖
      clearTimeout(this.timerId);
      // 如果没有搜索内容，则退出事件
      if (!this.key.trim()) return;

      this.timerId = setTimeout(async () => {
        const res = await searchSuggestionAPI({
          q: this.key,
        });
        console.log(res);

        // 高亮搜索关键字
        // this.associationList = res.data.data.results.map( item => {
        //   return item.title.replace(`A`, `<span style="color:red">a</span>`)
        // })
        this.associationList = res.data.data.results;
      }, 500);
    },

    onSearch() {
      console.log(this.key);
      this.history.unshift(this.key);
      // 去重 &只保留前5个历史记录
      this.history = [...new Set(this.history)];

      if (this.history.length > 5) this.history.splice(5);

      localStorage.setItem("history", JSON.stringify(this.history));
      this.key = "";
    },

    clearHistory() {
      this.$dialog.confirm({
        title: "警告⚠",
        message: "确认删除？",
      })
        .then(() => {
          this.history = []
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
.search {
}
</style>>

</style>