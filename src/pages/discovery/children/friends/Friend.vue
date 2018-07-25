<template>
  <div class="friend">
    <NavigationBar :title='title' :backTitle='backTitle' rightIconClass="icon-xiangji"/>

    <div class="wrap">
      <div class="top_bg_wrap">
        <img class='top_bg' :src="user.avatarUrl" mode='aspectFill'>
        <img :src="user.avatarUrl" class="avatar">
        <p class="nickName">{{user.nickName}}</p>
        <i class="icon iconfont icon-xiangji" @click='callCamare'></i>
      </div>

      <div class="talks">
        <Talk v-for="(talk, index) in talkList" :talk='talk' :key='index'/>
      </div>
    </div>
    
  </div>
</template>

<script>
import * as API from '@/services/request';
import NavigationBar from '@/components/NavigationBar';
import Talk from './components/Talk';
import upng from 'upng';

export default {
  data() {
    return {
      title: '朋友圈',
      backTitle: '发现',
      user: {},
      talkList: [],
    };
  },
  methods: {
    callCamare() {
      wx.chooseImage({
        success: (res) => {
          const tempFiles = res.tempFiles;
          wx.setStorageSync('tempFiles', tempFiles);
          wx.redirectTo({url: '/pages/discovery/children/publish/main'});
        }
      });
    },
    async getTalks() {
      const res = await API.GET('/weapp/talkList');
      if (res) {
        this.talkList = res.list;
      }
    },
  },
  components: { NavigationBar, Talk },
  onReady() {
    this.user = wx.getStorageSync('userinfo') || {};
    this.getTalks();
  },
}
</script>

<style lang="scss" scoped>
page{
  padding-top: 0;
}
.friend{
  .wrap{
    .top_bg_wrap{
      position: relative;
      .top_bg{
        width: 100%;
        height: 512rpx;
        border-bottom: 1px solid #ececec;
      }
      .avatar{
        position: absolute;
        right: 20rpx;
        bottom: -50rpx;
        width: 150rpx;
        height: 150rpx;
        border: 1px solid #ececec;
      }
      .nickName{
        position: absolute;
        right: 190rpx;
        bottom: -40rpx;
        line-height: 48rpx;
        color: #ccc;
        font-size: 16px;
      }
      .icon-xiangji{
        position: absolute;
        left: 30rpx;
        bottom: -50rpx;
        color: #000;
        font-size: 20px;
      }
    }
    .talks{
      padding: 88rpx 0;
    }
  }
}
</style>

