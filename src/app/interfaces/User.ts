export interface User {
    id : number ;
    username : string ;
    password :string ;
    email : string ;
    enabled : boolean ;
    roles : string[];
}

export interface RegisterRequest {
  username: string;
  email: string;
  password?: string;
  roles?: string[];
  enabled: boolean;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  roles: string[];
  enabled: boolean;
  message: string;
}