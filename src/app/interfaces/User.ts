export interface User {
    id : number ;
    username : string ;
    password :string ;
    email : string ;
    enabled : boolean ;
    roles : string[];
}