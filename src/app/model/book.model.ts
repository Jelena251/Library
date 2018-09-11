import { Author } from "./author.model";
export class Book{
    public name: string;

    public authors: Author[];
    public preview : string;
    public price : number;
    public imagePath : string;
    public genres : string[];

}