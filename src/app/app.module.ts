import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AppRoutingModule } from './modules/routing.module';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';
import { BookListComponent } from './components/books/book-list/book-list.component';
import { HttpModule } from '@angular/http';
import { BookItemComponent } from './components/books/book-list/book-item/book-item.component';
import { DefaultBookComponentComponent } from './components/books/default-book-component/default-book-component.component';
import { DefaultBookComponent } from './components/books/default-book/default-book.component';
import { BookEditComponent } from './components/books/book-edit/book-edit.component';
import { BooksService } from './services/books.service';
import { ShoppingCartService } from './services/shopping.cart.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HeaderComponent,
    AuthorsComponent,
    ShoppingCartComponent,
    BookDetailsComponent,
    BookListComponent,
    BookItemComponent,
    DefaultBookComponentComponent,
    DefaultBookComponent,
    BookEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule 
  ],
  providers: [BooksService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
