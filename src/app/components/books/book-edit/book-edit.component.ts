import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Book } from '../../../model/book.model';
import { BooksService } from '../../../services/books.service';
import { Author } from '../../../model/author.model';
import { AuthorsService } from '../../../services/authors.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  id:number;
  bookEdit : FormGroup;
  editMode : boolean = false;
  authorSub :Subscription;
  get authorData() { return <FormArray>this.bookEdit.get('authors'); }
  get genresData() { return <FormArray>this.bookEdit.get('genres'); }

  genres = ["Drama", "Fiction", "Historic", "Horror", "Romance", "Thriler"];
  authors:Author[];


  constructor(private bookService : BooksService, 
            private authorService:AuthorsService,
            private router:Router,
            private activeRoute : ActivatedRoute) { }

  ngOnInit() {
    this.authorService.getAuthorsFromDb().subscribe(
      (response:Response) =>{
          const authors:Author[] = response.json();
          if(authors !== null){
              this.authors =authors;
          }
      });
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initializeForm();
      }
    );

  }

  findAuthor(auth : Author){
    for(let i= 0; i<this.authors.length;i++){
      if(this.authors[i] === auth){
        return i; 
      }
    }
    return -1;
  }



  initializeForm(){
    let name = "";
    let imagePath ="";
    let preview ="";
    let price = 0; 
    let authors = new FormArray([]);
    let genres = new FormArray([]);
    if(this.editMode){
      const currentBook = this.bookService.getBookById(this.id);
      name=currentBook.name;
      imagePath = currentBook.imagePath;
      preview = currentBook.preview;
      price=currentBook.price;
      if(currentBook['authors']){
        for(let author of currentBook.authors){
          authors.push(new FormGroup({
            'name' : new FormControl(author, Validators.required)
          }));
        }
      }
      if(currentBook['genres']){
        for(let genre of currentBook.genres){
           genres.push(new FormGroup({
            'genre' : new FormControl(genre)
           }
           ));
        }
      }
    }
    this.bookEdit = new FormGroup({
      'name' : new FormControl(name, Validators.required),
      'imagePath' : new FormControl(imagePath),
      'preview' : new FormControl(preview),
      'price' : new FormControl(price),
      'authors' : authors,
      'genres' : genres
    });
  }

  onAddAuthor(){
    (<FormArray>this.bookEdit.get('authors')).push(new FormGroup({
      'name':new FormControl(null)
    }));
  }

  onDeleteAuthor(index:number){
    (<FormArray>this.bookEdit.get('authors')).removeAt(index);
  }

  onAddGenre(){
    (<FormArray>this.bookEdit.get('genres')).push(new FormGroup({
      'genre': new FormControl()
    }));
  }

  onDeleteGenre(index:number){
    (<FormArray>this.bookEdit.get('genres')).removeAt(index);
  }

  onSubmit(){

    let book:Book = this.getFormValue();
    if(this.editMode){
      this.bookService.updateBook(this.id, book);
    }else{
      this.bookService.addBook(book);
    }
    this.onCancel();

  }

  private getFormValue():Book{
    let book:Book = new Book();
    book.name= this.bookEdit.value.name;
    book.imagePath= this.bookEdit.value.imagePath;
    book.preview= this.bookEdit.value.preview;
    book.price= this.bookEdit.value.price;
    book.genres = [];
    book.authors=[];
    let autori = this.bookEdit.value.authors;
    for(let i=0; i< autori.length;i++){
      book.authors.push(autori[i].name);
    }
    let genres = this.bookEdit.value.genres;
    for(let i=0; i< genres.length;i++){
      book.genres.push(genres[i].genre);
    }
    return book;
  }

  onCancel(){
    this.router.navigate(['../'],  {relativeTo:this.activeRoute});
  }

}
