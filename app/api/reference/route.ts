import { ApiReference } from '@scalar/nextjs-api-reference'

const config = {
  spec: {
    url: '/openapi.json',
  },
  theme: 'purple' as const,
  darkMode: true,
  customCss: `
    /* Match BlockSecOps design system */
    :root {
      --scalar-color-1: #00D4FF;
      --scalar-color-2: #8B5CF6;
      --scalar-color-3: #0A0E27;
      --scalar-color-accent: #00D4FF;
      --scalar-background-1: #0A0E27;
      --scalar-background-2: #0F1429;
      --scalar-background-3: #141937;
      --scalar-background-accent: #00D4FF;
      --scalar-border-color: rgba(255, 255, 255, 0.1);
    }

    /* Font matching */
    .scalar-app {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .scalar-code,
    .scalar-app code {
      font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', monospace;
    }

    /* Glassmorphism effects */
    .scalar-card {
      background: rgba(255, 255, 255, 0.05) !important;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 12px;
    }

    /* Gradient accents */
    .scalar-button--primary {
      background: linear-gradient(135deg, #00D4FF 0%, #8B5CF6 100%) !important;
      border: none !important;
    }

    .scalar-button--primary:hover {
      filter: brightness(1.1);
    }

    /* Neon glow effects */
    .scalar-tag {
      border: 1px solid rgba(0, 212, 255, 0.3);
      background: rgba(0, 212, 255, 0.1);
      color: #00D4FF;
    }

    /* Endpoint badges */
    .scalar-method {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }

    .scalar-method--get {
      color: #00FFF0;
    }

    .scalar-method--post {
      color: #00D4FF;
    }

    .scalar-method--put {
      color: #8B5CF6;
    }

    .scalar-method--delete {
      color: #FF4B8B;
    }

    /* Sidebar styling */
    .scalar-sidebar {
      background: #0A0E27 !important;
      border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
    }

    /* Scrollbar */
    .scalar-app ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    .scalar-app ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    .scalar-app ::-webkit-scrollbar-thumb {
      background: rgba(0, 212, 255, 0.3);
      border-radius: 4px;
    }

    .scalar-app ::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 212, 255, 0.5);
    }

    /* Headers */
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Space Grotesk', sans-serif !important;
    }

    /* Response examples */
    .scalar-example {
      background: rgba(0, 0, 0, 0.4) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 8px;
    }

    /* Authentication section */
    .scalar-authentication {
      background: rgba(139, 92, 246, 0.1) !important;
      border: 1px solid rgba(139, 92, 246, 0.3) !important;
    }
  `,
}

export const GET = ApiReference(config)
