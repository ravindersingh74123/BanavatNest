import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mission & Vision",
    description:
        "BanavatNest's mission is to create and nurture ideas through R&D, shaping curiosity-driven concepts into innovative, practical, and scalable solutions for real-world impact.",
    keywords: [
        "BanavatNest Mission",
        "BanavatNest Vision",
        "Research Mission",
        "Innovation Mission",
        "R&D Philosophy",
        "BanavatNest Purpose",
    ],
    openGraph: {
        title: "Mission & Vision | BanavatNest",
        description:
            "Research-driven innovation — nurturing ideas from curiosity to real-world impact through systematic investigation.",
        url: "https://banavatnest.com/en/about/mission",
        siteName: "BanavatNest",
        images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "BanavatNest Mission & Vision" }],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mission & Vision | BanavatNest",
        description: "Nurturing curiosity-driven ideas into practical, scalable innovation at BanavatNest.",
        images: ["/logo.jpg"],
    },
    alternates: {
        canonical: "https://banavatnest.com/en/about/mission",
        languages: {
            en: "https://banavatnest.com/en/about/mission",
            hi: "https://banavatnest.com/hi/about/mission",
            pa: "https://banavatnest.com/pa/about/mission",
            bn: "https://banavatnest.com/bn/about/mission",
        },
    },
};

export default function MissionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
