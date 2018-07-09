const { mysql } = require('../qcloud');

module.exports = async (ctx, next) => {
  const { pageindex, pagesize } = ctx.request.query;
  try {
    const list = await mysql('books')
                        .select('books.*', 'csessioninfo.user_info')
                          .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
                            .limit(Number(pagesize)).offset(Number(pagesize) * Number(pageindex))
                              .orderBy('books.id', 'desc');
    
    ctx.state.data = {
      list: list.map(v => {
        const user = JSON.parse(v.user_info);
        return Object.assign({}, v, {
          user_info: {
            nickName: user.nickName
          }
        });
      }),
      msg: 'success'
    };
  } catch(e) {
    ctx.state = {
      code: -1,
      data: {
        msg: e.sqlMessage
      }
    };
  }
}
