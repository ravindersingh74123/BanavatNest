import type { Metadata } from 'next';
import PortfolioPage, { PortfolioData } from '@/components/PortfolioPage';

// Real data integrated
const SANGITA_DATA: PortfolioData = {
    id: "dr-sangita-roy",
    name: "Dr. Sangita Roy",
    role: "Ph.D. (IIT Patna)",
    image: "/images/Director/Sangita.jpeg",
    bio: `
Dr. Sangita Roy is currently working as an Assistant Professor in the Department of Computer Science and Engineering (CSE) at Thapar Institute of Engineering and Technology, Patiala, Punjab. She did her Ph.D. from the Indian Institute of Technology Patna. During her Ph.D., she got an opportunity of having an internship at TCS Innovation Lab, Fellowship from TCS and Project funding from DST India. Dr. Roy has also worked as a Post Doctoral Research fellow under the supervision of Prof. Yuval Shavitt in the Department of Electrical Engineering at Tel Aviv University, Israel

Dr. Roy's research interests include Cryptography and Network Security, Image Processing and Internet of Things (IoT) and Deep Learning. She went on publishing in various Journals of repute including Security and Communication Network, International Journal of Communication Networks and Distributed Systems. She has also published in well known conferences such as GLOBECOM, SASOW, COMSNETS etc., and has presented her research work through poster presentations at well known platforms including IEEE SASO 2015 at MIT, Cambridge, USA and Microsoft Tech Vista 2013 at Coimbatore, India.

Dr. Sangita Roy has a keen interest on creativity. She is a professional Kathak dancer and has achieved many awards in Dance, Art, Debate, Speech, and Recitations. She likes to represent herself as a learner and over the time she has completed different courses on acting, modelling and photography from Kolkata Film and Television Institute. She is a found of playing musical instruments like Harmonium, Violin, Keyboard and Harmonica at her leisure. She is not foodie but she loves to cook for others, and she has a huge collection of multi cultural recipes. By heart and soul she is a solo traveler, and her dream is to complete a world trip during her life time.`,

    // ─── JOB ───────────────────────────────────────────────────────────────────
    job: {
        summary: `Dr. Sangita Roy is currently working as an Assistant Professor in the Department of Computer Science and Engineering (CSE) at Thapar Institute of Engineering and Technology, Patiala, Punjab. She has recently worked as a Senior Research Scientist on BlockChain Technology with distinguished Prof. Rudrapatna K. Shyamsundar at ISRDC center, IIT Bombay. She has also worked as a Post Doctoral Research fellow under the supervision of Prof. Yuval Shavitt in the Department of Electrical Engineering at Tel Aviv University, Israel.`,
        positions: [
            {
                title: "Assistant Professor",
                organization: "Thapar Institute of Engineering and Technology (TIET)",
                period: "July 2016 – Present",
                description: `Joined after completing Ph.D. from IIT Patna. Teaching courses on Cyber Security, Data Communications and Networking, Image Processing, Database Management Systems, Computer Graphics, and Embedded Systems (B.Tech); Data Science and Machine Learning (M.Tech). Served as Technical Coordinator of ELC (Experiential Learning Center) for Robotic Arm activities. Served as Program Officer in National Service Scheme (NSS), TIET Unit.`,
            },
            {
                title: "Senior Research Scientist",
                organization: "Indian Institute of Technology Bombay (IIT Bombay)",
                department: "ISRDC Center",
                location: "Mumbai, Maharashtra",
                startDate: null,
                endDate: null,
                description: `Worked on BlockChain Technology under the supervision of Prof. Rudrapatna K. Shyamsundar.`,
            },
            {
                title: "Post Doctoral Research Fellow",
                organization: "Tel Aviv University",
                department: "Department of Electrical Engineering",
                location: "Tel Aviv, Israel",
                startDate: null,
                endDate: "2020",
                description: `Post Doctoral Research under the supervision of Prof. Yuval Shavitt.`,
            },
            {
                title: "Assistant Professor",
                organization: "Kalinga Institute of Industrial Technology (KIIT)",
                department: "Computer Science and Engineering",
                location: "Bhubaneswar, Odisha",
                startDate: "02/08/2008",
                endDate: "24/12/2010",
                description: `Taught courses on DBMS, Cryptography and Network Security to B.Tech and M.Tech students.`,
            },
            {
                title: "Lecturer",
                organization:
                    "Dhaneswar Rath Institute of Engineering and Management Studies / Konark Institute of Science and Technology Jatni",
                department: "Computer Science and Engineering",
                location: "Odisha",
                startDate: null,
                endDate: null,
                description: `Worked as a Lecturer for three years.`,
            },
        ],
    },

    // ─── RESEARCH ──────────────────────────────────────────────────────────────
    research: {
        summary: `Dr. Sangita Roy's research interests include Cryptography and Network Security, Image Processing and Internet of Things (IoT), and Deep Learning. She has published in journals of repute including Security and Communication Networks, International Journal of Communication Networks and Distributed Systems, Computers and Electrical Engineering, and Computer Communications (Elsevier). She has also published in well-known conferences such as GLOBECOM, SASOW, and COMSNETS, and has presented research through poster presentations at IEEE SASO 2015 at MIT, Cambridge, USA and Microsoft Tech Vista 2013 at Coimbatore, India.`,

        publications: [
            // ── Books ──
            {
                type: "book-edited",
                title:
                    "Artificial Intelligence and Deep Learning for Computer Network Management and Analysis",
                authors: [
                    "Dr. Sangita Roy",
                    "Dr. Rajat Subhra Chakraborty",
                    "Dr. Jimson Mathew",
                    "Dr. Arka Prokash Mazumdar",
                    "Dr. Sudeshna Chakraborty",
                ],
                publisher: "CRC, Taylor & Francis",
                year: null,
            },
            {
                type: "book-authored",
                title: "Machine Learning and Deep Learning Meet Computer Networks",
                authors: [
                    "Sangita Roy",
                    "Pranesh Santikellur",
                    "Rajat Subhra Chakraborty",
                ],
                publisher: "Springer",
                year: null,
            },

            // ── Journal Publications ──
            {
                type: "journal",
                title:
                    "Low-cost smart irrigation solution for efficient water use and requirement prediction",
                authors: ["Roy S", "Chakraborty R.S."],
                journal: "Computers and Electrical Engineering",
                volume: "125",
                year: 2025,
                doi: "https://doi.org/10.1016/j.compeleceng.2025.110420",
                impactFactor: 4.0,
            },
            {
                type: "journal",
                title:
                    "Securing IIoT systems against DDoS attacks with adaptive moving target defense strategies",
                authors: ["Swati", "Roy S.", "Singh J.", "Mathew J."],
                journal: "Scientific Reports",
                volume: "15",
                articleNumber: "9558",
                year: 2025,
                doi: "https://doi.org/10.1038/s41598-025-93138-7",
                impactFactor: 3.8,
            },
            {
                type: "journal",
                title:
                    "Design and Analysis of DDoS-Mitigating Network Architecture",
                authors: ["Swati", "Roy S.", "Singh J.", "Mathew J."],
                journal: "International Journal of Information Security",
                volume: "22",
                pages: "333–345",
                year: 2023,
                doi: "https://doi.org/10.1007/s10207-022-00635-1",
                impactFactor: 3.2,
            },
            {
                type: "journal",
                title: "Fast and lean encrypted Internet traffic classification",
                authors: ["Roy S.", "Shapira T.", "Shavitt Y."],
                journal: "Computer Communications",
                publisher: "Elsevier",
                volume: "186",
                pages: "166–173",
                year: 2022,
                doi: "https://doi.org/10.1016/j.comcom.2022.02.003",
                impactFactor: 5.047,
            },
            {
                type: "journal",
                title:
                    "Distributed Star Coloring of Network for IP Traceback",
                authors: ["Roy S.", "Sairam A.S."],
                journal: "International Journal of Information Security",
                publisher: "Springer",
                volume: "17",
                pages: "315–326",
                year: 2017,
                doi: "10.1007/s10207-017-0366-0",
                impactFactor: 2.427,
            },
            {
                type: "journal",
                title:
                    "Coloring networks for attacker identification and response",
                authors: ["Sairam A.S.", "Roy S.", "Sahay R."],
                journal: "Security and Communication Networks",
                volume: "8",
                pages: "751–768",
                year: 2015,
                impactFactor: 1.968,
            },
            {
                type: "journal",
                title: "Extended deterministic edge router marking",
                authors: ["Saurabh S.", "Roy S.", "Sairam A.K."],
                journal:
                    "International Journal of Communication Networks and Distributed Systems",
                volume: "13",
                pages: "169–186",
                year: 2014,
            },
            {
                type: "journal",
                title:
                    "A novel approach to prevent SQL injection attack using URL filter",
                authors: ["Roy S.", "Singh A.K.", "Sairam A.S."],
                journal:
                    "International Journal of Innovation, Management and Technology",
                volume: "3",
                year: 2012,
            },
            {
                type: "journal",
                title: "Detecting and defeating SQL injection attacks",
                authors: ["Roy S.", "Singh A.K.", "Sairam A.S."],
                journal:
                    "International Journal of Information and Electronics Engineering",
                year: 2011,
            },

            // ── Conference Publications ──
            {
                type: "conference",
                title:
                    "Leveraging Deep Learning for Efficient Classification of Cauliflower Leaf Diseases",
                authors: ["Roy N.", "Tiwari R.G.", "Roy S."],
                conference:
                    "3rd International Conference on Sustainable Computing and Data Communication Systems (ICSCDS-2025)",
                location:
                    "Erode Sengunthar Engineering College, Erode, Tamil Nadu, India",
                date: "August 6–8, 2025",
            },
            {
                type: "conference",
                title:
                    "The Evolving Landscape of Network Threats: Classification, Defense Challenges, and Future Directions",
                authors: [
                    "Roy N.",
                    "Tiwari R.G.",
                    "Roy S.",
                    "Agarwal A.K.",
                    "Garg A.",
                    "Gupta N.",
                ],
                conference:
                    "8th International Conference on Computing Methodologies and Communication (ICCMC 2025)",
                location: "Surya Engineering College, Erode, Tamil Nadu, India",
                date: "July 23–25, 2025",
            },
            {
                type: "conference",
                title:
                    "Soil Texture Prediction: Advances in Remote Sensing, Image Analysis, and Machine Learning",
                authors: ["Roy S.", "Ansal D.", "Kumar M."],
                conference:
                    "Fourth International Conference on Smart Technologies, Communication and Robotics (IEEE-STCR-2025)",
                location:
                    "Bannari Amman Institute of Technology, Sathyamangalam, Erode, India",
                date: "May 09–10, 2025",
            },
            {
                type: "conference",
                title:
                    "Stacking-Based Machine Learning Approach for Anomaly Detection in Embedded System Network Traffic",
                authors: ["Roy N.", "Tiwari R.G.", "Roy S."],
                conference:
                    "Fourth International Conference on Smart Technologies, Communication and Robotics (IEEE-STCR-2025)",
                location:
                    "Bannari Amman Institute of Technology, Sathyamangalam, Erode, India",
                date: "May 09–10, 2025",
            },
            {
                type: "conference",
                title: "Attack Traffic Classification using Deep Learning",
                authors: ["Roy N.", "Kapoor M.", "Roy S."],
                conference:
                    "PhD Forum, 19th International Conference on Information Systems Security (ICISS 2023)",
                location: "NIT Raipur",
                date: "December 16–19, 2023",
            },
            {
                type: "conference",
                title:
                    "Soil Textures and nutrients estimation using remote sensing data in North India - Punjab Region",
                authors: ["Dhiman G.", "Bhattacharya J.", "Roy S."],
                conference:
                    "International Conference on Machine Learning and Data Engineering (ICMLDE-2022)",
                publisher: "Elsevier",
                location: "UPES, Dehradun, India",
                date: "07–08 September 2022",
            },
            {
                type: "conference",
                title: "High Data Rate Audio Steganography",
                authors: ["Roy S.", "Kapoor V."],
                conference:
                    "SPRINGER International Conference on Innovative Computing and Communication (ICICC-2019)",
                location: "Technical University, Ostrava, Czech Republic",
                date: "21–22 March 2019",
            },
            {
                type: "conference",
                title: "IP Traceback in Dynamic Network",
                authors: ["Roy S.", "Chawla H.", "Sairam A.S."],
                conference:
                    "SPRINGER 2nd ISEA International Conference on Security & Privacy (ISEA-ISAP 2018)",
                location: "MNIT, Jaipur",
                date: "9–11 January 2018",
            },
            {
                type: "conference",
                title:
                    "Efficient Copy-Move Forgery Detection using Blur and Rotation Invariant Technique",
                authors: ["Verma A.", "Kapoor V.", "Roy S."],
                conference:
                    "3rd International Conference on Network Security (ICNS 2018)",
                location: "Taipei, Taiwan",
                date: "December 14–16, 2018",
            },
            {
                type: "conference",
                title:
                    "Using CAPTCHA selectivity to mitigate HTTP-based attacks",
                authors: ["Sairam A.S.", "Roy S.", "Dwivedi S.K."],
                conference:
                    "IEEE Global Communications and Information System (GLOBECOM-2015)",
                location: "San Diego, USA",
                date: "6–10 December 2015",
            },
            {
                type: "conference",
                title: "Network attack detection and mitigation",
                authors: ["Roy S.", "Sairam A.S."],
                conference:
                    "IEEE 9th International Conference on Self-Adaptive and Self-Organizing Systems Workshops (SASOW-2015)",
                location: "Cambridge, MA, USA",
                date: "21–25 September 2015",
                doi: "10.1109/SASOW.2015.33",
                pages: "168–173",
            },
            {
                type: "conference",
                title: "IP traceback in star colored networks",
                authors: ["Roy S.", "Singh A.", "Sairam A.S."],
                conference:
                    "IEEE 5th International Conference on Communication Systems and Networks (COMSNETS-2013)",
                location: "Bangalore, India",
                date: "7–10 January 2013",
                doi: "10.1109/COMSNETS.2013.6465570",
                pages: "1–9",
            },
            {
                type: "conference",
                title:
                    "Audio steganography using LSB encoding technique with increased capacity and bit error rate optimization",
                authors: ["Roy S.", "Parida J.", "Singh A.K.", "Sairam A.S."],
                conference:
                    "ACM 2nd International Conference on Computational Science, Engineering and Information Technology (CCSEIT-2012)",
                location:
                    "Avinashilingam University, Coimbatore, Tamil Nadu, India",
                date: "26–28 October 2012",
                doi: "10.1145/2393216.2393279",
                pages: "372–376",
            },
            {
                type: "conference",
                title:
                    "A network based vulnerability scanner for SQLI attacks in web applications",
                authors: ["Singh A.K.", "Roy S."],
                conference:
                    "IEEE 1st International Conference on Recent Advances in Information Technology (RAIT-2012)",
                location: "ISM Dhanbad, Jharkhand, India",
                date: "15–17 March 2012",
                doi: "10.1109/RAIT.2012.6194594",
                pages: "585–590",
            },
            {
                type: "conference",
                title:
                    "A novel approach to format based text steganography",
                authors: ["Roy S.", "Manasmita M."],
                conference:
                    "ACM International Conference on Communication, Computing & Security (ICCCS-2011)",
                location: "NIT Rourkela, Orissa, India",
                date: "2011",
                doi: "10.1145/1947940.1948046",
                pages: "511–516",
            },
            {
                type: "conference",
                title:
                    "Analyzing SQL Meta characters and preventing SQL injection attacks using meta filter",
                authors: ["Roy S.", "Singh A.K.", "Sairam A.S."],
                conference:
                    "International Conference on Information and Electronics Engineering (ICIEE-2011)",
                location: "Bangkok, Thailand",
                date: "28–29 May 2011",
                pages: "167–170",
            },
            {
                type: "conference",
                title:
                    "Intelligent framework for steganography using LSB encoding for audio data",
                authors: ["Tripathy A.", "Roy S."],
                conference:
                    "National Seminar on Recent Advances on Information Technology (RAIT-2009)",
                location: "ISM Dhanbad, Jharkhand, India",
                date: "2009",
            },

            // ── Patents ──
            {
                type: "patent-granted",
                title: "An Automatic, Integrated Pond and Livestock Shelter",
                patentNumber: "Indian Patent No. 498631",
                inventors: ["Dr. Sangita Roy"],
            },
            {
                type: "patent-granted",
                title:
                    "An Integrated, Automated, Solar Power Operated, Floating Fish-Feeding Assembly System",
                patentNumber: "Indian Patent No. 496582",
                inventors: ["Dr. Sangita Roy"],
            },
            {
                type: "patent-published",
                title: "An Automated and Integrated Fruit Picking Device",
                applicationNumber: "202411093705",
                inventors: ["Dr. Sangita Roy"],
            },
            {
                type: "patent-published",
                title:
                    "An Internet of Things Protection System for Security Enhancement, Control and Unification",
                applicationNumber: "202511040249",
                inventors: [
                    "Dr. Sangita Roy",
                    "Dhruv Bansal",
                    "Rohan Thakur",
                    "Nischay Morya",
                    "Shivam Khurana",
                    "Swapnil Chhabra",
                ],
            },
        ],

        coAuthors: [
            { name: "Prof. Yuval Shavitt", affiliation: "Tel Aviv University, Israel" },
            { name: "Dr. Ashok Singh Sairam", affiliation: "IIT Patna" },
            { name: "Dr. Samrat Mondal", affiliation: "IIT Patna" },
            { name: "Dr. Rajat Subhra Chakraborty", affiliation: "IIT Kharagpur" },
            { name: "Dr. Jimson Mathew", affiliation: "IIT Patna" },
            { name: "Dr. Arka Prokash Mazumdar", affiliation: "MNIT Jaipur" },
            { name: "Dr. Sudeshna Chakraborty", affiliation: "Sharda University" },
            { name: "Pranesh Santikellur", affiliation: "" },
            { name: "Tal Shapira", affiliation: "Tel Aviv University, Israel" },
            { name: "Prof. Rudrapatna K. Shyamsundar", affiliation: "IIT Bombay" },
        ],

        reviewerJournals: [], // Not available in source data
    },

    // ─── EDUCATION ─────────────────────────────────────────────────────────────
    education: {
        summary: `Dr. Sangita Roy did her PhD from Indian Institute of Technology Patna (IIT Patna) under the supervision of Dr. Ashok Singh Sairam and Dr. Samrat Mondal. She got an opportunity of having Internship at TCS Innovation Lab, Fellowship from TCS and Project funding from DST India during her PhD. She completed her M.Tech. and B.Tech in Computer Science and Engineering from KIIT University and Dumkal Institute of Engineering and Technology respectively.`,
        degrees: [
            {
                level: "Post Doctorate",
                field: "Electrical Engineering (Network Security)",
                institution: "Tel Aviv University",
                location: "Tel Aviv, Israel",
                year: "2020",
                supervisor: "Prof. Yuval Shavitt",
            },
            {
                level: "Ph.D.",
                field: "Computer Science and Engineering",
                institution: "Indian Institute of Technology Patna (IIT Patna)",
                location: "Patna, Bihar",
                year: "2016",
                supervisor: "Dr. Ashok Singh Sairam, Dr. Samrat Mondal",
            },
            {
                level: "M.Tech.",
                field: "Computer Science and Engineering",
                institution: "KIIT University",
                location: "Bhubaneswar, Odisha",
                year: null,
            },
            {
                level: "B.Tech.",
                field: "Computer Science and Engineering",
                institution: "Dumkal Institute of Engineering and Technology",
                location: "West Bengal",
                year: null,
            },
        ],
        awards: [
            // Academic / Professional Honors
            { category: "honor", title: "Internship at TCS Innovation Lab" },
            { category: "honor", title: "Fellowship from TCS during PhD" },
            { category: "honor", title: "Project funding from DST India" },
            { category: "honor", title: "National Scholarship Award in Class IV and VIII" },
            {
                category: "honor",
                title: "SEED Money Grant (8 Lac) from TIET",
            },
            {
                category: "honor",
                title: "Internal Project Grant (8 Lac under CEEMS) from TIET",
            },
            {
                category: "honor",
                title: "Internal Project Grant (7.2 Lac under CoE-DSAI) from TIET",
            },
            // Dance & Arts
            {
                category: "extracurricular",
                title: "First position in Salsa Dance at Anwesha 2014",
            },
            {
                category: "extracurricular",
                title: "Second position in Solo Dance at Anwesha 2013",
            },
            {
                category: "extracurricular",
                title: "First position in Solo Dance at Anwesha 2012 and 2015",
            },
            {
                category: "extracurricular",
                title:
                    "Diploma Certificate from Kolkata Film and Television Institute (KFTI) for Acting",
            },
            {
                category: "extracurricular",
                title:
                    "Diploma Certificate of Classical Dance (KATHAK) from Prachin Kala Kendra, Chandigarh",
            },
            // Sports
            {
                category: "extracurricular",
                title:
                    "1st position in 400m run and 100×4m Relay Race at State Level Annual Inter College Sports",
            },
            // Beauty Pageants & Social Recognition
            {
                category: "extracurricular",
                title: "Second Runner-up – Miss Glamour 2017, Chandigarh",
            },
            { category: "extracurricular", title: "Winner – Summer Queen Delhi-NCR 2019" },
            { category: "extracurricular", title: "Winner – Mrs. Delhi-NCR 2019" },
            {
                category: "extracurricular",
                title: "Nari Ratna Samman Patra 2021 by Prerana Darpan",
            },
            { category: "extracurricular", title: "AGS Women Empowerment Award 2019" },
            { category: "extracurricular", title: "Showstopper at multiple Beauty Pageant events" },
        ],
        phdThesis: {
            title: "Network Security – IP Traceback and Attack Mitigation (inferred from publications)",
            supervisor: "Dr. Ashok Singh Sairam, Dr. Samrat Mondal",
            institution: "Indian Institute of Technology Patna",
            year: "2016",
        },
    },

    // ─── CONTACT ───────────────────────────────────────────────────────────────
    contact: {
        email: "", // Not provided in source data
        phone: [],  // Not provided in source data
        profiles: [
            // Inferable from the context; actual URLs not in source data
            {
                platform: "Google Scholar",
                url: "",
            },
            {
                platform: "ResearchGate",
                url: "",
            },
            {
                platform: "LinkedIn",
                url: "",
            },
        ],
    },
};

