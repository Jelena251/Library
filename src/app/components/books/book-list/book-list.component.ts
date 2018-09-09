import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../../model/book.model';
import { BooksService } from '../../../services/books.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books : Book[];
  sub : Subscription;

  constructor(private bookService : BooksService,
              private router:Router,
              private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.bookService.booksChanged.subscribe(
      (books : Book[]) => {
        this.books = books;
      }
    )
    this.books = this.bookService.getBooks();
  }

  onAddNewBook(){
    this.router.navigate(['new'], {relativeTo : this.activeRoute})
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
