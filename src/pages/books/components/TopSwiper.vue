<template>
  <div class="swiper">
    <swiper indicator-dots indicator-color='#EA5A49' autoplay :interval="interval" :duration="duration">
      <block v-for="item in topList" :key="item.index">
        <swiper-item>
          <image :src='item.image' mode='aspectFill' class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: 2000,
      duration: 500,
    };
  },
  props: {
    topList: {
      type: Array,
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper{
  swiper{
    margin-bottom: 30rpx;
  }
  .slide-image{
    width: 100%;
    height: 100%;
  }
}
</style>


