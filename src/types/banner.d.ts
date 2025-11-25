export interface Banner {
    id: number;
    title: string;
    description: string;
    image_url: string;
    url: string;
    order: number;
    created_at: string;
    updated_at: string;
}

export interface BannersResponse {
    data: Banner[];
}
