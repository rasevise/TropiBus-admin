export class Stops {
    id: number;
    stop_id: number;
    name:string;
    description:string;
    latitude:number;
    longitude:number;
    status: string;
    constructor(
    id: number,
    stop_id: number,
    name:string,
    description:string,
    latitude:number,
    longitude:number,
    status: string){
        this.id = id;
        this.stop_id = stop_id;
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
    }
}