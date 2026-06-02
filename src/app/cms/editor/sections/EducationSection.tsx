'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, GripVertical } from 'lucide-react';
import type { PortfolioData, Degree, AwardItem, PhdThesis } from '@/lib/portfolio-types';

interface Props {
  education: PortfolioData['education'];
  onChange: (education: PortfolioData['education']) => void;
}

type DegreeFormat = 'A' | 'B';

function DegreeModal({
  degree,
  onSave,
  onClose,
}: {
  degree: Degree | null;
  onSave: (d: Degree) => void;
  onClose: () => void;
}) {
  const initialFormat: DegreeFormat =
    degree && 'degree' in degree ? 'A' : 'B';
  const [format, setFormat] = useState<DegreeFormat>(initialFormat);
  const [formA, setFormA] = useState({
    degree: (degree && 'degree' in degree ? degree.degree : '') || '',
    institution: degree?.institution || '',
    year: degree?.year || '',
    details: (degree && 'details' in degree ? degree.details : '') || '',
  });
  const [formB, setFormB] = useState({
    level: (degree && 'level' in degree ? degree.level : '') || '',
    field: (degree && 'field' in degree ? degree.field : '') || '',
    institution: degree?.institution || '',
    location: (degree && 'location' in degree ? degree.location : '') || '',
    year: degree?.year || '',
    supervisor: (degree && 'supervisor' in degree ? degree.supervisor : '') || '',
  });

  function handleSave() {
    if (format === 'A') {
      if (!formA.degree || !formA.institution) return;
      onSave({ ...formA, year: formA.year || null });
    } else {
      if (!formB.level || !formB.institution) return;
      onSave({ ...formB, year: formB.year || null });
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-8 pt-7 pb-5 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
            {degree ? 'Edit Degree' : 'Add Degree'}
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-8 py-6 max-h-[65vh] overflow-y-auto space-y-5">
          {/* Format toggle */}
          <div className="flex gap-2">
            {(['A', 'B'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${format === f ? 'bg-[#3A9B9B] text-white border-[#3A9B9B]' : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-[#3A9B9B]'}`}
              >
                Format {f} {f === 'A' ? '(degree/details)' : '(level/field)'}
              </button>
            ))}
          </div>

          {format === 'A' ? (
            <div className="space-y-4">
              <div>
                <label className="label">Degree Title *</label>
                <input value={formA.degree} onChange={(e) => setFormA((p) => ({ ...p, degree: e.target.value }))} placeholder="Ph.D. in Mathematics" className="input" />
              </div>
              <div>
                <label className="label">Institution *</label>
                <input value={formA.institution} onChange={(e) => setFormA((p) => ({ ...p, institution: e.target.value }))} placeholder="IIT Patna" className="input" />
              </div>
              <div>
                <label className="label">Year</label>
                <input value={formA.year || ''} onChange={(e) => setFormA((p) => ({ ...p, year: e.target.value }))} placeholder="2016" className="input" />
              </div>
              <div>
                <label className="label">Details</label>
                <textarea value={formA.details} onChange={(e) => setFormA((p) => ({ ...p, details: e.target.value }))} rows={3} placeholder="Supervisor, thesis title, highlights…" className="input resize-y" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Level *</label>
                <input value={formB.level} onChange={(e) => setFormB((p) => ({ ...p, level: e.target.value }))} placeholder="Ph.D." className="input" />
              </div>
              <div>
                <label className="label">Field *</label>
                <input value={formB.field} onChange={(e) => setFormB((p) => ({ ...p, field: e.target.value }))} placeholder="Computer Science" className="input" />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Institution *</label>
                <input value={formB.institution} onChange={(e) => setFormB((p) => ({ ...p, institution: e.target.value }))} placeholder="IIT Bombay" className="input" />
              </div>
              <div>
                <label className="label">Location</label>
                <input value={formB.location || ''} onChange={(e) => setFormB((p) => ({ ...p, location: e.target.value }))} placeholder="Mumbai, India" className="input" />
              </div>
              <div>
                <label className="label">Year</label>
                <input value={formB.year || ''} onChange={(e) => setFormB((p) => ({ ...p, year: e.target.value }))} placeholder="2020" className="input" />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Supervisor</label>
                <input value={formB.supervisor || ''} onChange={(e) => setFormB((p) => ({ ...p, supervisor: e.target.value }))} placeholder="Prof. XYZ" className="input" />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-zinc-100 dark:border-zinc-800">
          <button onClick={onClose} className="btn-outline">Cancel</button>
          <button onClick={handleSave} className="btn-navy">Save Degree</button>
        </div>
      </motion.div>
    </div>
  );
}

function getDegreeTitle(d: Degree): string {
  return 'degree' in d ? d.degree : `${d.level} – ${d.field}`;
}

export default function EducationSection({ education, onChange }: Props) {
  const [degreeModal, setDegreeModal] = useState<{ open: boolean; idx: number | null }>({ open: false, idx: null });
  const [thesisExpanded, setThesisExpanded] = useState(false);
  const [newCommittee, setNewCommittee] = useState({ name: '', role: '' });
  const [newPub, setNewPub] = useState('');
  const [dragOver, setDragOver] = useState<number | null>(null);

  function updateDegrees(degrees: Degree[]) { onChange({ ...education, degrees }); }
  function updateAwards(awards: AwardItem[]) { onChange({ ...education, awards }); }

  function getThesis(): PhdThesis {
    return education.phdThesis || { title: '', summary: '', supervisor: '', institution: '', year: '', publications: [], committee: [] };
  }

  function updateThesis(updates: Partial<PhdThesis>) {
    onChange({ ...education, phdThesis: { ...getThesis(), ...updates } });
  }

  function handleDegreeDrop(targetIdx: number, sourceIdx: number) {
    if (sourceIdx === targetIdx) return;
    const updated = [...education.degrees];
    const [moved] = updated.splice(sourceIdx, 1);
    updated.splice(targetIdx, 0, moved);
    updateDegrees(updated);
  }

  const thesis = getThesis();

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">Education</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Degrees, awards, and PhD thesis details.</p>
      </div>

      {/* Summary */}
      <div>
        <label className="label">Education Summary</label>
        <textarea value={education.summary} onChange={(e) => onChange({ ...education, summary: e.target.value })}
          rows={4} placeholder="Education background overview…" className="input resize-y" />
      </div>

      {/* Degrees */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">Degrees ({education.degrees.length})</h3>
          <button onClick={() => setDegreeModal({ open: true, idx: null })} className="btn-teal text-sm flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add Degree
          </button>
        </div>
        {education.degrees.length === 0 ? (
          <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-[2rem] py-10 text-center">
            <p className="text-zinc-400 font-medium text-sm">No degrees yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {education.degrees.map((deg, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', String(idx))}
                onDragOver={(e) => { e.preventDefault(); setDragOver(idx); }}
                onDrop={(e) => { e.preventDefault(); handleDegreeDrop(idx, Number(e.dataTransfer.getData('text/plain'))); setDragOver(null); }}
                onDragLeave={() => setDragOver(null)}
                className={`flex items-center gap-3 bg-white dark:bg-zinc-900/50 rounded-2xl border px-4 py-3 transition-all ${dragOver === idx ? 'border-[#3A9B9B] shadow-md' : 'border-zinc-100 dark:border-zinc-800'}`}
              >
                <GripVertical className="w-4 h-4 text-zinc-300 dark:text-zinc-700 cursor-grab" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{getDegreeTitle(deg)}</p>
                  <p className="text-xs text-zinc-500">{deg.institution} {deg.year ? `· ${deg.year}` : ''}</p>
                </div>
                <button onClick={() => setDegreeModal({ open: true, idx })} className="icon-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button onClick={() => updateDegrees(education.degrees.filter((_, i) => i !== idx))} className="icon-btn text-zinc-400 hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Awards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">Awards ({education.awards.length})</h3>
          <button
            onClick={() => updateAwards([...education.awards, { title: '', year: '', description: '', category: '' }])}
            className="btn-teal text-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Award
          </button>
        </div>
        <div className="space-y-3">
          {education.awards.map((award, idx) => (
            <div key={idx} className="bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-4 space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <input value={award.title} onChange={(e) => { const a = [...education.awards]; a[idx] = { ...award, title: e.target.value }; updateAwards(a); }}
                  placeholder="Award Title" className="input text-xs sm:col-span-2" />
                <input value={award.year || ''} onChange={(e) => { const a = [...education.awards]; a[idx] = { ...award, year: e.target.value }; updateAwards(a); }}
                  placeholder="Year" className="input text-xs" />
                <select value={award.category || ''} onChange={(e) => { const a = [...education.awards]; a[idx] = { ...award, category: e.target.value }; updateAwards(a); }}
                  className="input text-xs">
                  <option value="">Category</option>
                  <option value="honor">Honor</option>
                  <option value="extracurricular">Extracurricular</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input value={award.description || ''} onChange={(e) => { const a = [...education.awards]; a[idx] = { ...award, description: e.target.value }; updateAwards(a); }}
                  placeholder="Description" className="input text-xs flex-1" />
                <button onClick={() => updateAwards(education.awards.filter((_, i) => i !== idx))} className="text-zinc-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PhD Thesis */}
      <div className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <button
          onClick={() => setThesisExpanded(!thesisExpanded)}
          className="w-full flex items-center justify-between px-8 py-5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
        >
          <div>
            <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">PhD Thesis</h3>
            {thesis.title && <p className="text-xs text-[#3A9B9B] font-medium mt-0.5 truncate max-w-xs">{thesis.title}</p>}
          </div>
          <span className="text-zinc-400">{thesisExpanded ? '▲' : '▼'}</span>
        </button>

        <AnimatePresence>
          {thesisExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-zinc-100 dark:border-zinc-800"
            >
              <div className="px-8 py-6 space-y-5">
                <div>
                  <label className="label">Thesis Title</label>
                  <input value={thesis.title} onChange={(e) => updateThesis({ title: e.target.value })} placeholder="Thesis title" className="input" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="label">Supervisor</label>
                    <input value={thesis.supervisor || ''} onChange={(e) => updateThesis({ supervisor: e.target.value })} placeholder="Dr. XYZ" className="input" />
                  </div>
                  <div>
                    <label className="label">Institution</label>
                    <input value={thesis.institution || ''} onChange={(e) => updateThesis({ institution: e.target.value })} placeholder="IIT Patna" className="input" />
                  </div>
                  <div>
                    <label className="label">Year</label>
                    <input value={thesis.year || ''} onChange={(e) => updateThesis({ year: e.target.value })} placeholder="2016" className="input" />
                  </div>
                </div>
                <div>
                  <label className="label">Summary</label>
                  <textarea value={thesis.summary || ''} onChange={(e) => updateThesis({ summary: e.target.value })} rows={6} placeholder="Thesis abstract and summary…" className="input resize-y" />
                </div>

                {/* Publications */}
                <div>
                  <label className="label">Related Publications</label>
                  <div className="flex gap-2 mb-2">
                    <input value={newPub} onChange={(e) => setNewPub(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newPub.trim()) {
                          e.preventDefault();
                          updateThesis({ publications: [...(thesis.publications || []), newPub.trim()] });
                          setNewPub('');
                        }
                      }}
                      placeholder="Add a publication citation and press Enter" className="input text-xs flex-1" />
                    <button onClick={() => { if (newPub.trim()) { updateThesis({ publications: [...(thesis.publications || []), newPub.trim()] }); setNewPub(''); } }}
                      className="btn-teal px-3 rounded-xl text-xs">Add</button>
                  </div>
                  <div className="space-y-1">
                    {(thesis.publications || []).map((p, i) => (
                      <div key={i} className="flex items-start gap-2 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-3 py-2">
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex-1">{p}</span>
                        <button onClick={() => updateThesis({ publications: (thesis.publications || []).filter((_, j) => j !== i) })} className="text-zinc-400 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Committee */}
                <div>
                  <label className="label">Committee Members</label>
                  <div className="flex gap-2 mb-2">
                    <input value={newCommittee.name} onChange={(e) => setNewCommittee((p) => ({ ...p, name: e.target.value }))} placeholder="Member name" className="input text-xs flex-1" />
                    <input value={newCommittee.role} onChange={(e) => setNewCommittee((p) => ({ ...p, role: e.target.value }))} placeholder="Role" className="input text-xs flex-1" />
                    <button
                      onClick={() => {
                        if (newCommittee.name && newCommittee.role) {
                          updateThesis({ committee: [...(thesis.committee || []), newCommittee] });
                          setNewCommittee({ name: '', role: '' });
                        }
                      }}
                      className="btn-teal px-3 rounded-xl text-xs"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-1">
                    {(thesis.committee || []).map((m, i) => (
                      <div key={i} className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-3 py-2">
                        <span className="font-bold text-xs text-zinc-800 dark:text-zinc-200 flex-1">{m.name}</span>
                        <span className="text-xs text-zinc-500 font-medium">{m.role}</span>
                        <button onClick={() => updateThesis({ committee: (thesis.committee || []).filter((_, j) => j !== i) })} className="text-zinc-400 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {degreeModal.open && (
          <DegreeModal
            degree={degreeModal.idx !== null ? education.degrees[degreeModal.idx] : null}
            onSave={(d) => {
              if (degreeModal.idx === null) {
                updateDegrees([...education.degrees, d]);
              } else {
                const updated = [...education.degrees];
                updated[degreeModal.idx] = d;
                updateDegrees(updated);
              }
            }}
            onClose={() => setDegreeModal({ open: false, idx: null })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
