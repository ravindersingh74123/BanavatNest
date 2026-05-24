import type { Metadata } from 'next';
import PortfolioPage, { PortfolioData } from '@/components/PortfolioPage';

const SUKHDEV_DATA: PortfolioData = {
    id: 'dr-sukhdev-singh',
    name: 'Dr. Sukhdev Singh',
    role: 'Ph.D. (IIT Patna)',
    image: '/images/Director/Sukhdev.jpeg',

    bio: `Sukhdev Singh was born to a Sikhism-follower family in a small village named Sirah, Tehsil Batala, District Gurdaspur in Punjab State of India on 20th Oct 1986. The economic condition of his father, Harinder Singh, and mother, Gursharanjit Kaur was not very good at that time, and they were worried about how they would provide a good education to their son, as there was no good school in the village. They also realized that the number of girls receiving education in the village is very low, which motivated them to start a school with their hard work and encouragement from the village people.

Sukhdev Singh finished his 5th standard at his parent's school and then the 10th standard at the Government High School in a nearby village. Raised in a joint family, with hard-working parents and a supportive environment, perhaps helped him develop understanding, patience, and a hard-working nature. He finished his B.Sc. in 2006 and M.Sc. Mathematics in 2008 from Guru Nanak Dev University, Amritsar-Punjab. Sukhdev had a dream of having a doctorate in Mathematics since his childhood days. At that time, a Ph.D. meant being called with a Dr. title, and Mathematics posed a challenge as there was no teacher of Mathematics in the village except his mother. He received a Junior Research Fellowship in 2010 from the Council of Scientific and Industrial Research (CSIR), which paved the way for an opportunity to pursue his Ph.D. at the Department of Mathematics at the Indian Institute of Technology Patna, under the guidance of Dr. Yogesh Mani Tripathi. Later he received a Senior Research Fellowship in 2013 from CSIR, and finally, he completed his PhD in 2016. Dr. Singh's research interests include statistical estimation, prediction, reliability sampling plan, and record values in the area of life testing and reliability analysis. He went on to publish in various International Journals such as IEEE Transactions on Reliability, Statistical Papers, Journal of Statistical Computation and Simulation, etc. He serves as a reviewer for many reputed journals including IEEE Transactions on Reliability, Journal of Applied Statistics, and Quality Technology & Quantitative Management.

Throughout his Ph.D., Sukhdev's simplicity, humility, and cheerful nature earned him the admiration of colleagues. It was during this time that he formed a lasting friendship with Sangita Roy, a fellow researcher from the Department of Computer Science and Engineering at the Indian Institute of Technology Patna. Their bond blossomed into a beautiful union, uniting two families from the East and North parts of India when they married in 2018.

Dr. Singh worked with CL Educate Ltd- Accendere Knowledge Management Services as a Research Mentor. In this role, he provided consultancy services for NIRF ranking and coordinated a program at Manav Rachna International University. The program involved B.Tech. students and faculty members, aiming to provide insights into the new initiatives and encourage students towards research. Under his guidance, 15 papers were published by B.Tech. second-year students within one year. Currently, Dr. Singh serves as an Assistant Professor in the Department of Mathematics at the Thapar Institute of Engineering and Technology, Patiala, India.`,

    job: {
        summary: 'Dr. Singh is currently working as an Assistant Professor in the Department of Mathematics at Thapar Institute of Engineering and Technology, Patiala, Punjab, India. Before joining Thapar, he served as an Assistant Professor in the Department of Statistics at Amity University Punjab, India, and also as an Assistant Professor in the Department of Mathematics at Chandigarh University, Punjab, India. Dr. Singh has also worked as a Research Mentor with CL Educate Ltd- Accendere Knowledge Management Services.',
        positions: [
            {
                title: 'Assistant Professor',
                organization: 'Thapar Institute of Engineering and Technology, Patiala',
                period: 'Current',
                description: 'Dr. Singh is currently working as an Assistant Professor in the Department of Mathematics at Thapar Institute of Engineering and Technology, Patiala, Punjab, India.',
                highlights: [],
            },
            {
                title: 'Assistant Professor',
                organization: 'Chandigarh University, Punjab',
                period: 'July 2018 – October 2021',
                description: 'Dr. Singh worked with the Department of Mathematics at Chandigarh University, Punjab, India, as an Assistant Professor. He taught courses on Statistics, Theory of Computation and R-statistical Lab to M.Sc. Mathematics students.',
                highlights: [
                    'Served as Research Coordinator overseeing 70+ faculty members and 60 research scholars',
                    '200+ research papers published in Scopus and Web of Science-indexed journals under his tenure',
                    'Successfully initiated the M.Sc. Data Science Program during July 2020 session',
                    'Member of Research Degree Committee (RDC) in Mathematics and Board of Studies',
                    'Organizing Secretary for 3rd National Conference M2FZY-III (100+ participants)',
                    'Publicity Chair for ICFMST-2019 (400+ attendees)',
                ],
            },
            {
                title: 'Research Mentor',
                organization: 'CL Educate Ltd. – Accendere Knowledge Management Services (AKMS)',
                period: 'July 2016 – August 2017',
                description: 'His role involved coordinating a program to foster a culture of research at Manav Rachna International University, having 200 B.Tech. students and 15 Faculty members. During this time, he provided insights into the new initiatives and encouraged students toward research.',
                highlights: [
                    '15 papers published/communicated by B.Tech. second-year students under his guidance within one year',
                ],
            },
            {
                title: 'Tutorial Classes',
                organization: 'Indian Institute of Technology Patna',
                period: 'During PhD (2010–2016)',
                description: 'During his PhD at IIT Patna, Sukhdev Singh took tutorial classes for B.Tech. students and simulation lab for M.Tech. students.',
                highlights: [
                    'Simulation Lab, M.Tech. in Mathematics and Computing (Spring 2013)',
                    'Probability Theory and Random Processes (MA225), B.Tech. (Spring 2013, 2014)',
                    'Mathematics-III (MA201), B.Tech. (Autumn 2013)',
                    'Mathematics-II (MA102), B.Tech. (Spring 2012)',
                ],
            },
        ],
    },

    research: {
        summary: "Dr. Singh's research interests include statistical estimation, prediction, reliability sampling plan and record values in the area of life testing and reliability analysis. He went on to publish in various International Journals such as IEEE Transactions on Reliability, Statistical Papers, Journal of Statistical Computation and Simulation etc. He also serves as a reviewer for many reputed journals including IEEE Transactions on Reliability, Journal of Applied Statistics and Quality Technology & Quantitative Management.",
        publications: [
            // { citation: 'B. Diyali, D. Kumar, S. Singh: Discriminating among inverse Weibull, lognormal, and inverse Gaussian distributions, Quality and Reliability Engineering International, 1-21, 2023.' },
            // { citation: 'P. Yadav, D. Kumar, S. Singh: Statistical analysis for log-normal distribution in the presence of hybrid censoring and step-stress, Strength of Materials, in press, 2023.' },
            // { citation: 'B. Diyali, D. Kumar, S. Singh: Discriminating between log-normal and log-logistic distributions in the presence of type-II censoring, Computational Statistics, 1-25, 2023.' },
            // { citation: 'D. Khurana, A. Koli, K. Khatter, S. Singh: Natural language processing: State of the art, current trends and challenges. Multimedia Tools and Applications, 2022.' },
            // { citation: 'M. M. Monfared, R. A. Belaghi, M. H. Behzadi, S. Singh: Estimation and prediction based on type-I hybrid censored data from the Poisson-Exponential distribution. Communications in Statistics: Simulation and Computation, 2019.' },
            // { citation: 'S. Singh, S. Dey, D. Kumar: Statistical inference based on generalized Lindley record values. Journal of Applied Statistics, Vol. 47(9), 1543-1561, 2020.' },
            // { citation: 'S. Singh, Y. M. Tripathi, S. J. Wu: Bayesian analysis for lognormal distribution under progressive type-II censoring. Hacettepe Journal of Mathematics and Statistics. Vol. 48(5), 1488-1504, 2019.' },
            // { citation: 'S. Singh, R. A. Belaghi, M. N. Asl: Estimation and prediction using classical and Bayesian approaches for Burr III model under progressive type-I hybrid censoring. International Journal of Systems Assurance Engineering and Management. Vol. 10(4), 746-764, 2019.' },
            // { citation: 'T. Sen, S. Singh, Y. M. Tripathi: Statistical inference for lognormal distribution with type-I progressive hybrid censored data. American Journal of Mathematical and Management Sciences. Vol. 38(1), 70-95, 2019.' },
            // { citation: 'R. A. Belaghi, M. N. Asl, O. G. Alma, S. Singh, M. Vasfi: Estimation and prediction for the Poisson-Exponential distribution based on type-II censored data. American Journal of Mathematical and Management Sciences. Vol. 38(1), 96-115, 2019.' },
            // { citation: 'S. Singh, Y. M. Tripathi: Estimating the parameters of an inverse Weibull distribution under progressive type-I interval censoring. Statistical Papers, Vol. 59(1), 21-56, 2018.' },
            // { citation: 'S. Singh, Y. M. Tripathi: Acceptance sampling plans for inverse Weibull distribution based on truncated life test. Life Cycle Reliability and Safety Engineering, Vol. 6(3), 169-178, 2017.' },
            // { citation: 'R. A. Belaghi, M. N. Asl, S. Singh: On estimating the parameters of the Burr XII model under progressive type-I interval censoring. Journal of Statistical Computation and Simulation, Vol. 87(16), 3132-3151, 2017.' },
            // { citation: 'S. Singh, Y. M. Tripathi, S. J. Wu: Bayesian estimation and prediction based on lognormal record values. Journal of Applied Statistics, Vol. 44(5), 916-940, 2017.' },
            // { citation: 'S. Dey, S. Singh, Y. M. Tripathi, A. Asgharzadeh: Estimation and prediction for a progressively censored generalized inverted exponential distribution. Statistical Methodology, Vol. 32, 185-202, 2016.' },
            // { citation: 'S. Singh, Y. M. Tripathi: Bayesian estimation and prediction for a hybrid censored lognormal distribution. IEEE Transactions on Reliability, Vol. 65(2), 782-795, 2016.' },
            // { citation: 'S. Singh, Y. M. Tripathi: Reliability sampling plans for a lognormal distribution under progressive first-failure censoring with cost constraint. Statistical Papers, Vol. 56(3), 773-817, 2015.' },
            // { citation: 'S. Singh, Y. M. Tripathi, S. J. Wu: On estimating parameters of a progressively censored lognormal distribution. Journal of Statistical Computation and Simulation, Vol. 85(6), 1071-1089, 2015.' },
            // { citation: 'S. Singh, Y. M. Tripathi, C. H. Jun: Sampling plans based on truncated life test for a generalized inverted exponential distribution. Industrial Engineering & Management Systems, Vol. 14(2), 183-195, 2015.' },

            {
                type: "journal",
                title: "Discriminating among inverse Weibull, lognormal, and inverse Gaussian distributions",
                authors: ["B. Diyali", "D. Kumar", "S. Singh"],
                journal: "Quality and Reliability Engineering International",
                publisher: "Wiley",
                year: 2023,
            },

            {
                type: "journal",
                title: "Statistical analysis for log-normal distribution in the presence of hybrid censoring and step-stress",
                authors: ["P. Yadav", "D. Kumar", "S. Singh"],
                journal: "Strength of Materials",
                publisher: "Springer",
                year: 2023,
            },

            {
                type: "journal",
                title: "Discriminating between log-normal and log-logistic distributions in the presence of type-II censoring",
                authors: ["B. Diyali", "D. Kumar", "S. Singh"],
                journal: "Computational Statistics",
                publisher: "Springer",
                year: 2023,
            },

            {
                type: "journal",
                title: "Natural language processing: State of the art, current trends and challenges",
                authors: ["D. Khurana", "A. Koli", "K. Khatter", "S. Singh"],
                journal: "Multimedia Tools and Applications",
                publisher: "Springer",
                year: 2022,
            },

            {
                type: "journal",
                title: "Estimation and prediction based on type-I hybrid censored data from the Poisson-Exponential distribution",
                authors: ["M. M. Monfared", "R. A. Belaghi", "M. H. Behzadi", "S. Singh"],
                journal: "Communications in Statistics: Simulation and Computation",
                publisher: "Taylor & Francis",
                year: 2019,
            },

            {
                type: "journal",
                title: "Statistical inference based on generalized Lindley record values",
                authors: ["S. Singh", "S. Dey", "D. Kumar"],
                journal: "Journal of Applied Statistics",
                publisher: "Taylor & Francis",
                year: 2020,
            },

            {
                type: "journal",
                title: "Bayesian analysis for lognormal distribution under progressive type-II censoring",
                authors: ["S. Singh", "Y. M. Tripathi", "S. J. Wu"],
                journal: "Hacettepe Journal of Mathematics and Statistics",
                year: 2019,
            },

            {
                type: "journal",
                title: "Estimation and prediction using classical and Bayesian approaches for Burr III model under progressive type-I hybrid censoring",
                authors: ["S. Singh", "R. A. Belaghi", "M. N. Asl"],
                journal: "International Journal of Systems Assurance Engineering and Management",
                publisher: "Springer",
                year: 2019,
            },

            {
                type: "journal",
                title: "Statistical inference for lognormal distribution with type-I progressive hybrid censored data",
                authors: ["T. Sen", "S. Singh", "Y. M. Tripathi"],
                journal: "American Journal of Mathematical and Management Sciences",
                publisher: "Taylor & Francis",
                year: 2019,
            },

            {
                type: "journal",
                title: "Estimation and prediction for the Poisson-Exponential distribution based on type-II censored data",
                authors: ["R. A. Belaghi", "M. N. Asl", "O. G. Alma", "S. Singh", "M. Vasfi"],
                journal: "American Journal of Mathematical and Management Sciences",
                publisher: "Taylor & Francis",
                year: 2019,
            },

            {
                type: "journal",
                title: "Estimating the parameters of an inverse Weibull distribution under progressive type-I interval censoring",
                authors: ["S. Singh", "Y. M. Tripathi"],
                journal: "Statistical Papers",
                publisher: "Springer",
                year: 2018,
            },

            {
                type: "journal",
                title: "Acceptance sampling plans for inverse Weibull distribution based on truncated life test",
                authors: ["S. Singh", "Y. M. Tripathi"],
                journal: "Life Cycle Reliability and Safety Engineering",
                year: 2017,
            },

            {
                type: "journal",
                title: "On estimating the parameters of the Burr XII model under progressive type-I interval censoring",
                authors: ["R. A. Belaghi", "M. N. Asl", "S. Singh"],
                journal: "Journal of Statistical Computation and Simulation",
                publisher: "Taylor & Francis",
                year: 2017,
            },

            {
                type: "journal",
                title: "Bayesian estimation and prediction based on lognormal record values",
                authors: ["S. Singh", "Y. M. Tripathi", "S. J. Wu"],
                journal: "Journal of Applied Statistics",
                publisher: "Taylor & Francis",
                year: 2017,
            },

            {
                type: "journal",
                title: "Estimation and prediction for a progressively censored generalized inverted exponential distribution",
                authors: ["S. Dey", "S. Singh", "Y. M. Tripathi", "A. Asgharzadeh"],
                journal: "Statistical Methodology",
                publisher: "Elsevier",
                year: 2016,
            },

            {
                type: "journal",
                title: "Bayesian estimation and prediction for a hybrid censored lognormal distribution",
                authors: ["S. Singh", "Y. M. Tripathi"],
                journal: "IEEE Transactions on Reliability",
                publisher: "IEEE",
                year: 2016,
            },

            {
                type: "journal",
                title: "Reliability sampling plans for a lognormal distribution under progressive first-failure censoring with cost constraint",
                authors: ["S. Singh", "Y. M. Tripathi"],
                journal: "Statistical Papers",
                publisher: "Springer",
                year: 2015,
            },

            {
                type: "journal",
                title: "On estimating parameters of a progressively censored lognormal distribution",
                authors: ["S. Singh", "Y. M. Tripathi", "S. J. Wu"],
                journal: "Journal of Statistical Computation and Simulation",
                publisher: "Taylor & Francis",
                year: 2015,
            },

            {
                type: "journal",
                title: "Sampling plans based on truncated life test for a generalized inverted exponential distribution",
                authors: ["S. Singh", "Y. M. Tripathi", "C. H. Jun"],
                journal: "Industrial Engineering & Management Systems",
                year: 2015,
            }

        ],
        coAuthors: [
            { name: 'Yogesh Mani Tripathi', count: 10, role: 'PhD Supervisor', link: 'http://www.iitp.ac.in/index.php/departments/school-of-basic-sciences/mathematics/people/faculty/dr-yogesh-mani-tripathi.html' },
            { name: 'Shuo-Jye Wu', count: 3, link: 'http://www1.stat.tku.edu.tw/~shuo/' },
            { name: 'Chi-Hyuck Jun', count: 1, link: 'https://scholar.google.co.in/citations?user=1HtBrw4AAAAJ&hl=en' },
            { name: 'Sanku Dey', count: 2, link: 'https://scholar.google.co.in/citations?user=kv3eJh0AAAAJ&hl=en' },
            { name: 'Akbar Asgharzadeh', count: 1, link: 'https://www.researchgate.net/profile/Akbar_Asgharzadeh' },
            { name: 'Reza Arabi Belaghi', count: 4, link: 'https://scholar.google.co.in/citations?hl=en&user=O3dSUj8AAAAJ&view_op=list_works&sortby=pubdate' },
            { name: 'Ozlem Gurunlu Alma', count: 1, link: null },
            { name: 'Mehri Noori Asl', count: 3, link: 'https://scholar.google.co.in/citations?user=sZ9_ufoAAAAJ&hl=en' },
            { name: 'Mahdi Vasfi', count: 1, link: null },
            { name: 'Tanmay Sen', count: 1, link: 'https://scholar.google.co.in/citations?user=nQsxVLgAAAAJ&hl=en' },
            { name: 'Devendra Kumar', count: 3, link: 'https://scholar.google.co.in/citations?user=YqYO764AAAAJ&hl=en' },
        ],
        reviewerJournals: [
            { name: 'IEEE Transactions on Reliability', link: 'http://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=24' },
            { name: 'Reliability Engineering and System Safety', link: 'https://www.journals.elsevier.com/reliability-engineering-and-system-safety' },
            { name: 'Quality Technology and Quantitative Management', link: 'https://www.tandfonline.com/loi/ttqm20' },
            { name: 'Journal of Applied Statistics', link: 'http://www.tandfonline.com/loi/cjas20' },
            { name: 'Statistical Papers', link: 'http://link.springer.com/journal/362' },
            { name: 'Journal of Statistical Computation and Simulation', link: 'http://www.tandfonline.com/action/journalInformation?show=abstractingIndexing&journalCode=gscs20' },
            { name: 'Journal of Statistical Planning and Inference', link: 'https://www.journals.elsevier.com/journal-of-statistical-planning-and-inference' },
            { name: 'Journal of the Iranian Statistical Society', link: 'http://jirss.irstat.ir/' },
            { name: 'American Journal of Mathematical and Management Sciences', link: 'https://www.tandfonline.com/toc/umms20/current' },
            { name: 'Journal of Computational and Applied Mathematics', link: 'https://www.journals.elsevier.com/journal-of-computational-and-applied-mathematics' },
            { name: 'Afrika Mathematika', link: 'https://www.springer.com/journal/13370' },
            { name: 'Heliyon', link: 'https://www.journals.elsevier.com/heliyon' },
            { name: 'Ecological Informatics', link: 'https://www.journals.elsevier.com/ecological-informatics' },
            { name: 'Pattern Recognition', link: 'https://www.journals.elsevier.com/pattern-recognition' },
            { name: 'Chemosphere', link: 'https://www.journals.elsevier.com/chemosphere' },
        ],
    },

    education: {
        summary: "Sukhdev Singh finished his 5th standard at his parent's school and then the 10th standard at the Government High School in a nearby village. He finished his B.Sc. in 2006 and M.Sc. Mathematics in 2008 from Guru Nanak Dev University, Amritsar-Punjab. He received a Junior Research Fellowship in 2010 from CSIR, which paved the way for his Ph.D. at IIT Patna, completed in 2016. Dr. Singh has knowledge of Punjabi, Hindi and English languages, and as a learner he can also understand and read Bengali language.",
        degrees: [
            {
                degree: 'Ph.D. in Mathematics',
                institution: 'Indian Institute of Technology (IIT) Patna',
                year: '2016',
                details: 'Completed under the supervision of Dr. Yogesh Mani Tripathi. Thesis title: "A Contribution to Life Testing Experiments with Lognormal and Inverse Weibull Distributions". Focused on statistical estimation, prediction, reliability sampling plans, and record values.',
            },
            {
                degree: 'M.Sc. Mathematics',
                institution: 'Guru Nanak Dev University, Amritsar (via Swami Swatantranand Memorial College, Dinanagar)',
                year: '2008',
                details: 'Sukhdev Singh did his M.Sc. Mathematics in 2008 from Swami Swatantranand Memorial College, Dinanagar affiliated with Guru Nanak Dev University Amritsar, Punjab, India.',
            },
            {
                degree: 'B.Sc.',
                institution: 'Guru Nanak Dev University, Amritsar (via Baring Union Christian College, Batala)',
                year: '2006',
                details: 'Sukhdev Singh did his B.Sc. in 2006 with Mathematics, Computer Science and Economics as major subjects from Baring Union Christian College, Batala affiliated with Guru Nanak Dev University Amritsar, Punjab, India.',
            },
        ],
        awards: [
            {
                title: 'SERB-SIRE Fellowship',
                year: '2023',
                description: 'SERB International Research Experience (SIRE) fellowship from the Science and Engineering Research Board (SERB)-India.',
            },
            {
                title: 'CSIR Senior Research Fellowship',
                year: '2013',
                description: 'Senior Research Fellowship from the Council of Scientific and Industrial Research-India (CSIR-India).',
            },
            {
                title: 'CSIR Junior Research Fellowship',
                year: '2010',
                description: 'Junior Research Fellowship from the Council of Scientific and Industrial Research-India (CSIR-India).',
            },
        ],
        phdThesis: {
            title: 'A Contribution to Life Testing Experiments with Lognormal and Inverse Weibull Distributions',
            summary: `In the existing literature, problems of estimation have been discussed under the classical approach when the lifetime data following a lognormal distribution are observed under progressive type-II censoring, hybrid censoring, and based on record values. The Expectation Maximization (EM) algorithm and the idea of the missing information principle have been employed to obtain maximum likelihood estimates and associated interval estimates for normal or lognormal parameters. However, we observed a gap in the existing literature concerning the problems of estimation and prediction for the lognormal distribution under the Bayesian approach.

In our work, we considered both informative and non-informative priors. Since Bayes estimators do not turn out to have a closed form, we considered the Lindley method for this purpose. We further observed that importance sampling can be used to draw samples from the associated posterior densities. Therefore we generated samples from the associated posterior densities and obtained Bayes estimates and associated highest posterior density interval estimates using the idea of Chen and Shao. We have also used OpenBUGS software for this purpose. Next, we obtained predictive estimates and associated predictive interval estimates to provide inferences about the censored and future samples respectively under one- and two-sample prediction. Finally, we analyzed various real data sets and conducted a simulation study to observe the performance of the proposed methods of estimation and prediction.

In literature, reliability acceptance sampling plans have been constructed for the lognormal distribution when the data are observed under type-II and progressive type-II censoring schemes. We extended these plans to situations when the data are observed under progressive first-failure censoring, a generalization of type-II, progressive type-II, and first-failure censoring schemes. In fact, the plans in existing literature were developed for a given proportion of removed units, and in our work, we contributed a discussion on selecting plans based on an optimal criterion. This work also considers cost constraints, and the proposed algorithms can be applied to the Weibull distribution as well.

We also considered inverse Weibull distribution under progressive type-I interval censoring and obtained maximum likelihood and midpoint estimates using EM algorithm, with probability plot estimates serving as an initial guess for the unknown parameters. Bayes estimates are also obtained using Lindley and Tierney-Kadane methods, and a discussion is presented on the selection of inspection times and optimal censoring.`,
            publications: [
                'S. Singh, Y. M. Tripathi, S. J. Wu: On estimating parameters of a progressively censored lognormal distribution, JSCS, Vol. 85(6), 1071-1089, 2015.',
                'S. Singh, Y. M. Tripathi, S. J. Wu: Bayesian analysis for lognormal distribution under progressive type-II censoring, HJMS, Vol. 48(5), 1488-1504, 2019.',
                'S. Singh, Y. M. Tripathi: Bayesian estimation and prediction for a hybrid censored lognormal distribution, IEEE Trans. Reliability, Vol. 65(2), 782-795, 2016.',
                'S. Singh, Y. M. Tripathi, S. J. Wu: Bayesian estimation and prediction based on lognormal record values, JAS, Vol. 44(5), 916-940, 2017.',
                'S. Singh, Y. M. Tripathi: Reliability sampling plans for a lognormal distribution under progressive first-failure censoring with cost constraint, SP, Vol. 56(3), 773-817, 2015.',
                'S. Singh, Y. M. Tripathi: Estimating the parameters of an inverse Weibull distribution under progressive type-I interval censoring, SP, Vol. 59(1), 21-56, 2018.',
            ],
            committee: [
                { name: 'Dr. Yogesh Mani Tripathi', role: 'Supervisor' },
                { name: 'Dr. Ashish Kumar Upadhyay', role: 'Chairman' },
                { name: 'Dr. Prashant Kumar Srivastava', role: 'Member' },
                { name: 'Dr. Debshree Guha Adhya', role: 'Member' },
                { name: 'Dr. Shovan Bhaumik', role: 'Member' },
                { name: 'Dr. Nutan Kumar Tomar', role: 'Dept. PhD Coordinator' },
            ],
        },
    },

    contact: {
        email: 'info@banavatnest.com',
        phone: ['+91 99340 44777', '+91 80023 96506'],
        profiles: [
            { name: 'Google Scholar', link: 'https://scholar.google.co.in/citations?user=cuhhuSsAAAAJ&hl=en' },
            { name: 'ResearchGate', link: 'https://www.researchgate.net/profile/Sukhdev_Singh4' },
            { name: 'ORCID', link: 'https://orcid.org/0000-0001-6282-4281' },
            { name: 'Scopus', link: 'https://www.scopus.com/authid/detail.uri?authorId=56221912900' },
            { name: 'Publons / Web of Science', link: 'https://www.webofscience.com/wos/author/record/1134074' },
            { name: 'Academia', link: 'https://independent.academia.edu/SukhdevSingh126' },
            { name: 'LinkedIn', link: 'https://www.linkedin.com/in/sukhdev-singh-01717a34/' },
        ],
    },
};

