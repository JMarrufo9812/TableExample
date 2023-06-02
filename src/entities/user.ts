export interface User {
    id: number,
    name: string,
    date: Date,
    status: boolean,
}

export interface UpdateUserValue {
    id: number,
    key: string,
    value: any
}