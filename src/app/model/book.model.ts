import { Author } from "./author.model";
import { GenreTypes } from "./model.types/genre.types";

export class Book{
    public name: string;

    public authors: Author[];
    public preview : string;
    public price : number;
    public imagePath : string;
    public genres : GenreTypes[];

}