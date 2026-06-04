import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Collaboration Model",
    description:
        "Explore BanavatNest's collaboration model — bridging academia, industry, and society through co-creation, innovation partnerships, and knowledge transfer.",
    keywords: [
        "Industry Academia Collaboration",
        "BanavatNest Collaboration",
        "Research Partnership",
        "Co-Creation Model",
        "Knowledge Transfer",
        "Innovation Bridge",
    ],
    openGraph: {
        title: "Collaboration Model | BanavatNest",
        description:
            "A dynamic bridge between academia, industry, and society — co-creating innovation through knowledge transfer and partnerships.",
        url: "https://banavatnest.com/en/bridge/collaboration",
        siteName: "BanavatNest",
        images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "BanavatNest Collaboration Model" }],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Collaboration Model | BanavatNest",
        description: "Bridging academia, industry and society through co-creation and innovation partnerships.",
        images: ["/logo.jpg"],
    },
    alternates: {
        canonical: "https://banavatnest.com/en/bridge/collaboration",
        languages: {
            en: "https://banavatnest.com/en/bridge/collaboration",
            hi: "https://banavatnest.com/hi/bridge/collaboration",
            pa: "https://banavatnest.com/pa/bridge/collaboration",
            bn: "https://banavatnest.com/bn/bridge/collaboration",
        },
    },
};

export default function CollaborationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
