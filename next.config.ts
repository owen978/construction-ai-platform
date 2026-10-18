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
      // landing page once it exists. 27 guides still link /prompt-pack in their text.
      {
        source: "/prompt-pack",
        destination: "/newsletter",
        statusCode: 301,
      },
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
