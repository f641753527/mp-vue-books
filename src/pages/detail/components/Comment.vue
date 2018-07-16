<template>
  <div class="comment" @click='bookDetail'>
    <div class="header">
      <div class="user">
        <img class='avatar' :src="comment.user_info.avatarUrl">
        <span class="nick">{{comment.user_info.nickName}}</span>
      </div>
      <div class="other">
        <span>{{comment.phone || '未知型号'}}</span> -- <span>{{comment.location || '未知地点'}}</span>
      </div>
    </div>
    <p class="value">{{comment.comment}}</p>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
    },
    type: {
      type: String,
    },
  },
  methods: {
    bookDetail() {
      if (this.type === 'mycomment') {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + this.comment.bookid,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';
.comment{
  padding: 10rpx;
  margin-bottom: 2rpx;
  background: #fff;
  font-size: 12px;
  color: $color-text;
  .header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;
    .user{
      .avatar{
        margin-right: 20rpx;
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .other{
      line-height: 60rpx;
    }
  }
  .value{
    line-height: 48rpx;
    text-indent: 2em;
  }
}
</style>
