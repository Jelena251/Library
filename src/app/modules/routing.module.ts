
import { Routes, RouterModule} from "@angular/router";
import { BooksComponent } from "../components/books/books.component";
import { AuthorsComponent } from "../components/authors/authors.component";
import { ShoppingCartComponent } from "../components/shopping-cart/shopping-cart.component";
import { NgModule } from "@angular/core";
import { AppModule } from "../app.module";
import { DefaultBookComponent } from "../components/books/default-book/default-book.component";
import { BookEditComponent } from "../components/books/book-edit/book-edit.component";
import { BookDetailsComponent } from "../components/books/book-details/book-details.component";
const routes :Routes =[
    {path: '',redirectTo:'/knjige', pathMatch: 'full'},
    {path: 'knjige', component:BooksComponent, children :[
        {path:'', component: DefaultBookComponent , pathMatch: 'full'},
        {path: "new", component: BookEditComponent },
        {path:':id', component: BookDetailsComponent},
        {path: ":id/edit", component: BookEditComponent}
    ]},
    {path: 'autori', component:AuthorsComponent},
    {path: 'korpa', component:ShoppingCartComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{   
}