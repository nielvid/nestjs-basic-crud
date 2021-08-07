import { AddBookDto } from './dto/books.dto';
import { BooksService } from './books.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.bookService;
  }
  @Get('/:id')
  async getOneBook(@Param('id') id) {
    const book = await this.bookService.getOneBook(id);
    return book;
  }

  @Post()
  async AddBook(@Body() body: AddBookDto) {
    const books = await this.bookService.addBook(body);
    return books;
  }
}
