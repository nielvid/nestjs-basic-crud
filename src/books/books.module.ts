import { BooksService } from './books.service';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BookMiddleWare } from 'src/common/middlewares/book.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './book.entity';
//import { EntitySchema } from 'typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Books])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BookMiddleWare).forRoutes('books');
  }
}
