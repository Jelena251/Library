import { Injectable } from "@angular/core";
import { Author } from "../model/author.model";
import { Http, Response } from "@angular/http";
import { Subject } from "rxjs";

@Injectable()
export class AuthorsService{
    
    authorsChanged = new Subject<Author[]>();
    private authors : Author[] = [new Author("ajfjsa", "Da ", "Da "), new Author("ajfjs22a", "Da ", "Da ")];

    constructor(private http:Http){
        console.log(" new!");
     }

    getAuthors(){
        console.log(this);
        //this.saveAuthorToDB();
        return this.authors.slice();
    }

    getAuthorByIndex(index: number){
        return this.authors[index];
    }

    addAuthor(author : Author){
        console.log(author);
        console.log(this);
        console.log(this.authors);
        this.authors.push(author);
        //this.saveAuthorToDB();
        this.authorsChanged.next(this.authors.slice());
    }

    updateAuthor(index:number, newAuthor : Author){
        this.authors[index] = newAuthor;
        //this.saveAuthorToDB();
        this.authorsChanged.next(this.authors.slice());
    }

    deleteAuthor(index: number){
        this.authors.splice(index, 1);
        //this.saveAuthorToDB();
        this.authorsChanged.next(this.authors.slice());
    }

    refreshData(){
        this.http.get("https://booksproject-dbcdf.firebaseio.com/authors.json").
                    subscribe(
                        (response : Response) =>{
                            const authors:Author[] = response.json();
                            this.authors = authors;
                        });
    }
/*
    saveAuthorToDB(){
        this.dataService.storeData("https://booksproject-dbcdf.firebaseio.com/authors.json", this.authors[0]);
    }*/

    setAuthors(authors:Author[]){
        this.authors = authors;
        this.authorsChanged.next(this.authors.slice())
    }
}