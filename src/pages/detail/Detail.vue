<template>
  <div class="detail">
    <BookInfo :info='bookinfo'></BookInfo>
  </div>
</template>

<script>
import * as API from '@/services/request';
import BookInfo from './components/BookInfo';

export default {
  data() {
    return {
      bookid: '',
      bookinfo: {},
    };
  },
  methods: {
    async getDetail() {
      const info = await API.GET('/weapp/bookdetail', { bookid: this.bookid });
      if (info) {
        this.bookinfo = info;
        wx.setNavigationBarTitle({
          title: info.title,
        })
      }
    },
  },
  components: { BookInfo },
  mounted() {
    this.bookid = this.$root.$mp.query.id;
    this.getDetail();
  },
  onShareAppMessage() {
    return {
      path: `/page/detail/main?id=${this.bookid}`,
    }
  },
};
</script>

<style lang="scss" scoped>

</style>


