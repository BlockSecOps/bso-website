import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { pageTree } from '@/app/source';
import { RootProvider } from 'fumadocs-ui/provider';

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  // Check if we're on a docs subpage or the landing page
  // The landing page will render its own layout
  return (
    <RootProvider>
      {children}
    </RootProvider>
  );
}
