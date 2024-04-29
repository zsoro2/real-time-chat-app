export interface UserPagination {
    data: UserList[],
    page: number,
    total: number,
    last_page: number
}

export interface UserList {
    id: number,
    username: string,
    url: string | null
}

export interface User {
    id: number;
    username: string;
    email: string;
    profileImage: string | null;
}


export interface UpdateUserResponse {
    data: User;
    page: number;
    total: number;
    last_page: number;
}