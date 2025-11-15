import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'BlockSecOps - Unified Web3 Security Platform',
    template: '%s | BlockSecOps'
  },
  description: 'Smart contract vulnerability management that matters. BlockSecOps unifies top industry-leading scanners with 580+ detectors into actionable intelligence through real-time security dashboards, AI powered intelligence and native CI/CD integration.',
  keywords: ['Web3 security', 'smart contract security', 'blockchain security', 'DeFi security', 'Solidity security', 'smart contract audit', 'vulnerability management'],
  authors: [{ name: 'Advanced Blockchain Security' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blocksecops.com',
    title: 'BlockSecOps - Unified Web3 Security Platform',
    description: 'Smart contract vulnerability management that matters. Unifies top industry-leading scanners with 580+ detectors into actionable intelligence through real-time security dashboards, AI powered intelligence and native CI/CD integration.',
    siteName: 'BlockSecOps',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlockSecOps - Unified Web3 Security Platform',
    description: 'Vulnerability management that matters. Unifies top industry-leading scanners with 580+ detectors into actionable intelligence through AI powered intelligence and native CI/CD integration.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Yandex Verification */}
        <meta name="yandex-verification" content="3494f5d4e729c813" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HTXD0WQW9X"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HTXD0WQW9X');
          `}
        </Script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Mark that JavaScript is loaded
              document.documentElement.classList.add('js-loaded');

              // Fallback: if animations don't start within 3 seconds, force content visible
              setTimeout(function() {
                var elements = document.querySelectorAll('main [style*="opacity: 0"], main [style*="opacity:0"]');
                if (elements.length > 0) {
                  elements.forEach(function(el) {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                  });
                }
              }, 3000);
            `,
          }}
        />
      </head>
      <body className="font-sans bg-dark-400 text-white antialiased">
        {children}
      </body>
    </html>
  )
}
