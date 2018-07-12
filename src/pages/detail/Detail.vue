<template>
  <div class="detail">
    <BookInfo :info='bookinfo'></BookInfo>

    <!-- 评论 -->
    <div class="comment">
      <textarea placeholder="请输入评论内容" :value='comment' class='textarea'/>

      <div class="geo">
        地理位置: <switch class="switch" @change="getGeo" color='#EA5A49'/><span>{{geo}}</span>
      </div>

      <div class="phone">
        手机型号: <switch class="switch" @change="getPhone" color='#EA5A49' size='small'/><span>{{phone}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '@/services/request';
import BookInfo from './components/BookInfo';

export default {
  data() {
    return {
      bookid: '',
      bookinfo: {},
      comment: '',
      geo: '',
      phone: '',
    };
  },
  methods: {
    async getDetail() {
      const info = await API.GET('/weapp/bookdetail', { bookid: this.bookid });
      if (info) {
        this.bookinfo = info;
        wx.setNavigationBarTitle({
          title: info.title,
        })
      }
    },
    getGeo(e) {
      const AK = '2TH47NyPhWGQLtPmsrlfsTGT3YChbfwR';
      const URL = 'http://api.map.baidu.com/geocoder/v2/';
      if (e.target.value) {
        wx.getLocation({
          success: res => {
            const latitude = res.latitude;
            const longitude = res.longitude;
            wx.request({
              url: URL,
              methods: 'GET',
              data: {
                ak: AK,
                location: `${latitude}, ${longitude}`,
                output: 'json'
              },
              success: (res) => {
                if (res.data.status === 0) {
                  this.geo = res.data.result.formatted_address;
                }
              },
            });
          },
        });
      } else {
        this.geo = '';
      }
    },
    getPhone(e) {
      if (e.target.value) {
        const brand = wx.getSystemInfoSync();
        this.phone = brand.model;
      } else {
        this.phone = '';
      }
    },
  },
  components: { BookInfo },
  mounted() {
    this.bookid = this.$root.$mp.query.id;
    this.getDetail();
  },
  onShareAppMessage() {
    return {
      path: `/page/detail/main?id=${this.bookid}`,
    }
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';
.detail{
  .comment{
    padding: 20rpx;
    font-size: 14px;
    color: $color-text;
    .textarea{
      padding: 20rpx;
      width: 100%;
      box-sizing: border-box;
      background: #eee;
    }
    .geo, .phone{
      margin-top: 20rpx;
      .switch{
        margin: 0 10rpx;
      }
    }
  }
}
</style>


