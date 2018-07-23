<template>
<div class="app"></div>
</template>

<script>
import { showModal } from '@/utils';

export default {
  methods: {
    updateCheck() {
      // 获取小程序更新机制兼容
      if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(res => {
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            updateManager.onUpdateReady(() => {
              wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: (res) => {
                  if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                  }
                }
              })
            });
            updateManager.onUpdateFailed(() => {
              // 新的版本下载失败
              showModal('已经有新版本了哟~', '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~', false);
            });
          }
        });
      }
    },
  },
  created() {
    this.updateCheck();
  }
}
</script>

<style lang='scss'>
@import '~@scss';
@import "./assets/iconfont/iconfont.css";
page{
  min-height: 100%;
}
.app{
  min-height: 100%;
}
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
