'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, ExternalLink } from 'lucide-react';
import type { PortfolioData, Publication, CoAuthor, ReviewerJournal } from '@/lib/portfolio-types';

interface Props {
  research: PortfolioData['research'];
  onChange: (research: PortfolioData['research']) => void;
}

const PUB_TYPES = [
  'journal', 'conference', 'book-authored', 'book-edited', 'patent-granted', 'patent-published',
] as const;

type StructuredPub = Exclude<Publication, { citation: string }>;

function isSimple(pub: Publication): pub is { citation: string } {
  return 'citation' in pub;
}

/* ── Publication Modal ── */
function PubModal({
  pub,
  onSave,
  onClose,
}: {
  pub: Publication | null;
  onSave: (p: Publication) => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<'simple' | 'structured'>(
    pub && !isSimple(pub) ? 'structured' : 'simple'
  );
  const [citation, setCitation] = useState(pub && isSimple(pub) ? pub.citation : '');
  const [form, setForm] = useState<Partial<StructuredPub>>(
    pub && !isSimple(pub) ? (pub as StructuredPub) : { type: 'journal', title: '', authors: [] }
  );
  const [authorInput, setAuthorInput] = useState('');

  function setF(k: keyof StructuredPub, v: unknown) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function addAuthor() {
    if (!authorInput.trim()) return;
    setF('authors', [...(form.authors || []), authorInput.trim()]);
    setAuthorInput('');
  }

  function removeAuthor(i: number) {
    setF('authors', (form.authors || []).filter((_, idx) => idx !== i));
  }

  function handleSave() {
    if (mode === 'simple') {
      if (!citation.trim()) return;
      onSave({ citation: citation.trim() });
    } else {
      if (!form.title?.trim()) return;
      onSave(form as StructuredPub);
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-8 pt-7 pb-5 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
            {pub ? 'Edit Publication' : 'Add Publication'}
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-8 py-6 max-h-[65vh] overflow-y-auto space-y-5">
          {/* Mode toggle */}
          <div className="flex gap-2">
            {['simple', 'structured'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as 'simple' | 'structured')}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${mode === m ? 'bg-[#3A9B9B] text-white border-[#3A9B9B]' : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-[#3A9B9B]'}`}
              >
                {m === 'simple' ? 'Simple Citation' : 'Structured Entry'}
              </button>
            ))}
          </div>

          {mode === 'simple' ? (
            <div>
              <label className="label">Citation Text</label>
              <textarea
                value={citation}
                onChange={(e) => setCitation(e.target.value)}
                rows={5}
                placeholder="S. Singh, Y. M. Tripathi: Bayesian estimation... IEEE Transactions on Reliability, Vol. 65(2), 782-795, 2016."
                className="input resize-y"
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="label">Publication Type *</label>
                  <select
                    value={form.type || 'journal'}
                    onChange={(e) => setF('type', e.target.value)}
                    className="input"
                  >
                    {PUB_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Title *</label>
                  <input value={form.title || ''} onChange={(e) => setF('title', e.target.value)} placeholder="Publication title" className="input" />
                </div>

                {/* Authors */}
                <div className="sm:col-span-2">
                  <label className="label">Authors</label>
                  <div className="flex gap-2 mb-2">
                    <input value={authorInput} onChange={(e) => setAuthorInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAuthor())}
                      placeholder="Add author name, press Enter" className="input flex-1" />
                    <button onClick={addAuthor} className="btn-teal px-3 rounded-xl text-xs">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(form.authors || []).map((a, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium">
                        {a}
                        <button onClick={() => removeAuthor(i)}><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Journal / Conference */}
                {(form.type === 'journal' || form.type === 'conference') && (
                  <>
                    {form.type === 'journal' && (
                      <div className="sm:col-span-2">
                        <label className="label">Journal Name</label>
                        <input value={form.journal || ''} onChange={(e) => setF('journal', e.target.value)} placeholder="IEEE Transactions on Reliability" className="input" />
                      </div>
                    )}
                    {form.type === 'conference' && (
                      <div className="sm:col-span-2">
                        <label className="label">Conference Name</label>
                        <input value={form.conference || ''} onChange={(e) => setF('conference', e.target.value)} placeholder="ICML 2024" className="input" />
                      </div>
                    )}
                    <div>
                      <label className="label">Volume</label>
                      <input value={form.volume || ''} onChange={(e) => setF('volume', e.target.value)} placeholder="65(2)" className="input" />
                    </div>
                    <div>
                      <label className="label">Pages</label>
                      <input value={form.pages || ''} onChange={(e) => setF('pages', e.target.value)} placeholder="782-795" className="input" />
                    </div>
                    <div>
                      <label className="label">Year</label>
                      <input type="number" value={form.year ?? ''} onChange={(e) => setF('year', Number(e.target.value))} placeholder="2024" className="input" />
                    </div>
                    <div>
                      <label className="label">Impact Factor</label>
                      <input type="number" step="0.1" value={form.impactFactor ?? ''} onChange={(e) => setF('impactFactor', Number(e.target.value))} placeholder="4.5" className="input" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label">DOI</label>
                      <input value={form.doi || ''} onChange={(e) => setF('doi', e.target.value)} placeholder="10.1109/TR.2016.2517050" className="input" />
                    </div>
                  </>
                )}

                {/* Book */}
                {(form.type === 'book-authored' || form.type === 'book-edited') && (
                  <>
                    <div>
                      <label className="label">Publisher</label>
                      <input value={form.publisher || ''} onChange={(e) => setF('publisher', e.target.value)} placeholder="Springer" className="input" />
                    </div>
                    <div>
                      <label className="label">Year</label>
                      <input type="number" value={form.year ?? ''} onChange={(e) => setF('year', Number(e.target.value))} placeholder="2024" className="input" />
                    </div>
                  </>
                )}

                {/* Patent */}
                {(form.type === 'patent-granted' || form.type === 'patent-published') && (
                  <>
                    <div>
                      <label className="label">Patent Number</label>
                      <input value={form.patentNumber || ''} onChange={(e) => setF('patentNumber', e.target.value)} placeholder="IN123456" className="input" />
                    </div>
                    <div>
                      <label className="label">Application Number</label>
                      <input value={form.applicationNumber || ''} onChange={(e) => setF('applicationNumber', e.target.value)} className="input" />
                    </div>
                    <div>
                      <label className="label">Year</label>
                      <input type="number" value={form.year ?? ''} onChange={(e) => setF('year', Number(e.target.value))} placeholder="2024" className="input" />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-zinc-100 dark:border-zinc-800">
          <button onClick={onClose} className="btn-outline">Cancel</button>
          <button onClick={handleSave} className="btn-navy">Save Publication</button>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Simple repeater rows ── */
function CoAuthorRow({
  item,
  onUpdate,
  onDelete,
}: {
  item: CoAuthor;
  onUpdate: (item: CoAuthor) => void;
  onDelete: () => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-center bg-zinc-50 dark:bg-zinc-950 rounded-xl px-3 py-2">
      <input value={item.name} onChange={(e) => onUpdate({ ...item, name: e.target.value })} placeholder="Name" className="input text-xs col-span-2 sm:col-span-1" />
      <input value={item.affiliation || ''} onChange={(e) => onUpdate({ ...item, affiliation: e.target.value })} placeholder="Affiliation" className="input text-xs" />
      <input value={item.role || ''} onChange={(e) => onUpdate({ ...item, role: e.target.value })} placeholder="Role" className="input text-xs" />
      <input type="number" value={item.count ?? ''} onChange={(e) => onUpdate({ ...item, count: Number(e.target.value) })} placeholder="Count" className="input text-xs" />
      <div className="flex items-center gap-1">
        <input value={item.link || ''} onChange={(e) => onUpdate({ ...item, link: e.target.value })} placeholder="Link" className="input text-xs flex-1" />
        <button onClick={onDelete} className="text-zinc-400 hover:text-red-500 transition-colors shrink-0">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function ResearchSection({ research, onChange }: Props) {
  const [pubModal, setPubModal] = useState<{ open: boolean; idx: number | null }>({ open: false, idx: null });

  function updatePubs(publications: Publication[]) { onChange({ ...research, publications }); }
  function updateCoAuthors(coAuthors: CoAuthor[]) { onChange({ ...research, coAuthors }); }
  function updateJournals(reviewerJournals: ReviewerJournal[]) { onChange({ ...research, reviewerJournals }); }

  function savePub(pub: Publication) {
    if (pubModal.idx === null) {
      updatePubs([...research.publications, pub]);
    } else {
      const updated = [...research.publications];
      updated[pubModal.idx] = pub;
      updatePubs(updated);
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">Research</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Publications, co-authors, and reviewer journals.</p>
      </div>

      {/* Summary */}
      <div>
        <label className="label">Research Summary</label>
        <textarea value={research.summary} onChange={(e) => onChange({ ...research, summary: e.target.value })}
          rows={5} placeholder="Research interests and overview…" className="input resize-y" />
      </div>

      {/* Publications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
            Publications ({research.publications.length})
          </h3>
          <button onClick={() => setPubModal({ open: true, idx: null })} className="btn-teal text-sm flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add Publication
          </button>
        </div>
        {research.publications.length === 0 ? (
          <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-[2rem] py-10 text-center">
            <p className="text-zinc-400 font-medium text-sm">No publications yet.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {research.publications.map((pub, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 px-4 py-3">
                <span className="shrink-0 text-xs font-black text-[#3A9B9B] bg-teal-50 dark:bg-teal-900/20 w-7 h-7 rounded-xl flex items-center justify-center mt-0.5">{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 leading-snug">
                    {isSimple(pub) ? pub.citation : pub.title}
                  </p>
                  {!isSimple(pub) && (
                    <span className="text-[10px] font-bold text-[#3A9B9B] uppercase">{pub.type}</span>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setPubModal({ open: true, idx })} className="icon-btn"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                  <button onClick={() => updatePubs(research.publications.filter((_, i) => i !== idx))} className="icon-btn text-zinc-400 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Co-Authors */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">Co-Authors ({research.coAuthors.length})</h3>
          <button
            onClick={() => updateCoAuthors([...research.coAuthors, { name: '', count: 0, affiliation: '', role: '', link: '' }])}
            className="btn-teal text-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {research.coAuthors.map((ca, idx) => (
            <CoAuthorRow
              key={idx}
              item={ca}
              onUpdate={(updated) => {
                const list = [...research.coAuthors];
                list[idx] = updated;
                updateCoAuthors(list);
              }}
              onDelete={() => updateCoAuthors(research.coAuthors.filter((_, i) => i !== idx))}
            />
          ))}
        </div>
        {research.coAuthors.length > 0 && (
          <p className="text-xs text-zinc-400 mt-2">Fields: Name · Affiliation · Role · Count · Profile Link</p>
        )}
      </div>

      {/* Reviewer Journals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">Reviewer Journals ({research.reviewerJournals.length})</h3>
          <button
            onClick={() => updateJournals([...research.reviewerJournals, { name: '', link: '' }])}
            className="btn-teal text-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Journal
          </button>
        </div>
        <div className="space-y-2">
          {research.reviewerJournals.map((j, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-3 py-2">
              <input
                value={j.name}
                onChange={(e) => {
                  const list = [...research.reviewerJournals];
                  list[idx] = { ...j, name: e.target.value };
                  updateJournals(list);
                }}
                placeholder="Journal name"
                className="input text-xs flex-1"
              />
              <input
                value={j.link}
                onChange={(e) => {
                  const list = [...research.reviewerJournals];
                  list[idx] = { ...j, link: e.target.value };
                  updateJournals(list);
                }}
                placeholder="https://..."
                className="input text-xs flex-1"
              />
              {j.link && <a href={j.link} target="_blank" rel="noopener" className="text-[#3A9B9B]"><ExternalLink className="w-3.5 h-3.5" /></a>}
              <button onClick={() => updateJournals(research.reviewerJournals.filter((_, i) => i !== idx))} className="text-zinc-400 hover:text-red-500">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {pubModal.open && (
          <PubModal
            pub={pubModal.idx !== null ? research.publications[pubModal.idx] : null}
            onSave={savePub}
            onClose={() => setPubModal({ open: false, idx: null })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
