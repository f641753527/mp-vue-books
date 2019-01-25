<template>
  <div class="me">
    <NavigationBar :title='title'/>
    <div class="wrap">
      <button class='login_btn' open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">
        <div class="userinfo">
          <img :src="user.avatarUrl">
          <p class="nickname">{{user.nickName}}</p>
        </div>
      </button>
    
      <YearProgeress></YearProgeress>

      <div>
        <button v-if='user.gender' class='scanBook button' @click='scanBook'>添加图书</button>
      </div>
    </div>
    

  </div>
</template>

<script>
import * as API from '@/services/request';
import config from '@/services/config';
import { showToast, showLoading } from '@/utils';
import YearProgeress from './components/YearProgeress';
import NavigationBar from '@/components/NavigationBar';

export default {
  data() {
    return {
      title: '个人中心',
      user: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录'
      },
    };
  },
  methods: {
    doLogin() {
      const user = wx.getStorageSync('userinfo');
      const open_id = wx.getStorageSync('open_id');
      if (user) {
        return;
      }
      
      wx.getUserInfo({
        success: (res) => {
          this.user = res.userInfo;
          wx.setStorageSync('userinfo', res.userInfo);
          API.POST('/weapp/update_user', {
            open_id: open_id,
            userinfo: res.userInfo
          });
        }
      })
    },
    scanBook() {
      const open_id = wx.getStorageSync('open_id');
      wx.scanCode({
        success: (res) => {
          this.addBook(res.result, open_id);
        }
      })
    },
    async addBook(isbn, open_id) {
      const data = {isbn, open_id};
      const res = await API.POST('/weapp/addbook', data);
      if (res) {
        showToast('添加图书成功');
      }
    },
  },
  components: { YearProgeress, NavigationBar },
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
  .wrap{
    padding: 0 30rpx;
  }
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

