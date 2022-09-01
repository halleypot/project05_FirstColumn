<template>
  <div class="reply">
    <!-- 文章的评论 -->
    <van-cell>
      <template #title>
        <div class="artComment">
          <van-image
            width="30"
            height="30"
            round
            fit="cover"
            :src="currentCom.aut_photo"
          >
          </van-image>
          <div class="currentComment">
            <span class="currentName">{{ currentCom.aut_name }}</span>
            <span>{{ currentCom.content }}</span>
            <span>{{ currentCom.pubdate | timeFormat }}</span>
          </div>
        </div>
      </template>
    </van-cell>
    <!-- 分割线 -->
    <van-divider> 全部回复 </van-divider>
    <!-- 对评论的回复 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="- THE END -"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in replyList" :key="index">
        <template #title>
          <div class="head">
            <van-image
              width="40"
              height="40"
              round
              fit="cover"
              :src="item.aut_photo"
            />
            <div class="reader">
              <span :style="{ color: 'red' }">{{ item.aut_name }}</span>
              <span>{{ item.content }}</span>
              <span>{{ item.pubdate | timeFormat }}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>

    <!-- 发表评论的回复 -->
    <van-field
      v-model="sms"
      center
      clearable
      placeholder="请输入评论"
      class="inpReply"
    >
      <template #button>
        <van-button size="small" type="primary" @click="toReply"
          >回复</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script>
import { getCommentAPI, setCommentAPI } from "@/api";

export default {
  props: ["currentCom"],

  data() {
    return {
      loading: false,
      finished: false,
      replyList: [],
      offset: "",
      end: "",
      sms: "", //回复评论的内容
    };
  },
  methods: {
    async toReply() {
      const res = await setCommentAPI({
        target: this.currentCom.com_id,
        content: this.sms,
        art_id: this.$route.query.art_id,
      });
    //   console.log(res)
      this.replyList.unshift(res.data.data.new_obj)
      this.sms = ''
    //   回复数量加1
    this.currentCom.reply_count +=1

    },
    async onLoad() {
      const res = await getCommentAPI({
        type: "c",
        source: this.currentCom.com_id,
      });
      console.log(res);
      this.replyList.unshift(...res.data.data.results);
      this.offset = res.data.data.last_id;
      this.end = res.data.data.end_id;
      this.loading = false;

      if (this.offset === this.end) {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less">
.reply {
  font-size: 16px;
  height: 200px;
  margin-bottom: 40px;
  //   本条评论
  .artComment {
    display: flex;
    .currentComment {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      span {
        height: 30px;
        line-height: 30px;
      }
      .currentName {
        color: skyblue;
        font-size: 18px;
      }
    }
  }
  // 回复评论
  .head {
    display: flex;
    margin-left: 10px;
    .reader {
      margin-left: 15px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>