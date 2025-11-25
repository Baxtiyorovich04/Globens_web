import {NextConfig} from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    output: "standalone",
    eslint: {
        ignoreDuringBuilds: true,
    },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/routing.ts');

export default withNextIntl(nextConfig);
