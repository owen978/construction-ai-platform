import type { NextConfig } from "next";
import { COPILOT_TOOL_SLUG, features } from "./src/lib/features";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Linked from the risk-register guide before the role page's slug was fixed.
      {
        source: "/ai-for/project-management",
        destination: "/ai-for/project-manager",
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
