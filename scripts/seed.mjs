/**
//  * Standalone seed script — run with:
//  *   node scripts/seed.mjs
//  *
//  * Reads MONGODB_URI from .env.local automatically.
//  * Seeds:
//  *   1. Super Admin user (from CMS_ADMIN_EMAIL / CMS_ADMIN_PASSWORD)
//  *   2. Director profiles (Dr. Sukhdev Singh & Dr. Sangita Roy)
//  */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import bcryptjs from 'bcryptjs';

// ── Load .env.local ───────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');

try {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (key && !process.env[key]) process.env[key] = value;
  }
  console.log('✅ Loaded .env.local');
} catch {
  console.warn('⚠️  Could not read .env.local, using existing process.env');
}

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'banavatnest';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set!');
  process.exit(1);
}

async function hashPassword(plain) {
  return bcryptjs.hash(plain, 12);
}

// ── Director data ─────────────────────────────────────────────────────────────
const directors = [
  {
    username: 'sukhdev',
    password: 'Sukhdev@2024',          // ← change this to the desired password
    fullName: 'Dr. Sukhdev Singh',
    role: 'Ph.D. (IIT Patna)',
    image: '/images/Director/Sukhdev.jpeg',
    tag: 'Board of Director',
    priorityValue: 1,
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
    password: 'Sangita@2024',          // ← change this to the desired password
    fullName: 'Dr. Sangita Roy',
    role: 'Ph.D. (IIT Patna)',
    image: '/images/Director/Sangita.jpeg',
    tag: 'Board of Director',
    priorityValue: 2,
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

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🔗 Connecting to MongoDB Atlas…');
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  console.log(`✅ Connected to database: ${DB_NAME}`);

  const now = new Date();

  // ── 1. Super Admin ─────────────────────────────────────────────────────────
  console.log('\n── Seeding Super Admin ──────────────────────────────────────');
  const adminEmail = process.env.CMS_ADMIN_EMAIL;
  const adminPassword = process.env.CMS_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn('⚠️  CMS_ADMIN_EMAIL or CMS_ADMIN_PASSWORD not set, skipping admin seed');
  } else {
    const existing = await db.collection('users').findOne({ email: adminEmail.toLowerCase() });
    if (existing) {
      console.log(`ℹ️  Super admin already exists (${adminEmail}) — skipping`);
    } else {
      const passwordHash = await hashPassword(adminPassword);
      const result = await db.collection('users').insertOne({
        fullName: 'Super Admin',
        username: 'superadmin',
        email: adminEmail.toLowerCase(),
        passwordHash,
        role: 'super_admin',
        profileImage: null,
        createdAt: now,
        updatedAt: now,
      });

      // Empty portfolio profile for super admin
      await db.collection('director_profiles').insertOne({
        userId: result.insertedId,
        portfolioData: {
          id: result.insertedId.toString(),
          name: 'Super Admin',
          role: '',
          image: null,
          bio: '',
          boardPreview: { shortBio: '', boardRole: '', achievements: ['', '', ''] },
          job: { summary: '', positions: [] },
          research: { summary: '', publications: [], coAuthors: [], reviewerJournals: [] },
          education: { summary: '', degrees: [], awards: [] },
          contact: { email: '', phone: [], profiles: [] },
        },
        status: 'draft',
        publishedAt: null,
        currentVersion: 0,
        createdAt: now,
        updatedAt: now,
      });

      console.log(`✅ Super admin created: ${adminEmail}`);
    }
  }

  // ── 2. Indexes ────────────────────────────────────────────────────────────
  console.log('\n── Creating Indexes ─────────────────────────────────────────');
  await db.collection('users').createIndex({ email: 1 }, { unique: true, sparse: true });
  await db.collection('users').createIndex({ username: 1 }, { unique: true });
  await db.collection('director_profiles').createIndex({ userId: 1 }, { unique: true });
  await db.collection('portfolio_versions').createIndex({ directorId: 1 });
  console.log('✅ Indexes ensured');

  // ── 3. Directors ──────────────────────────────────────────────────────────
  console.log('\n── Seeding Directors ────────────────────────────────────────');
  for (const dir of directors) {
    const existing = await db.collection('users').findOne({ username: dir.username });

    // Always update the password hash so re-running seed reflects password changes
    if (existing) {
      const updatedHash = await hashPassword(dir.password || dir.username);
      await db.collection('users').updateOne(
        { username: dir.username },
        { $set: { passwordHash: updatedHash, updatedAt: now } }
      );
    }

    if (existing) {
      // Update metadata
      await db.collection('users').updateOne(
        { username: dir.username },
        { $set: { tag: dir.tag, priorityValue: dir.priorityValue, role: 'director', profileImage: dir.image, updatedAt: now } }
      );

      const existingProfile = await db.collection('director_profiles').findOne({ userId: existing._id });
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
        console.log(`✅ ${dir.fullName}: profile created (user already existed)`);
      } else {
        const mergedPortfolioData = { ...existingProfile.portfolioData, boardPreview: dir.portfolioData.boardPreview };
        await db.collection('director_profiles').updateOne(
          { userId: existing._id },
          { $set: { portfolioData: mergedPortfolioData, status: 'published', publishedAt: existingProfile.publishedAt ?? now, updatedAt: now } }
        );
        console.log(`♻️  ${dir.fullName}: updated (already existed)`);
      }
    } else {
      const passwordHash = await hashPassword(dir.password || dir.username);
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

      console.log(`✅ ${dir.fullName}: seeded fresh`);
    }
  }

  // ── Done ──────────────────────────────────────────────────────────────────
  await client.close();
  console.log('\n🎉 Seeding complete!\n');
}

main().catch((err) => {
  console.error('\n❌ Seed error:', err.message || err);
  process.exit(1);
});
