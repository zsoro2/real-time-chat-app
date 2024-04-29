export interface ApiResponse<T> {
    data: T;
    page: number;
    total: number;
    last_page: number;
}