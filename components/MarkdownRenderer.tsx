'use client'

import { marked } from 'marked'
import { useEffect, useRef } from 'react'
import hljs from 'highlight.js/lib/core'
import rust from 'highlight.js/lib/languages/rust'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/vs2015.css'

// Register languages
hljs.registerLanguage('rust', rust)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
  pedantic: false,
})

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Ensure horizontal rules have proper spacing by normalizing the content
  const normalizedContent = content.replace(/\n---\n/g, '\n\n---\n\n')

  // Parse markdown to HTML
  const htmlContent = marked.parse(normalizedContent) as string

  // Apply syntax highlighting after render
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement)
      })
    }
  }, [htmlContent])

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .markdown-content hr {
            margin-top: 3rem !important;
            margin-bottom: 3rem !important;
            border: none !important;
            border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
          }
        `
      }} />
      <div
        ref={contentRef}
        className="markdown-content prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-white prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-white/80 prose-p:leading-relaxed prose-li:text-white/80 prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-strong:font-semibold prose-code:text-primary-300 prose-code:bg-dark-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-[#1e1e1e] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:my-6 prose-blockquote:border-l-4 prose-blockquote:border-l-primary-400 prose-blockquote:text-white/70 prose-blockquote:pl-4 prose-ul:my-4 prose-ol:my-4 prose-li:my-2"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </>
  )
}
