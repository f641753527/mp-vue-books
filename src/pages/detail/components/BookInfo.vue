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

    <!-- 图书信息 -->
    <div class="detail">
      <img :src="user.avatarUrl" class='avatar'>{{user.nickName}}
      <div class="right">
        <Rate :rate='info.rate'></Rate>
      </div>
    </div>

    <div class="detail">
      {{info.publisher}}
      <div class="right">{{info.price}}</div>
    </div>

    <div class="tags">
      <div class="badge" v-for='tag in info.tags' :key='tag'>{{tag}}</div>
    </div>

    <div class="summary">
      <p class="text" v-for='line in info.summary' :key='line'>{{line}}</p>
    </div>

  </div>
</template>

<script>
import Rate from '../../books/components/Rate';

export default {
  props: {
    info: {
      type: Object,
    },
  },
  computed: {
    user() {
      return this.info.userinfo || {};
    },
  },
  components: { Rate },
};
</script>

<style lang="scss" scoped>
@import '~@scss';
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

  .right{
    float: right;
  }

  .detail{
    padding: 5px 10px;
    font-size: 14px;
    color: $color-text;
    .avatar{
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      vertical-align: middle;
    }
  }

  .tags{
    // padding: 20rpx 40rpx;
    .badge{
      display: inline-block;
      padding: 10rpx;
      margin: 10rpx;
      border: 2rpx solid $color-main;
      border-radius: 5px;
      color: $color-main;
      font-size: 12px;
    }
  }
  .summary{
    padding: 0 12px;
    margin-top: 20rpx;
    margin-bottom: 40rpx;
    font-size: 12px;
    color: $color-text;
    .text{
      text-indent: 2em;
    }
  }
}
</style>
