const Router = require('koa-router');
const bookController = require('./controller');

// Prefix all routes with: /book
const router = new Router({
	prefix: '/book'
});

router.get('/', bookController.getBooks);
router.post('/', bookController.addBook);
router.del('/:bookUid', bookController.deleteBook);

module.exports = router;