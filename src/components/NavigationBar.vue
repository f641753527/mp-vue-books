<template>
  <div class="navigationBar">
    <div class="signal"></div>
    <div class="container">
      <i class="icon iconfont icon-left left" v-show='pages.length > 1 && showBackIcon' @click='back'></i>
      <span class='text left' @click='back'>{{backTitle}}</span>
      <span class='text center'>{{title}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      pages: [],
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    backTitle: {
      type: String,
      default: '',
    },
    showBackIcon: {
      type: Boolean,
      default: true,
    },
    customBack: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    back() {
      if (this.customBack) {
        this.$emit('customback');
      } else {
        wx.navigateBack({delta: 1});
      }
    },
  },
  onShow() {
    this.pages = getCurrentPages();
  },
  onLoad() {
    this.pages = getCurrentPages();
  },
}
</script>

<style lang='scss' scoped>
.navigationBar{
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  height: 120rpx;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 16px;
  .signal{
    height: 30rpx;
  }
  .container{
    height: 90rpx;
    line-height: 90rpx;
    position: relative;
    padding-left: 20rpx;
    .left{
      float: left;
      &.text{
        font-size: 12px;
      }
    }
    .iconfont{
      padding: 0 20rpx;
    }
    .center{
      height: 90rpx;
      position: absolute;
      left: 50%;
      bottom: 50%;
      transform: translate(-50%, 50%);
    }
  }
}
</style>
