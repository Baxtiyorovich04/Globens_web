'use server'

import {NewsDetailResponse, NewsListResponse} from "@/types/news";
import {notFound} from 'next/navigation';
import {API_ENDPOINTS} from "@/utilities/constants";
import {createServerApi} from "@/API";

export async function getNews(page: number = 1, perPage: number = 15): Promise<NewsListResponse> {
    const api = await createServerApi();

    try {
        return (await api.get<NewsListResponse>(API_ENDPOINTS.NEWS, {
            params: {
                page,
                per_page: perPage
            }
        })).data;
    } catch (error) {
        console.error('Error in news API request:', error);
        throw error;
    }
}

export async function getNewsDetail(slug: string): Promise<NewsDetailResponse> {
    const api = await createServerApi();

    try {
        return (await api.get<NewsDetailResponse>(API_ENDPOINTS.NEWS + `/${slug}`)).data;
    } catch (error) {
        console.error('Error fetching news detail:', error);
        notFound();
    }
}
