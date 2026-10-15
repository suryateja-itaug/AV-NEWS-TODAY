import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Image as ImageIcon,
  MapPin,
  Mic,
  Share2,
  ShieldCheck,
  Tag,
  User,
  Video,
  Volume2,
  X,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const ArticleReaderModal: React.FC = () => {
  const { selectedArticle, setSelectedArticle } = useNews();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedToast, setCopiedToast] = useState(false);

  if (!selectedArticle) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const images = selectedArticle.images || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#091226] border border-blue-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-red-700 via-blue-900 to-slate-900 px-5 py-3 flex items-center justify-between border-b border-blue-700/50">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded">
              AV NEWS
            </span>
            <span className="text-white text-xs font-black tracking-wider uppercase">
              {selectedArticle.format === 'article' ? 'SPECIAL INVESTIGATIVE ARTICLE' : 'GROUND DISPATCH'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Share Article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedArticle(null)}
              className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {copiedToast && (
          <div className="bg-emerald-950 border-b border-emerald-500/60 text-emerald-200 px-4 py-2 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Article link copied to clipboard!</span>
          </div>
        )}

        {/* Scrollable Reader Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Article Header & Meta */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {selectedArticle.assignedCategory && (
                <span className="bg-blue-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {selectedArticle.assignedCategory}
                </span>
              )}
              {selectedArticle.location && (
                <span className="flex items-center gap-1 text-slate-300 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{selectedArticle.location}</span>
                </span>
              )}
              <span className="text-slate-500">·</span>
              <span className="flex items-center gap-1 text-slate-400 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedArticle.submittedAt}</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                <Eye className="w-3.5 h-3.5" />
                <span>{selectedArticle.views.toLocaleString()} Reads</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
              {selectedArticle.title}
            </h1>

            {selectedArticle.titleTelugu && (
              <h2 className="text-base sm:text-lg font-bold text-amber-300 leading-snug">
                {selectedArticle.titleTelugu}
              </h2>
            )}

            {/* Author Byline Card */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#060c1d] border border-blue-900/60">
              <div className="flex items-center gap-3">
                <img
                  src={selectedArticle.journalistAvatar}
                  alt={selectedArticle.journalistName}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                  }}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/80 shadow"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-white text-xs sm:text-sm">
                      {selectedArticle.journalistName}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-amber-300">
                    {selectedArticle.journalistDesignation || 'AV Life Generalist'}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400">
                    Press ID: {selectedArticle.journalistId}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                VERIFIED ACCREDITATION
              </span>
            </div>
          </div>

          {/* Lead Excerpt */}
          {selectedArticle.summary && (
            <div className="border-l-4 border-red-600 pl-4 py-1 text-slate-200 text-sm font-medium italic bg-blue-950/20 rounded-r">
              {selectedArticle.summary}
            </div>
          )}

          {/* ========================================================= */}
          {/* PHOTO GALLERY (Shows all minimum 2 photos for articles) */}
          {/* ========================================================= */}
          {images.length > 0 && (
            <div className="space-y-2">
              {/* Main Photo Display */}
              <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl h-64 sm:h-96">
                <img
                  src={images[activeImageIdx] || images[0]}
                  alt="Article Hero"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white text-xs font-semibold flex items-center justify-between">
                  <span>
                    Photo #{activeImageIdx + 1} of {images.length}
                  </span>
                  <span className="bg-black/60 px-2 py-0.5 rounded text-[10px] text-slate-300">
                    AV News Photo Wire
                  </span>
                </div>
              </div>

              {/* Thumbnails row if multiple images */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-transform cursor-pointer ${
                        activeImageIdx === idx
                          ? 'border-red-500 scale-105 shadow-md'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* AUDIO PLAYER (if voice report is attached) */}
          {/* ========================================================= */}
          {selectedArticle.audios && selectedArticle.audios.length > 0 && (
            <div className="bg-gradient-to-r from-[#0d1f44] to-[#071126] border border-blue-800/80 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">
                    SPONSORED VOICE DISPATCH / SPOKEN NEWS REPORT
                  </h4>
                  <p className="text-[10px] text-emerald-300">
                    Listen to live spoken field recording by {selectedArticle.journalistName}
                  </p>
                </div>
              </div>

              <audio
                src={selectedArticle.audios[0]}
                controls
                className="w-full h-9 rounded-lg"
              />
            </div>
          )}

          {/* ========================================================= */}
          {/* VIDEO PLAYER (if video is attached) */}
          {/* ========================================================= */}
          {selectedArticle.videos && selectedArticle.videos.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-white">
                <Video className="w-4 h-4 text-red-500" />
                <span>ATTACHED FIELD VIDEO FOOTAGE</span>
              </div>
              <div className="rounded-xl overflow-hidden bg-black border border-slate-800 shadow-xl max-h-96">
                <video src={selectedArticle.videos[0]} controls className="w-full h-full" />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MAIN ARTICLE BODY TEXT */}
          {/* ========================================================= */}
          <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-4">
            {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line text-[13px] sm:text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags Section */}
          {selectedArticle.tags && selectedArticle.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-blue-900/40">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Related Topics:</span>
              </span>
              {selectedArticle.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-800 hover:bg-slate-700 text-blue-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer Accreditation Notice */}
          <div className="bg-[#060c1d] border border-blue-900/60 p-4 rounded-xl text-center space-y-1">
            <p className="text-xs font-black text-white">
              AV NEWS DIGITAL NETWORK • AYUDH VIKAS FOUNDATION
            </p>
            <p className="text-[11px] text-slate-400">
              This field report is certified by accredited journalist {selectedArticle.journalistName}{' '}
              (Press ID: {selectedArticle.journalistId}) and published under editorial review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
