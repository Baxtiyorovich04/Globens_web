"use server";

import axios from 'axios';
import {API_CONFIG, API_URL} from '@/utilities/constants';
import {getLocale} from "next-intl/server";

export async function createServerApi() {
    return axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': await getLocale(),
        },
        timeout: API_CONFIG.TIMEOUT
    });
}
