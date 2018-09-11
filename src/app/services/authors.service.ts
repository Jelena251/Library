import { Injectable } from "@angular/core";
import { Author } from "../model/author.model";
import { Http, Response } from "@angular/http";
import { Subject } from "rxjs";

@Injectable()
export class AuthorsService{
    
    authorsChanged = new Subject<Author[]>();
    private authors : Author[] =[];

    constructor(private http:Http){
        this.getAuthorsFromDb();
    }

    getAuthors(){
        return this.authors.slice();
    }

    getAuthorByIndex(index: number){
        return this.authors[index];
    }

    addAuthor(author : Author){
        this.authors.push(author);
        this.authorsChanged.next(this.authors.slice());
    }

    updateAuthor(index:number, newAuthor : Author){
        this.authors[index] = newAuthor;
        this.authorsChanged.next(this.authors.slice());
        this.storeAuthorsToDb().subscribe(
            (response :Response) => {
                console.log(response);
            }
        );
    }

    deleteAuthor(index: number){
        this.authors.splice(index, 1);
        this.authorsChanged.next(this.authors.slice());
        this.storeAuthorsToDb().subscribe(
            (response :Response) => {
                console.log(response);
            }
        );
    }

    setAuthors(authors:Author[]){
        this.authors = authors;
        this.authorsChanged.next(this.authors.slice())
    }

    getAuthorsFromDb(){
        return this.http.get("https://library-b739f.firebaseio.com/authors.json")
        .subscribe(
            (response:Response) =>{
                const authors:Author[] = response.json();
                if(authors !== null){
                    this.authors =authors;
                }
            });
    }

    storeAuthorsToDb(){
        return this.http.put("https://library-b739f.firebaseio.com/authors.json", this.authors);
   
    }
}