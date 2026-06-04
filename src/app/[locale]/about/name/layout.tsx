import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Name",
    description:
        "Discover the meaning behind BanavatNest — where 'Banavat' represents making and creating, and 'Nest' symbolizes a safe, nurturing space for innovation and growth.",
    keywords: [
        "BanavatNest Meaning",
        "BanavatNest Name",
        "Banavat Nest",
        "Innovation Ecosystem",
        "Brand Story BanavatNest",
    ],
    openGraph: {
        title: "Our Name | BanavatNest",
        description:
            "'Banavat' means making and creating; 'Nest' symbolizes nurturing. Together: a space where ideas are built and brought to life.",
        url: "https://banavatnest.com/en/about/name",
        siteName: "BanavatNest",
        images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "The Meaning of BanavatNest" }],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Our Name | BanavatNest",
        description: "The story and meaning behind the name BanavatNest — creation and nurturing of innovation.",
        images: ["/logo.jpg"],
    },
    alternates: {
        canonical: "https://banavatnest.com/en/about/name",
        languages: {
            en: "https://banavatnest.com/en/about/name",
            hi: "https://banavatnest.com/hi/about/name",
            pa: "https://banavatnest.com/pa/about/name",
            bn: "https://banavatnest.com/bn/about/name",
        },
    },
};

export default function NameLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
