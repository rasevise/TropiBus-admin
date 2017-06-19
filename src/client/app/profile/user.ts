export class User {
    id: number;
    name: string;
    last:string;
    password:string;
    email:string;
    constructor(
    id: number,
    name: string,
    last:string,
    password:string,
    email: string){
        this.id = id;
        this.name = name;
        this.last = last;
        this.password = password;
        this.email = email;
    }
}