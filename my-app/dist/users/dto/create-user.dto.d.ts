export declare class CreateUserDto {
    id: string;
    name: string;
    login: string;
    password: string;
    tasks: Task[];
}
export interface Task {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string;
    board: string;
    columnId: string;
}
