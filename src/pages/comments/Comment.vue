<template>
  <div class="my_comments">
    <NavigationBar :title='title'/>

    <div class="wrap">
      <p class="split" v-show='comments.length'>我的评论</p>
      <Comment v-for='item in comments' :key='item.id' :comment='item' :type='"mycomment"'></Comment>
      <p class="split" v-show='books.length'>我的图书</p>
      <BookItem v-for='book in books' :key='book.id' :book='book'/>
      <p class="split" v-show='!comments.length && !books.length'>暂无数据</p>
    </div>
    
  </div>
</template>

<script>
import * as API from '@/services/request';
import Comment from '../detail/components/Comment';
import BookItem from '../books/components/Item';
import NavigationBar from '@/components/NavigationBar';

export default {
  data() {
    return {
      title: '我的评论',
      userinfo: {},
      comments: [],
      books: [],
    };
  },
  methods: {
    init() {
      wx.showNavigationBarLoading();
      this.getComments();
      this.getBooks();
      wx.hideNavigationBarLoading();
    },
    async getComments() {
      const res = await API.GET('/weapp/getCommentList', { openid: this.userinfo.openId });
      if (res) {
        this.comments = res.list;
      }
    },
    async getBooks() {
      const res = await API.GET('/weapp/booklist', { openid: this.userinfo.openId });
      if (res) {
        this.books = res.list;
      }
    },
  },
  components: { Comment, BookItem, NavigationBar},
  onShow() {
    const user = wx.getStorageSync('userinfo');
    if (user.openId) {
      this.userinfo = user;
      this.init();
    }
  },
  onPullDownRefresh() {
    this.init();
  },
}
</script>
<style lang="scss" scoped>
@import '~@scss';
.my_comments{
  background: #eee;
  .wrap{
    padding: 20rpx;
    .split{
      text-align: center;
      color: $color-text;
      font-size: 14px;
      line-height: 48px;
    }
  }
  
}
</style>


