'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, Trash2, Eye, Edit3, LogIn, RefreshCw, CheckCircle,
  Clock, XCircle, Search, Shield, ChevronRight, MoreVertical,
  Upload, X, Key, AlertCircle, LayoutDashboard, LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Director {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  tag: string;
  priorityValue: number;
  profileImage: string | null;
  portfolioStatus: 'draft' | 'published';
  publishedAt: string | null;
  lastUpdated: string;
  currentVersion: number;
}

interface CurrentUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

/* ── Status badge ── */
function StatusBadge({ status }: { status: 'draft' | 'published' }) {
  return status === 'published' ? (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
      <CheckCircle className="w-3 h-3" /> Published
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-200 dark:border-amber-800">
      <Clock className="w-3 h-3" /> Draft
    </span>
  );
}

/* ── Add Director Modal ── */
function AddDirectorModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tag, setTag] = useState<'Board of Director' | 'Advisory board'>('Board of Director');
  const [priorityValue, setPriorityValue] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImagePreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  }

  // Auto-generate username from full name
  useEffect(() => {
    if (fullName) {
      setUsername(
        fullName
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .trim()
          .replace(/\s+/g, '-')
      );
    }
  }, [fullName]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/cms/directors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          username,
          password,
          tag,
          priorityValue,
          profileImage: imageBase64,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create director');
        return;
      }

      onCreated();
      onClose();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
              Add Director
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">
              Create a new director account with empty portfolio
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-8 py-6 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm font-medium mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form id="add-director-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Image */}
            <div className="flex items-center gap-5">
              <div
                onClick={() => fileRef.current?.click()}
                className="w-20 h-20 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#3A9B9B] transition-colors bg-zinc-50 dark:bg-zinc-950 shrink-0"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-6 h-6 text-zinc-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Profile Photo</p>
                <p className="text-xs text-zinc-500 mt-0.5">Click to upload. Will be uploaded to Cloudinary.</p>
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Dr. Jane Smith"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Username * <span className="text-zinc-400 font-normal">(used in public URL)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium">/directors/</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  required
                  placeholder="dr-jane-smith"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-24 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Min. 6 characters"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors"
              />
            </div>

            {/* Tag */}
            <div>
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Tag
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value as 'Board of Director' | 'Advisory board')}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors"
              >
                <option value="Board of Director">Board of Director</option>
                <option value="Advisory board">Advisory board</option>
              </select>
            </div>

            {/* Priority Value */}
            <div>
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Priority Value <span className="text-zinc-400 font-normal">(lower = appears first)</span>
              </label>
              <input
                type="number"
                value={priorityValue}
                onChange={(e) => setPriorityValue(Number(e.target.value))}
                min={0}
                placeholder="0"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 px-8 py-6 border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-director-form"
            disabled={loading}
            className="px-6 py-2.5 rounded-full bg-[#2D3561] dark:bg-[#3A9B9B] text-white font-bold text-sm shadow-lg hover:bg-[#1f2545] dark:hover:bg-[#2a7676] transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {loading ? 'Creating…' : 'Create Director'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Reset Password Modal ── */
