import Link from 'next/link'

export function BlogPromoBlurb() {
  return (
    <div className="mt-16 p-8 rounded-lg bg-gradient-to-r from-primary-400/10 to-accent-400/10 border border-primary-400/20">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-400/20 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-primary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold font-display mb-2">
            Secure Your Web3 Project with BlockSecOps
          </h3>
          <p className="text-white/70 mb-4">
            BlockSecOps is a comprehensive DevSecOps platform built specifically for Web3
            development. We help you integrate security throughout your development lifecycle—from
            smart contract auditing and vulnerability scanning to automated testing and
            continuous monitoring. Build with confidence knowing your blockchain applications
            are protected at every stage.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            Learn more about BlockSecOps
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
