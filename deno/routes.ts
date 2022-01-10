import { Router }from 'https://deno.land/x/oak/mod.ts'
import { getBooks, addBook, deleteBook } from './controller.ts'

const router = new Router()

router.get('/book', getBooks)
      .post('/book', addBook)
      .delete('/book/:bookUid', deleteBook)

export default router