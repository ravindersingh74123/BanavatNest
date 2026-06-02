/* ──────────────────────────────────────────────
   BanavatNest — Canonical PortfolioData Types
   Single source of truth used by:
     - CMS editor
     - Public portfolio pages
     - PortfolioPage.tsx renderer
   ────────────────────────────────────────────── */

export interface JobPosition {
  title: string;
  organization: string;
  /** Simple period string OR derived from startDate/endDate */
  period?: string;
  department?: string;
  location?: string;
  startDate?: string | null;
  endDate?: string | null;
  description: string;
  highlights?: string[];
}

/** Publications – support BOTH a simple citation string and a rich structured object */
export type Publication =
  | { citation: string }
  | {
      type:
        | 'journal'
        | 'conference'
        | 'book-authored'
        | 'book-edited'
        | 'patent-granted'
        | 'patent-published'
        | 'Research-Publications';
      title: string;
      authors?: string[];
      journal?: string;
      volume?: string;
      pages?: string;
      articleNumber?: string;
      year?: number | null;
      doi?: string;
      impactFactor?: number;
      publisher?: string;
      conference?: string;
      location?: string;
      date?: string;
      patentNumber?: string;
      applicationNumber?: string;
      inventors?: string[];
      ResearchPublications?: string;
    };

export interface CoAuthor {
  name: string;
  count?: number;
  affiliation?: string;
  role?: string;
  link?: string | null;
}

export interface ReviewerJournal {
  name: string;
  link: string;
}

/** Degree supports Format A (degree/institution/year/details) and Format B (level/field/...) */
export type Degree =
  | { degree: string; institution: string; year: string | null; details: string }
  | {
      level: string;
      field: string;
      institution: string;
      location?: string;
      year: string | null;
      supervisor?: string;
    };

export interface AwardItem {
  title: string;
  year?: string;
  description?: string;
  category?: 'honor' | 'extracurricular' | string;
}

export interface PhdThesis {
  title: string;
  summary?: string;
  supervisor?: string;
  institution?: string;
  year?: string;
  publications?: string[];
  committee?: { name: string; role: string }[];
}

/** AcademicProfile supports Format A (name/link) and Format B (platform/url) */
export type AcademicProfile =
  | { name: string; link: string }
  | { platform: string; url: string };

export interface PortfolioData {
  id: string;
  name: string;
  role: string;
  image: string | null;
  bio: string;

  job: {
    summary: string;
    positions: JobPosition[];
  };

  research: {
    summary: string;
    publications: Publication[];
    coAuthors: CoAuthor[];
    reviewerJournals: ReviewerJournal[];
  };

  education: {
    summary: string;
    degrees: Degree[];
    awards: AwardItem[];
    phdThesis?: PhdThesis;
  };

  contact: {
    email: string;
    phone: string[];
    profiles: AcademicProfile[];
  };
}

/** Returns a blank PortfolioData skeleton for newly created directors */
export function emptyPortfolio(id = '', name = ''): PortfolioData {
  return {
    id,
    name,
    role: '',
    image: null,
    bio: '',
    job: {
      summary: '',
      positions: [],
    },
    research: {
      summary: '',
      publications: [],
      coAuthors: [],
      reviewerJournals: [],
    },
    education: {
      summary: '',
      degrees: [],
      awards: [],
    },
    contact: {
      email: '',
      phone: [],
      profiles: [],
    },
  };
}
