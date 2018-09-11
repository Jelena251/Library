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

    constructor(private http:Http, 
        private shService: ShoppingCartService){
        this.getBooksFromDb();
        if(this.books === null){
            this.books = [];
        }
    }

    getBooks(){
        return this.books.slice();
    }

    getBookById(index: number){
        return this.books[index];
    }

    addBook(book : Book){
        this.books.push(book);
        this.booksChanged.next(this.books.slice());
        this.storeBooksToDb().subscribe(
            (response :Response) => {
                console.log(response);
            }
        );
    }

    updateBook(index:number, newBook : Book){
        this.books[index] = newBook;
        this.booksChanged.next(this.books.slice());
        this.storeBooksToDb().subscribe(
            (response :Response) => {
                console.log(response);
            }
        );
    }

    addToShoppingCart(book:Book){
             this.shService.addBookToCart(book);
    }

    deleteBook(index: number){
        this.books.splice(index, 1);
        this.booksChanged.next(this.books.slice());
        this.storeBooksToDb().subscribe(
            (response :Response) => {
                console.log(response);
            }
        );
    }

    setBooks(books:Book[]){
        this.books = books;
        this.booksChanged.next(this.books.slice())
    }

    storeBooksToDb(){
        return this.http.put("https://library-b739f.firebaseio.com/books.json", this.getBooks());
    }

    getBooksFromDb(){
        return this.http.get("https://library-b739f.firebaseio.com/books.json")
        .subscribe(
            (response:Response) =>{
                const books:Book[] = response.json();
                if(books !== null ){
                    this.setBooks(books);
                }
            });
    }
}