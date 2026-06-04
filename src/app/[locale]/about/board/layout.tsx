import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Board of Directors",
    description:
        "Meet BanavatNest's Board of Directors — Dr. Sukhdev Singh and Dr. Sangita Roy, co-founders providing strategic leadership and research-driven innovation.",
    keywords: [
        "BanavatNest Board of Directors",
        "Dr. Sukhdev Singh",
        "Dr. Sangita Roy",
        "Co-Founders BanavatNest",
        "Research Leadership",
        "Academic Innovation",
        "IIT Patna",
        "Thapar Institute",
    ],
    openGraph: {
        title: "Board of Directors | BanavatNest",
        description:
            "Meet BanavatNest's founding directors — Dr. Sukhdev Singh and Dr. Sangita Roy — providing strategic leadership bridging academic excellence and industry innovation.",
        url: "https://banavatnest.com/en/about/board",
        siteName: "BanavatNest",
        images: [
            {
                url: "/logo.jpg",
                width: 1200,
                height: 630,
                alt: "BanavatNest Board of Directors",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Board of Directors | BanavatNest",
        description:
            "Meet Dr. Sukhdev Singh and Dr. Sangita Roy — co-founders and directors driving research-led innovation at BanavatNest.",
        images: ["/logo.jpg"],
    },
    alternates: {
        canonical: "https://banavatnest.com/en/about/board",
        languages: {
            en: "https://banavatnest.com/en/about/board",
            hi: "https://banavatnest.com/hi/about/board",
            pa: "https://banavatnest.com/pa/about/board",
            bn: "https://banavatnest.com/bn/about/board",
        },
    },
};

export default function BoardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
