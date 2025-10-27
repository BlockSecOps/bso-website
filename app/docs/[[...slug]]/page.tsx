import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import React from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { pageTree } from '@/app/source';

async function getDoc(slug: string[]) {
  const payload = await getPayload({ config });

  const slugPath = slug.length > 0 ? slug.join('/') : 'index';

  const docs = await payload.find({
    collection: 'docs',
    where: {
      slug: {
        equals: slugPath,
      },
      status: {
        equals: 'published',
      },
    },
    limit: 1,
  });

  return docs.docs[0] || null;
}

function renderLexicalContent(content: SerializedEditorState) {
  // Simple renderer for Lexical content
  // In production, you'd want a more robust renderer
  if (!content?.root?.children) return null;

  return content.root.children.map((node: any, index: number) => {
    if (node.type === 'paragraph') {
      return (
        <p key={index} className="mb-4">
          {node.children?.map((child: any, childIndex: number) => {
            if (child.type === 'text') {
              let text = <span key={childIndex}>{child.text}</span>;
              if (child.format & 1) text = <strong key={childIndex}>{child.text}</strong>;
              if (child.format & 2) text = <em key={childIndex}>{child.text}</em>;
              return text;
            }
            return null;
          })}
        </p>
      );
    }

    if (node.type === 'heading') {
      const HeadingTag = `h${node.tag}` as React.ElementType;
      return (
        <HeadingTag key={index} className="font-bold mb-3">
          {node.children?.map((child: any, childIndex: number) => child.text || '').join('')}
        </HeadingTag>
      );
    }

    return null;
  });
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const doc = await getDoc(params.slug || []);

  if (!doc) notFound();

  return (
    <DocsLayout
      tree={pageTree}
      nav={{
        title: 'BlockSecOps',
        url: process.env.NEXT_PUBLIC_SERVER_URL || 'https://blocksecops.com',
      }}
    >
      <div className="container max-w-4xl py-8">
        <h1 className="text-4xl font-bold mb-6">{doc.title}</h1>

        {doc.excerpt && (
          <p className="text-lg text-gray-400 mb-8">{doc.excerpt}</p>
        )}

        <div className="prose prose-invert max-w-none">
          {renderLexicalContent(doc.content as SerializedEditorState)}
        </div>

        {doc.category && (
          <div className="mt-8 pt-4 border-t border-gray-700">
            <span className="text-sm text-gray-400">Category: </span>
            <span className="text-sm text-blue-400">{doc.category}</span>
          </div>
        )}
      </div>
    </DocsLayout>
  );
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });

  const docs = await payload.find({
    collection: 'docs',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 1000,
  });

  return docs.docs.map((doc: any) => ({
    slug: doc.slug.split('/'),
  }));
}