export const metadata: Metadata = {
    title: 'Dr. Sangita Roy | Portfolio – BanavatNest',
    description: 'Explore the portfolio of Dr. Sangita Roy, Assistant Professor at Thapar Institute of Engineering & Technology and Director at BanavatNest. Expert in Cryptography, Network Security, Image Processing, and IoT.',
    keywords: [
        'Dr. Sangita Roy',
        'Portfolio',
        'BanavatNest',
        'Director Portfolio',
        'Cryptography',
        'Network Security',
        'Image Processing',
        'Internet of Things',
        'Deep Learning',
        'IIT Patna',
        'Tel Aviv University',
        'Thapar Institute',
        'Computer Science',
        'Research Publications',
        'Academic Portfolio',
    ],
    openGraph: {
        title: 'Dr. Sangita Roy | Portfolio – BanavatNest',
        description: 'Explore the portfolio of Dr. Sangita Roy, Assistant Professor at Thapar Institute and Director at BanavatNest. Expert in Cryptography, Network Security, and Deep Learning.',
        url: 'https://banavatnest.com/en/about/board/dr-sangita-roy',
        siteName: 'BanavatNest',
        images: [
            {
                url: '/images/Director/Sangita.jpeg',
                width: 800,
                height: 800,
                alt: 'Dr. Sangita Roy – Portfolio',
            },
        ],
        type: 'profile',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dr. Sangita Roy | Portfolio – BanavatNest',
        description: 'Portfolio of Dr. Sangita Roy – Cryptography, Network Security & IoT researcher, Director at BanavatNest.',
        images: ['/images/Director/Sangita.jpeg'],
    },
};

export default function SangitaPortfolio() {
    return <PortfolioPage data={SANGITA_DATA} />;
}
