<template>
  <div>
    <van-nav-bar title="登录" />
    <!-- form -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        label="Mobile"
        placeholder="please input your mobile"
        :rules="rules.mobile"
      />
      <van-field
        v-model="code"
        type="password"
        name="code"
        label="Code"
        placeholder="input the six-digital code"
        :rules="rules.code"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" :loading="loading" loading-text="..请稍等"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import {loginAPI} from '@/api'

export default {
  data() {
    return {
      mobile: "",
      code: "",
      rules: {
        mobile: [
          { required: true, message: "请填写用户名", trigger: "onBlur" },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "请填写有效的电话号码", trigger: 'onBlur'
          },
        ],
          code: [
            { required: true, message: '请填写密码', trigger: "onBlur" },
            { pattern:/^\d{6}$/, message: '请填写6位验证码', trigger: 'onBlur'}
            ]
      },
      loading: false ,
    };
  },

  methods: {
    onSubmit() {
      this.loading = true,

      loginAPI({
        mobile: this.mobile,
        code: this.code
      })
      .then( res => {
        console.log(res);
        this.$toast.success('login succesfully')
      })
      .catch(err => {
        console.log(err);
        this.$toast.fail('failed to login')
      })
      .finally ( ()=> {
        this.loading = false
      })
    }
  }
};
</script>

<style>
</style>