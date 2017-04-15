export class Stops {
    id: number;
    stop_id: number;
    name:string;
    description:string;
    latitude:number;
    longitude:number;
    constructor(
    id: number,
    stop_id: number,
    name:string,
    description:string,
    latitude:number,
    longitude:number,){
        this.id = id;
        this.stop_id = stop_id;
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}