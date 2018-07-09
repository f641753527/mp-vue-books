<template>
  <div class="detail">
    <p class="id">图书id： {{bookid}}</p>
  </div>
</template>

<script>
import * as API from '@/services/request';

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
    },
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id;
    this.getDetail();
  },
};
</script>

<style lang="scss" scoped>

</style>


