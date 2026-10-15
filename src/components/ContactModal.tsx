import React, { useState } from 'react';
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Shield,
  Upload,
  X,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const ContactModal: React.FC = () => {
  const { isContactOpen, setIsContactOpen } = useNews();
  const [tipName, setTipName] = useState('');
  const [tipPhone, setTipPhone] = useState('');
  const [tipLocation, setTipLocation] = useState('');
  const [tipMessage, setTipMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isContactOpen) return null;

  const handleSubmitTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipMessage.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTipName('');
      setTipPhone('');
      setTipLocation('');
      setTipMessage('');
      setIsContactOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0b1428] border border-blue-800/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#070e1e] border-b border-blue-900/60 p-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="bg-red-600 text-white font-black text-xs px-2 py-0.5 rounded">
              AV NEWS
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                CONTACT US & CITIZEN JOURNALIST TIP-LINE
              </h2>
              <p className="text-[10px] text-slate-400">
                A Unit of Ayudh Vikas Foundation • ప్రధాన కార్యాలయం & బ్యూరో ఆఫీసులు
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsContactOpen(false)}
            className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Bureau Office Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                బ్యూరో కార్యాలయాలు (Bureau Offices)
              </h3>

              <div className="space-y-3 text-xs text-slate-200">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-blue-900/40 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>Hyderabad Central Studio & Corporate Office</span>
                  </div>
                  <p className="text-[11px] text-slate-300 pl-5">
                    Ayudh Vikas Bhavan, Road No. 12, Banjara Hills, Hyderabad, Telangana - 500034.
                  </p>
                  <p className="text-[10px] text-slate-400 pl-5">Phone: +91 40 2345 6789</p>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-blue-900/40 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>Warangal Regional Bureau</span>
                  </div>
                  <p className="text-[11px] text-slate-300 pl-5">
                    Nakkalagutta, Hanamkonda, Warangal, Telangana - 506001.
                  </p>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-blue-900/40 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>New Delhi National Bureau</span>
                  </div>
                  <p className="text-[11px] text-slate-300 pl-5">
                    Press Enclave, Saket, New Delhi - 110017.
                  </p>
                </div>
              </div>

              {/* WhatsApp Direct Connect */}
              <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-xl p-3.5 text-center space-y-2">
                <div className="text-xs font-black text-emerald-400">
                  WHATSAPP DIRECT TIP LINE (24x7)
                </div>
                <p className="text-[11px] text-slate-300">
                  వార్తలు, వీడియోలు, ఫోటోలను నేరుగా మా వాట్సాప్ నెంబర్‌కు పంపండి:
                </p>
                <a
                  href="https://wa.me/919000045073"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>+91 90000 45073</span>
                </a>
              </div>
            </div>

            {/* Right: Submit a News Tip Form */}
            <div className="bg-slate-950/80 border border-blue-900/50 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider mb-1">
                  ప్రజా సమస్యను తెలియజేయండి (Submit a Tip)
                </h3>
                <p className="text-[11px] text-slate-400 mb-4">
                  మీ ప్రాంత సమస్యలను మా ఇన్వెస్టిగేషన్ బృందానికి పంపండి. మీ వివరాలు గోప్యంగా ఉంచబడతాయి.
                </p>

                {submitted ? (
                  <div className="bg-emerald-950 border border-emerald-500 rounded-xl p-6 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-sm font-bold text-white">మీ సమాచారం అందింది!</h4>
                    <p className="text-xs text-slate-300">
                      మా రిపోర్టింగ్ టీమ్ పరిశీలించి తగిన చర్యలు తీసుకుంటుంది. ధన్యవాదాలు.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitTip} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        మీ పేరు (Your Name)
                      </label>
                      <input
                        type="text"
                        value={tipName}
                        onChange={(e) => setTipName(e.target.value)}
                        placeholder="పేరు..."
                        className="w-full bg-slate-900 border border-blue-900/60 rounded-lg p-2 text-xs text-white placeholder-slate-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          ఫోన్ నంబర్ (Phone)
                        </label>
                        <input
                          type="tel"
                          value={tipPhone}
                          onChange={(e) => setTipPhone(e.target.value)}
                          placeholder="+91..."
                          className="w-full bg-slate-900 border border-blue-900/60 rounded-lg p-2 text-xs text-white placeholder-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          ప్రాంతం (District/Town)
                        </label>
                        <input
                          type="text"
                          value={tipLocation}
                          onChange={(e) => setTipLocation(e.target.value)}
                          placeholder="e.g. Warangal"
                          className="w-full bg-slate-900 border border-blue-900/60 rounded-lg p-2 text-xs text-white placeholder-slate-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        సమస్య లేదా వార్త వివరాలు (Details)
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={tipMessage}
                        onChange={(e) => setTipMessage(e.target.value)}
                        placeholder="సమస్య యొక్క పూర్తి వివరాలు..."
                        className="w-full bg-slate-900 border border-blue-900/60 rounded-lg p-2 text-xs text-white placeholder-slate-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-black py-2.5 rounded-lg flex items-center justify-center gap-2 shadow cursor-pointer transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>సమాచారాన్ని సమర్పించండి (SUBMIT TIP)</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
