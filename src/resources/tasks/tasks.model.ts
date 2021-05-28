import { v4 as uuidv4 } from 'uuid';

class Task {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string;
    columnId: string;
    static instances: Task[];

    constructor({
        id = uuidv4(),
        title = 'title',
        order = 1,
        description = 'description',
        userId = 'userId',
        boardId = 'boardId',
        columnId = 'columnId',
    } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
        Task.instances.push(this);
    }
}

export default Task;
