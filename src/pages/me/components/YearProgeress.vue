<template>
  <div class="yearProgeress">
    <progress :percent="percents" active activeColor='#EA5A49'/>
    <p class="text">{{year}}已经过去{{days}}天, {{percents}}%</p>
  </div>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear();
    },
    days() {
      const DAY = 1000 * 60 * 60 * 24;
      const start = new Date();
      start.setMonth(0);
      start.setDate(1);
      const offset = new Date().getTime() - start.getTime();
      return Math.floor(offset / DAY);
    },
    isLoopYear() {
      let loop = false;
      const year = new Date().getFullYear();
      if (year % 400 === 0) {
        loop = true;
      } else if (year % 4 === 0 && year % 100 !== 0) {
        loop = true;
      }
      return loop;
    },
    daysOfYear() {
      return this.isLoopYear ? 366 : 365;
    },
    percents() {
      return ((this.days / this.daysOfYear) * 100).toFixed(1);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@scss';
.yearProgeress{
  margin-bottom: 50rpx;
  width: 100%;
  text-align: center;
  progress{
    margin-bottom: 15rpx;
  }
  .text{
    font-size: 26rpx;
    color: $color-text;
  }
}
</style>
