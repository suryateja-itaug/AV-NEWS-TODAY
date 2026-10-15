import React from 'react';
import { Award, BookOpen, CheckCircle, HeartHandshake, Shield, Users, X } from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const EditorialModal: React.FC = () => {
  const { isEditorialOpen, setIsEditorialOpen, setIsContactOpen } = useNews();

  if (!isEditorialOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0b1428] border border-blue-800/80 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#070e1e] border-b border-blue-900/60 p-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                EDITORIAL • సంపాదకీయం
              </span>
              <h2 className="text-base sm:text-lg font-black text-white">
                ప్రజా స్వరం... మా సంకల్పం
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsEditorialOpen(false)}
            className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-slate-200 text-xs sm:text-sm leading-relaxed">
          <div className="border-l-4 border-amber-400 pl-4 py-1 italic text-amber-200 font-semibold bg-blue-950/30 rounded-r">
            "సత్యాన్ని నిగ్గుతేల్చడమే జర్నలిజం కర్తవ్యం. అణగారిన వర్గాల గొంతుకై, ప్రజా సమస్యల పరిష్కార సాధనంగా
            నిలవడమే AV News Today లక్ష్యం."
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-white">విశ్వసనీయతే మా ప్రాణం</h3>
            <p className="text-justify text-slate-300">
              సమాచార విస్ఫోటనం జరుగుతున్న నేటి డిజిటల్ యుగంలో, అసత్య ప్రచారాలు మరియు సెన్సేషనలిజం మధ్య నిజం
              మరుగున పడుతోంది. అటువంటి సంక్లిష్ట పరిస్థితుల్లో, నిజాన్ని నిర్భయంగా ప్రజల ముందుకు తీసుకురావడానికి
              ఆయుధ్ వికాస్ ఫౌండేషన్ (Ayudh Vikas Foundation) ఆధ్వర్యంలో **AV News Today** అవతరించింది.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-white">మా 4 మౌలిక సిద్ధాంతాలు (Core Pillars)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-blue-900/50 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Award className="w-4 h-4" />
                  <span>1. Truth First (సత్యం మొదట)</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  ఎటువంటి రాజకీయ, వ్యాపార ప్రయోజనాలకు లొంగకుండా నిజమైన వాస్తవాలనే ప్రజలకు చేరవేస్తాం.
                </p>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-blue-900/50 space-y-1">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                  <Users className="w-4 h-4" />
                  <span>2. Public Voice (ప్రజా స్వరం)</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  పల్లెల్లోని తాగునీరు, రోడ్లు, ఉపాధి, పాఠశాలల సమస్యలను క్షేత్రస్థాయి పరిశీలనతో వెలుగులోకి
                  తెస్తాం.
                </p>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-blue-900/50 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <HeartHandshake className="w-4 h-4" />
                  <span>3. Social Welfare (సామాజిక సేవ)</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  ఫౌండేషన్ ద్వారా పేద విద్యార్థులకు విద్య, రోగులకు వైద్య సాయం, అన్నదాన కార్యక్రమాలు
                  నిర్వహిస్తాం.
                </p>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-blue-900/50 space-y-1">
                <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                  <Shield className="w-4 h-4" />
                  <span>4. Nation First (జాతి హితం)</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  దేశ సమగ్రతను, రాజ్యాంగ విలువలను కాపాడటంలో మీడియాకున్న బాధ్యతను సంపూర్ణంగా నిర్వర్తిస్తాం.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 p-4 rounded-xl border border-blue-800 text-center space-y-2">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
              మీ సమస్యలను మా దృష్టికి తీసుకురండి
            </h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              మా సంపాదక వర్గానికి లేదా సిటిజన్ జర్నలిస్ట్ హాట్‌లైన్‌కు మీ వార్తలు మరియు సలహాలను పంపవచ్చు.
            </p>
            <button
              onClick={() => {
                setIsEditorialOpen(false);
                setIsContactOpen(true);
              }}
              className="mt-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-2 rounded-full cursor-pointer transition-colors"
            >
              Contact Editorial Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
