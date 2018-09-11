import { Component, OnInit, Input } from '@angular/core';
import { Author } from '../../../../model/author.model';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.css']
})
export class AuthorItemComponent implements OnInit {

  @Input() author : Author;
  @Input() index : number;

  constructor() { }

  ngOnInit() {
  }

}