export const metadata: Metadata = {
    title: 'Dr. Sukhdev Singh | Portfolio – BanavatNest',
    description: 'Explore the portfolio of Dr. Sukhdev Singh, Assistant Professor of Mathematics at Thapar Institute of Engineering & Technology and Director at BanavatNest. Expert in Statistical Estimation, Reliability Analysis, and Life Testing.',
    keywords: [
        'Dr. Sukhdev Singh',
        'Portfolio',
        'BanavatNest',
        'Director Portfolio',
        'Statistical Estimation',
        'Reliability Analysis',
        'Life Testing',
        'Bayesian Estimation',
        'Mathematics',
        'IIT Patna',
        'Thapar Institute',
        'CSIR Fellowship',
        'Research Publications',
        'Academic Portfolio',
        'Lognormal Distribution',
        'IEEE Transactions on Reliability',
    ],
    openGraph: {
        title: 'Dr. Sukhdev Singh | Portfolio – BanavatNest',
        description: 'Explore the portfolio of Dr. Sukhdev Singh, Assistant Professor at Thapar Institute and Director at BanavatNest. Expert in Statistical Estimation, Reliability Analysis, and Bayesian Methods.',
        url: 'https://banavatnest.com/en/about/board/dr-sukhdev-singh',
        siteName: 'BanavatNest',
        images: [
            {
                url: '/images/Director/Sukhdev.jpeg',
                width: 800,
                height: 800,
                alt: 'Dr. Sukhdev Singh – Portfolio',
            },
        ],
        type: 'profile',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dr. Sukhdev Singh | Portfolio – BanavatNest',
        description: 'Portfolio of Dr. Sukhdev Singh – Statistical Estimation & Reliability Analysis researcher, Director at BanavatNest.',
        images: ['/images/Director/Sukhdev.jpeg'],
    },
};

export default function SukhdevPortfolio() {
    return <PortfolioPage data={SUKHDEV_DATA} />;
}
