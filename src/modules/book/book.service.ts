import {forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Book} from "./book.entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {publish} from "rxjs";
import {CreateBookDto} from "./Dto/createBook.dto";
import {UpdateBookDto} from "./Dto/updateBook.dto";
import {AuthorService} from "../author/author.service";
import {Category} from "../category/category.entity";
import {CategoryService} from "../category/category.service";
import {SubCategoryService} from "../sub-category/sub-category.service";
import {SubCategory} from "../sub-category/subCategory.entity";

@Injectable()
export class BookService {
    constructor(@InjectRepository(Book) private bookRepository:Repository<Book>,
                                        private authorService:AuthorService,
                                        private categoryService:CategoryService,
                                        @Inject(forwardRef(()=>SubCategoryService)) private subCategoryService:SubCategoryService
                ) {
    }

    async getAllBooks():Promise<Book[]>{
        return await this.bookRepository.find()
    }

    async getBookById(id:number):Promise<Book> {
        const book = await this.bookRepository.findOne({where:{id}})
        if (!book) {
            throw new NotFoundException(`book with this id : ${id} does not exist`)
        }
        return book
    }

    async findBooksByCategory(categoryId:number):Promise<Book[]> {
        const books = await this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.categories','category')
            .where('category.id = :categoryId', {categoryId})
            .getMany()

        if (!books || books.length === 0) {
            throw new NotFoundException('No books found for the specified category')
        }
        return books
    }

   async findBooksByAuthor(authorId:number):Promise<Book[]> {
        const books = await this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.author','author')
            .where('author.id =:authorId', {authorId})
            .getMany()

       if (!books || books.length === 0) {
           throw new NotFoundException('No books found for the specified category')
       }
       return books

   }

   async findBooksByPublisher(publisher:string):Promise<Book[]> {
        const books = await this.bookRepository.find({where:{publisher}})
        if (!books || books.length === 0) {
            throw new NotFoundException('No books found for the specified category')
        }
        return books
   }

   async findBooksByNewest(limit:number =10):Promise<Book[]> {
        const books = await this.bookRepository
            .createQueryBuilder('book')
            .orderBy('book.createdAt','DESC')
            .limit(limit)
            .getMany()
            if (!books || books.length === 0) {
                throw new NotFoundException('No books found for the specified category')
            }
            return books
   }



   async createBook(authorId: number, createBookDto: CreateBookDto): Promise<Book> {
    const { title, cover, introduction, bookSize, publisher, yearOfPublication, language, subCategories } = createBookDto;
    const author = await this.authorService.getAuthorById(authorId)
    // Get subcategories and related categories
    const categories: Category[] = [];
    const addedCategoryIds: Set<number> = new Set();

    const SubCategories: SubCategory[] = await Promise.all(
           subCategories.map(async (subCategoryId: number) => {
               const subCategory = await this.subCategoryService.getOneSubCategory(subCategoryId);
               if (subCategory && subCategory.category && subCategory.category.id) {
                   const categoryId = subCategory.category.id;
                   if (!addedCategoryIds.has(categoryId)) {
                       const category = await this.categoryService.getOneCategory(categoryId);
                       if (category) {
                           categories.push(category);
                           // Add the category ID to the set of added IDs
                           addedCategoryIds.add(categoryId);
                           return subCategory

                       } else {
                           throw new Error(`Category not found for subcategory with ID: ${subCategoryId}`);
                       }

                   }

                   else {

                       console.log(`Category with ID: ${categoryId} has already been added.`);
                       // Handle the case where the category has already been added
                       // You can either skip this subCategory or handle it in another way
                       return subCategory
                   }
               } else {
                   throw new Error(`Subcategory with ID: ${subCategoryId} is missing category information`);
               }
           })
       );

       // Create a new book instance
    const book = new Book();
    book.title = title;
    book.cover = cover;
    book.introduction = introduction;
    book.bookSize = bookSize;
    book.publisher = publisher;
    book.yearOfPublication = yearOfPublication;
    book.language = language;
    book.author = author;
    book.subCategories = SubCategories;
    book.categories = categories;

    // Save the book to the database
    return await this.bookRepository.save(book);
}

        

   async updateBook(id:number,updateBookDto:UpdateBookDto):Promise<Book> {
        const {title,cover,introduction,bookSize,publisher,yearOfPublication,language,subCategories} = {...updateBookDto}
        const book = await this.getBookById(id)
        if (title) {
            book.title=title
        }
        if (cover){
            book.cover=cover
        }
       if (introduction){
           book.introduction=introduction
       }
       if (bookSize){
           book.bookSize=bookSize
       }
       if (publisher){
           book.publisher=publisher
       }
       if (yearOfPublication){
           book.yearOfPublication=yearOfPublication
       }
       if (language){
           book.language=language
       }
       if (subCategories){
           const categories:Category[]=[];
           const addedCategoryIds:Set<number> = new Set()
           const SubCategories: SubCategory[] = await Promise.all(
               subCategories.map(async (subCategoryId: number) => {
                   const subCategory = await this.subCategoryService.getOneSubCategory(subCategoryId);
                   if (subCategory && subCategory.category && subCategory.category.id) {
                       const categoryId = subCategory.category.id;
                       if (!addedCategoryIds.has(categoryId)) {
                           const category = await this.categoryService.getOneCategory(categoryId);
                           if (category) {
                               categories.push(category);
                               // Add the category ID to the set of added IDs
                               addedCategoryIds.add(categoryId);
                               return subCategory

                           } else {
                               throw new Error(`Category not found for subcategory with ID: ${subCategoryId}`);
                           }

                       }

                       else {

                           console.log(`Category with ID: ${categoryId} has already been added.`);
                           // Handle the case where the category has already been added
                           // You can either skip this subCategory or handle it in another way
                           return subCategory
                       }
                   } else {
                       throw new Error(`Subcategory with ID: ${subCategoryId} is missing category information`);
                   }
               })
           );
           book.subCategories=SubCategories
           book.categories=categories
       }


        return await book.save()
   }

   async deleteBook(id:number):Promise<DeleteResult> {
        const book = await this.bookRepository.delete(id)
       if (!book) {
           throw new NotFoundException(`book with this id : ${id} does not exist`)
       }
       return book
   }

}
