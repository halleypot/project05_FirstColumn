<template>
  <div class="newsList">
    <!-- 新闻列表 -->
    <van-pull-refresh
      v-model="refreshing"
      success-text="刷新成功"
      @refresh="onRefresh"
      pulling-text
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
          @click="$router.push( { path: '/home/detail' , query:{article_id: item.art_id} })"
        >
          <!-- 图片区域 -->
          <template #label>
            <van-grid
              :border="false"
              :column-num="3"
              v-if="item.cover.type > 0"
            >
              <van-grid-item
                v-for="(img, index) in item.cover.images"
                :key="index"
              >
                <van-image :src="img" width="90" height="90" fit="cover" />
              </van-grid-item>
            </van-grid>
            <!-- 文章详情 -->
            <div class="detail">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }}评论</span>
              <span class="myTime">{{ item.pubdate | timeFormat }}</span>
              <van-icon name="cross" size="10" />
            </div>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from "@/api";

export default {
  props: ["channel_id"],

  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      timestamp: Date.now(),
      refreshing: false
    };
  },

  methods: {
    async onLoad() {
      if(this.refreshing) {
        this.list = []
        this.timestamp = Date.now()
        setTimeout(() => {
          this.refreshing = false 
        }, 2000);
      }
      const res = await getArticlesAPI({

        channel_id: this.channel_id,
        timestamp: this.timestamp,
      });

      this.list.push(...res.data.data.results);
      this.timestamp = res.data.data.pre_timestamp;
      // loading完毕
      this.loading = false;
      if (this.timestamp === null) {
        this.finished = ture;
      }
    },

    onRefresh() {
      // 清空数据列表
      this.finished = false 

      this.loading = true 
      this.onLoad()
    },
  },
};
</script>

<style lang="less">
.newsList {
  position: fixed;
  width: 100%;
  top: 90px;
  left: 0;
  bottom: 50px;
  overflow: auto;
  .detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      margin-right: 10px;
    }
    .myTime {
      flex: 1;
      padding-left: 15px;
    }
  }
}
</style>