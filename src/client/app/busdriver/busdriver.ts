export class Bus {
    constructor(
    public id: number,
   public name: string,
    public driver: number,
    public route: number,
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

