import Vue from 'vue'
import App from './Publish';

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationStyle: 'custom'
  }
}