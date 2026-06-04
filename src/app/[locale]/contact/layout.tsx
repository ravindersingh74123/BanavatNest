import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with BanavatNest for research collaborations, innovation partnerships, academic engagements, and project inquiries. Based in India, serving globally.",
    keywords: [
        "Contact BanavatNest",
        "Research Collaboration",
        "Innovation Partnership",
        "Industry Academia",
        "BanavatNest Contact",
        "R&D Inquiry",
    ],
    openGraph: {
        title: "Contact Us | BanavatNest",
        description:
            "Reach out to BanavatNest for research collaborations, innovation partnerships, and academic engagements.",
        url: "https://banavatnest.com/en/contact",
        siteName: "BanavatNest",
        images: [
            {
                url: "/logo.jpg",
                width: 1200,
                height: 630,
                alt: "Contact BanavatNest",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us | BanavatNest",
        description: "Reach out to BanavatNest for research collaborations and innovation partnerships.",
        images: ["/logo.jpg"],
    },
    alternates: {
        canonical: "https://banavatnest.com/en/contact",
        languages: {
            en: "https://banavatnest.com/en/contact",
            hi: "https://banavatnest.com/hi/contact",
            pa: "https://banavatnest.com/pa/contact",
            bn: "https://banavatnest.com/bn/contact",
        },
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
