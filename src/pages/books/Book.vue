<template>
  <div class="me">
    <TopSwiper :topList='toplist'/>
    <BookItem v-for='book in books' :key='book.id' :book='book'/>
    <p class="line-bottom" v-show='!hasMore'>-----大兄弟,到底啦-----</p>
  </div>
</template>

<script>
import * as API from '@/services/request';
import BookItem from './components/Item';
import TopSwiper from './components/TopSwiper';
export default {
  data() {
    return {
      books: [],
      pagesize: 10,
      pageindex: 0,
      hasMore: true,
      toplist: [],
    };
  },
  components: { BookItem, TopSwiper },
  methods: {
    async getBookList(init) {
      if (init) {
        this.pageindex = 0;
        this.hasMore = true;
        this.books = [];
        wx.showNavigationBarLoading();
      }
      const res = await API.GET('/weapp/booklist', {
        pagesize: this.pagesize,
        pageindex: this.pageindex
      });
      if (res) {
        this.books = this.books.concat(res.list);
        if (res.list.length < this.pagesize) {
          this.hasMore = false;
        }
      }
      if (init) {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    },
    async getTopList() {
      const data = await API.GET('/weapp/toplist');
      if (data) {
        this.toplist = data.list;
      }
    },
  },
  onShow() {
    this.getBookList(true);
    this.getTopList();
  },
  onPullDownRefresh() {
    this.getBookList(true);
  },
  onReachBottom() {
    if (this.hasMore) {
      this.pageindex += 1;
      this.getBookList();
    }
  },
}
</script>

<style lang="scss" scoped>
.me{
  padding: 10rpx;
  .line-bottom{
    text-align: center;
    line-height: 48rpx;
    font-size: 28rpx;
    color: #ccc;
  }
}
</style>

