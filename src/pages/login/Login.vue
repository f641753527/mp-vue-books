<template>
  <div class="login">
    <button class='button' open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>
  </div>
</template>

<script>
import config from '@/services/config';
import * as API from '@/services/request';
import { showToast, showLoading } from '@/utils';

export default {
  methods: {
    async doLogin() {
      wx.login({
        success(res) {
          console.log(res);
        }
      })
    },
    isLogin(){
      const user = wx.getStorageSync('userinfo');
      if (user) {
        wx.switchTab({url: '../me/main',});
      }
    }
  },
  mounted() {
    this.isLogin()
  },
};
</script>

<style lang='scss' scoped>
.login{
  padding: 30rpx;
  margin-top: 500rpx;
}
</style>

