const { mysql } = require('../qcloud');

module.exports = async (ctx, next) => {
  const { bookid } = ctx.request.query;

  await mysql('books').where('id', bookid).increment('count', 1);
}