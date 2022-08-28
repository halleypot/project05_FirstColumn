<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar>
      <!-- 导航左侧Logo -->
      <template #left>
        <van-image
          width="100"
          height="100"
          :src="require('@/assets/logo.png')"
          fit="contain"
        />
      </template>
      <!-- 导航栏右侧按钮 -->
      <template #right>
        <van-button>
          <van-icon name="search" color="#fff" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 频道区域 -->
    <van-tabs>
      <van-tab
        v-for="item in newsChannels"
        :key="item.id"
        :title="item.name"
        @click="setChannelId(item.id)"
      >
        <!-- 新闻列表 -->
        <news-list :channel_id="channel_id" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getAllChannelsAPI } from "@/api";

export default {
  components: {
    newsList: () => import("./components/newsList.vue"),
  },
  data() {
    return {
      newsChannels: [],
      channel_id: "",
    };
  },

  methods: {
    setChannelId(id) {
      console.log(id);
      this.channel_id = id;
    },

    async createChannel() {
      try {
        const res = await getAllChannelsAPI();
        this.newsChannels = res.data.data.channels;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },

  created() {
    this.createChannel();
  },
};
</script>

<style lang="less">
.home {
  button.van-button.van-button--default.van-button--normal {
    height: 27px;
    border-radius: 15px;
    font-size: 8px;
    line-height: 32px;
    background-color: #3196fa;
    color: #fff;
    padding: 0 25px;
  }
  .van-icon-search:before {
    margin-right: 5px;
    font-size: 8px;
  }
}
</style>