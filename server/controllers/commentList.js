const { mysql } = require('../qcloud');

module.exports = async (ctx) => {
  const { bookid, openid } = ctx.request.query;

  const res = mysql('comments').select('comments.*', 'csessioninfo.user_info')
                    .join('csessioninfo', 'comments.openid', 'csessioninfo.open_id')

  let list = [];
  if (bookid) {
    list = await res.where('bookid', bookid);
  } else {
    list = await res.where('openid', openid);
  }
                
  ctx.state.data = {
    list: list.map(v => {
      const info = JSON.parse(v.user_info);
      return Object.assign({}, v, {
        user_info: info
      });
    }),
    msg: 'success'
  };
}