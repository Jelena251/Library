import { Component, OnInit } from '@angular/core';
import { Book } from '../../../model/book.model';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../../../services/shopping.cart.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  books : Book[];
  sub : Subscription;
  price: number;

  constructor(private shoppingService : ShoppingCartService,
              private router:Router,
              private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.shoppingService.shoppingCartChanged.subscribe(
      (books : Book[]) => {
        this.books = books;
        this.price=this.shoppingService.getPrice();
      }
    )
    this.books = this.shoppingService.getBooks();
    this.price=this.shoppingService.getPrice();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
