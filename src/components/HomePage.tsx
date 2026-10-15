import React, { useRef, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  MapPin,
  Mic,
  MessageSquare,
  Navigation,
  Newspaper,
  Pause,
  PhoneCall,
  Play,
  PlayCircle,
  ShieldCheck,
  Tv,
  Users,
  Video,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import {
  INITIAL_PHOTOS,
  INITIAL_UPCOMING_EVENTS,
  LOCATIONS_LIST,
} from '../data/initialData';
import { GoldenMicIcon } from './GoldenMicIcon';
import { LiveScreenSection } from './LiveScreenSection';
import { Logo } from './Logo';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80';

export const HomePage: React.FC = () => {
  const {
    videos,
    setSelectedVideo,
    setIsLivePlayerOpen,
    setIsEpaperOpen,
    setIsEditorialOpen,
    setIsPhotosOpen,
    setIsContactOpen,
    poll,
    votePoll,
    isRadioPlaying,
    toggleRadio,
    setActiveCategory,
    setSelectedLocation,
    allNewsSubmissions,
    setSelectedArticle,
    setIsRecordVoiceModalOpen,
  } = useNews();

  // Audio dispatch player state
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

  // Poll state
  const [selectedPollOption, setSelectedPollOption] = useState<string>('');
  const [showPollResults, setShowPollResults] = useState<boolean>(false);

  // Special Report carousel
  const specialReports = videos.filter(
    (v) => v.isSpecialReport || v.category === 'special-report'
  );
  const [specialReportIdx, setSpecialReportIdx] = useState(0);
  const activeSpecialReport =
    specialReports[specialReportIdx] || specialReports[0] || videos[0];

  // Ground reports (4 items)
  const groundReports = videos
    .filter((v) => v.isGroundReport || v.category === 'ground-report')
    .slice(0, 4);

  // Explainers (4 items)
  const explainers = videos
    .filter((v) => v.isExplainer || v.category === 'explainer')
    .slice(0, 4);

  // Video Feature (Hero + 4 mini)
  const videoFeatureHero =
    videos.find((v) => v.id === 'v-feat-hero') || videos[0];
  const videoFeatureMinis = videos
    .filter((v) => v.id.startsWith('v-feat-sub-'))
    .slice(0, 4);

  const handleVote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPollOption) return;
    votePoll(selectedPollOption);
    setShowPollResults(true);
  };

  return (
    <div className="w-full max-w-[1560px] mx-auto px-3 sm:px-4 lg:px-6 py-4 space-y-6">
      {/* ========================================================= */}
      {/* DIRECT LIVE SCREEN: Integrated Responsive Live TV Screen */}
      {/* ========================================================= */}
      <LiveScreenSection />

      {/* ========================================================= */}
      {/* ROW 1: 5 Clean Columns: Special Report | Ground Reports | Explainer | Live Radio | Opinion Poll */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 items-stretch">
        {/* 1. SPECIAL REPORT */}
        <div className="bg-[#0b152d] border border-blue-900/50 rounded-xl p-3.5 flex flex-col justify-between shadow-xl min-h-[410px]">
          <div>
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-3">
              <div className="flex items-center gap-1.5 font-black text-xs text-white uppercase tracking-wider">
                <span className="w-1 h-3.5 bg-red-600 rounded-sm"></span>
                <span>SPECIAL REPORT</span>
              </div>
              <button
                onClick={() => setActiveCategory('special-report')}
                className="text-[11px] font-semibold text-slate-400 hover:text-amber-400 cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Featured Hero Box */}
            <div className="relative group rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
              <img
                src={activeSpecialReport?.thumbnailUrl || FALLBACK_IMG}
                alt={activeSpecialReport?.title}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMG;
                }}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

              {/* Exclusive Badge */}
              <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow">
                EXCLUSIVE
              </span>

              {/* Text overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 space-y-1">
                <h3 className="font-extrabold text-sm text-white line-clamp-2 leading-snug drop-shadow-md">
                  {activeSpecialReport?.titleTelugu || activeSpecialReport?.title}
                </h3>
                <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
                  {activeSpecialReport?.description}
                </p>

                <button
                  onClick={() => setSelectedVideo(activeSpecialReport)}
                  className="mt-1.5 inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded shadow cursor-pointer transition-transform hover:scale-105"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>WATCH REPORT</span>
                </button>
              </div>
            </div>
          </div>

          {/* Carousel dots */}
          <div className="flex items-center justify-center gap-1.5 pt-3">
            {specialReports.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSpecialReportIdx(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  specialReportIdx === idx
                    ? 'w-5 bg-red-600'
                    : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 2. GROUND REPORTS */}
        <div className="bg-[#0b152d] border border-blue-900/50 rounded-xl p-3.5 shadow-xl flex flex-col justify-between min-h-[410px]">
          <div>
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5 font-black text-xs text-white uppercase tracking-wider">
                <span className="w-1 h-3.5 bg-red-600 rounded-sm"></span>
                <span>GROUND REPORTS</span>
              </div>
              <button
                onClick={() => setActiveCategory('ground-report')}
                className="text-[11px] font-semibold text-slate-400 hover:text-amber-400 cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-2">
              {groundReports.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedVideo(item)}
                  className="flex gap-2.5 items-center group cursor-pointer p-1.5 rounded-lg hover:bg-blue-950/70 transition-colors border border-transparent hover:border-blue-900/40"
                >
                  <div className="relative w-16 h-12 shrink-0 rounded overflow-hidden bg-slate-900 shadow-inner">
                    <img
                      src={item.thumbnailUrl || FALLBACK_IMG}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMG;
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <PlayCircle className="w-3.5 h-3.5 text-white opacity-90" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-100 line-clamp-2 leading-tight group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-red-400 font-semibold mt-0.5 inline-block">
                      {item.uploadedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. EXPLAINER */}
        <div className="bg-[#0b152d] border border-blue-900/50 rounded-xl p-3.5 shadow-xl flex flex-col justify-between min-h-[410px]">
          <div>
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5 font-black text-xs text-white uppercase tracking-wider">
                <span className="w-1 h-3.5 bg-red-600 rounded-sm"></span>
                <span>EXPLAINER</span>
              </div>
              <button
                onClick={() => setActiveCategory('explainer')}
                className="text-[11px] font-semibold text-slate-400 hover:text-amber-400 cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-2">
              {explainers.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedVideo(item)}
                  className="flex gap-2.5 items-center group cursor-pointer p-1.5 rounded-lg hover:bg-blue-950/70 transition-colors border border-transparent hover:border-blue-900/40"
                >
                  <div className="relative w-16 h-12 shrink-0 rounded overflow-hidden bg-slate-900 shadow-inner">
                    <img
                      src={item.thumbnailUrl || FALLBACK_IMG}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMG;
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <PlayCircle className="w-3.5 h-3.5 text-white opacity-90" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-100 line-clamp-2 leading-tight group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-red-400 font-semibold mt-0.5 inline-block">
                      {item.uploadedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. LIVE RADIO & AV RADIO COMMUNITY */}
        <div className="bg-[#091124] border border-amber-500/30 hover:border-amber-500/60 rounded-xl p-3.5 shadow-xl flex flex-col justify-between text-center relative overflow-hidden min-h-[410px] transition-colors">
          <div>
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-3">
              <div className="flex items-center gap-1.5 font-black text-xs text-white uppercase tracking-wider">
                <span className="w-1 h-3.5 bg-amber-500 rounded-sm"></span>
                <span>AV RADIO</span>
              </div>
              <button
                onClick={() => setActiveCategory('radio')}
                className="text-[10px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer underline"
              >
                Open Page &gt;
              </button>
            </div>

            <div className="py-2 space-y-2">
              {/* ON AIR Badge */}
              <div className="inline-flex items-center gap-1 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                <span>ON AIR • ప్రజా గళం</span>
              </div>

              {/* Golden line mic image with no background */}
              <div
                onClick={() => setActiveCategory('radio')}
                className="relative mx-auto w-20 h-20 flex items-center justify-center my-1 cursor-pointer group"
              >
                <GoldenMicIcon className="w-18 h-18 drop-shadow-[0_0_16px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform" />

                {isRadioPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none">
                    <span className="w-1 h-8 bg-red-500/80 rounded-full animate-bounce"></span>
                    <span className="w-1 h-12 bg-amber-400/80 rounded-full animate-pulse"></span>
                    <span className="w-1 h-6 bg-red-500/80 rounded-full animate-bounce"></span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h4
                  onClick={() => setActiveCategory('radio')}
                  className="text-sm font-black text-white tracking-wider hover:text-amber-300 cursor-pointer transition-colors"
                >
                  AV RADIO BROADCAST
                </h4>
                <p className="text-[11px] text-slate-300">
                  ప్రజా గళం • మీ ఆలోచనలను రికార్డ్ చేసి షేర్ చేయండి
                </p>
              </div>

              <button
                onClick={() => setIsRecordVoiceModalOpen(true)}
                className="mt-1 inline-flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 text-[10px] font-extrabold px-3 py-1 rounded-full cursor-pointer transition-colors"
              >
                <Mic className="w-3 h-3 text-amber-400" />
                <span>+ RECORD YOUR VOICE</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <button
              onClick={() => setActiveCategory('radio')}
              className="w-full py-2 px-3 rounded-lg text-xs font-black flex items-center justify-center gap-2 transition-all shadow cursor-pointer bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 border border-amber-300"
            >
              <Mic className="w-4 h-4 text-slate-950" />
              <span>EXPLORE AV RADIO PAGE</span>
            </button>

            <button
              onClick={toggleRadio}
              className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isRadioPlaying
                  ? 'bg-slate-800 text-amber-400 border border-amber-500/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
              }`}
            >
              {isRadioPlaying ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Pause Stream</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen 24x7 Stream</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5. YOUR OPINION MATTERS / POLL */}
        <div className="bg-[#0b152d] border border-blue-900/50 rounded-xl p-3.5 shadow-xl flex flex-col justify-between min-h-[410px]">
          <div>
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5 font-black text-[11px] text-white uppercase tracking-wider">
                <span className="w-1 h-3.5 bg-red-600 rounded-sm"></span>
                <span>YOUR OPINION MATTERS</span>
              </div>
              <button
                onClick={() => setShowPollResults((prev) => !prev)}
                className="text-[10px] font-semibold text-slate-400 hover:text-amber-400 cursor-pointer"
              >
                {showPollResults ? 'Hide Results' : 'View Results'}
              </button>
            </div>

            <p className="text-xs font-bold text-slate-100 mb-2.5 leading-snug">
              {poll.question}
            </p>

            {showPollResults || poll.userVotedOptionId ? (
              <div className="space-y-2 py-1">
                {poll.options.map((opt) => {
                  const pct = Math.round(
                    (opt.votes / (poll.totalVotes || 1)) * 100
                  );
                  const isSelected = poll.userVotedOptionId === opt.id;
                  return (
                    <div key={opt.id} className="space-y-0.5 text-[11px]">
                      <div className="flex justify-between font-semibold text-slate-200">
                        <span className="truncate flex items-center gap-1">
                          {isSelected && (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          )}
                          <span>{opt.text}</span>
                        </span>
                        <span className="text-amber-400 font-bold ml-1">{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            isSelected ? 'bg-emerald-500' : 'bg-blue-600'
                          } transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
                <p className="text-[10px] text-slate-400 text-center pt-2 font-medium">
                  మొత్తం ఓట్లు: {poll.totalVotes.toLocaleString()}
                </p>
              </div>
            ) : (
              <form onSubmit={handleVote} className="space-y-2">
                {poll.options.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-2 text-xs p-2 rounded-lg cursor-pointer transition-colors border ${
                      selectedPollOption === opt.id
                        ? 'bg-blue-900/60 border-blue-500 text-white font-bold'
                        : 'border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="poll-option"
                      value={opt.id}
                      checked={selectedPollOption === opt.id}
                      onChange={(e) => setSelectedPollOption(e.target.value)}
                      className="accent-red-600"
                    />
                    <span className="text-[11px] leading-tight">{opt.text}</span>
                  </label>
                ))}

                <button
                  type="submit"
                  disabled={!selectedPollOption}
                  className="w-full mt-3 bg-red-600 hover:bg-red-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-bold py-2 rounded-lg shadow cursor-pointer transition-colors"
                >
                  SUBMIT VOTE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ROW 2: 5 Clean Columns: Photo Feature | Video Feature | Editorial | Upcoming Events | Today's E-Paper */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 items-stretch">
        {/* 6. PHOTO FEATURE */}
        <div className="bg-[#0b152d] border border-blue-900/50 rounded-xl p-3.5 shadow-xl flex flex-col justify-between min-h-[410px]">
          <div>
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-3">
              <div className="flex items-center gap-1.5 font-black text-xs text-white uppercase tracking-wider">
                <span className="w-1 h-3.5 bg-red-600 rounded-sm"></span>
                <span>PHOTO FEATURE</span>
              </div>
              <button
                onClick={() => setIsPhotosOpen(true)}
                className="text-[11px] font-semibold text-slate-400 hover:text-amber-400 cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Collage: 1 large on top, 3 thumbnails on bottom */}
            <div className="space-y-2">
              <div
                onClick={() => setIsPhotosOpen(true)}
                className="relative rounded-lg overflow-hidden group cursor-pointer h-36 bg-slate-900"
              >
                <img
                  src={INITIAL_PHOTOS[0].imageUrl}
                  alt={INITIAL_PHOTOS[0].title}
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-2.5">
                  <p className="text-xs font-bold text-white leading-tight">
                    {INITIAL_PHOTOS[0].title}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {INITIAL_PHOTOS.slice(1, 4).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setIsPhotosOpen(true)}
                    className="relative rounded overflow-hidden group cursor-pointer h-16 bg-slate-900"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMG;
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 7. VIDEO FEATURE */}
        <div className="bg-[#0b152d] border border-blue-900/50 rounded-xl p-3.5 shadow-xl flex flex-col justify-between min-h-[410px]">
          <div>
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-3">
              <div className="flex items-center gap-1.5 font-black text-xs text-white uppercase tracking-wider">
                <span className="w-1 h-3.5 bg-red-600 rounded-sm"></span>
                <span>VIDEO FEATURE</span>
              </div>
              <button
                onClick={() => setActiveCategory('telangana')}
                className="text-[11px] font-semibold text-slate-400 hover:text-amber-400 cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Hero Video in Video Feature */}
            <div
              onClick={() => setSelectedVideo(videoFeatureHero)}
              className="relative rounded-lg overflow-hidden group cursor-pointer bg-slate-950 border border-slate-800"
            >
              <img
                src={videoFeatureHero.thumbnailUrl || FALLBACK_IMG}
                alt={videoFeatureHero.title}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMG;
                }}
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                {videoFeatureHero.duration}
              </span>
            </div>

            <h4
              onClick={() => setSelectedVideo(videoFeatureHero)}
              className="mt-2 text-xs font-bold text-white line-clamp-1 hover:text-blue-300 cursor-pointer transition-colors"
            >
              {videoFeatureHero.title}
            </h4>

            {/* Row of 4 mini thumbnails */}
            <div className="grid grid-cols-4 gap-1 mt-2">
              {videoFeatureMinis.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVideo(v)}
                  className="relative rounded overflow-hidden group cursor-pointer h-12 bg-slate-900 border border-slate-800"
                >
                  <img
                    src={v.thumbnailUrl || FALLBACK_IMG}
                    alt={v.title}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMG;
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-white text-white opacity-80" />
                  </div>
                  <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-[7px] font-bold px-0.5 rounded text-white">
                    {v.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8. EDITORIAL */}
        <div className="bg-[#091124] border border-blue-900/60 rounded-xl p-3.5 shadow-xl flex flex-col justify-between text-center min-h-[410px]">
          <div>
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-2">
              <div className="flex items-center gap-1.5 font-black text-xs text-white uppercase tracking-wider">
                <span className="w-1 h-3.5 bg-red-600 rounded-sm"></span>
                <span>EDITORIAL</span>
              </div>
              <button
                onClick={() => setIsEditorialOpen(true)}
                className="text-[11px] font-semibold text-slate-400 hover:text-amber-400 cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Pen Icon */}
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mt-2 shadow-inner">
              <BookOpen className="w-6 h-6 text-amber-400" />
            </div>

            <h4 className="mt-2 text-xs font-black text-amber-300 tracking-wide">
              ప్రజా స్వరం... మా లక్ష్యం
            </h4>

            <p className="mt-2.5 text-[11px] text-slate-300 leading-relaxed italic text-justify px-1">
              నిజాన్ని నిజాయితీగా ప్రజల ముందుకు తీసుకురావడం మా కర్తవ్యం. నిజం కోసం, ప్రజల కోసం, బాధ్యతతో
              కూడిన జర్నలిజం మా ప్రతిజ్ఞ.
            </p>
          </div>

          <button
            onClick={() => setIsEditorialOpen(true)}
            className="w-full mt-3 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
          >
            READ MORE
          </button>
        </div>

        {/* 9. UPCOMING EVENTS */}
        <div className="bg-[#0b152d] border border-blue-900/50 rounded-xl p-3.5 shadow-xl flex flex-col justify-between min-h-[410px]">
          <div>
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5 font-black text-[11px] text-white uppercase tracking-wider">
                <span className="w-1 h-3.5 bg-red-600 rounded-sm"></span>
                <span>UPCOMING EVENTS</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">View All</span>
            </div>

            <div className="space-y-3">
              {INITIAL_UPCOMING_EVENTS.map((e) => (
                <div key={e.id} className="flex gap-2.5 items-center">
                  <div className="w-11 h-11 rounded-lg bg-red-600 text-white flex flex-col items-center justify-center shrink-0 shadow">
                    <span className="text-[8px] font-black tracking-widest leading-none">
                      {e.month}
                    </span>
                    <span className="text-sm font-black leading-none mt-0.5">{e.day}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-[11px] font-bold text-slate-100 truncate">{e.title}</h5>
                    <p className="text-[9px] text-slate-400 mt-0.5">{e.dateTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveCategory('social')}
            className="w-full mt-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold py-2 rounded-lg transition-colors cursor-pointer"
          >
            VIEW ALL EVENTS
          </button>
        </div>

        {/* 10. TODAY'S E-PAPER & SOCIAL */}
        <div className="space-y-3 flex flex-col justify-between min-h-[410px]">
          {/* E-Paper Box */}
          <div className="bg-[#0b152d] border border-blue-900/50 rounded-xl p-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-1.5 mb-2">
              <span className="font-black text-[11px] text-white tracking-wide">
                TODAY'S E-PAPER
              </span>
              <button
                onClick={() => setIsEpaperOpen(true)}
                className="text-[10px] font-semibold text-slate-400 hover:text-amber-400 cursor-pointer"
              >
                View Paper
              </button>
            </div>

            {/* Newspaper Thumbnail */}
            <div
              onClick={() => setIsEpaperOpen(true)}
              className="relative rounded overflow-hidden group cursor-pointer bg-white p-1 border border-slate-400 shadow-inner"
            >
              <div className="bg-[#fffdf7] text-black p-1 text-center border border-slate-300">
                <div className="text-[10px] font-black tracking-wider text-red-700 border-b border-black pb-0.5">
                  AV NEWS
                </div>
                <div className="text-[8px] font-bold text-slate-800 pt-0.5">ప్రధాన వార్తలు</div>
                <div className="h-9 bg-slate-200 my-1 rounded flex items-center justify-center text-[7px] text-slate-500 font-sans">
                  [Daily Morning Edition]
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEpaperOpen(true)}
              className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>READ E-PAPER</span>
            </button>
          </div>

          {/* Social Media & WhatsApp Join Box */}
          <div className="bg-[#0b152d] border border-blue-900/50 rounded-xl p-3 shadow-xl space-y-2">
            <div className="text-[10px] font-black text-slate-400 tracking-wider">
              FOLLOW US ON SOCIAL MEDIA
            </div>

            <div className="flex items-center justify-between gap-1">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow"
              >
                <Play className="w-3 h-3 fill-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-[#1877F2] hover:bg-blue-600 text-white flex items-center justify-center shadow font-black text-xs"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white flex items-center justify-center shadow text-xs font-bold"
              >
                📸
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-black hover:bg-slate-900 text-white flex items-center justify-center shadow text-xs font-bold border border-slate-700"
              >
                𝕏
              </a>
              <a
                href="https://wa.me/919000045073"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-[#25D366] hover:bg-emerald-500 text-white flex items-center justify-center shadow"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
              </a>
            </div>

            {/* WhatsApp News Alert Banner */}
            <a
              href="https://wa.me/919000045073"
              target="_blank"
              rel="noreferrer"
              className="block bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 rounded-lg p-2 text-center transition-colors group cursor-pointer"
            >
              <div className="text-[10px] font-black text-emerald-400">WHATSAPP NEWS ALERT</div>
              <div className="text-[9px] text-slate-300">తాజా వార్తలు నేరుగా మీ వాట్సాప్‌కు</div>
              <div className="mt-1 bg-emerald-600 group-hover:bg-emerald-500 text-white text-[10px] font-black py-0.5 rounded shadow">
                JOIN NOW
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ROW 3: Quick Access Bar & Promotional Hero Banner */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
        {/* Quick Access Tiles (4 cols) */}
        <div className="lg:col-span-4 bg-[#0b152d] border border-blue-900/50 rounded-xl p-3.5 shadow-xl">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
            QUICK ACCESS
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            <button
              onClick={() => {
                document.getElementById('live-broadcast-screen')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center gap-1 p-1 rounded hover:bg-blue-950 text-slate-300 hover:text-red-400 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
                <Tv className="w-4 h-4 text-red-500" />
              </div>
              <span className="text-[9px] font-bold">LIVE TV</span>
            </button>

            <button
              onClick={() => setActiveCategory('radio')}
              className="flex flex-col items-center gap-1 p-1 rounded hover:bg-blue-950 text-amber-300 hover:text-amber-200 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/40">
                <Mic className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-[9px] font-bold">AV Radio</span>
            </button>

            <button
              onClick={() => setIsEpaperOpen(true)}
              className="flex flex-col items-center gap-1 p-1 rounded hover:bg-blue-950 text-slate-300 hover:text-amber-400 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
                <Newspaper className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-[9px] font-bold">E-Paper</span>
            </button>

            <button
              onClick={() => setActiveCategory('telangana')}
              className="flex flex-col items-center gap-1 p-1.5 rounded hover:bg-blue-950 text-slate-300 hover:text-blue-400 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
                <Video className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-[9px] font-bold">Videos</span>
            </button>

            <button
              onClick={() => setIsPhotosOpen(true)}
              className="flex flex-col items-center gap-1 p-1.5 rounded hover:bg-blue-950 text-slate-300 hover:text-purple-400 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
                <ImageIcon className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-[9px] font-bold">Photos</span>
            </button>

            <button
              onClick={() => setIsEditorialOpen(true)}
              className="flex flex-col items-center gap-1 p-1.5 rounded hover:bg-blue-950 text-slate-300 hover:text-emerald-400 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
                <BookOpen className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-[9px] font-bold">Editorial</span>
            </button>

            <button
              onClick={() => setIsContactOpen(true)}
              className="flex flex-col items-center gap-1 p-1.5 rounded hover:bg-blue-950 text-slate-300 hover:text-rose-400 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
                <PhoneCall className="w-4 h-4 text-rose-400" />
              </div>
              <span className="text-[9px] font-bold">Contact</span>
            </button>
          </div>
        </div>

        {/* Promo Hero Banner (8 cols) */}
        <div className="lg:col-span-8 relative bg-gradient-to-r from-[#0d1b3e] via-[#091124] to-[#060b18] border border-blue-900/60 rounded-xl p-4 overflow-hidden shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left z-10">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Logo size="sm" showRing={true} alt="AV News Today Logo" />
              <div className="flex items-center">
                <span className="bg-red-600 text-white font-black text-xs px-1.5 py-0.5 rounded-l">AV</span>
                <span className="bg-slate-900 text-white font-black text-xs px-2 py-0.5 rounded-r border border-slate-700 flex items-center gap-1">
                  <span>NEWS</span>
                  <span className="text-red-500">TODAY</span>
                </span>
              </div>
            </div>
            <p className="text-amber-400 text-xs sm:text-sm font-black tracking-wider">
              సత్యం కోసం... సమాజం కోసం...
            </p>
            <p className="text-[11px] text-slate-300 max-w-md">
              తెలంగాణ, జాతీయ పరిణామాలపై అత్యంత వేగవంతమైన, విశ్వసనీయమైన 24x7 ప్రత్యక్ష ప్రసారాలు.
            </p>
            <button
              onClick={() => {
                document.getElementById('live-broadcast-screen')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg shadow-red-600/40 cursor-pointer transition-transform hover:scale-105"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>WATCH LIVE NOW</span>
            </button>
          </div>

          {/* OB Van & Satellite Broadcast illustration */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="w-40 h-24 rounded-lg bg-blue-950/80 border border-blue-500/30 flex items-center justify-center overflow-hidden shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80"
                alt="OB Van Satellite Broadcast"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-blue-900/40 mix-blend-overlay"></div>
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600/95 text-[8px] font-black text-white px-1.5 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                <span>OB VAN LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* VERIFIED JOURNALIST DISPATCHES & ARTICLES (AV LIFE GENERALISTS) */}
      {/* ========================================================= */}
      {allNewsSubmissions.filter((s) => s.status === 'approved').length > 0 && (
        <div className="bg-[#0b152d] border border-blue-900/50 rounded-xl p-3.5 shadow-xl space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-900/60 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-1 h-3.5 bg-red-600 rounded-sm"></span>
              <span className="font-black text-xs text-white uppercase tracking-wider">
                ACCREDITED GENERALIST DISPATCHES & FIELD ARTICLES
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                VERIFIED REPORTS
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Direct ground reporting by AV Life Accredited Journalists
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {allNewsSubmissions
              .filter((s) => s.status === 'approved')
              .map((item) => {
                const isArticle = item.format === 'article';
                const hasAudio = item.audios && item.audios.length > 0;
                const isThisAudioPlaying = hasAudio && playingAudioUrl === item.audios[0];

                return (
                  <div
                    key={item.id}
                    className="bg-[#070e1e] border border-blue-900/60 hover:border-blue-700/80 rounded-xl p-3 flex flex-col justify-between shadow-lg space-y-3 transition-colors"
                  >
                    <div className="space-y-2.5">
                      {/* Media Thumbnail */}
                      {item.images && item.images.length > 0 && (
                        <div className="relative rounded-lg overflow-hidden bg-slate-950 border border-slate-800 h-44 group">
                          <img
                            src={item.images[0] || FALLBACK_IMG}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                          {/* Format badge */}
                          <span
                            className={`absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow ${
                              isArticle ? 'bg-amber-600 text-white' : 'bg-blue-600 text-white'
                            }`}
                          >
                            {isArticle ? 'IN-DEPTH ARTICLE' : 'GROUND SHORT'}
                          </span>

                          {item.images.length > 1 && (
                            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" />
                              <span>+{item.images.length - 1} photos</span>
                            </span>
                          )}

                          {item.assignedCategory && (
                            <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-slate-200 text-[9px] font-bold px-2 py-0.5 rounded border border-white/20 uppercase">
                              {item.assignedCategory}
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
                          <span className="text-[9px] text-slate-400 block font-mono">
                            {item.journalistId}
                          </span>
                        </div>
                      </div>

                      {/* Headlines */}
                      <div className="space-y-1">
                        <h3 className="font-black text-sm text-white line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                        {item.titleTelugu && (
                          <h4 className="text-xs font-bold text-amber-300 line-clamp-1">
                            {item.titleTelugu}
                          </h4>
                        )}
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {item.summary || item.content}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Interaction Area */}
                    <div className="space-y-2 pt-1 border-t border-blue-900/40">
                      {/* Audio Play Button (as explicitly requested: "if audio just a play button with news title on click on it the news audio will be played.") */}
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

                      {/* Read More button for Article */}
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

      {/* Hidden audio player for voice dispatches */}
      <audio ref={audioRef} onEnded={() => setPlayingAudioUrl(null)} className="hidden" />

      {/* ========================================================= */}
      {/* ROW 4: News by Location (Hyderabad, Warangal, Karimnagar, Nizamabad, Khammam) */}
      {/* ========================================================= */}
      <div className="bg-[#0b152d] border border-blue-900/50 rounded-xl p-3.5 shadow-xl">
        <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-3">
          <div className="flex items-center gap-1.5 font-black text-xs text-white uppercase tracking-wider">
            <span className="w-1 h-3.5 bg-red-600 rounded-sm"></span>
            <span>NEWS BY LOCATION</span>
          </div>
          <button
            onClick={() => setActiveCategory('telangana')}
            className="text-[11px] font-semibold text-slate-400 hover:text-amber-400 cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {LOCATIONS_LIST.map((loc) => (
            <div
              key={loc.id}
              onClick={() => {
                setSelectedLocation(loc.name);
                setActiveCategory('telangana');
              }}
              className="relative rounded-lg overflow-hidden group cursor-pointer h-24 bg-slate-900 border border-slate-800 shadow hover:border-blue-500/50 transition-all"
            >
              <img
                src={loc.imageUrl}
                alt={loc.name}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMG;
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-2">
                <span className="text-xs font-black text-white leading-tight">{loc.name}</span>
                <span className="text-[10px] text-amber-400 font-semibold">{loc.nameTelugu}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* ROW 5: Branding Strip: Ayudh Vikas Foundation & AV News Today */}
      {/* ========================================================= */}
      <div className="bg-[#081024] border border-blue-900/50 rounded-xl p-4 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">
        {/* Foundation Crest & Official Logo */}
        <div className="flex items-center gap-3">
          <Logo size="md" showRing={true} showGlow={true} alt="AV News Today Emblem" />
          <div>
            <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
              A UNIT OF
            </div>
            <div className="text-sm font-black text-white tracking-wider">
              AYUDH VIKAS FOUNDATION
            </div>
          </div>
        </div>

        {/* Center Main Motto with Logo */}
        <div className="flex items-center gap-3">
          <div className="space-y-0.5 text-center lg:text-left">
            <h2 className="text-base sm:text-lg font-black tracking-widest text-amber-400 flex items-center justify-center lg:justify-start gap-2">
              <span>AV News Today</span>
            </h2>
            <p className="text-xs font-semibold text-slate-300">
              • News • Truth • Public Voice •
            </p>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="flex items-center gap-4 sm:gap-6 text-center">
          <div className="flex flex-col items-center gap-1">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold text-slate-200">Truth First</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold text-slate-200">Public Voice</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Newspaper className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold text-slate-200">News For All</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Navigation className="w-4 h-4 text-red-400" />
            <span className="text-[10px] font-bold text-slate-200">Nation First</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}
      <footer className="border-t border-blue-900/40 pt-4 pb-8 text-xs text-slate-400">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p>© 2025 AV News Today. All Rights Reserved. | A Unit of Ayudh Vikas Foundation</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium text-slate-300">
            <button
              onClick={() => setIsContactOpen(true)}
              className="hover:text-white cursor-pointer"
            >
              About Us
            </button>
            <span>|</span>
            <button
              onClick={() => setIsContactOpen(true)}
              className="hover:text-white cursor-pointer"
            >
              Our Team
            </button>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">Disclaimer</span>
            <span>|</span>
            <button
              onClick={() => setIsContactOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
