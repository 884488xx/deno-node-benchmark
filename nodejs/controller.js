const { v4 } = require('uuid');
const { executeQuery } = require('./db');

const getBooks = async (ctx) => {
  const queryResult = await executeQuery('SELECT * FROM book;', []);

  ctx.response.body = queryResult ? queryResult.rows : []
}

const addBook = async (ctx) => {
  try {
    const book = ctx.request.body;

    console.log('Incoming new book', book);
    const newUid = v4();

    const insertResult = await executeQuery(
      'INSERT INTO book (uid, author, title, description, code) VALUES ($1::uuid, $2::text, $3::text, $4::text, $5::integer);',
      [newUid, book.author, book.title, book.description, book.code]
    );

    console.log('insertResult', insertResult);

    if (insertResult.rowCount && insertResult.rowCount > 0) {
      ctx.response.body = { message: 'Successfully created new book', uid: newUid }
      ctx.response.status = 200
    } else {
      ctx.response.body = { message: 'Failed to create new book' }
      ctx.response.status = 400
    }
  } catch (error) {
    ctx.response.body = { message: 'Failed to create new book - Exception', error: error.message }
    ctx.response.status = 500
  }
}

const deleteBook = async (ctx) => {
  try {
    const insertResult = await executeQuery(
      'DELETE FROM book WHERE uid = $1::uuid;',
      [ctx.params.bookUid]
    );

    if (insertResult.rowCount && insertResult.rowCount > 0) {
      ctx.response.body = { message: 'Successfully deleted book' }
      ctx.response.status = 200
    } else {
      ctx.response.body = { message: 'Failed to delete book' }
      ctx.response.status = 400
    }
  } catch (error) {
    ctx.response.body = { message: 'Failed to delete book - Exception', error: error.message }
    ctx.response.status = 500
  }
}

module.exports = { getBooks, addBook, deleteBook }