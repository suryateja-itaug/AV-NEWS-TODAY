import React, { useRef, useState } from 'react';
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Mic,
  Music,
  Plus,
  Radio,
  Send,
  Square,
  Trash2,
  Upload,
  Video,
  Volume2,
  X,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { NewsFormatType } from '../types';

export const UploadNewsModal: React.FC = () => {
  const {
    currentUser,
    isUploadNewsModalOpen,
    setIsUploadNewsModalOpen,
    submitNews,
    setIsMyNewsModalOpen,
  } = useNews();

  const [format, setFormat] = useState<NewsFormatType>('short');
  const [title, setTitle] = useState('');
  const [titleTelugu, setTitleTelugu] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('Hyderabad, Telangana');
  const [tagsInput, setTagsInput] = useState('Ground Report, Telangana');

  // Images state
  const [images, setImages] = useState<string[]>([]);
  const [imageInputUrl, setImageInputUrl] = useState('');

  // Videos state
  const [videos, setVideos] = useState<string[]>([]);
  const [videoInputUrl, setVideoInputUrl] = useState('');

  // Audio state
  const [audios, setAudios] = useState<string[]>([]);
  const [audioInputUrl, setAudioInputUrl] = useState('');

  // Live Audio Recording via MediaRecorder
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioRecordingSeconds, setAudioRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  // Status message
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isUploadNewsModalOpen || !currentUser) return null;

  // Image helpers
  const handleAddImageFromUrl = () => {
    if (!imageInputUrl.trim()) return;
    setImages((prev) => [...prev, imageInputUrl.trim()]);
    setImageInputUrl('');
    setErrorMsg('');
  };

  const handleFileUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImages((prev) => [...prev, reader.result as string]);
          setErrorMsg('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const loadSampleImages = (count: number) => {
    const samples = [
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80',
    ];
    setImages(samples.slice(0, count));
    setErrorMsg('');
  };

  // Video helpers
  const handleAddVideo = () => {
    if (!videoInputUrl.trim()) return;
    setVideos((prev) => [...prev, videoInputUrl.trim()]);
    setVideoInputUrl('');
  };

  const handleFileUploadVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideos((prev) => [...prev, url]);
    }
  };

  // Audio helpers
  const handleAddAudioUrl = () => {
    if (!audioInputUrl.trim()) return;
    setAudios((prev) => [...prev, audioInputUrl.trim()]);
    setAudioInputUrl('');
  };

  const handleFileUploadAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudios((prev) => [...prev, url]);
    }
  };

  const loadSampleAudio = () => {
    setAudios((prev) => [
      ...prev,
      'https://actions.google.com/sounds/v1/human_voices/applause_cheering.ogg',
    ]);
  };

  // Live Audio Voice Recording
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudios((prev) => [...prev, audioUrl]);
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecordingAudio(true);
      setAudioRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setAudioRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Microphone access denied or unavailable.');
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecordingAudio) {
      mediaRecorderRef.current.stop();
      setIsRecordingAudio(false);
      clearInterval(timerRef.current);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter a headline for the news report.');
      return;
    }

    if (!content.trim()) {
      setErrorMsg('Please write the news text content.');
      return;
    }

    // MANDATORY RULES
    if (format === 'short') {
      if (images.length === 0) {
        setErrorMsg('Mandatory Photo Missing: Short news report requires at least 1 photo.');
        return;
      }
    } else if (format === 'article') {
      if (images.length < 2) {
        setErrorMsg(
          'Mandatory Images Missing: Article level news strictly requires at least 2 images.'
        );
        return;
      }
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const res = submitNews({
      userId: currentUser.id,
      journalistId: currentUser.journalistId,
      journalistName: currentUser.fullName,
      journalistDesignation: currentUser.designation || 'AV Life Generalist',
      journalistAvatar: currentUser.avatarUrl,
      format,
      title: title.trim(),
      titleTelugu: titleTelugu.trim() || undefined,
      summary: summary.trim() || undefined,
      content: content.trim(),
      images,
      videos,
      audios,
      location: location.trim(),
      tags: tags.length > 0 ? tags : ['Telangana', 'News'],
    });

    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setSuccessMsg(res.message);
      // Reset form
      setTitle('');
      setTitleTelugu('');
      setSummary('');
      setContent('');
      setImages([]);
      setVideos([]);
      setAudios([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#091226] border border-blue-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-red-700 via-blue-900 to-slate-900 px-5 py-3.5 flex items-center justify-between border-b border-blue-700/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center text-white shadow">
              <Upload className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded">
                  AV NEWS
                </span>
                <h3 className="font-black text-white text-sm sm:text-base tracking-wide">
                  UPLOAD & SUBMIT NEWS REPORT
                </h3>
              </div>
              <p className="text-[11px] text-blue-200">
                Reporting as:{' '}
                <strong className="text-white">
                  {currentUser.fullName} ({currentUser.journalistId})
                </strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsUploadNewsModalOpen(false)}
            className="p-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex border-b border-blue-900/60 bg-[#060c1d]">
          <button
            type="button"
            onClick={() => {
              setFormat('short');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs font-black tracking-wider cursor-pointer border-b-2 flex items-center justify-center gap-2 transition-all ${
              format === 'short'
                ? 'border-red-600 text-white bg-blue-950/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4 text-red-500" />
            <span>1. SHORT NEWS REPORT (PHOTO MANDATORY)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setFormat('article');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs font-black tracking-wider cursor-pointer border-b-2 flex items-center justify-center gap-2 transition-all ${
              format === 'article'
                ? 'border-red-600 text-white bg-blue-950/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>2. ARTICLE LEVEL IN-DEPTH NEWS (MIN. 2 IMAGES)</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {errorMsg && (
            <div className="bg-red-950/70 border border-red-500/70 text-red-200 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg ? (
            <div className="bg-emerald-950/80 border border-emerald-500 rounded-xl p-5 text-center space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-black text-white">
                News Submitted for Editorial Verification!
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Your report has been dispatched to the AV News Admin desk. The editor will review the
                story, verify media attachments, assign the appropriate broadcast category, and publish
                it to the Home Page and Category feed!
              </p>
              <div className="flex gap-2.5 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsUploadNewsModalOpen(false);
                    setIsMyNewsModalOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-black px-4 py-2 rounded-lg cursor-pointer"
                >
                  View My Submitted News
                </button>
                <button
                  type="button"
                  onClick={() => setSuccessMsg('')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
                >
                  Submit Another Report
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Guidelines Box */}
              <div className="bg-[#070e1e] border border-blue-900/60 p-3 rounded-xl text-xs space-y-1">
                {format === 'short' ? (
                  <p className="text-slate-300 text-[11px]">
                    <strong className="text-amber-400">Short News Format:</strong> Provide a concise
                    headline and report. <strong className="text-red-400">1 Photo is mandatory</strong>.
                    You can optionally add a video or record an audio voice dispatch.
                  </p>
                ) : (
                  <p className="text-slate-300 text-[11px]">
                    <strong className="text-amber-400">Article Level Format:</strong> Detailed in-depth
                    field journalism.{' '}
                    <strong className="text-red-400">Minimum 2 Images are strictly mandatory</strong>.
                    You can also attach multiple videos and audio reports. On the website, this will feature
                    a "READ MORE" button opening the full formatted story!
                  </p>
                )}
              </div>

              {/* Title & Telugu Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    News Headline (Title) *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={
                      format === 'short'
                        ? 'e.g. Hyderabad Outer Ring Road Traffic Alert: Heavy Rain Warning'
                        : 'e.g. Telangana Ground Investigative Report: Mission Kakatiya Impact on 200 Villages'
                    }
                    className="w-full bg-[#070e1e] border border-blue-900/70 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    తెలుగు శీర్షిక (Telugu Headline - Optional)
                  </label>
                  <input
                    type="text"
                    value={titleTelugu}
                    onChange={(e) => setTitleTelugu(e.target.value)}
                    placeholder="e.g. తెలంగాణ ప్రధాన వార్తలు - తాజా సమాచారం"
                    className="w-full bg-[#070e1e] border border-blue-900/70 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Location / Mandal *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Warangal / Hyderabad / Nizamabad"
                    className="w-full bg-[#070e1e] border border-blue-900/70 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Excerpt Summary (for articles) */}
              {format === 'article' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Article Summary / Lead Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief 1-2 line summary to entice readers on the homepage..."
                    className="w-full bg-[#070e1e] border border-blue-900/70 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              )}

              {/* Main Content Body */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  News Body Text *
                </label>
                <textarea
                  rows={format === 'article' ? 7 : 4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    format === 'short'
                      ? 'Write the quick short ground update here...'
                      : 'Write the complete in-depth article with headings, quotes, and facts...'
                  }
                  className="w-full bg-[#070e1e] border border-blue-900/70 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* ========================================================= */}
              {/* IMAGE UPLOAD SECTION (Mandatory validation) */}
              {/* ========================================================= */}
              <div className="bg-[#070e1e] border border-blue-900/70 rounded-xl p-3.5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-900/50 pb-2">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-black text-white">
                      PHOTO ATTACHMENTS{' '}
                      <span className="text-red-400">
                        {format === 'short' ? '(1 PHOTO MANDATORY)' : '(MINIMUM 2 PHOTOS MANDATORY)'}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        (format === 'short' && images.length >= 1) ||
                        (format === 'article' && images.length >= 2)
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {images.length} {images.length === 1 ? 'image' : 'images'} added
                    </span>

                    <button
                      type="button"
                      onClick={() => loadSampleImages(format === 'article' ? 3 : 1)}
                      className="text-[10px] text-blue-400 hover:text-blue-300 underline cursor-pointer"
                    >
                      Load Sample Photos
                    </button>
                  </div>
                </div>

                {/* Upload or URL Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">
                      Upload from Device:
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUploadImage}
                      className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[11px] file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">
                      Or Add by Image URL:
                    </span>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={imageInputUrl}
                        onChange={(e) => setImageInputUrl(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className="flex-1 bg-[#091329] border border-blue-900/60 rounded px-2 py-1 text-xs text-white placeholder-slate-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageFromUrl}
                        className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-2.5 py-1 rounded cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Previews */}
                {images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    {images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-lg overflow-hidden border border-blue-900/80 bg-slate-900 group h-20"
                      >
                        <img
                          src={imgUrl}
                          alt={`Uploaded ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded-full shadow opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                          title="Remove photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-1 left-1 bg-black/80 text-[8px] font-bold text-white px-1 py-0.2 rounded">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-amber-400/90 italic pt-1">
                    No photo attached yet. Please upload or paste a photo to meet mandatory
                    publishing criteria.
                  </p>
                )}
              </div>

              {/* ========================================================= */}
              {/* VIDEO ATTACHMENTS (OPTIONAL) */}
              {/* ========================================================= */}
              <div className="bg-[#070e1e] border border-blue-900/70 rounded-xl p-3.5 space-y-3">
                <div className="flex items-center justify-between border-b border-blue-900/50 pb-2">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-black text-white">
                      VIDEO ATTACHMENTS (OPTIONAL)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {videos.length} added
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">
                      Upload Video File (.mp4, .webm):
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileUploadVideo}
                      className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[11px] file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">
                      Or Video Link (Direct URL):
                    </span>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={videoInputUrl}
                        onChange={(e) => setVideoInputUrl(e.target.value)}
                        placeholder="https://example.com/video.mp4"
                        className="flex-1 bg-[#091329] border border-blue-900/60 rounded px-2 py-1 text-xs text-white placeholder-slate-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddVideo}
                        className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-2.5 py-1 rounded cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {videos.length > 0 && (
                  <div className="space-y-1 pt-1">
                    {videos.map((vUrl, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded text-xs border border-slate-800"
                      >
                        <span className="truncate max-w-md text-[11px] text-slate-300">
                          📹 Video #{idx + 1}: {vUrl}
                        </span>
                        <button
                          type="button"
                          onClick={() => setVideos((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-red-400 hover:text-red-300 ml-2"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ========================================================= */}
              {/* AUDIO VOICE RECORDING & ATTACHMENTS (OPTIONAL) */}
              {/* ========================================================= */}
              <div className="bg-[#070e1e] border border-blue-900/70 rounded-xl p-3.5 space-y-3">
                <div className="flex items-center justify-between border-b border-blue-900/50 pb-2">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-black text-white">
                      AUDIO VOICE REPORT (VOICE NOTE / DISPATCH)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={loadSampleAudio}
                    className="text-[10px] text-blue-400 hover:text-blue-300 underline cursor-pointer"
                  >
                    Add Sample Voice Report
                  </button>
                </div>

                {/* Microphone Live Voice Recorder */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-3 rounded-lg bg-[#091329] border border-blue-900/60 gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        isRecordingAudio
                          ? 'bg-red-600 text-white animate-pulse'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Mic className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        {isRecordingAudio
                          ? `Recording Live Voice Report: ${audioRecordingSeconds}s`
                          : 'Live Microphone Voice Dispatch'}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Record on-the-spot spoken voice commentary for this news
                      </p>
                    </div>
                  </div>

                  {!isRecordingAudio ? (
                    <button
                      type="button"
                      onClick={startVoiceRecording}
                      className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>START VOICE RECORDING</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopVoiceRecording}
                      className="bg-slate-700 hover:bg-slate-600 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer border border-amber-500/40"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>STOP & ATTACH VOICE</span>
                    </button>
                  )}
                </div>

                {/* Or upload audio file */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">
                      Upload Audio File (.mp3, .wav, .ogg):
                    </span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUploadAudio}
                      className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[11px] file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">
                      Or Audio Stream URL:
                    </span>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={audioInputUrl}
                        onChange={(e) => setAudioInputUrl(e.target.value)}
                        placeholder="https://example.com/audio.mp3"
                        className="flex-1 bg-[#091329] border border-blue-900/60 rounded px-2 py-1 text-xs text-white placeholder-slate-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddAudioUrl}
                        className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-2.5 py-1 rounded cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Audio Previews */}
                {audios.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {audios.map((aUrl, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800 gap-3"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <audio src={aUrl} controls className="h-8 max-w-xs flex-1" />
                        </div>
                        <button
                          type="button"
                          onClick={() => setAudios((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-red-400 hover:text-red-300 shrink-0 p-1 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Tags / Keywords (Comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Telangana, Agriculture, Breaking, Ground Report"
                  className="w-full bg-[#070e1e] border border-blue-900/70 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-black text-xs py-3 rounded-xl shadow-xl transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer tracking-wider"
              >
                <Send className="w-4 h-4" />
                <span>
                  SUBMIT {format === 'short' ? 'SHORT NEWS' : 'IN-DEPTH ARTICLE'} TO ADMIN DESK
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
