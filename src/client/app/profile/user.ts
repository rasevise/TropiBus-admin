export class User {
    id: number;
    name: string;
    last:string;
    password:string;
    constructor(
    id: number,
    name: string,
    last:string,
    password:string){
        this.id = id;
        this.name = name;
        this.last = last;
        this.password = password;
    }
}