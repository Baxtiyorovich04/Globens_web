'use server'

import {BannersResponse} from '@/types/banner';
import {createServerApi} from "@/API";
import {API_ENDPOINTS} from "@/utilities/constants";

export async function getBanners(): Promise<BannersResponse> {
    const api = await createServerApi();

    return (await api.get<BannersResponse>(API_ENDPOINTS.BANNERS)).data;
}
