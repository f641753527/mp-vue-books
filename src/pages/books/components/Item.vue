<template>
  <div class="book" @click='showDetail'>
    <div class="flex-item fix-item">
      <image :src="book.image" class='img' @click.stop='imagePreview'/>
    </div>
    <div class="flex-item auto-item">
      <p class="desc primary-text">{{book.title}}</p>
      <p class="desc">{{book.authors}}</p>
      <p class="desc">{{book.publisher}}</p>
    </div>
    <div class="flex-item fix-item">
      <div class="desc primary-text">
        <Rate :rate='book.rate'></Rate>
      </div>
      <p class="desc">浏览量: {{book.count}}</p>
      <p class="desc">{{book.user_info.nickName}}</p>
    </div>
  </div>
</template>

<script>
import Rate from './Rate';

export default {
  components: { Rate },
  props: {
    book: {
      type: Object,
    },
  },
  methods: {
    showDetail() {
      wx.navigateTo({
        url: `/pages/detail/main?id=${this.book.id}`
      });
    },
    imagePreview() {
      
    },
  },
}
</script>

<style lang="scss">
@import '~@scss';
.book{
  padding: 10rpx;
  margin-bottom: 20rpx;
  border: 2rpx solid $color-text;
  display: flex;
  font-size: 28rpx;
  color: $color-text;
  .fix-item{
    flex: 0 0 200rpx;
    width: 200rpx;
    text-align: right;
    .img{
      width: 200rpx;
      height: 200rpx;
      vertical-align: top;
    }
  }
  .auto-item{
    flex: 1 1 auto;
    margin-left: 20rpx;
    margin-right: 20rpx;
    text-align: left;
  }
  .flex-item{
    overflow: hidden;
    .desc{
      margin-top: 10rpx;
      line-height: 40rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
