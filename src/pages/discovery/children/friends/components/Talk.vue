<template>
  <div class="talk">
    <div class="left">
      <img class="avatar" :src="talk.user_info.avatar">
    </div>

    <div class="right">
      <h3 class="nickName">{{talk.user_info.nickName}}</h3>
      <p class='value'>{{talk.talk}}</p>
      <div class="pics_wrap">
        <img :src="pic.path" class="pic" v-for='(pic, index2) in talk.pics' :key='index2' mode=''>
      </div>
      <div class="hit_like">
        <span class="time">{{time}}</span>
        <i class="icon iconfont" :class='isILike ? "icon-like" : "icon-like1"' @click='like'></i>
      </div>

      <div class="all_likes" v-if='likes.length'>
        <i class="icon iconfont icon-like1"></i>
        <span>{{allLikes}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '@/services/request';

export default {
  data() {
    return {
      likes: [],
      user: {},
    };
  },
  props: {
    talk: {
      type: Object,
    },
  },
  methods: {
    async getLikes() {
      const res = await API.GET('/weapp/talkLikes', {
        talkid: this.talk.id,
      });
      if (res) {
        this.likes = res.list;
        console.log(this.likes);
      }
    },
    async like() {
      await API.POST('/weapp/likeTheTalk', {
        openid: this.user.openId,
        talkid: this.talk.id
      });
      this.getLikes();
    },
  },
  computed: {
    time() {
      const minutes = Math.ceil((new Date().getTime() - this.talk.create_time) / 1000 / 60);
      if (minutes > 60 * 24) {
        return Math.floor(minutes / (60 * 24)) + '天前';
      } else if (minutes > 60) {
        return Math.floor(minutes / 60) + '小时前';
      } else {
        return Math.floor(minutes) + '分钟前';
      }
    },
    isILike() {
      const res = this.likes.filter((item) => {
        return item.openid === this.user.openId;
      }) || [];
      return res.length;
    },
    allLikes() {
      return this.likes.map(v => {
        return v.nickName;
      }).join(',');
    },
  },
  created() {
    this.user = wx.getStorageSync('userinfo');
    this.getLikes();
  },
};
</script>

<style lang="scss" scoped>
.talk{
  padding: 16rpx;
  display: flex;
  border-bottom: 1px solid #e1e1e1;
  &:last-of-type{
    border-bottom: none;
  }
  .left{
    flex: 0 0 96rpx;
    width: 16rpx;
    .avatar{
      width: 96rpx;
      height: 96rpx;
    }
  }
  .right{
    flex: 1 1 auto;
    padding: 12rpx;
    font-size: 16px;
    line-height: 26px;
    .nickName{
      color: #646faf;
      font-weight: 600;
    }
    .value{
      color: #1e1e1e;
    }
    .pics_wrap{
      .pic{
        width: 194rpx;
        height: 194rpx;
        margin-right: 8rpx;
        margin-top: 8rpx;
        &:nth-of-type(3n){
          margin-right: 0;
        }
      }
    }
    .hit_like{
      display: flex;
      justify-content: space-between;
      color: #5f5f5f;
      .iconfont{
        color: #98accf;
      }
    }
    .all_likes{
      display: flex;
      padding: 12rpx;
      background: #f3f3f5;
      color: #5a6e91;
    }
  }
}
</style>


