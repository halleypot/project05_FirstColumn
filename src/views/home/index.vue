<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar>
      <!-- 导航左侧Logo -->
      <template #left>
        <van-image
          width="100"
          :src="require('@/assets/logo.png')"
          fit="contain"
        />
      </template>
      <!-- 导航栏右侧按钮 -->
      <template #right>
        <van-button @click="$router.push('/home/search')">
          <van-icon name="search" color="#fff" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 频道区域 -->
    <van-tabs class="channelBar" v-model="active">
      <van-tab
        v-for="item in myChannels"
        :key="item.id"
        :title="item.name"
        @click="setChannelId(item.id)"
      >
        <!-- 新闻列表 -->
        <news-list :channel_id="channel_id" />
      </van-tab>
      <!-- 频道列表弹出按钮 -->
      <van-icon
        name="wap-nav"
        class="sidebar"
        @click="channelShow = !channelShow"
      />
    </van-tabs>

    <!-- 频道面板 -->
    <van-action-sheet v-model="channelShow" title="频道管理">
      <channel
        :myChannels="myChannels"
        @changeChannel="
          (index) => {
            active = index;
            channelShow = false;
          }
        "
        :active="active"
        
      />
    </van-action-sheet>
  </div>
</template>

<script>
import { getUserChannelAPI } from "@/api";
import { getChannel } from '@/utils/myChannel';

export default {
  components: {
    newsList: () => import("./components/newsList.vue"),
    channel: () => import("./components/channel.vue"),
  },
  data() {
    return {
      myChannels: [],
      channel_id: "",
      channelShow: false,
      active: 0,
    };
  },

  methods: {
    
    setChannelId(id) {
      console.log(id);
      this.channel_id = id;
    },

    async createChannel() {
      try {
        const res = await getUserChannelAPI();
        this.myChannels = res.data.data.channels;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },

  created() {
    const memory = getChannel()
    const token = this.$store.state.myToken.token

    if (token || !memory) this.createChannel()

    else this.myChannels = memory
    
  },
};
</script>

<style lang="less">
.home {
  .channelBar {
    position: relative;
    padding-right: 30px;
    .sidebar {
      position: absolute;
      right: 5px;
      top: 0;
      height: 44px;
      line-height: 44px;
      font-size: 20px;
    }
  }
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