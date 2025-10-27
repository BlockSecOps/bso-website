import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';
import { withPayload } from '@payloadcms/next/withPayload'

const withMDX = createMDX();

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default withPayload(withMDX(nextConfig));
