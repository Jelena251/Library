import { Component, OnInit } from '@angular/core';
import { Author } from '../../../model/author.model';
import { Subscription } from 'rxjs';
import { AuthorsService } from '../../../services/authors.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  
  authors : Author[];
  sub : Subscription;

  constructor(private authorService : AuthorsService,
              private router:Router,
              private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.authorService.authorsChanged.subscribe(
      (authors : Author[]) => {
        this.authors = authors;
      }
    )
    this.authors = this.authorService.getAuthors();
  }

  onAddNewAuthor(){
    this.router.navigate(['new'], {relativeTo : this.activeRoute})
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
