import { AddBookDto, UpdateBookDto } from './dto/books.dto';
import { BOOKS } from './../entities/books.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private bookRepository: Repository<Books>,
  ) {}

  books = BOOKS;

  findAll(): Promise<Books[]> {
    return this.bookRepository.find();
  }

  async createBook(Book): Promise<Books> {
    const { id, title, description, author } = Book;
    const book = new Books();
    book.id = id;
    book.title = title;
    book.description = description;
    book.author = author;

    await this.bookRepository.save(book);
    return book;
  }

  getAllBooks(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.books);
    });
  }

  getOneBook(id): Promise<any> {
    const book = this.books.find((book) => {
      return book.id === id;
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

  updateBook(book: UpdateBookDto, id) {
    let updatedBook;
    const updatedBooks = this.books.map((item) => {
      if (item.id === id) {
        updatedBook = {
          id: id,
          ...book,
        };
        return updatedBook;
      } else return item;
    });

    this.books = updatedBooks;
    return updatedBook;
  }

  deleteBook(id: number): Promise<any> {
    return new Promise((resolve) => {
      const oneBook = this.books.findIndex((book) => {
        return book.id === id;
      });

      this.books.splice(1, oneBook);
      resolve(this.books);
    });
  }
}
