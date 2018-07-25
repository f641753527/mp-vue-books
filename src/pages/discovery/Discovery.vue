<template>
  <div class="test">
    <NavigationBar :title='title'/>
    <ul class="list">
      <li class='item' v-for='(item, index) in list' :key='index' @click='detail(item)'>
        <img :src="item.icon" mode='aspectFill' class='img'>
        <span class='text'>{{item.text}}</span>
        <i class="icon iconfont icon-right"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar';
import { showModal } from '@/utils'

export default {
  data() {
    return {
      title: '发现',
      index: 0,
      list: [
        {
          index: 0,
          icon: '/static/img/actions.png',
          path: '/pages/discovery/children/friends/main',
          text: '朋友圈',
        },
        {
          index: 1,
          icon: '/static/img/scan.png',
          path: '/pages/login/main',
          text: '扫一扫',
        },
        {
          index: 2,
          icon: '/static/img/shake.png',
          path: '/pages/login/main',
          text: '摇一摇',
        },
        {
          index: 3,
          icon: '/static/img/look.png',
          path: '/pages/login/main',
          text: '看一看',
        },
        {
          index: 4,
          icon: '/static/img/search.png',
          path: '/pages/login/main',
          text: '搜一搜',
        },
        {
          index: 5,
          icon: '/static/img/near.png',
          path: '/pages/login/main',
          text: '附近的人',
        },
        {
          index: 6,
          icon: '/static/img/bottle.png',
          path: '/pages/login/main',
          text: '漂流瓶',
        },
        {
          index: 7,
          icon: '/static/img/shop.png',
          path: '/pages/login/main',
          text: '购物',
        },
        {
          index: 8,
          icon: '/static/img/game.png',
          path: '/pages/login/main',
          text: '游戏',
        },
        {
          index: 9,
          icon: '/static/img/mini.png',
          path: '/pages/login/main',
          text: '小程序',
        },
      ],
    };
  },
  methods: {
    detail(item) {
      if (!wx.getStorageSync('userinfo')) {
        showModal('失败', '请先登录');
        return;
      }
      wx.navigateTo({url: item.path});
    },
  },
  components: { NavigationBar },
}
</script>

<style lang="scss" scoped>
.test{
  background: #eceff8;
  .list{
    padding: 40rpx 0;
    .item{
      padding: 0 20rpx;
      border-top: 1px solid #ececec;
      border-bottom: 1px solid #ececec;
      line-height: 96rpx;
      background: #fff;
      &:nth-of-type(2n-1){
        margin-bottom: 30rpx;
      }
      &:nth-of-type(2n){
        border-bottom: 0 solid #ececec;
      }
      .img{
        margin-right: 40rpx;
        width: 64rpx;
        height: 64rpx;
        display: inline-block;
        vertical-align: middle;
        outline: none;
      }
      .text{
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
        color: #232323;
      }
      .iconfont{
        float: right;
        color: #c8c8ca;
        font-size: 12px;
      }
    }
  }
}
</style>

