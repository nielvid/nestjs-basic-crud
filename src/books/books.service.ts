import { AddBookDto } from './dto/books.dto';
import { BOOKS } from './../entities/books.entity';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  books = BOOKS;
  getAllBooks(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.books);
    });
  }
  getOneBook(id): Promise<any> {
    const item = Number(id);
    const book = this.books.find((book) => {
      return book.id === item;
    });
    return new Promise((resolve) => {
      if (!book) throw new HttpException('book not found', 404);
      resolve(book);
    });
  }
  addBook(book: AddBookDto): Promise<any> {
    return new Promise((resolve) => {
      this.books.push(book);
      resolve(this.books);
    });
  }
}
