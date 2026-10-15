import React, { useRef, useState } from 'react';
import {
  Calendar,
  Clock,
  Eye,
  FileText,
  Filter,
  Image as ImageIcon,
  MapPin,
  Mic,
  Pause,
  Play,
  PlayCircle,
  Search,
  Share2,
  ShieldCheck,
  Tag,
  User,
  Video,
  Volume2,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { LOCATIONS_LIST } from '../data/initialData';
import { NewsCategory, VideoItem } from '../types';

export const CategoryPage: React.FC = () => {
  const {
    videos,
    activeCategory,
    setActiveCategory,
    selectedLocation,
    setSelectedLocation,
    setSelectedVideo,
    searchQuery,
    allNewsSubmissions,
    setSelectedArticle,
  } = useNews();

  const [localSearch, setLocalSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = (audioUrl: string) => {
    if (playingAudioUrl === audioUrl) {
      audioRef.current?.pause();
      setPlayingAudioUrl(null);
    } else {
      setPlayingAudioUrl(audioUrl);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // Filter approved journalist reports for this category
  const categoryJournalistNews = allNewsSubmissions
    .filter((s) => s.status === 'approved')
    .filter(
      (s) =>
        activeCategory === 'all' ||
        s.assignedCategory === activeCategory ||
        s.assignedCategory === 'all' ||
        !s.assignedCategory
    );

  // Filter videos
  const categoryVideos = videos.filter((v) => {
    // Category match
    const catMatch = activeCategory === 'all' || v.category === activeCategory;

    // Location match
    const locMatch =
      !selectedLocation ||
      Boolean(
        v.location &&
          (v.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
            selectedLocation.toLowerCase().includes(v.location.toLowerCase()))
      );

    // Search query match
    const q = (searchQuery || localSearch).trim().toLowerCase();
    const searchMatch =
      !q ||
      Boolean(v.title && v.title.toLowerCase().includes(q)) ||
      Boolean(v.titleTelugu && v.titleTelugu.toLowerCase().includes(q)) ||
      Boolean(v.description && v.description.toLowerCase().includes(q)) ||
      Boolean(v.tags && v.tags.some((t) => t && t.toLowerCase().includes(q)));

    // Tag match
    const tagMatch = selectedTag === 'all' || Boolean(v.tags && v.tags.includes(selectedTag));

    return catMatch && locMatch && searchMatch && tagMatch;
  });

  // Extract all unique tags in this category
  const allTags = Array.from(
    new Set(
      videos
        .filter((v) => activeCategory === 'all' || v.category === activeCategory)
        .flatMap((v) => v.tags || [])
    )
  );

  const getCategoryTitle = (cat: NewsCategory | 'all') => {
    switch (cat) {
      case 'telangana':
        return 'TELANGANA NEWS (తెలంగాణ వార్తలు)';
      case 'national':
        return 'NATIONAL & WORLD (జాతీయ అంతర్జాతీయ వార్తలు)';
      case 'politics':
        return 'POLITICS & ELECTIONS (రాజకీయాలు)';
      case 'crime':
        return 'CRIME & LAW ENFORCEMENT (నేరాలు & చట్టం)';
      case 'business':
        return 'BUSINESS & ECONOMY (వాణిజ్యం & ఆర్థికం)';
      case 'sports':
        return 'SPORTS & GAMES (క్రీడలు)';
      case 'cinema':
        return 'CINEMA & ENTERTAINMENT (సినిమా & వినోదం)';
      case 'health':
        return 'HEALTH & WELLNESS (ఆరోగ్యం & జీవనశైలి)';
      case 'social':
        return 'PUBLIC VOICE & SOCIAL CAUSES (సామాజిక స్పృహ)';
      case 'special-report':
        return 'SPECIAL INVESTIGATIVE REPORTS (ప్రత్యేక పరిశోధన కథనాలు)';
      case 'ground-report':
        return 'GROUND REPORTS FROM VILLAGES & TOWNS (క్షేత్రస్థాయి నివేదికలు)';
      case 'explainer':
        return 'EXPLAINERS & IN-DEPTH ANALYSIS (విశ్లేషణలు)';
      default:
        return 'ALL NEWS & ARCHIVES (అన్ని వార్తలు)';
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-4 space-y-5">
      {/* Category Header Banner */}
      <div className="bg-[#0b152d] border border-blue-900/60 rounded-xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest mb-1">
            <span className="w-1.5 h-4 bg-red-600 rounded-sm"></span>
            <span>AV News Today • PRESTORED ARCHIVES</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            {getCategoryTitle(activeCategory)}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            అడ్మిన్ ద్వారా అప్‌లోడ్ చేయబడిన విశ్వసనీయ వార్తా వీడియోలు మరియు గ్రౌండ్ రిపోర్టులు.
          </p>
        </div>

        {/* Search & Location Filter */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Location filter dropdown */}
          <select
            value={selectedLocation || ''}
            onChange={(e) => setSelectedLocation(e.target.value || null)}
            className="bg-slate-900 border border-blue-800 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Locations (అన్ని ప్రాంతాలు)</option>
            {LOCATIONS_LIST.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name} ({loc.nameTelugu})
              </option>
            ))}
          </select>

          {/* Search box */}
          <div className="relative flex-1 md:w-60">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search reports..."
              className="w-full bg-slate-900 border border-blue-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Tags Filter Bar */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          <span className="text-slate-400 font-bold flex items-center gap-1 shrink-0 text-[11px]">
            <Tag className="w-3 h-3" /> Topics:
          </span>
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
              selectedTag === 'all'
                ? 'bg-red-600 text-white shadow'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            All Topics
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Journalist Dispatches for this Category */}
      {categoryJournalistNews.length > 0 && (
        <div className="bg-[#0b152d] border border-blue-900/50 rounded-xl p-4 shadow-xl space-y-3.5">
          <div className="flex items-center justify-between border-b border-blue-900/60 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-1 h-3.5 bg-red-600 rounded-sm"></span>
              <span className="font-black text-xs text-white uppercase tracking-wider">
                ACCREDITED JOURNALIST FIELD DISPATCHES
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                VERIFIED BY EDITORIAL DESK
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              {categoryJournalistNews.length} Reports
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {categoryJournalistNews.map((item) => {
              const isArticle = item.format === 'article';
              const hasAudio = item.audios && item.audios.length > 0;
              const isThisAudioPlaying = hasAudio && playingAudioUrl === item.audios[0];

              return (
                <div
                  key={item.id}
                  className="bg-[#070e1e] border border-blue-900/60 hover:border-blue-700/80 rounded-xl p-3 flex flex-col justify-between shadow-lg space-y-3 transition-colors"
                >
                  <div className="space-y-2.5">
                    {item.images && item.images.length > 0 && (
                      <div className="relative rounded-lg overflow-hidden bg-slate-950 border border-slate-800 h-40 group">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span
                          className={`absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow ${
                            isArticle ? 'bg-amber-600 text-white' : 'bg-blue-600 text-white'
                          }`}
                        >
                          {isArticle ? 'IN-DEPTH ARTICLE' : 'SHORT REPORT'}
                        </span>
                        {item.images.length > 1 && (
                          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" />
                            <span>+{item.images.length - 1} photos</span>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Byline */}
                    <div className="flex items-center gap-2 text-xs">
                      <img
                        src={item.journalistAvatar}
                        alt={item.journalistName}
                        className="w-6 h-6 rounded-full object-cover border border-amber-400"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-white text-[11px] truncate">
                            {item.journalistName}
                          </span>
                          <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                        </div>
                        <span className="text-[9px] text-slate-400 font-mono">
                          {item.journalistId}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-black text-sm text-white line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      {item.titleTelugu && (
                        <h5 className="text-xs font-bold text-amber-300 line-clamp-1">
                          {item.titleTelugu}
                        </h5>
                      )}
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {item.summary || item.content}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-blue-900/40">
                    {/* Audio play button */}
                    {hasAudio && (
                      <button
                        type="button"
                        onClick={() => toggleAudio(item.audios[0])}
                        className={`w-full flex items-center justify-between gap-2 p-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                          isThisAudioPlaying
                            ? 'bg-emerald-600 text-white shadow-md animate-pulse'
                            : 'bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            {isThisAudioPlaying ? (
                              <Pause className="w-3.5 h-3.5 fill-white" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                            )}
                          </div>
                          <span className="truncate text-[11px]">
                            {isThisAudioPlaying ? 'Playing Audio: ' : 'Play Voice Note: '}
                            {item.title}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono shrink-0">
                          {isThisAudioPlaying ? 'PAUSE' : 'LISTEN'}
                        </span>
                      </button>
                    )}

                    {/* Article Read More button */}
                    {isArticle ? (
                      <button
                        type="button"
                        onClick={() => setSelectedArticle(item)}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-black py-2 rounded-lg flex items-center justify-center gap-1.5 shadow cursor-pointer transition-transform hover:scale-102"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>READ MORE (FULL ARTICLE)</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                        <span>{item.location || 'Ground Report'}</span>
                        <span>Verified Dispatch</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Hidden audio player for voice reports */}
      <audio ref={audioRef} onEnded={() => setPlayingAudioUrl(null)} className="hidden" />

      {/* Videos Grid */}
      {categoryVideos.length === 0 ? (
        <div className="bg-[#0b152d] border border-blue-900/40 rounded-xl p-12 text-center space-y-3">
          <Video className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No reports found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            ఈ విభాగంలో లేదా ఎంచుకున్న ప్రాంతంలో ప్రస్తుతానికి వీడియోలు లేవు. అడ్మిన్ పోర్టల్ ద్వారా
            కొత్త వీడియోలను అప్‌లోడ్ చేయవచ్చు.
          </p>
          <button
            onClick={() => {
              setSelectedLocation(null);
              setSelectedTag('all');
              setLocalSearch('');
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors inline-block"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="bg-[#0b152d] border border-blue-900/40 hover:border-blue-500/60 rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>

                  {/* Breaking Badge */}
                  {video.isBreaking && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow animate-pulse">
                      BREAKING
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                      <MapPin className="w-3 h-3" />
                      {video.location}
                    </span>
                    <span>{video.uploadedAt}</span>
                  </div>

                  <h3 className="font-extrabold text-sm text-white line-clamp-2 leading-snug group-hover:text-blue-300 transition-colors">
                    {video.titleTelugu || video.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3.5 pt-0 border-t border-blue-900/30 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-medium">
                  <User className="w-3 h-3 text-slate-500" />
                  {video.reporter}
                </span>
                <span className="font-bold text-slate-300">
                  {video.views?.toLocaleString()} views
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
