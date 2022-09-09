<template>
  <div class="user">
    
    <!-- header -->
    <div class="header">
      <van-image
        round
        fit="cover"
        width="100"
        height="100"
        :src="userInfo.photo"
      />
      <div class="text">
        <div class="mobile">{{userInfo.mobile}}</div>
        <span class="birth">{{userInfo.birthday}}</span>
      </div>
    </div>
    <!-- middle navbar -->
    <van-row class="navbar" type="flex" justify="center">
      <van-col span="8"
        ><van-icon name="newspaper-o" size="25px" color="#3296fa" /><span
          >我的作品</span
        ></van-col
      >
      <van-col span="8"
        ><van-icon name="star-o" size="25px" color="red" /><span
          >我的收藏</span
        ></van-col
      >
      <van-col span="8"
        ><van-icon name="clock-o" size="25px" color="orange" /><span
          >历史记录</span
        ></van-col
      >
    </van-row>
    <!-- bottom userInfo -->
    <van-cell-group>
      <van-cell title="编辑资料" icon="edit" is-link to="/user/edit" />
      <van-cell to="/user/chatRobot" title="小智同学" icon="chat-o" is-link />
      <van-cell title="系统设置" icon="setting-o" is-link />
      <van-cell title="退出登录" icon="info-o" is-link @click="logout"/>
    </van-cell-group>

    
  </div>
</template>

<script>

export default {
  data() {
    return {
      // userInfo: "",
    };
  },

  async created() {
    // console.log(this.$store.state.myToken.token)
    // const res = await userInfoAPI()

    // this.userInfo = res.data.data
    // this.$store.commit('updateUserInfo', res.data.data)

     this.$store.dispatch('setUserInfo')
  },

  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },

  methods: {
    // clear token, user's information
    logout() {
      this.$store.commit('logout')
      this.$toast.success('退出成功')
      this.$router.push('/login')
    }
  }
};
</script>

<style lang="less">
.user {
  .header {
    display: flex;
    height: 120px;
    background-color: #3296fa;
    align-items: center;

    .van-image--round img {
      margin: 0 10px;
    }

    .text {
      font-size: 16px;
      margin-left: 10px;
      .mobile {
        font-weight: bolder;
        color: #fff;
        margin-bottom: 5px;
      }
      .birth {
        background-color: #fff;
        color: #3296fa;
        font-size: 12px;
        border-radius: 5px;
        padding: 4px;
      }
    }
  }

  .navbar {
    height: 80px;
    align-items: center;
    .van-col {
      display: flex;
      font-size: 16px;
      flex-direction: column;
      align-items: center;
      text-align: center;
      span {
        margin-top: 5px;
      }
    }
  }
}
</style>