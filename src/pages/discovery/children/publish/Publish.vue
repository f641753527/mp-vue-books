<template>
  <div class="publish">
    <NavigationBar :backTitle='backTitle' :showBackIcon='false' :customBack='true' @customback='back'/>
    
    <div class="container">
      <textarea class='words' v-model="talk" placeholder="这一刻的想法..."></textarea>
      <div class="imglist">
        <img v-for='(item, index) in tempFiles' :key='index' :src="item.path" class='img'>
      </div>

      <div class="condition">
        <div class="location item" :class='{"mini": address}' @click='getLocation'>
          <i class="icon iconfont icon-16 left"></i>
          <span class='text'>所在位置</span>
          <span class='text mini'>{{address}}</span>
          <i class="icon iconfont icon-right right"></i>
        </div>
        <div class="location item">
          <i class="icon iconfont icon-people left"></i>
          <span class='text'>谁可以看</span>
          <i class="icon iconfont icon-right right"></i>
        </div>
        <div class="location item">
          <i class="icon iconfont icon-tixing left"></i>
          <span class='text'>提醒谁看</span>
          <i class="icon iconfont icon-right right"></i>
        </div>
      </div>

      <button class='publish' @click='pulish'>发表</button>

    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar';
import * as API from '@/services/request';
import { showToast } from '@/utils';

export default {
  data() {
    return {
      backTitle: '取消',
      talk: '',
      tempFiles: [],
      address: '',
      user: {},
    };
  },
  methods: {
    back() {
      wx.redirectTo({url: '/pages/discovery/children/friends/main'});
    },
    getLocation() {
      wx.chooseLocation({
        success: (res) => {
          this.address = res.address;
        }
      });
    },
    async pulish() {
      const openId = this.user.openId;

      const data = {
        openid: this.user.openId,
        talk: this.talk,
        pics: this.tempFiles,
        address: this.address
      };
      const res = await API.POST('/weapp/publishTalk', data);
      console.error(res);
      if (res) {
        showToast('发布成功');
        setTimeout(() => {
          this.back();
        }, 800);
      }
    },
    reset() {
      this.talk = '';
      this.address = '';
      this.tempFiles = [];
    },
  },
  components: { NavigationBar },
  onReady() {
    this.tempFiles = wx.getStorageSync('tempFiles');
    this.user = wx.getStorageSync('userinfo');
  },
  onUnload() {
    this.reset();
  },
}
</script>

<style lang="scss" scoped>
.publish{
  .container{
    padding: 64rpx 64rpx 120rpx 64rpx;
    font-size: 14px;
    .words{
      width: 100%;
      color: #bababa;
      font-size: 16px;
      line-height: 26px;
    }
    .imglist{
      margin-bottom: 70rpx;
      .img{
        width: 198rpx;
        height: 198rpx;
        margin-right: 14rpx;
        &:nth-of-type(3n){
          margin-right: 0;
        }
      }
    }
    .condition{
      .item{
        padding: 0 18rpx;
        display: flex;
        justify-content: space-between;
        line-height: 110rpx;
        border-top: 1px solid #e6e6e6;
        &:nth-last-of-type(1){
          border-bottom: 1px solid #e6e6e6;
        }
        color: #1d1d1d;
        font-size: 18px;
        &.mini{
            color: green;
          }
        .text{
          flex: 1 1 auto;
          font-size: 12px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }

    .publish{
      position: fixed;
      bottom: 10rpx;
      left: 64rpx;
      right: 64rpx;
      background: #29b717;
      color: #fff;
      height: 100rpx;
      line-height: 100rpx;
    }
  }
}
</style>

