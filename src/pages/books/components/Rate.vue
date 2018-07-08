<template>
  <div class="rate">
    <span class="star" v-for='(star, index) in stars' :class='star' :key='index'></span>
  </div>
</template>

<script>
const LEN = 5;
const STAR_ON = 'on';
const STAR_HALF = 'half';
const STAR_OFF = 'off';
export default {
  props: {
    rate: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    
    stars() {
      const status = [];
      const starOnNum = Math.floor(this.rate / 2);
      for (let i = 0; i < starOnNum; i++) {
        status.push(STAR_ON);
      }
      let hasHalf = this.rate !== Math.floor(this.rate);
      if (hasHalf) {
        status.push(STAR_HALF);
      }
      while (status.length < LEN) {
        status.push(STAR_OFF);
      }
      return status;
    },
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
.rate{
  
  .star{
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
    &.on{
      background: url('./image/star24_on@2x.png') center center no-repeat;
      background-size: 100%;
    }
    &.half{
      background: url('./image/star24_half@2x.png') center center no-repeat;
      background-size: 100%;
    }
    &.off{
      background: url('./image/star24_off@2x.png') center center no-repeat;
      background-size: 100%;
    }
  }
}
</style>
