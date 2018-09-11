import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Book } from "../model/book.model";
import { Subject } from "rxjs";
import { ShoppingCartComponent } from "../components/shopping-cart/shopping-cart.component";
import { ShoppingCartService } from "./shopping.cart.service";


@Injectable()
export class BooksService{ 

    booksChanged = new Subject<Book[]>();
    private books : Book[] = [];

    constructor(private http:Http, private shService: ShoppingCartService ){ }

    getBooks(){
        return this.books.slice();
    }

    getBookById(index: number){
        return this.books[index];
    }

    addBook(book : Book){
        this.books.push(book);
        //this.saveBookToDB();
        this.booksChanged.next(this.books.slice());
    }

    updateBook(index:number, newBook : Book){
        this.books[index] = newBook;
       // this.saveBookToDB();
        this.booksChanged.next(this.books.slice());
    }

    addToShoppingCart(book:Book){
             this.shService.addBookToCart(book);
    }

    deleteBook(index: number){
        this.books.splice(index, 1);
       // this.saveBookToDB();
        this.booksChanged.next(this.books.slice());
    }

    refreshData(){
        this.http.get("https://booksproject-dbcdf.firebaseio.com/books.json").
                    subscribe(
                        (response : Response) =>{
                            const books:Book[] = response.json();
                            this.books = books;
                        });
    }

    private saveBookToDB(){
        this.http.put("https://booksproject-dbcdf.firebaseio.com/books.json", this.books);
    }

    setBooks(books:Book[]){
        this.books = books;
        this.booksChanged.next(this.books.slice())
    }

}