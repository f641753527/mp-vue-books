<template>
  <div class="rate">
    <span>☆☆☆☆☆</span>
    <div ref='score' class='score' :style='style'>★★★★★</div>
  </div>
</template>

<script>
export default {
  props: {
    rate: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    style() {
      return `width: ${this.rate / 2}em`;
    },
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
.rate{
  position: relative;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  font-size: 28rpx;
  .score{
    position: absolute;
    display: inline-block;
    left: 0;
    top: 0;
    width: 0;
    overflow: hidden;
  }
}
</style>
