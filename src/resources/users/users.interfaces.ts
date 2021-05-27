export interface IUserWithoutPassword {
    id: string;
    name: string;
    login: string;
}

export interface IUserWithoutId {
    name: string;
    login: string;
    password: string;
}
