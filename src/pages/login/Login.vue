<template>
  <div class="login">
    <button class='button' open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>
  </div>
</template>

<script>
import config from '@/services/config';
import qcloud from 'wafer2-client-sdk';
import { showToast, showLoading } from '@/utils';

export default {
  methods: {
    doLogin() {
      const session = qcloud.Session.get();
      qcloud.setLoginUrl(config.loginUrl);
      showLoading('正在登录');
      if (false) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            wx.setStorageSync('userinfo', res);
            wx.hideLoading();
            wx.switchTab({url: '../me/main'});
          },
          fail: err => {
            wx.hideLoading();
          },
        })
      } else {
          // 首次登录
        qcloud.login({
          success: res => {
            wx.setStorageSync('userinfo', res);
            wx.hideLoading();
            wx.switchTab({url: '../me/main'});
          },
          fail: err => {
            wx.hideLoading();
          },
        })
      }
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

