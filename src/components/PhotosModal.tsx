import React, { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, Download, Image as ImageIcon, MapPin, X } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { INITIAL_PHOTOS } from '../data/initialData';

export const PhotosModal: React.FC = () => {
  const { isPhotosOpen, setIsPhotosOpen } = useNews();
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null);

  if (!isPhotosOpen) return null;

  const activePhoto = selectedPhotoIdx !== null ? INITIAL_PHOTOS[selectedPhotoIdx] : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0b1428] border border-blue-800/80 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#070e1e] border-b border-blue-900/60 p-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white font-black text-xs px-1.5 py-0.5 rounded">AV</span>
            <div>
              <h3 className="text-sm font-black text-white">PHOTO FEATURE GALLERY</h3>
              <p className="text-[10px] text-slate-400">
                తెలంగాణ జీవన వైవిధ్యం, ప్రజా ఉద్యమాలు, ప్రకృతి దృశ్యాలు
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedPhotoIdx(null);
              setIsPhotosOpen(false);
            }}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lightbox / Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activePhoto ? (
            <div className="space-y-4">
              <div className="relative w-full max-h-[60vh] bg-black rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="max-h-[60vh] w-auto object-contain"
                />

                {/* Prev / Next */}
                <button
                  onClick={() =>
                    setSelectedPhotoIdx((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : INITIAL_PHOTOS.length - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setSelectedPhotoIdx((prev) =>
                      prev !== null && prev < INITIAL_PHOTOS.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-900/40 pb-3">
                <div>
                  <h3 className="text-base font-black text-white">{activePhoto.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1 text-amber-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {activePhoto.caption || 'Telangana'}
                    </span>
                    <span>•</span>
                    <span>Photo by {activePhoto.photographer}</span>
                    <span>•</span>
                    <span>{activePhoto.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPhotoIdx(null)}
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 underline cursor-pointer"
                >
                  ← Back to Grid
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {INITIAL_PHOTOS.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className="group relative rounded-xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 hover:border-blue-500/60 transition-all shadow-md"
                >
                  <div className="h-52 w-full overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3">
                    <span className="text-[10px] text-amber-400 font-semibold">{p.caption || 'Telangana'}</span>
                    <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                      {p.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 mt-0.5">By {p.photographer}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
