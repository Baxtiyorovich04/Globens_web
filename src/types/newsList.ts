import type {NewsListResponse} from "@/types/news";

export interface NewsListProps {
    newsResource: Promise<NewsListResponse>;
    limit?: number;
    showMoreButton?: boolean;
}
