import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { AuthorsService } from '../../../services/authors.service';
import { Author } from '../../../model/author.model';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {

  author: Author;
  id:number;

  constructor(private authorService : AuthorsService,
              private router: Router,
              private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    const id = this.activeRoute.params
    .subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.author = this.authorService.getAuthorByIndex(this.id);
      }
    )
 }
  onAddToEdit(){
    this.router.navigate(['edit'], {relativeTo:this.activeRoute});
  }

  onDeleteAuthor(){
    this.authorService.deleteAuthor(this.id);
    this.router.navigate(["/autori"]);
  }
}
