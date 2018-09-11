import { Component, OnInit } from '@angular/core';
import { Book } from '../../../model/book.model';
import { BooksService } from '../../../services/books.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;
  id:number;

  constructor(private bookService : BooksService,
              private router: Router,
              private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    const id = this.activeRoute.params
    .subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.book = this.bookService.getBookById(this.id);
      }
    )
 }

  addToShoppingList(){
    this.bookService.addToShoppingCart(this.book);
  }

  onAddToEdit(){
    this.router.navigate(['edit'], {relativeTo:this.activeRoute});
  }

  onDeleteBook(){
    this.bookService.deleteBook(this.id);
    this.router.navigate(["/knjige"]);
  }

}
