import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthorsService } from '../../../services/authors.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Response } from '@angular/http';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  id:number;
  authorEdit : FormGroup;
  editMode : boolean = false;
  authorSub :Subscription;

  constructor( private authorService:AuthorsService,
            private router:Router,
            private activeRoute : ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initializeForm();
      }
    );
  }

  initializeForm(){
    let name = "";
    let imagePath ="";
    let surname ="";
    let history = ""; 
    if(this.editMode){
      const currentAuthor = this.authorService.getAuthorByIndex(this.id);
      name=currentAuthor.name;
      imagePath = currentAuthor.imagePath;
      surname = currentAuthor.surname;
      history=currentAuthor.history;
    }
    this.authorEdit = new FormGroup({
      'name' : new FormControl(name, Validators.required),
      'imagePath' : new FormControl(imagePath),
      'surname' : new FormControl(surname),
      'history' : new FormControl(history),
    });
  }

  onSubmit(){

    if(this.editMode){
      this.authorService.updateAuthor(this.id, this.authorEdit.value);
    }else{
      this.authorService.addAuthor(this.authorEdit.value);
    }
    this.onCancel();

  }

  onCancel(){
    this.router.navigate(['../'],  {relativeTo:this.activeRoute});
  }

}
