import { Books } from './book.entity';
import { AddBookDto, UpdateBookDto } from './dto/books.dto';
import { BooksService } from './books.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.bookService;
  }
  @Get('all')
  findAllBooks() {
    return this.bookService.findAll();
  }
  @Post('new')
  createNewBook(@Body() body: Books) {
    return this.bookService.createBook(body);
  }

  @Get('/:id')
  async getOneBook(@Param('id', new ParseIntPipe()) id) {
    const book = await this.bookService.getOneBook(id);
    return book;
  }

  @Post()
  async AddBook(@Body() body: AddBookDto) {
    const books = await this.bookService.addBook(body);
    return books;
  }

  @Put(':id')
  async updateBook(
    @Param('id', new ParseIntPipe()) id,
    @Body() body: UpdateBookDto,
  ) {
    const book = await this.bookService.updateBook(body, id);
    return book;
  }

  @Delete(':id')
  async deleteBook(@Param('id', new ParseIntPipe()) id) {
    console.log(id);
    const books = await this.bookService.deleteBook(id);
    return books;
  }
}
