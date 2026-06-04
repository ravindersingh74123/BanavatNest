import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Team",
    description:
        "Meet the collaborative team behind BanavatNest — students, faculty, and industry partners working together to drive research-led innovation and real-world impact.",
    keywords: [
        "BanavatNest Team",
        "Research Team",
        "Innovation Team",
        "Faculty Collaboration",
        "BanavatNest Members",
    ],
    openGraph: {
        title: "Our Team | BanavatNest",
        description:
            "Collaborative ecosystem of students, scholars, faculty, and industry experts driving innovation at BanavatNest.",
        url: "https://banavatnest.com/en/about/team",
        siteName: "BanavatNest",
        images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "BanavatNest Team" }],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Our Team | BanavatNest",
        description: "Students, scholars, and industry experts collaborating for innovation at BanavatNest.",
        images: ["/logo.jpg"],
    },
    alternates: {
        canonical: "https://banavatnest.com/en/about/team",
        languages: {
            en: "https://banavatnest.com/en/about/team",
            hi: "https://banavatnest.com/hi/about/team",
            pa: "https://banavatnest.com/pa/about/team",
            bn: "https://banavatnest.com/bn/about/team",
        },
    },
};

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
