<template>
  <div class="comment">
    <!-- comment main area -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in commentList" :key="index">
        <!-- 评论人图片 -->
        <template #title>
          <div class="readerComment">
            <van-image
              width="40"
              height="40"
              :src="item.aut_photo"
              round
              fit="cover"
            />
            <!-- 评论人，内容，时间 -->
            <div class="reader">
              <div class="readerName">{{ item.aut_name }}</div>
              <div class="opinion">{{ item.content }}</div>
              <div class="other">
                {{ item.pubdate | timeFormat }}
                <!-- reply button -->
                <van-button size="mini" round class="btnReply" @click="toReply(item)"
                  >回复`({{ item.reply_count }})`
                </van-button>
              </div>
            </div>
          </div>
        </template>

        <!-- 右侧图标 -->
        <template #right-icon>
          <van-icon name="like-o" />
        </template>
      </van-cell>
    </van-list>

    <!-- input comments area -->
    <van-field
      v-model="content"
      placeholder="please input your comments"
      ref="iptComment"
    >
      <template #button>
        <van-button size="small" type="info" @click="publish">发布</van-button>
      </template>
    </van-field>

    <!-- 回复评论 -->
    <van-action-sheet v-model="openReply" title="发表回复" >
      <reply :currentCom="currentCom" v-if="openReply"> </reply>
    </van-action-sheet>
  </div>
</template>

<script>
import { getCommentAPI, setCommentAPI } from "@/api";

export default {
  props: ["art_id"],

  components: {
    reply: () => import('./reply.vue')
  },

  data() {
    return {
      content: "",
      loading: false,
      finished: false,
      //   评论获取起始地点
      offset: "",
      //   评论结束
      end: "",
      //   评论内容
      commentList: [],
      openReply: false,  //打开回复面板
      currentCom: '',
    };
  },

  methods: {
    // 回复评论
    toReply(value) {
      this.currentCom = value
      this.openReply = true
    },
    // 发布文章评论
    async publish() {
      // 发表文章评论
      const res = await setCommentAPI({
        target: this.art_id,
        content: this.content,
      });

      //   console.log(res);
      this.$toast.success("评论成功！");
      this.commentList.unshift(res.data.data.new_obj);
      this.content = "";
      
    },

    async onLoad() {
      // 获取评论响应数据
      const res = await getCommentAPI({
        type: "a",
        source: this.art_id,
        offset: "",
      });
      // console.log(res);
      this.commentList.push(...res.data.data.results);
      // 标记下次评论获取起点
      this.offset = res.data.data.last_id;
      // 获取评论结束标识
      this.end = res.data.data.end_id;
      
      // 加载完毕
      this.loading = false;
      if (this.offset === this.end) {
        this.finished = true;
      }
    },
  },

  async created() {
    setTimeout(() => {
      this.$refs.iptComment.focus();
    }, 500);
  },
};
</script>

<style lang="less">
.comment {
  .readerComment {
    display: flex;
    align-items: center;

    .reader {
      margin-left: 15px;
      .btnReply {
        margin-left: 10px;
      }
    }
  }
  .van-cell.van-field {
    position: fixed;
    bottom: 0;
    left: 0;
    padding-right: 2px;
  }
}
</style>