import config from './config';
import { showModal } from '@/utils'

export function GET(url, data) {
  return request(url, 'GET', data);
}

export function POST(url, data) {
  return request(url, 'POST', data);
}

function request(url, method, data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      method: method,
      data: data,
      success(res) {
        if (res.data.code === 0) {
          resolve(res.data.data);
        } else {
          showModal('失败', res.data.data.msg);
          resolve(null);
        }
      },
      fail(res) {
        reject();
      }
    })
  });
}

export default {};