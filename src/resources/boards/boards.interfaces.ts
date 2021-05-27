export interface IColumn {
    title: string;
    order: number;
}

export interface IBoardWithoutId {
    title: string;
    columns: IColumn[];
}
