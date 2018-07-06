<template>
  <div class="me">
    <BookItem v-for='book in books' :key='book.id' :book='book'/>
  </div>
</template>

<script>
import * as API from '@/services/request';
import BookItem from './components/Item'
export default {
  data() {
    return {
      books: [],
    };
  },
  components: { BookItem },
  methods: {
    async getBookList() {
      const res = await API.GET('/weapp/booklist');
      if (res) {
        this.books = res.list;
      }
    },
  },
  onShow() {
    this.getBookList();
  },
}
</script>

<style lang="scss" scoped>
.me{
  padding: 10rpx;
}
</style>

