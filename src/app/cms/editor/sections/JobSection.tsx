'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, X } from 'lucide-react';
import type { PortfolioData, JobPosition } from '@/lib/portfolio-types';

interface Props {
  job: PortfolioData['job'];
  onChange: (job: PortfolioData['job']) => void;
}

function emptyPosition(): JobPosition {
  return {
    title: '',
    organization: '',
    period: '',
    department: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    highlights: [],
  };
}

function PositionModal({
  position,
  onSave,
  onClose,
}: {
  position: JobPosition;
  onSave: (p: JobPosition) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<JobPosition>({ ...position });
  const [newHighlight, setNewHighlight] = useState('');

  function set(field: keyof JobPosition, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addHighlight() {
    if (!newHighlight.trim()) return;
    set('highlights', [...(form.highlights || []), newHighlight.trim()]);
    setNewHighlight('');
  }

  function removeHighlight(i: number) {
    set('highlights', (form.highlights || []).filter((_, idx) => idx !== i));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-8 pt-7 pb-5 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
            {form.title ? 'Edit Position' : 'Add Position'}
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-8 py-6 space-y-4 max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label">Job Title *</label>
              <input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Assistant Professor" className="input" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Organization *</label>
              <input value={form.organization} onChange={(e) => set('organization', e.target.value)} placeholder="Thapar Institute of Engineering" className="input" />
            </div>
            <div>
              <label className="label">Department</label>
              <input value={form.department || ''} onChange={(e) => set('department', e.target.value)} placeholder="Department of Mathematics" className="input" />
            </div>
            <div>
              <label className="label">Location</label>
              <input value={form.location || ''} onChange={(e) => set('location', e.target.value)} placeholder="Patiala, Punjab" className="input" />
            </div>
            <div>
              <label className="label">Period (or Start Date)</label>
              <input value={form.period || ''} onChange={(e) => set('period', e.target.value)} placeholder="Current · or 2018 – 2021" className="input" />
            </div>
            <div>
              <label className="label">End Date (optional)</label>
              <input value={form.endDate || ''} onChange={(e) => set('endDate', e.target.value)} placeholder="October 2021" className="input" />
            </div>
          </div>

          <div>
            <label className="label">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={4}
              placeholder="Describe responsibilities and contributions…"
              className="input resize-y"
            />
          </div>

          {/* Highlights */}
          <div>
            <label className="label">Key Highlights</label>
            <div className="flex gap-2 mb-2">
              <input
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                placeholder="Add a highlight and press Enter"
                className="input flex-1"
              />
              <button onClick={addHighlight} className="btn-teal px-4 rounded-xl text-sm">Add</button>
            </div>
            <div className="space-y-2">
              {(form.highlights || []).map((h, i) => (
                <div key={i} className="flex items-start gap-2 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-4 py-2">
                  <span className="flex-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">{h}</span>
                  <button onClick={() => removeHighlight(i)} className="text-zinc-400 hover:text-red-500 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-zinc-100 dark:border-zinc-800">
          <button onClick={onClose} className="btn-outline">Cancel</button>
          <button
            onClick={() => { onSave(form); onClose(); }}
            disabled={!form.title || !form.organization || !form.description}
            className="btn-navy"
          >
            Save Position
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function JobSection({ job, onChange }: Props) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const dragIdx = useState<number | null>(null)[0];

  function updatePositions(positions: JobPosition[]) {
    onChange({ ...job, positions });
  }

  function addPosition(p: JobPosition) {
    updatePositions([...job.positions, p]);
  }

  function updatePosition(idx: number, p: JobPosition) {
    const updated = [...job.positions];
    updated[idx] = p;
    updatePositions(updated);
  }

  function deletePosition(idx: number) {
    updatePositions(job.positions.filter((_, i) => i !== idx));
  }

  // Simple drag-and-drop reorder
  function handleDrop(targetIdx: number, sourceIdx: number) {
    if (sourceIdx === targetIdx) return;
    const updated = [...job.positions];
    const [moved] = updated.splice(sourceIdx, 1);
    updated.splice(targetIdx, 0, moved);
    updatePositions(updated);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">
          Job History
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          Employment positions and professional experience.
        </p>
      </div>

      {/* Summary */}
      <div>
        <label className="label">Job Summary</label>
        <textarea
          value={job.summary}
          onChange={(e) => onChange({ ...job, summary: e.target.value })}
          rows={4}
          placeholder="Brief overview of professional career…"
          className="input resize-y"
        />
      </div>

      {/* Positions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
            Positions ({job.positions.length})
          </h3>
          <button onClick={() => setAddingNew(true)} className="btn-teal text-sm flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add Position
          </button>
        </div>

        {job.positions.length === 0 ? (
          <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-[2rem] py-12 text-center">
            <p className="text-zinc-400 font-medium text-sm">No positions yet. Add one above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {job.positions.map((pos, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', String(idx))}
                onDragOver={(e) => { e.preventDefault(); setDragOver(idx); }}
                onDrop={(e) => { e.preventDefault(); handleDrop(idx, Number(e.dataTransfer.getData('text/plain'))); setDragOver(null); }}
                onDragLeave={() => setDragOver(null)}
                className={`bg-white dark:bg-zinc-900/50 rounded-[2rem] border transition-all ${dragOver === idx ? 'border-[#3A9B9B] shadow-lg' : 'border-zinc-100 dark:border-zinc-800'} shadow-sm overflow-hidden`}
              >
                <div className="flex items-center gap-3 px-5 py-4">
                  <div className="cursor-grab text-zinc-300 dark:text-zinc-700 hover:text-zinc-400 transition-colors">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm truncate">{pos.title}</p>
                    <p className="text-xs text-[#3A9B9B] font-medium">{pos.organization}</p>
                    {pos.period && <p className="text-xs text-zinc-400 font-medium">{pos.period}</p>}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEditingIdx(idx)} className="icon-btn"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                    <button onClick={() => deletePosition(idx)} className="icon-btn text-zinc-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)} className="icon-btn">
                      {expandedIdx === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-zinc-100 dark:border-zinc-800"
                    >
                      <div className="px-5 pb-4 pt-3 space-y-2">
                        {pos.department && <p className="text-xs text-zinc-500"><span className="font-bold">Dept:</span> {pos.department}</p>}
                        {pos.location && <p className="text-xs text-zinc-500"><span className="font-bold">Location:</span> {pos.location}</p>}
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">{pos.description}</p>
                        {pos.highlights && pos.highlights.length > 0 && (
                          <ul className="space-y-1 mt-2">
                            {pos.highlights.map((h, hi) => (
                              <li key={hi} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#3A9B9B] shrink-0" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {addingNew && (
          <PositionModal
            position={emptyPosition()}
            onSave={addPosition}
            onClose={() => setAddingNew(false)}
          />
        )}
        {editingIdx !== null && (
          <PositionModal
            position={job.positions[editingIdx]}
            onSave={(p) => updatePosition(editingIdx, p)}
            onClose={() => setEditingIdx(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
