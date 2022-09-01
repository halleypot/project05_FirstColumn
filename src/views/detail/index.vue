<template>
  <div class="detail">
    <van-nav-bar title="文章详情" left-arrow />
    <div class="article">
      <h3>{{ articleInfo.title }}</h3>
      <div class="author">
        <van-image
          round
          width="70"
          height="70"
          fit="cover"
          :src="articleInfo.aut_photo"
        />
        <span class="posterNtime">
          <div>{{ articleInfo.aut_name }}</div>
          <div>{{ articleInfo.pubdate | timeFormat }}</div>
        </span>
        <van-button round type="info" v-if="articleInfo.is_followed"
          >已关注</van-button
        >
        <van-button round type="info" v-else>关注</van-button>
      </div>
      <!-- 内容详情 -->
      <div class="content" v-html="articleInfo.content"></div>
      <van-divider>end</van-divider>

      <div class="thumbup">
        <van-button
          plain
          hairline
          round
          icon="good-job-o"
          type="primary"
          v-if="articleInfo.attitude === 1"
          >点赞</van-button
        >
        <van-button plain hairline round icon="good-job-o" v-else
          >点赞</van-button
        >
        <van-button
          plain
          hairline
          round
          icon="delete-o"
          type="danger"
          v-if="articleInfo.attitude === 0"
          >不喜欢</van-button
        >
        <van-button plain hairline round icon="delete-o" type="danger" v-else
          >不喜欢</van-button
        >
      </div>
    </div>
    <!-- 评论内容 -->
    <comment :art_id="art_id"> </comment>
  </div>
</template>

<script>
import { getArticleDetailAPI } from "@/api";

export default {
  components: {
    comment: () => import("@/views/detail/component/comment.vue"),
  },
  data() {
    return {
      art_id: this.$route.query.article_id,
      articleInfo: {},
    };
  },
  methods: {},

  created() {
    getArticleDetailAPI(this.art_id).then((res) => {
      // console.log(res);
      this.articleInfo = res.data.data;
    });
  },
};
</script>

<style lang="less">
.detail {
  .article {
    padding: 0 10px;

    h3 {
      margin: 15px 0;
      line-height: 22px;
      font-size: 20px;
    }
    .author {
      display: flex;
      align-items: center;
      margin: 15px 0;
      font-size: 16px;
      .posterNtime {
        margin-left: 10px;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
    .content {
      font-size: 16px;

      white-space: pre-wrap;
      word-break: break-all;
      pre {
        white-space: pre-wrap;
        word-break: break-all;
      }
    }
    .thumbup {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0;
      .van-button--plain.van-button--primary {
        margin: 0 20px;
      }
    }
  }
}
</style>