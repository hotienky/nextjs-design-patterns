export interface User {
    id: number;
    name: string;
}
  
export interface ServerSidePageProps {
    users: User[];
}
