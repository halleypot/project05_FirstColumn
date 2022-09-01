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
          plain 
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
            @click.stop="delChannel(index)"
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
        @click="addChannel(index)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChannelsAPI } from "@/api";

export default {
  props: ["myChannels", "active"],
  data() {
    return {
      allChannels: [],
      isEdit: true,
    };
  },

  methods: {
    delChannel(index) {
      
      this.myChannels.splice(index , 1)
      if(index < this.active ) {
        this.$emit('changeChannel', this.active - 1);
      }
    },

    addChannel(item) {
      this.myChannels.push(item)
    }
  },

  async created() {
    // const res = await getUserChannel();
    // console.log(res);
    // this.myChannels = res.data.data.channels;

    const allChannels = await getChannelsAPI();
    // console.log(allChannels);
    this.allChannels = allChannels.data.data.channels;
  },

  computed: {
    otherChannels() {
      const ids = this.myChannels.map(item => item.id);

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