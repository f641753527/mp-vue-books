import Vue from 'vue'
import App from './Friend';

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '朋友圈'
  }
}