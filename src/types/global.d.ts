export interface PaginationResponse {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface LinksResponse {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface ApiListResponse<T> {
    data: T[];
    links: LinksResponse;
    meta: PaginationResponse;
}
