export class Bus {
    constructor(
    public id: number,
   public name: string,
    public driver: string,
    public route: string,
    public status: string){}
}

export class Driver {
    constructor(public id: number,
    public name: string,
    public lastName : string,
    public username :string,
    public password : string,
    public confirmpassword: string,
    public status : string){}

}

