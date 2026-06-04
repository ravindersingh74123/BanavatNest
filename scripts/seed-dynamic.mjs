import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import vm from 'vm';
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
  console.warn('⚠️  Could not read .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'banavatnest';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set!');
  process.exit(1);
}

// ── Extraction Helper ────────────────────────────────────────────────────────
function extractDataFromTsx(filePath, varName) {
  const fullPath = resolve(__dirname, '..', filePath);
  let content = readFileSync(fullPath, 'utf-8');

  // Strip imports
  content = content.replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '');

  // Strip export metadata and export default function
  content = content.replace(/export\s+const\s+metadata[\s\S]*?};/g, '');
  content = content.replace(/export\s+default\s+function[\s\S]*/g, '');

  // Strip TS type annotations
  content = content.replace(/:\s*PortfolioData/g, '');
  content = content.replace(/:\s*Metadata/g, '');

  // Make variables global so they are exported onto the sandbox context
  content = content.replace('const SUKHDEV_DATA', 'globalThis.SUKHDEV_DATA');
  content = content.replace('const SANGITA_DATA', 'globalThis.SANGITA_DATA');

  // Run in VM
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(content, sandbox);

  return sandbox[varName];
}

async function main() {
  console.log('📖 Extracting data from TSX files…');
  const sangitaData = extractDataFromTsx('src/app/[locale]/about/board/dr-sangita-roy/page.tsx', 'SANGITA_DATA');
  const sukhdevData = extractDataFromTsx('src/app/[locale]/about/board/dr-sukhdev-singh/page.tsx', 'SUKHDEV_DATA');

  console.log(`✅ Extracted Dr. Sangita Roy portfolio data (Bio length: ${sangitaData.bio.length})`);
  console.log(`✅ Extracted Dr. Sukhdev Singh portfolio data (Bio length: ${sukhdevData.bio.length})`);

  console.log('\n🔗 Connecting to MongoDB…');
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  console.log(`✅ Connected to database: ${DB_NAME}`);

  const now = new Date();
  const passwordHash = await bcryptjs.hash('banavatnest@admin123', 12);

  // Define the users to seed/update
  // We will seed BOTH the short usernames ('sukhdev', 'sangita') and the long usernames ('dr-sukhdev-singh', 'dr-sangita-roy')
  // to ensure whichever route or system configuration is used, the data is completely set.
  const usersToSeed = [
    {
      username: 'sukhdev',
      fullName: 'Dr. Sukhdev Singh',
      role: 'Ph.D. (IIT Patna)',
      image: '/images/Director/Sukhdev.jpeg',
      tag: 'Board of Director',
      priorityValue: 1,
      portfolioData: { ...sukhdevData, id: 'sukhdev' }
    },
    {
      username: 'dr-sukhdev-singh',
      fullName: 'Dr. Sukhdev Singh',
      role: 'Ph.D. (IIT Patna)',
      image: '/images/Director/Sukhdev.jpeg',
      tag: 'Board of Director',
      priorityValue: 1,
      portfolioData: { ...sukhdevData, id: 'dr-sukhdev-singh' }
    },
    {
      username: 'sangita',
      fullName: 'Dr. Sangita Roy',
      role: 'Ph.D. (IIT Patna)',
      image: '/images/Director/Sangita.jpeg',
      tag: 'Board of Director',
      priorityValue: 2,
      portfolioData: { ...sangitaData, id: 'sangita' }
    },
    {
      username: 'dr-sangita-roy',
      fullName: 'Dr. Sangita Roy',
      role: 'Ph.D. (IIT Patna)',
      image: '/images/Director/Sangita.jpeg',
      tag: 'Board of Director',
      priorityValue: 2,
      portfolioData: { ...sangitaData, id: 'dr-sangita-roy' }
    }
  ];

  for (const item of usersToSeed) {
    console.log(`\nProcessing user: ${item.username} (${item.fullName})`);
    
    // 1. Find or create user
    let user = await db.collection('users').findOne({ username: item.username });
    if (!user) {
      const userResult = await db.collection('users').insertOne({
        fullName: item.fullName,
        username: item.username,
        passwordHash,
        role: 'director',
        tag: item.tag,
        priorityValue: item.priorityValue,
        profileImage: item.image,
        createdAt: now,
        updatedAt: now
      });
      user = { _id: userResult.insertedId, ...item };
      console.log(`  ✅ Created user: ${item.username}`);
    } else {
      // Update existing user details
      await db.collection('users').updateOne(
        { _id: user._id },
        {
          $set: {
            fullName: item.fullName,
            tag: item.tag,
            priorityValue: item.priorityValue,
            profileImage: item.image,
            updatedAt: now
          }
        }
      );
      console.log(`  ✅ Updated existing user: ${item.username}`);
    }

    // 2. Find or create director profile
    const profile = await db.collection('director_profiles').findOne({ userId: user._id });
    if (!profile) {
      await db.collection('director_profiles').insertOne({
        userId: user._id,
        portfolioData: item.portfolioData,
        status: 'published',
        publishedAt: now,
        currentVersion: 1,
        createdAt: now,
        updatedAt: now
      });
      console.log(`  ✅ Created published profile for ${item.username}`);
    } else {
      await db.collection('director_profiles').updateOne(
        { userId: user._id },
        {
          $set: {
            portfolioData: item.portfolioData,
            status: 'published',
            updatedAt: now
          }
        }
      );
      console.log(`  ✅ Updated published profile for ${item.username}`);
    }
  }

  await client.close();
  console.log('\n🎉 Dynamic data seeding complete!\n');
}

main().catch(err => {
  console.error('\n❌ Error during seeding:', err.message || err);
  process.exit(1);
});