function ResetPasswordModal({
  directorId,
  directorName,
  onClose,
}: {
  directorId: string;
  directorName: string;
  onClose: () => void;
}) {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/cms/directors/${directorId}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setSuccess(true);
      setTimeout(onClose, 1500);
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100">Reset Password</h2>
            <p className="text-xs text-zinc-500 mt-1">{directorName}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="flex items-center gap-2 text-emerald-600 font-bold">
            <CheckCircle className="w-5 h-5" /> Password updated!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              placeholder="New password (min 6 chars)"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-full bg-[#2D3561] dark:bg-[#3A9B9B] text-white font-bold text-sm hover:bg-[#1f2545] dark:hover:bg-[#2a7676] transition-colors disabled:opacity-60"
            >
              {loading ? 'Saving…' : 'Update Password'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

/* ── Main Admin Page ── */
export default function AdminPage() {
  const router = useRouter();
  const [directors, setDirectors] = useState<Director[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [resetTarget, setResetTarget] = useState<{ id: string; name: string } | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchDirectors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cms/directors');
      if (res.status === 401) { router.push('/cms/login'); return; }
      if (res.status === 403) { router.push('/cms/login'); return; }
      const data = await res.json();
      setDirectors(data.directors || []);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetch('/api/cms/auth/me')
      .then((r) => r.json())
      .then((u) => { if (u.role !== 'super_admin') router.push('/cms/login'); else setCurrentUser(u); })
      .catch(() => router.push('/cms/login'));
    fetchDirectors();
  }, [router, fetchDirectors]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this director and all their portfolio data? This cannot be undone.')) return;
    setDeleting(id);
    await fetch(`/api/cms/directors/${id}`, { method: 'DELETE' });
    setDeleting(null);
    fetchDirectors();
  }

  async function handleLoginAs(username: string, id: string) {
    const res = await fetch(`/api/cms/directors/${id}/login-as`, { method: 'POST' });
    const data = await res.json();
    if (res.ok) router.push(`/cms/editor/${username}`);
  }

  async function handleLogout() {
    await fetch('/api/cms/auth/logout', { method: 'POST' });
    router.push('/cms/login');
  }

  const filtered = directors.filter(
    (d) =>
      d.fullName.toLowerCase().includes(search.toLowerCase()) ||
      d.username.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: directors.length,
    published: directors.filter((d) => d.portfolioStatus === 'published').length,
    drafts: directors.filter((d) => d.portfolioStatus === 'draft').length,
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b]">
      {/* ── CMS Top Navbar ── */}
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 h-16 flex items-center px-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 rounded-xl bg-[#2D3561] flex items-center justify-center">
            <span className="text-sm font-black text-white">B</span>
          </div>
          <span className="font-black text-zinc-900 dark:text-zinc-100">
            Banavat<span className="text-[#3A9B9B]">Nest</span>
            <span className="text-zinc-400 dark:text-zinc-600 font-medium"> / Admin</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
            <Shield className="w-3.5 h-3.5 text-[#3A9B9B]" />
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              {currentUser?.fullName || 'Super Admin'}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
              Director <span className="text-[#3A9B9B]">Management</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium mt-1">
              Manage director accounts and portfolios
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-[#5BBD4A] dark:bg-[#3A9B9B] text-white rounded-full font-black px-6 py-3 shadow-xl hover:bg-[#3a8a2c] dark:hover:bg-[#2a7676] transition-colors text-sm"
          >
            <Plus className="w-4 h-4" /> Add Director
          </motion.button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { label: 'Total Directors', value: stats.total, icon: Users, color: 'bg-[#2D3561]/10 text-[#2D3561] dark:text-zinc-300' },
            { label: 'Published', value: stats.published, icon: CheckCircle, color: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' },
            { label: 'Drafts', value: stats.drafts, icon: Clock, color: 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-zinc-900/50 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-6 shadow-sm flex items-center gap-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
          {/* Table toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search directors…"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors"
              />
            </div>
            <button
              onClick={fetchDirectors}
              className="flex items-center gap-1.5 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-50/80 dark:bg-zinc-950/50 text-left">
                  {['Director', 'Username', 'Tag', 'Status', 'Last Updated', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-4 text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" style={{ width: `${60 + j * 5}%` }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <Users className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                      <p className="text-zinc-500 font-medium">
                        {search ? 'No directors match your search' : 'No directors yet. Add one!'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((director) => (
                    <motion.tr
                      key={director.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                    >
                      {/* Director name + avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl overflow-hidden bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] flex items-center justify-center shrink-0">
                            {director.profileImage ? (
                              <img src={director.profileImage} alt={director.fullName} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-white font-black text-sm">
                                {director.fullName.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm whitespace-nowrap">{director.fullName}</p>
                            <p className="text-xs text-zinc-400">v{director.currentVersion}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 font-mono">@{director.username}</span>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                          director.tag === 'Board of Director'
                            ? 'bg-[#2D3561]/10 text-[#2D3561] dark:text-zinc-300 border-[#2D3561]/20'
                            : 'bg-[#3A9B9B]/10 text-[#3A9B9B] border-[#3A9B9B]/20'
                        }`}>
                          {director.tag ?? 'Board of Director'}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={director.portfolioStatus} />
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-zinc-500">
                          {new Date(director.lastUpdated).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {/* View portfolio */}
                          <a
                            href={`/en/directors/${director.username}`}
                            target="_blank"
                            rel="noopener"
                            title="View public portfolio"
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-[#3A9B9B] hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </a>

                          {/* Login as */}
                          <button
                            onClick={() => handleLoginAs(director.username, director.id)}
                            title="Login as this director"
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-[#2D3561] dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          >
                            <LogIn className="w-4 h-4" />
                          </button>

                          {/* Reset password */}
                          <button
                            onClick={() => setResetTarget({ id: director.id, name: director.fullName })}
                            title="Reset password"
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                          >
                            <Key className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(director.id)}
                            disabled={deleting === director.id}
                            title="Delete director"
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                          >
                            {deleting === director.id ? (
                              <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {showAddModal && (
          <AddDirectorModal
            onClose={() => setShowAddModal(false)}
            onCreated={fetchDirectors}
          />
        )}
        {resetTarget && (
          <ResetPasswordModal
            directorId={resetTarget.id}
            directorName={resetTarget.name}
            onClose={() => setResetTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
