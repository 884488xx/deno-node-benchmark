import * as v4 from 'https://deno.land/std/uuid/v4.ts'
import { executeQuery } from './db.ts';

interface IBook {
  author: string;
  title: string;
  description: string;
  code: number;
}

const getBooks = async ({ response }: { response: any }) => {
  const queryResult = await executeQuery('SELECT * FROM book;', []);

  response.body = queryResult ? queryResult.rows: []
}

const addBook = async ({ request, response }: { request: any; response: any }) => {
  try {
    const body = await request.body()
    const book: IBook = await body.value

    console.log('Incoming new book', book);
    const newUid = v4.generate();

    const insertResult = await executeQuery(
      'INSERT INTO book (uid, author, title, description, code) VALUES ($1::uuid, $2::text, $3::text, $4::text, $5::integer);',
      [newUid, book.author, book.title, book.description, book.code]
    );

    console.log('insertResult', insertResult);

    if (insertResult.rowCount && insertResult.rowCount > 0) {
      response.body = { message: 'Successfully created new book', uid: newUid }
      response.status = 200
    } else {
      response.body = { message: 'Failed to create new book' }
      response.status = 400
    }
  } catch (error) {
    response.body = { message: 'Failed to create new book - Exception', error: error }
    response.status = 500
  }
}

const deleteBook = async ({ params, response }: { params: { bookUid: string }; response: any }) => {
  try {
    const insertResult = await executeQuery(
      'DELETE FROM book WHERE uid = $1::uuid;',
      [params.bookUid]
    );

    if (insertResult.rowCount && insertResult.rowCount > 0) {
      response.body = { message: 'Successfully deleted book' }
      response.status = 200
    } else {
      response.body = { message: 'Failed to delete book' }
      response.status = 400
    }
  } catch (error) {
    response.body = { message: 'Failed to delete book - Exception', error: error.message }
    response.status = 500
  }
}

export { getBooks, addBook, deleteBook }