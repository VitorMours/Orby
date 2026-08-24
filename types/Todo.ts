export interface Todo {
    id: string,
    title: string,
    content: string,
    conclusionStatus: boolean,
    onChange: (checked: boolean) => void
};