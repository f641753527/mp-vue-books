import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

import 'vue-multiple-rate/lib/rate.css'


const app = new Vue(App)
app.test = 123;
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/books/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#000',
      navigationBarTitleText: '微图书',
      navigationBarTextStyle: '#fff',
      navigationStyle: 'custom'
    },
    tabBar: {
      selectedColor: '#EA5149',
      list: [
        {
          pagePath: 'pages/books/main',
          text: '图书',
          iconPath: 'static/img/book.png',
          selectedIconPath: 'static/img/book-active.png'
        },
        {
          pagePath: 'pages/comments/main',
          text: '评论',
          iconPath: 'static/img/todo.png',
          selectedIconPath: 'static/img/todo-active.png'
        },
        {
          pagePath: 'pages/me/main',
          text: '我',
          iconPath: 'static/img/me.png',
          selectedIconPath: 'static/img/me-active.png'
        },
        {
          pagePath: 'pages/discovery/main',
          text: '发现',
          iconPath: 'static/img/discovery.png',
          selectedIconPath: 'static/img/discovery-active.png'
        }
      ]
    }
  }
}
