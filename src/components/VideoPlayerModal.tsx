import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  MapPin,
  Play,
  Radio,
  Share2,
  ThumbsUp,
  User,
  X,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { VideoItem } from '../types';

export const VideoPlayerModal: React.FC = () => {
  const { selectedVideo, setSelectedVideo, videos, addLiveStream, setIsLivePlayerOpen } = useNews();
  const [likes, setLikes] = useState<number>(1420);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState(false);

  if (!selectedVideo) return null;

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  const handleBroadcastThisVideo = () => {
    addLiveStream({
      title: selectedVideo.title,
      channelName: 'AV FEATURED STREAM',
      streamUrl: selectedVideo.videoUrl,
      streamType: 'youtube',
      isActive: true,
      viewerCount: 39500,
      quality: '1080p HD',
      category: selectedVideo.category,
      description: selectedVideo.description,
    });
    setSelectedVideo(null);
    setIsLivePlayerOpen(true);
  };

  // Related videos
  const relatedVideos = videos
    .filter((v) => v.id !== selectedVideo.id && v.category === selectedVideo.category)
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0b1428] border border-blue-800/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#070e1e] border-b border-blue-900/60 px-4 py-3 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-red-600 text-white font-black text-xs px-1.5 py-0.5 rounded shrink-0">
              AV
            </span>
            <span className="text-xs font-black text-white uppercase tracking-wider truncate">
              {selectedVideo.category} • {selectedVideo.location}
            </span>
          </div>

          <button
            onClick={() => setSelectedVideo(null)}
            className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black shrink-0">
          {selectedVideo.videoUrl && selectedVideo.videoUrl.includes('youtube') ? (
            <iframe
              src={
                selectedVideo.videoUrl.includes('?')
                  ? `${selectedVideo.videoUrl}&autoplay=1`
                  : `${selectedVideo.videoUrl}?autoplay=1`
              }
              title={selectedVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <video
              src={selectedVideo.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            ></video>
          )}
        </div>

        {/* Video Details & Interaction */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 border-b border-blue-900/40 pb-3">
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-black text-white leading-snug">
                {selectedVideo.titleTelugu || selectedVideo.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedVideo.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {selectedVideo.reporter}
                </span>
                <span>•</span>
                <span>{selectedVideo.uploadedAt}</span>
                <span>•</span>
                <span>{selectedVideo.views?.toLocaleString()} views</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  hasLiked
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{likes.toLocaleString()}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>

              <button
                onClick={handleBroadcastThisVideo}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black bg-red-600 hover:bg-red-500 text-white transition-colors cursor-pointer shadow"
                title="Send this video to the live player screen"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Broadcast Live</span>
              </button>
            </div>
          </div>

          {copiedToast && (
            <div className="bg-emerald-950 border border-emerald-500 text-emerald-200 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Link copied to clipboard!</span>
            </div>
          )}

          {/* Description & Tags */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              కథనం వివరాలు (Report Overview)
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-900">
              {selectedVideo.description}
            </p>
            {selectedVideo.tags && selectedVideo.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedVideo.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-900"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Related Stories */}
          {relatedVideos.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-blue-900/40">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                సంబంధిత కథనాలు (Related News)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {relatedVideos.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedVideo(item)}
                    className="flex gap-2 p-2 rounded-lg bg-slate-950/40 hover:bg-slate-900 border border-slate-800 cursor-pointer transition-colors"
                  >
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-20 h-14 object-cover rounded shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-slate-100 line-clamp-2 leading-tight hover:text-blue-300">
                        {item.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 mt-1 inline-block">
                        {item.uploadedAt} • {item.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
