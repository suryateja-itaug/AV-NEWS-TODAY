import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  FileCheck,
  FileText,
  IdCard,
  LogOut,
  MapPin,
  PlusCircle,
  QrCode,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useNews } from '../context/NewsContext';

export const JournalistProfileModal: React.FC = () => {
  const {
    currentUser,
    isProfileModalOpen,
    setIsProfileModalOpen,
    logoutJournalist,
    setIsUploadNewsModalOpen,
    setIsMyNewsModalOpen,
    allNewsSubmissions,
  } = useNews();

  const [copiedToast, setCopiedToast] = useState(false);
  const [showQRVerifyModal, setShowQRVerifyModal] = useState(false);

  if (!isProfileModalOpen || !currentUser) return null;

  const userSubmissions = allNewsSubmissions.filter((s) => s.userId === currentUser.id);
  const approvedSubmissions = userSubmissions.filter((s) => s.status === 'approved');
  const pendingSubmissions = userSubmissions.filter((s) => s.status === 'pending');
  const totalViews = approvedSubmissions.reduce((acc, curr) => acc + (curr.views || 0), 0);

  const handleCopyId = () => {
    navigator.clipboard.writeText(currentUser.journalistId);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const qrPayload =
    currentUser.qrCodeData ||
    `https://avnews.in/accreditation/verify?id=${currentUser.journalistId}&name=${encodeURIComponent(
      currentUser.fullName
    )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#091226] border border-blue-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-red-700 via-blue-900 to-slate-900 px-5 py-3.5 flex items-center justify-between border-b border-blue-700/50">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-white text-sm tracking-wide">
              ACCREDITED JOURNALIST PROFILE & PRESS ID
            </h3>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* ========================================================= */}
          {/* OFFICIAL DIGITAL PRESS ID CARD (PHYSICAL STYLE EMBOSSED) */}
          {/* ========================================================= */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1b3f] via-[#091530] to-[#040817] border-2 border-amber-500/60 p-5 shadow-2xl shadow-blue-950/80 text-white">
            {/* Holographic Top Bar */}
            <div className="flex items-center justify-between border-b border-amber-500/40 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-red-600 text-white font-black text-sm px-2 py-0.5 rounded shadow">
                  AV
                </div>
                <div>
                  <h4 className="font-black text-xs tracking-wider text-white">
                    AV NEWS TODAY DIGITAL NETWORK
                  </h4>
                  <p className="text-[9px] text-amber-300 uppercase tracking-widest font-mono">
                    OFFICIAL PRESS ACCREDITATION PASS
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/60 px-2.5 py-1 rounded-full text-emerald-300 text-[10px] font-black uppercase tracking-wider animate-pulse">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VERIFIED GENERALIST</span>
              </div>
            </div>

            {/* Main ID Details Split Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Left Photo & QR */}
              <div className="sm:col-span-4 flex flex-col items-center text-center space-y-2.5">
                <div className="relative">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                    }}
                    className="w-24 h-28 object-cover rounded-xl border-2 border-amber-400/80 shadow-lg shadow-black/80"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* QR Code Container */}
                <div
                  onClick={() => setShowQRVerifyModal(true)}
                  className="bg-white p-1.5 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform group"
                  title="Click to inspect verification payload"
                >
                  <QRCodeSVG value={qrPayload} size={70} />
                  <span className="block text-[8px] text-slate-800 font-mono font-bold mt-0.5">
                    SCAN TO VERIFY
                  </span>
                </div>
              </div>

              {/* Right Personal Credentials */}
              <div className="sm:col-span-8 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Journalist Full Name
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                    {currentUser.fullName}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-blue-900/50">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Accredited Role</span>
                    <span className="font-bold text-amber-300 text-[11px]">
                      {currentUser.designation || "AV Life's Generalist"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Generated Press ID</span>
                    <span className="font-mono font-black text-white text-[11px] bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">
                      {currentUser.journalistId}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Govt Proof Verified</span>
                    <span className="text-[10px] font-bold text-emerald-300 uppercase">
                      {currentUser.govtProofType} ({currentUser.govtProofNumber})
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">District & Jurisdiction</span>
                    <span className="text-[11px] font-bold text-slate-200">
                      {currentUser.cityDistrict}, {currentUser.state}
                    </span>
                  </div>
                </div>

                {currentUser.bio && (
                  <p className="text-[10px] text-slate-300 italic pt-1 border-t border-blue-900/40 line-clamp-2">
                    "{currentUser.bio}"
                  </p>
                )}

                {/* Security Footer inside card */}
                <div className="flex items-center justify-between text-[9px] text-slate-400 pt-2 border-t border-amber-500/30">
                  <span>Authorized by Editorial Bureau</span>
                  <span className="font-mono text-amber-400">STATUS: ACTIVE PRESS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {copiedToast && (
            <div className="bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 animate-fadeIn justify-center font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Press ID copied to clipboard!</span>
            </div>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#070e1e] border border-blue-900/60 p-3 rounded-xl text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Stories</span>
              <p className="text-xl font-black text-white mt-0.5">{userSubmissions.length}</p>
            </div>
            <div className="bg-[#070e1e] border border-blue-900/60 p-3 rounded-xl text-center">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Approved & Live</span>
              <p className="text-xl font-black text-emerald-400 mt-0.5">{approvedSubmissions.length}</p>
            </div>
            <div className="bg-[#070e1e] border border-blue-900/60 p-3 rounded-xl text-center">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Under Review</span>
              <p className="text-xl font-black text-amber-400 mt-0.5">{pendingSubmissions.length}</p>
            </div>
            <div className="bg-[#070e1e] border border-blue-900/60 p-3 rounded-xl text-center">
              <span className="text-[10px] font-bold text-blue-400 uppercase">Total Viewers</span>
              <p className="text-xl font-black text-blue-400 mt-0.5">{totalViews.toLocaleString()}</p>
            </div>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <button
              onClick={() => {
                setIsProfileModalOpen(false);
                setIsUploadNewsModalOpen(true);
              }}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-transform hover:scale-102"
            >
              <PlusCircle className="w-4 h-4" />
              <span>POST / UPLOAD NEWS</span>
            </button>

            <button
              onClick={() => {
                setIsProfileModalOpen(false);
                setIsMyNewsModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow cursor-pointer transition-transform hover:scale-102"
            >
              <FileText className="w-4 h-4" />
              <span>VIEW MY SUBMITTED NEWS</span>
            </button>

            <button
              onClick={handleCopyId}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>COPY PRESS ID NUMBER</span>
            </button>
          </div>

          {/* Sign out link */}
          <div className="flex justify-between items-center pt-3 border-t border-blue-900/40 text-xs">
            <span className="text-slate-400 text-[11px]">
              Logged in as <strong className="text-white">{currentUser.email}</strong>
            </span>
            <button
              onClick={() => {
                logoutJournalist();
                setIsProfileModalOpen(false);
              }}
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Verification Modal */}
      {showQRVerifyModal && (
        <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-[#091329] border border-amber-500 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h4 className="text-base font-black text-white">Press Accreditation Valid</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Official Digital Media Credential verified by Ayudh Vikas Foundation Press Bureau.
            </p>
            <div className="bg-white p-3 rounded-xl inline-block shadow">
              <QRCodeSVG value={qrPayload} size={150} />
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-700 text-[11px] font-mono text-amber-300 break-all">
              {currentUser.journalistId} • {currentUser.fullName}
            </div>
            <button
              onClick={() => setShowQRVerifyModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 rounded-lg cursor-pointer"
            >
              Close Verification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
