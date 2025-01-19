import type { SiteConfig, ContactConfig } from "@/types"

/* ====================
[> WEBSITE CONFIG <]
-- Fill the details about your website
 ==================== */

const baseUrl = "https://nextlanding.rdev.pro"

export const siteConfig: SiteConfig = {
    name: "PT. Sarana Lintas Medika",
    author: "Calterras",
    description:
        "Trusted Medical Tools And Service Vendor.",
    keywords: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Radix UI",
        "shadcn/ui",
        "Landing Page",
        "Template",
        "Starter",
    ],
    url: {
        base: baseUrl,
        author: "https://redpangilinan.live",
    },
    ogImage: `${baseUrl}/og.jpg`,
}

export const contactConfig: ContactConfig = {
    email: "marketing@saranalintasmedika.co.id",
}
