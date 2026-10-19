import type { NextConfig } from "next";
import { COPILOT_TOOL_SLUG, features } from "./src/lib/features";

// HSTS is already sent by Vercel. No full CSP yet: the GHL form embed and
// Vercel Analytics would need allow-listing first.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // A wrong slug in the risk-register guide; the role page is /ai-for/project-manager.
      {
        source: "/ai-for/project-management",
        destination: "/ai-for/project-manager",
        statusCode: 301,
      },
      // The £29 Prompt Pack is retired. Re-point this at the free Starter Pack
      // landing page once it exists (old posts and bookmarks still use /prompt-pack).
      {
        source: "/prompt-pack",
        destination: "/newsletter",
        statusCode: 301,
      },
      // Thin April 2026 guides (about 200 words each) merged into the full
      // versions on 19 Oct 2026; the database rows are archived.
      ...[
        ['getting-started-with-ai-in-construction', '/guides/how-to-use-ai-in-construction'],
        ['ai-for-cost-estimation', '/guides/ai-construction-estimating'],
        ['effective-ai-prompts-for-construction', '/guides/chatgpt-prompts-for-construction'],
        ['ai-for-progress-reports', '/ai-for/progress-reporting'],
        ['ai-risk-assessment-construction', '/guides/how-to-build-a-construction-risk-register'],
      ].map(([slug, destination]) => ({
        source: `/guides/${slug}`,
        destination,
        statusCode: 301 as const,
      })),
      // AI Construction Copilot is hidden until its relaunch (src/lib/features.ts).
      ...(features.copilot
        ? []
        : [
            {
              source: `/ai-tools/${COPILOT_TOOL_SLUG}`,
              destination: "/ai-tools",
              statusCode: 301 as const,
            },
          ]),
    ];
  },
};

export default nextConfig;
