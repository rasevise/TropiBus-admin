export class Routes {
    route_id: number;
    color: string;    
    route_name: string;
    route_description: string;
    route_area: string;
    status: string;
    path: any[];
    constructor(
    route_id: number,
    color: string, 
    route_name: string,
    route_description: string,
    route_area: string,
    status: string,
    path: any[]){
        this.route_id = route_id;
        this.color = color;
        this.route_name = route_name;
        this.route_description = route_description;
        this.route_area = route_area;
        this.status = status;
        this.path = path;
    }
}