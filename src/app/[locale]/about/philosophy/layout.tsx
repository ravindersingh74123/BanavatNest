import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Philosophy & Values",
    description:
        "BanavatNest's philosophy centers on building with purpose, analytical thinking, nurturing curiosity, and translating research into scalable, impactful solutions for society.",
    keywords: [
        "BanavatNest Philosophy",
        "BanavatNest Values",
        "Research Philosophy",
        "Innovation Values",
        "Curiosity-Driven Innovation",
        "Purpose-Driven Research",
    ],
    openGraph: {
        title: "Philosophy & Values | BanavatNest",
        description:
            "Our unified philosophy: building with purpose, nurturing curiosity, and translating research into scalable solutions.",
        url: "https://banavatnest.com/en/about/philosophy",
        siteName: "BanavatNest",
        images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "BanavatNest Philosophy & Values" }],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Philosophy & Values | BanavatNest",
        description: "Building with purpose and nurturing curiosity — the core values driving BanavatNest.",
        images: ["/logo.jpg"],
    },
    alternates: {
        canonical: "https://banavatnest.com/en/about/philosophy",
        languages: {
            en: "https://banavatnest.com/en/about/philosophy",
            hi: "https://banavatnest.com/hi/about/philosophy",
            pa: "https://banavatnest.com/pa/about/philosophy",
            bn: "https://banavatnest.com/bn/about/philosophy",
        },
    },
};

export default function PhilosophyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
