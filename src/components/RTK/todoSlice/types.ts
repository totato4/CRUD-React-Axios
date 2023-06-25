
export interface Itodo {
    id: number;
    completed: boolean;
    title: string;
}

export enum Status {
    LOADING = "loading",
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface ItodoSliceState {
    todo: Itodo[],
    loadItem: Itodo | {},
    status: Status;
}