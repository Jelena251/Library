import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Book } from '../../../model/book.model';
import { BooksService } from '../../../services/books.service';
import { GenreTypes } from '../../../model/model.types/genre.types';
import { Author } from '../../../model/author.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  id:number;
  bookEdit : FormGroup;
  editMode : boolean = false;

  genres;
  authors : string[];

  constructor(private bookService : BooksService) { }

  ngOnInit() {
    this.genres = Object.keys(GenreTypes).forEach(key => {GenreTypes[key]});
    this.authors = ["Author 1",  "Author 2"]; 
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
            'name' : new FormControl(author.name, Validators.required),
            'surname' : new FormControl(author.surname),
            'history': new FormControl(author.history)    
          }));
        }
      }
      if(currentBook['genres']){
        for(let genre of currentBook.genres){
          genres.push(new FormControl(genre));
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

  onSubmit(){
    
  }

  onCancel(){
    console.log("On cancel");
  }
  
}
