import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Image as ImageIcon,
  MapPin,
  Mic,
  PlusCircle,
  Radio,
  Tag,
  Video,
  Volume2,
  X,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { JournalistNewsSubmission, SubmissionStatus } from '../types';

export const MyNewsModal: React.FC = () => {
  const {
    currentUser,
    isMyNewsModalOpen,
    setIsMyNewsModalOpen,
    allNewsSubmissions,
    setIsUploadNewsModalOpen,
    setSelectedArticle,
  } = useNews();

  const [statusFilter, setStatusFilter] = useState<'all' | SubmissionStatus>('all');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  if (!isMyNewsModalOpen || !currentUser) return null;

  const mySubmissions = allNewsSubmissions.filter((s) => s.userId === currentUser.id);
  const filteredSubmissions = mySubmissions.filter(
    (s) => statusFilter === 'all' || s.status === statusFilter
  );

  const approvedCount = mySubmissions.filter((s) => s.status === 'approved').length;
  const pendingCount = mySubmissions.filter((s) => s.status === 'pending').length;
  const rejectedCount = mySubmissions.filter((s) => s.status === 'rejected').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#091226] border border-blue-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-red-700 via-blue-900 to-slate-900 px-5 py-3.5 flex items-center justify-between border-b border-blue-700/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center text-white shadow">
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded">
                  MY DISPATCHES
                </span>
                <h3 className="font-black text-white text-sm sm:text-base tracking-wide">
                  JOURNALIST NEWS DESK: {currentUser.fullName}
                </h3>
              </div>
              <p className="text-[11px] text-blue-200 font-mono">
                Press Accreditation ID: {currentUser.journalistId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsMyNewsModalOpen(false);
                setIsUploadNewsModalOpen(true);
              }}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow cursor-pointer transition-transform hover:scale-105"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post New News</span>
            </button>
            <button
              onClick={() => setIsMyNewsModalOpen(false)}
              className="p-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 p-3 bg-[#060c1d] border-b border-blue-900/60 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Status:
          </span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            All Reports ({mySubmissions.length})
          </button>

          <button
            onClick={() => setStatusFilter('approved')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'approved'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-slate-900 text-emerald-400 hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approved & Live ({approvedCount})</span>
          </button>

          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'pending'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-slate-900 text-amber-400 hover:bg-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Under Verification ({pendingCount})</span>
          </button>

          <button
            onClick={() => setStatusFilter('rejected')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'rejected'
                ? 'bg-red-600 text-white shadow'
                : 'bg-slate-900 text-red-400 hover:bg-slate-800'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Rejected ({rejectedCount})</span>
          </button>
        </div>

        {/* Submissions List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredSubmissions.length === 0 ? (
            <div className="bg-[#070e1e] border border-blue-900/60 rounded-xl p-8 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-200">No News Dispatches Found</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You have not submitted any news under this filter yet. Click below to file your field
                report.
              </p>
              <button
                onClick={() => {
                  setIsMyNewsModalOpen(false);
                  setIsUploadNewsModalOpen(true);
                }}
                className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
              >
                Upload News Report Now
              </button>
            </div>
          ) : (
            filteredSubmissions.map((sub) => {
              const isArticle = sub.format === 'article';
              return (
                <div
                  key={sub.id}
                  className="bg-[#070e1e] border border-blue-900/60 hover:border-blue-700/80 rounded-xl p-4 space-y-3 transition-colors shadow-lg"
                >
                  {/* Top Meta Line */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-900/40 pb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${
                          isArticle
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}
                      >
                        {isArticle ? '📰 ARTICLE LEVEL NEWS' : '⚡ SHORT NEWS'}
                      </span>

                      {/* Status Badge */}
                      {sub.status === 'approved' && (
                        <span className="flex items-center gap-1 text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>APPROVED & PUBLISHED LIVE</span>
                        </span>
                      )}

                      {sub.status === 'pending' && (
                        <span className="flex items-center gap-1 text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/50 px-2 py-0.5 rounded animate-pulse">
                          <Clock className="w-3 h-3" />
                          <span>WAITING FOR ADMIN EDITORIAL VERIFICATION</span>
                        </span>
                      )}

                      {sub.status === 'rejected' && (
                        <span className="flex items-center gap-1 text-[10px] font-black bg-red-500/20 text-red-400 border border-red-500/50 px-2 py-0.5 rounded">
                          <AlertCircle className="w-3 h-3" />
                          <span>APPLICATION REJECTED</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{sub.submittedAt}</span>
                      </span>
                      {sub.status === 'approved' && (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{sub.views.toLocaleString()} views</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Grid: Thumbnails & Content */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start">
                    {/* Media Thumbnail Box */}
                    {sub.images && sub.images.length > 0 && (
                      <div className="sm:col-span-4 relative rounded-lg overflow-hidden bg-slate-900 border border-slate-800 h-32 group">
                        <img
                          src={sub.images[0]}
                          alt={sub.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        {sub.images.length > 1 && (
                          <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" />
                            <span>+{sub.images.length - 1} photos</span>
                          </span>
                        )}
                        {sub.audios && sub.audios.length > 0 && (
                          <span className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow">
                            <Mic className="w-3 h-3" />
                            <span>AUDIO NOTE</span>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Headline and Text Details */}
                    <div
                      className={
                        sub.images && sub.images.length > 0
                          ? 'sm:col-span-8 space-y-1.5'
                          : 'sm:col-span-12 space-y-1.5'
                      }
                    >
                      <h4 className="text-sm font-black text-white leading-snug hover:text-blue-300 transition-colors">
                        {sub.title}
                      </h4>
                      {sub.titleTelugu && (
                        <h5 className="text-xs font-bold text-amber-300">{sub.titleTelugu}</h5>
                      )}

                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {sub.summary || sub.content}
                      </p>

                      {/* Location & Tags */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] text-slate-400">
                        {sub.location && (
                          <span className="flex items-center gap-1 text-slate-300">
                            <MapPin className="w-3 h-3 text-red-500" />
                            <span>{sub.location}</span>
                          </span>
                        )}
                        {sub.assignedCategory && (
                          <span className="bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800 uppercase font-bold">
                            Category: {sub.assignedCategory}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Audio Player if present */}
                  {sub.audios && sub.audios.length > 0 && (
                    <div className="bg-[#091329] border border-blue-900/60 p-2.5 rounded-lg flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold text-emerald-400 block truncate">
                          Spoken Audio Dispatch: {sub.title}
                        </span>
                        <audio src={sub.audios[0]} controls className="h-7 w-full max-w-md mt-1" />
                      </div>
                    </div>
                  )}

                  {/* Rejected Reason Alert */}
                  {sub.status === 'rejected' && sub.adminFeedback && (
                    <div className="bg-red-950/60 border border-red-500/50 p-2 rounded text-xs text-red-200">
                      <strong>Editorial Feedback:</strong> {sub.adminFeedback}
                    </div>
                  )}

                  {/* Action Buttons Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-blue-900/40">
                    <span className="text-[11px] text-slate-400">
                      {isArticle
                        ? `${sub.images.length} images · ${sub.videos.length} videos attached`
                        : 'Short dispatch'}
                    </span>

                    {isArticle ? (
                      <button
                        onClick={() => {
                          setSelectedArticle(sub);
                        }}
                        className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-black px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow cursor-pointer transition-transform hover:scale-105"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>READ FULL ARTICLE VIEW</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedArticle(sub);
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
