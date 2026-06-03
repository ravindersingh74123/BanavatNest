import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { hashPassword } from '@/lib/auth';

/**
 * POST /api/cms/seed-directors
 * Seeds the static founders (Dr. Sukhdev Singh & Dr. Sangita Roy) into the DB.
 * Idempotent — safe to call multiple times. Will skip if username already exists.
 *
 * Call once from the admin panel or via curl after deployment.
 */
export async function POST() {
  try {
    const db = await getDb();
    const now = new Date();
    const results: { name: string; status: string }[] = [];

    const directors = [
      {
        username: 'sukhdev',
        fullName: 'Dr. Sukhdev Singh',
        role: 'Ph.D. (IIT Patna)',
        image: '/images/Director/Sukhdev.jpeg',
        tag: 'Board of Director',
        priorityValue: 1,
        bio: `Sukhdev Singh was born to a Sikhism-follower family in a small village named Sirah, Tehsil Batala, District Gurdaspur in Punjab State of India on 20th Oct 1986. Dr. Singh's research interests include statistical estimation, prediction, reliability sampling plan, and record values in the area of life testing and reliability analysis. He has published in various International Journals such as IEEE Transactions on Reliability, Statistical Papers, Journal of Statistical Computation and Simulation. He serves as a reviewer for many reputed journals. Currently, Dr. Singh serves as an Assistant Professor in the Department of Mathematics at the Thapar Institute of Engineering and Technology, Patiala, India.`,
        portfolioData: {
          id: 'sukhdev',
          name: 'Dr. Sukhdev Singh',
          role: 'Ph.D. (IIT Patna)',
          image: '/images/Director/Sukhdev.jpeg',
          bio: `Sukhdev Singh was born to a Sikhism-follower family in a small village named Sirah, Tehsil Batala, District Gurdaspur in Punjab State of India on 20th Oct 1986. Dr. Singh's research interests include statistical estimation, prediction, reliability sampling plan, and record values in the area of life testing and reliability analysis.`,
          boardPreview: {
            boardRole: 'CO-FOUNDER & DIRECTOR (RESEARCH & STRATEGY)',
            shortBio: 'Experienced academic and researcher with over 8 years in higher education. Holds strong expertise in statistical modeling, estimation, and data-driven problem solving. Active contributor to bridging academia and industry.',
            achievements: [
              'Author of 20+ research publications',
              'CSIR Junior and Senior Research Fellow',
              'Strategic leadership in research planning',
            ],
          },
          job: {
            summary: 'Dr. Singh is currently working as an Assistant Professor in the Department of Mathematics at Thapar Institute of Engineering and Technology, Patiala, Punjab, India.',
            positions: [
              { title: 'Assistant Professor', organization: 'Thapar Institute of Engineering and Technology, Patiala', period: 'Current', description: 'Department of Mathematics', highlights: [] },
            ],
          },
          research: { summary: 'Statistical estimation, prediction, reliability sampling plan, and record values.', publications: [], coAuthors: [], reviewerJournals: [] },
          education: {
            summary: 'Ph.D. from IIT Patna, M.Sc. and B.Sc. from Guru Nanak Dev University.',
            degrees: [{ degree: 'Ph.D. in Mathematics', institution: 'IIT Patna', year: '2016', details: 'Under Dr. Yogesh Mani Tripathi' }],
            awards: [{ title: 'CSIR Junior Research Fellowship', year: '2010' }, { title: 'CSIR Senior Research Fellowship', year: '2013' }],
          },
          contact: { email: 'info@banavatnest.com', phone: ['+91 99340 44777'], profiles: [{ name: 'Google Scholar', link: 'https://scholar.google.co.in/citations?user=cuhhuSsAAAAJ&hl=en' }] },
        },
      },
      {
        username: 'sangita',
        fullName: 'Dr. Sangita Roy',
        role: 'Ph.D. (IIT Patna)',
        image: '/images/Director/Sangita.jpeg',
        tag: 'Board of Director',
        priorityValue: 2,
        bio: `Dr. Sangita Roy is currently working as an Assistant Professor in the Department of Computer Science and Engineering at Thapar Institute of Engineering and Technology, Patiala, Punjab. She did her Ph.D. from the Indian Institute of Technology Patna. Dr. Roy's research interests include Cryptography and Network Security, Image Processing and Internet of Things (IoT) and Deep Learning.`,
        portfolioData: {
          id: 'sangita',
          name: 'Dr. Sangita Roy',
          role: 'Ph.D. (IIT Patna)',
          image: '/images/Director/Sangita.jpeg',
          bio: `Dr. Sangita Roy is currently working as an Assistant Professor in the Department of Computer Science and Engineering at Thapar Institute of Engineering and Technology. Her research interests include Cryptography and Network Security, Image Processing and IoT.`,
          boardPreview: {
            boardRole: 'CO-FOUNDER & DIRECTOR (INNOVATION & TECHNOLOGY)',
            shortBio: 'Accomplished academic with expertise in Computer Science, specialized in Cybersecurity, BlockChain, and IoT. Experienced in industry-oriented and funded research.',
            achievements: [
              'PhD from IIT Patna, Postdoc from Tel Aviv University (Israel)',
              'Former Senior Scientist at IIT Bombay',
              'Leadership in technology innovation',
            ],
          },
          job: {
            summary: 'Assistant Professor at TIET. Post Doctoral Research Fellow at Tel Aviv University.',
            positions: [
              { title: 'Assistant Professor', organization: 'Thapar Institute of Engineering and Technology (TIET)', period: 'July 2016 – Present', description: 'Department of Computer Science and Engineering.' },
            ],
          },
          research: { summary: 'Cryptography, Network Security, Image Processing, IoT, Deep Learning.', publications: [], coAuthors: [], reviewerJournals: [] },
          education: {
            summary: 'Ph.D. from IIT Patna, M.Tech. and B.Tech. in CSE.',
            degrees: [{ level: 'Ph.D.', field: 'Computer Science and Engineering', institution: 'IIT Patna', year: '2016' }],
            awards: [{ title: 'Internship at TCS Innovation Lab', category: 'honor' }],
          },
          contact: { email: '', phone: [], profiles: [] },
        },
      },
    ];

    for (const dir of directors) {
      const existing = await db.collection('users').findOne({ username: dir.username });

      if (existing) {
        // Update tag and priorityValue on existing user record
        await db.collection('users').updateOne(
          { username: dir.username },
          {
            $set: {
              tag: dir.tag,
              priorityValue: dir.priorityValue,
              role: 'director',
              profileImage: dir.image,
              updatedAt: now,
            },
          }
        );

        // Ensure a published director_profile exists
        const existingProfile = await db
          .collection('director_profiles')
          .findOne({ userId: existing._id });

        if (!existingProfile) {
          await db.collection('director_profiles').insertOne({
            userId: existing._id,
            portfolioData: dir.portfolioData,
            status: 'published',
            publishedAt: now,
            currentVersion: 1,
            createdAt: now,
            updatedAt: now,
          });
          results.push({ name: dir.fullName, status: 'profile_created' });
        } else {
          // Merge portfolioData: preserve existing content but patch boardPreview + ensure published
          const mergedPortfolioData = {
            ...existingProfile.portfolioData,
            boardPreview: dir.portfolioData.boardPreview,
          };
          await db.collection('director_profiles').updateOne(
            { userId: existing._id },
            {
              $set: {
                portfolioData: mergedPortfolioData,
                status: 'published',
                publishedAt: existingProfile.publishedAt ?? now,
                updatedAt: now,
              },
            }
          );
          results.push({ name: dir.fullName, status: 'updated' });
        }
        continue;
      }

      // Default password = username (admin should reset via CMS)
      const passwordHash = await hashPassword(dir.username);

      const userResult = await db.collection('users').insertOne({
        fullName: dir.fullName,
        username: dir.username,
        passwordHash,
        role: 'director',
        tag: dir.tag,
        priorityValue: dir.priorityValue,
        profileImage: dir.image,
        createdAt: now,
        updatedAt: now,
      });

      await db.collection('director_profiles').insertOne({
        userId: userResult.insertedId,
        portfolioData: dir.portfolioData,
        status: 'published',
        publishedAt: now,
        currentVersion: 1,
        createdAt: now,
        updatedAt: now,
      });

      results.push({ name: dir.fullName, status: 'seeded' });
    }

    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error('[seed-directors]', err);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}
