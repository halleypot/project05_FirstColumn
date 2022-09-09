<template>
  <div class="chatRoom">
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.go(-1)" />
    <!-- 聊天内容 -->
    <div class="chat" ref="chat">
      <div class="item" v-for="(item, index) in chatList" :key="index">
        <van-image
          width="40"
          height="40"
          round
          fit="cover"
          src="https://p4.itc.cn/images01/20200724/ad2a7743169b49d0b4de960be179414b.png"
          class="img"
          :class="{ right: item.isMe }"
        />
        <div class="message" :class="{ right: item.isMe }">
          {{ item.text }}
        </div>
      </div>
    </div>
    <!-- publish area -->
    <form action="/" class="form">
      <van-search
        v-model="msg"
        show-action
        placeholder="说点什么~"
        @search="onSearch"
        shape="round"
        left-icon=""
        autofocus
      >
        <template #action>
          <div @click="onSearch">Send</div>
        </template>
      </van-search>
    </form>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      msg: "",
      chatList: [
        { text: "hello sweet !", isMe: false },
        { text: "nice to see you!", isMe: true },
      ],
      socket: null,
    };
  },

  methods: {
    onSearch() {
      if (this.msg) {
        // 发消息到服务器 emit
        this.socket.emit("message", {
          msg: this.msg,
          timestamp: Date.now(),
        });

        this.chatList.push({
          text: this.msg,
          isMe: true,
        });
      }
      // 当页面渲染后，再滚动到当前对话
      this.$nextTick(() => {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
      });

      this.msg = "";
    },
  },

  created() {
    this.socket = io("http://toutiao.itheima.net", {
      query: {
        token: this.$store.state.myToken.token,
      },
      transports: ["websocket"],
    });

    // 接收信息
    this.socket.on("message", (data) => {
      // console.log(data);
      this.chatList.push({
        text: data.msg,
        isMe: false,
        timestamp: data.timestamp,
      });
      // 自动滚动到底部
      this.$nextTick(() => {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
      });

    });
  },
};
</script>

<style lang='less'>
.chatRoom {
  .chat {
    position: fixed;
    top: 46px;
    bottom: 54px;
    left: 0;
    right: 0;
    background-color: #eee;
    overflow: auto;
    padding: 5px 0;

    .item {
      // height: 40px;
      overflow: hidden;
      font-size: 14px;
      margin: 10px 0;
      .img {
        float: left;
        margin: 0 10px;
        &.right {
          float: right;
        }
      }
      .message {
        float: left;
        padding: 10px 5px;
        max-width: 65%;
        border: 1px solid #3196fa;
        background-color: #e0effb;
        &.right {
          float: right;
          border: 1px solid #c5e2d4;
          background-color: #9eea6a;
        }
      }
    }
  }
  .form {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>