import {LinksResponse, PaginationResponse} from "@/types/global";

export interface NewsItem {
    id: number;
    title: string;
    slug: string;
    summary: string;
    image_url: string;
    secondary_image_url?: string;
    category?: string;
    created_at: string;
    updated_at: string;
    content: string;
}


export interface NewsListProps {
    newsResource: Promise<NewsListResponse>;
    limit?: number;
    showMoreButton?: boolean;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface NewsListResponse {
    data: NewsItem[];
    links: LinksResponse;
    meta: PaginationResponse;
}

export interface NewsDetailResponse {
    data: NewsItem;
}
