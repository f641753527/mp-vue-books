<template>
  <div class="bookinfo">
    <div class="thumb">
      <img class='back' :src="info.image" mode='aspectFill'>
      <img :src="info.image" class="upper" mode='aspectFit'>
      <div class="info">
        <p class="title">{{info.title}}</p>
        <p class="author">{{info.authors}}</p>
      </div>
    </div>
    1231244
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.bookinfo{
  .thumb{
    position: relative;
    width: 100%;
    height: 500rpx;
    overflow: hidden;
    .back{
      width: 100%;
      height: 100%;
      filter: blur(15px);
    }
    .upper{
      position: absolute;
      height: 300rpx;
      width: 100%;
      top: 30rpx;
      left: 0;
    }
    .info{
      position: absolute;
      top: 330rpx;
      left: 0;;
      width: 100%;
      text-align: center;
      color: #fff;
      .title{
        line-height: 96rpx;
        font-size: 40rpx;
      }
      .author{
        line-height: 36rpx;
        font-size: 14px;
      }
    }
  }
}
</style>
