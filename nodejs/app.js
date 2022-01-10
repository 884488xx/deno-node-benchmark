const Koa = require('koa');
const koaBody = require('koa-body');
const booksRoutes = require('./routes');

const app = new Koa();

// middleware functions
app.use(koaBody());

// Use the Router on the sub route /books
app.use(booksRoutes.routes());

// Bootstrap the server
app.listen(3000);
console.log('Server started at port 3000');