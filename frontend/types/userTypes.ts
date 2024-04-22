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