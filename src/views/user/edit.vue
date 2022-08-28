<template>
  <div class="edit">
    <van-nav-bar title="编辑资料" left-arrow @click-left="onClickLeft" />
    <div class="avatar">
      <van-image
        round
        fit="cover"
        width="120"
        height="120"
        :src="userInfo.photo"
      />
      <!-- 4.头像修改 -->
      <van-uploader class="myuploader" :after-read="afterRead" />
    </div>
    <!-- 个人信息：名称，性别，生日 修改 -->
    <van-cell
      title="名称"
      :value="userInfo.name"
      is-link
      @click="openName(userInfo.name)"
    />
    <van-cell
      title="性别"
      :value="userInfo.gender ? '女' : '男'"
      is-link
      @click="genderShow = true"
    />
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      is-link
      @click="openBirth(userInfo.birthday)"
    />

    <!-- 名称弹出层 -->
    <van-dialog
      v-model="nameShow"
      title="修改名称"
      show-cancel-button
      @confirm="confirmName"
    >
      <van-field v-model="username" ref="nameField" />
      <!-- <div class="btns">
        <van-button type="default" size="small">取消</van-button>
        <van-button type="primary" size="small">确认</van-button>
      </div> -->
    </van-dialog>
    <!-- 性别修改 -->
    <van-popup
      v-model="genderShow"
      position="bottom"
      :style="{ height: '25%' }"
    >
      <van-nav-bar
        title="修改性别"
        left-text="取消"
        @click-left="genderShow = false"
      />
      <van-cell title="男" is-link @click="changeGender('0')" />
      <van-cell title="女" is-link @click="changeGender('1')" />
    </van-popup>
    <!-- 3.生日修改 -->
    <van-popup v-model="birthShow" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="birth"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="changeBirth"
        @cancel="birthShow = false"
      />
    </van-popup>
    <!-- 4.图片修改 -->
    <div class="imgCropper" v-if="cropShow">
      <vueCropper
        ref="cropper"
        :img="img"
        autoCrop
        autoCropWidth="150"
        autoCropHeight="150"
      ></vueCropper>
      <van-button type="primary" class="btnCrop" @click="setImg">
        裁剪
      </van-button>
      <van-button type="default" class="btnCancel"> 取消 </van-button>
    </div>
  </div>
</template>

<script>
import { editProfileAPI, uploadImgAPI } from "@/api";
import moment from "moment";
import { VueCropper } from "vue-cropper";

export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      // userInfo: this.$store.state.userInfo || {},
      nameShow: false,
      username: "",
      genderShow: false,
      birthShow: false,
      minDate: new Date("2000-1-1"),
      maxDate: new Date(),
      birth: new Date(),
      img: "", //已经上传的图片
      cropShow: false,
    };
  },

  methods: {
    afterRead(file) {
      // console.log(file);
      this.cropShow = true;
      this.img = file.content;
    },
    // 得到裁剪后的图片
    setImg() {
      this.$refs.cropper.getCropBlob(async (data) => {
        console.log(data);
        const fd = new FormData()
        fd.append("photo", data)
        const res = await uploadImgAPI(fd)
        console.log(res);
        const photo = res.data.data.photo

        this.$store.commit('updateUserInfo', {
          ...this.userInfo,
          photo
        })
        this.cropShow = false
      });
    },

    onClickLeft() {
      this.$router.push("/layout/user");
    },

    openName(myName) {
      this.nameShow = true;
      this.username = myName;

      // this.$nextTick(() => {
      //   this.$refs.nameField.focus();
      // });
      setTimeout(() => {
        this.$refs.nameField.focus();
      }, 500);
    },

    async confirmName() {
      const res = await editProfileAPI({ name: this.username });

      if (res.data.message.toUpperCase() === "OK") {
        this.$toast.success("名称修改成功！");
        this.$store.commit("updateUserInfo", {
          ...this.userInfo,
          name: this.username,
        });
      }
    },

    async changeGender(gender) {
      const res = await editProfileAPI({ gender });

      // console.log(res)
      if (res.data.message.toUpperCase() === "OK") {
        this.$toast.success("性别修改成功");
        this.$store.commit("updateUserInfo", {
          ...this.userInfo,
          gender: gender,
        });
        this.genderShow = false;
      }
    },

    openBirth(birth) {
      this.birthShow = true;
      this.birth = new Date(birth);
    },

    async changeBirth(value) {
      const birth = moment(value).format("YYYY-MM-DD");

      const res = await editProfileAPI({
        birthday: birth,
      });
      // console.log(res)
      if (res.data.message.toUpperCase() === "OK") {
        this.$toast.success("修改成功");
        this.$store.commit("updateUserInfo", {
          ...this.userInfo,
          birthday: birth,
        });
        this.birthShow = false;
      }
    },
  },

  async created() {
    // const res = await userInfoAPI()

    // this.$store.commit('updateUserInfo', res.data.data)

    this.$store.dispatch("setUserInfo");
  },

  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style lang="less">
.edit {
  .van-icon-arrow-left:before {
    color: #fff;
  }
  .avatar {
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .myuploader {
      opacity: 0;
      position: absolute;
      .van-uploader__upload {
        width: 120px;
        height: 120px;
      }
    }
  }
  span.van-nav-bar__text {
    color: #fff;
  }
  .imgCropper {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;

    .btnCrop {
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .btnCancel {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>