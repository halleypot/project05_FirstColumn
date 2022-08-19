<template>
  <div class="layout">
    <router-view> </router-view>
    <!-- tab navbar -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to='/layout/home' name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to='/layout/ask' name="ask" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to='/layout/video' name="video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to='/layout/user' name="user" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    data() {
        return {
            active: 'user',
        };
    },
}
</script>

<style lang="less">
</style>