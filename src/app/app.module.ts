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
import { DefaultBookComponent } from './components/books/default-book/default-book.component';
import { BookEditComponent } from './components/books/book-edit/book-edit.component';
import { BooksService } from './services/books.service';
import { ShoppingCartService } from './services/shopping.cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorsService } from './services/authors.service';
import { DropdownDirective } from './directives/dropdown.directive';
import { AuthorListComponent } from './components/authors/author-list/author-list.component';
import { AuthorDetailsComponent } from './components/authors/author-details/author-details.component';
import { AuthorEditComponent } from './components/authors/author-edit/author-edit.component';
import { AuthorItemComponent } from './components/authors/author-list/author-item/author-item.component';
import { ShoppingListComponent } from './components/shopping-cart/shopping-list/shopping-list.component';

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
    DefaultBookComponent,
    BookEditComponent,
    DropdownDirective,
    AuthorListComponent,
    AuthorDetailsComponent,
    AuthorEditComponent,
    AuthorItemComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [BooksService, ShoppingCartService, AuthorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
