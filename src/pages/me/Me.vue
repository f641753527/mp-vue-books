<template>
  <div class="me">
    <button class='login_btn' open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">
      <div class="userinfo">
        <img :src="user.avatarUrl">
        <p class="nickname">{{user.nickName}}</p>
      </div>
    </button>
    
    <YearProgeress></YearProgeress>

    <div>
      <button v-if='user.openId' class='scanBook button' @click='scanBook'>添加图书</button>
    </div>

  </div>
</template>

<script>
import * as API from '@/services/request';
import config from '@/services/config';
import qcloud from 'wafer2-client-sdk';
import { showToast, showLoading } from '@/utils';
import YearProgeress from './components/YearProgeress';
export default {
  data() {
    return {
      user: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录'
      },
    };
  },
  methods: {
    doLogin() {
      const user = wx.getStorageSync('userinfo');
      if (user) {
        return;
      }
      const session = qcloud.Session.get();
      qcloud.setLoginUrl(config.loginUrl);
      showLoading('正在登录');
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            wx.setStorageSync('userinfo', res);
            this.user = res;
            wx.hideLoading();
            showToast('登录成功');            
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
            this.user = res;
            wx.hideLoading();
            showToast('登录成功');
          },
          fail: err => {
            wx.hideLoading();
          },
        })
      }
    },
    scanBook() {
      wx.scanCode({
        success: (res) => {
          this.addBook(res.result, this.user.openId);
        }
      })
    },
    async addBook(isbn, openId) {
      const data = {isbn, openId};
      const res = await API.POST('/weapp/addbook', data);
      if (res) {
        showToast('添加图书成功');
      }
    },
  },
  components: { YearProgeress },
  created() {
    const user = wx.getStorageSync('userinfo');
    if (user) {
      this.user = user;
    }
  },
}
</script>

<style lang="scss" scoped>
.me{
  padding: 0 30rpx;
  .login_btn{
    margin: 40rpx 0;
    background: transparent;
    border-width: 0;
    border-radius: 0;
    outline: 0;
    .userinfo{
      text-align: center;
      img{
        margin: 10rpx;
        width: 260rpx;
        height: 260rpx;
        border-radius: 50%;
        vertical-align: top;
      }
      .nickname{
        font-size: 30rpx;
        color: rgb(147, 153, 159);
      }
    }
  }
  
}
</style>

