<template>
<div class="app"></div>
</template>

<script>

export default {
  created () {
  }
}
</script>

<style lang='scss'>
@import '~@scss';
.button{
  background: $color-main;
  color: #fff;
  &:active{
    background: color-main-active;
  }
}
.primary-text{
  color: $color-main;
}
</style>
