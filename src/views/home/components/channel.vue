<template>
  <div class="channel">
    <van-cell>
      <template #title>
        <span>我的频道</span>
        <van-button
          plain
          type="danger"
          class="btnEdit"
          size="mini"
          @click="isEdit = !isEdit"
          >{{ isEdit ? "编辑" : "取消" }}</van-button
        >
      </template>
    </van-cell>
    <!-- 频道宫格 -->
    <van-grid :column-num="4">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="index"
        @click="$emit('changeChannel', index)"
      >
        <template #text>
          <!-- 高亮选中频道 -->
          <span :class="{ fontRed: active === index }">{{ item.name }}</span>
          <!-- 删除频道的图标 x-->
          <van-icon
            name="cross"
            class="crossIcon"
            v-if="!isEdit && index"
            @click.stop="delMyChannel(index, item.id)"
          />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 可选频道 -->
    <van-cell title="可选频道" class="optionalChannel" />

    <van-grid :column-num="4">
      <van-grid-item
        v-for="(item, index) in otherChannels"
        :key="index"
        :text="item.name"
        @click="addMyChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChannelsAPI, addChannelAPI, delChannelAPI } from "@/api";
import { setChannel } from "@/utils/myChannel";

export default {
  props: ["myChannels", "active"],

  data() {
    return {
      allChannels: [],
      isEdit: true,
      token: this.$store.state.myToken.token || {},
    };
  },

  methods: {
    // 删除频道
    delMyChannel(index, id) {
      this.myChannels.splice(index, 1);
          if (index < this.active) {
            this.$emit("changeChannel", this.active - 1);
          }

          // 判断是否携带token
          if (this.token) {
            delChannelAPI(id);
          } else 
            setChannel(this.myChannels);

          this.$toast.success("删除成功哟")

    },
    // 新增频道
    addMyChannel(item) {
      this.myChannels.push(item);

      // const token = this.$store.state.myToken.token;

      // 保存到本地
      if (!this.token) setChannel(this.myChannels);
      // 保存内容到服务器
      else {
        addChannelAPI({
          channels: [{ id: item.id, seq: this.myChannels.length + 1 }],
        });
      }
      this.$toast.success("添加频道成功！");
    },
  },

  async created() {
    const res = await getChannelsAPI();

    this.allChannels = res.data.data.channels;
  },

  computed: {
    otherChannels() {
      const ids = this.myChannels.map((item) => item.id);

      return this.allChannels.filter((item) => {
        return !ids.includes(item.id);
      });
    },
  },
};
</script>

<style lang="less">
* {
  font-size: 14px;
}
.channel {
  .fontRed {
    color: red;
  }
  .btnEdit {
    float: right;
    width: 50px;
  }
  .crossIcon {
    position: absolute;
    top: 2px;
    right: 6px;
  }

  // 可选频道
  .optionalChannel {
    margin-top: 15px;
  }
}
</style>