<template>
  <div class="search">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.go(-1)" />
    <form >
      <van-search
        v-model="key"
        show-action
        autofocus
        shape="round"
        placeholder="请输入搜索关键词"
        @input="getTips"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </form>

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
      <van-cell v-for="(item, index) in associationList" :key="index" @click="toResult(item)">
        <template #title>
          <span v-html="item" ></span>
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
    toResult(item) {
      console.log(item)
      const reg = new RegExp(`<span style="color:red">${this.key}</span>`, 'ig')
      item = item.replace(reg, this.key)
      
      this.$router.push(`/search/result?key=${item}`)
    },
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
        let reg = new RegExp(this.key, "ig");
        this.associationList = res.data.data.options.map((item) => {
          if (item) {
            return item.replace(
              reg,
              `<span style="color:red">${this.key}</span>`
            );
          }
          return "";
        });
        // this.associationList = res.data.data.options;
      }, 500);
    },

    onSearch() {
      this.history.unshift(this.key);
      // 去重
      this.history = [...new Set(this.history)];
      // 只保留前5个历史记录
      if (this.history.length > 5) this.history.splice(5);

      localStorage.setItem("history", JSON.stringify(this.history));
      // 跳转到搜索结果
      this.$router.push(`/search/result?key=${this.key}`)
      this.key = "";
    },

    clearHistory() {
      this.$dialog
        .confirm({
          title: "警告⚠",
          message: "确认删除？",
        })
        .then(() => {
          this.history = [];
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
</style>

