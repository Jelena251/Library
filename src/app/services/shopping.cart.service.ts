import { Book } from "../model/book.model";
import { Subject } from "rxjs";

export class ShoppingCartService{

    shoppingCartChanged = new Subject<Book[]>();
    private books : Book[] = [];
    private price : number;

    constructor(){
        this.price=0;
    }

    addBookToCart(book:Book){
        this.books.push(book);
        this.price = +this.price + +book.price;
        console.log(this.price);
        this.shoppingCartChanged.next(this.books.slice());
    }

    getBooks(){
        return this.books.slice();
    }

    getPrice():number{
        return this.price;
    }
}