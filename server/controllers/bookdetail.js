const { mysql } = require('../qcloud');

module.exports = async (ctx, next) => {
  const { bookid } = ctx.request.query;

  const book = await mysql('books').select().where('id', bookid).first();

  ctx.state.data = book;

  await mysql('books').where('id', bookid).increment('count', 1);
}