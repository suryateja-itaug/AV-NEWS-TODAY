import React, { useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Printer,
  Share2,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const EpaperModal: React.FC = () => {
  const { isEpaperOpen, setIsEpaperOpen } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!isEpaperOpen) return null;

  const totalPages = 8;

  const pagesData = [
    {
      page: 1,
      name: 'Main Page (ప్రధాన వార్తలు)',
      headline: 'తెలంగాణ సమగ్రాభివృద్ధికి బడ్జెట్ కేటాయింపులు!',
      sub: 'రైతు భరోసా, తాగునీరు, మౌలిక వసతుల కల్పనకు ప్రాధాన్యత.',
      image:
        'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
    },
    {
      page: 2,
      name: 'Hyderabad City Edition (నగర విశేషాలు)',
      headline: 'మెట్రో రెండో దశ విస్తరణ వేగవంతం',
      sub: 'శంషాబాద్ ఎయిర్‌పోర్టు కనెక్టివిటీకి ప్రత్యేక ప్రణాళిక.',
      image:
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    },
    {
      page: 3,
      name: 'Districts (జిల్లాల వార్తలు)',
      headline: 'వరంగల్ కాకతీయ మెగా టెక్స్‌టైల్ పార్క్ పురోగతి',
      sub: 'వేలాది మంది స్థానిక యువతకు ఉపాధి అవకాశాలు.',
      image:
        'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    },
    {
      page: 4,
      name: 'Editorial & Op-Ed (సంపాదకీయం)',
      headline: 'ప్రజాస్వామ్యంలో పత్రికల పాత్ర - నిష్పాక్షిక జర్నలిజం',
      sub: 'ఆయుధ్ వికాస్ ఫౌండేషన్ ఆలోచనా తరంగం.',
      image:
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    },
    {
      page: 5,
      name: 'Business & Agri (వాణిజ్యం / వ్యవసాయం)',
      headline: 'రైతులకు ఆధునిక విత్తన పంపిణీ కేంద్రాలు',
      sub: 'సేంద్రీయ వ్యవసాయం వైపు అడుగులు.',
      image:
        'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=1200&q=80',
    },
    {
      page: 6,
      name: 'National & World (జాతీయం)',
      headline: 'భారత్ ఆర్థిక వ్యవస్థ దూకుడు - 2025 అంచనాలు',
      sub: 'గ్లోబల్ ఇన్వెస్టర్ల దృష్టి దేశంపై.',
      image:
        'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80',
    },
    {
      page: 7,
      name: 'Sports & Youth (క్రీడా లోకం)',
      headline: 'తెలంగాణ క్రీడాకారుల అద్భుత ప్రతిభ',
      sub: 'నేషనల్ గేమ్స్‌లో స్వర్ణ పతకాల పంట.',
      image:
        'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    },
    {
      page: 8,
      name: 'Cinema & Life (సినిమా / జీవనశైలి)',
      headline: 'తెలుగు సినిమా ఖ్యాతి ఖండాంతరాలు',
      sub: 'ఆరోగ్య సూత్రాలు - వేసవిలో తీసుకోవాల్సిన జాగ్రత్తలు.',
      image:
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const curPageData = pagesData[currentPage - 1];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 animate-fadeIn">
      <div className="bg-[#0b1428] border border-blue-800/80 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Control Bar */}
        <div className="bg-[#070e1e] border-b border-blue-900/60 p-3 sm:px-6 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="bg-red-600 text-white font-black text-xs px-2 py-0.5 rounded">
              AV NEWS
            </span>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-white">TODAY'S E-PAPER EDITION</h3>
              <p className="text-[10px] text-amber-400">
                {new Date().toLocaleDateString('te-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Page Navigators & Tools */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-900 rounded-lg border border-slate-800 p-1 text-xs">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 hover:bg-slate-800 disabled:opacity-30 rounded text-white cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-bold text-white text-xs">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 hover:bg-slate-800 disabled:opacity-30 rounded text-white cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="hidden sm:flex items-center bg-slate-900 rounded-lg border border-slate-800 p-1 text-xs text-slate-300">
              <button
                onClick={() => setZoomLevel((z) => Math.max(70, z - 15))}
                className="p-1 hover:bg-slate-800 rounded cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-1 text-[11px] font-mono">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(160, z + 15))}
                className="p-1 hover:bg-slate-800 rounded cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer hidden sm:block"
              title="Print E-Paper"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsEpaperOpen(false)}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Newspaper Canvas View */}
        <div className="flex-1 bg-slate-950 overflow-auto p-4 sm:p-6 flex items-center justify-center">
          <div
            className="bg-[#fefcf6] text-slate-950 p-6 sm:p-8 rounded-md shadow-2xl transition-all duration-300 max-w-3xl w-full border border-slate-300 font-serif"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Newspaper Header */}
            <div className="border-b-4 border-black pb-3 mb-4 text-center">
              <div className="text-[11px] font-sans font-black tracking-widest text-slate-600 flex items-center justify-between border-b border-slate-300 pb-1 mb-2">
                <span>RNI NO: TEL/2025/AVNEWS</span>
                <span>హైదరాబాద్ ఎడిషన్ • HYDERABAD EDITION</span>
                <span>వెల: ₹5.00</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-red-700 uppercase">
                AV NEWS
              </h1>
              <div className="text-xs font-bold text-slate-800 tracking-widest mt-1">
                సత్యం కోసం... సమాజం కోసం... • A Unit of Ayudh Vikas Foundation
              </div>
            </div>

            {/* Current Page Banner */}
            <div className="bg-slate-100 p-2 border border-slate-300 text-xs font-sans font-bold flex justify-between items-center mb-4">
              <span className="text-red-700">PAGE {currentPage}: {curPageData.name}</span>
              <span className="text-slate-500">{curPageData.headline}</span>
            </div>

            {/* Main Lead Story */}
            <div className="space-y-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-black leading-tight">
                {curPageData.headline}
              </h2>
              <p className="text-sm font-bold text-red-800">{curPageData.sub}</p>

              <div className="w-full h-64 sm:h-80 overflow-hidden rounded bg-slate-200 border border-slate-300 my-3">
                <img
                  src={curPageData.image}
                  alt={curPageData.headline}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-800 text-justify">
                <p>
                  రాష్ట్రవ్యాప్తంగా అభివృద్ధి సంక్షేమ ఫలాలు ప్రతీ పౌరునికి చేరవేయడమే లక్ష్యంగా ప్రభుత్వం
                  కీలక నిర్ణయాలు ప్రకటించింది. గ్రామీణ ప్రాంతాల్లో తాగునీటి సరఫరా, రోడ్ల విస్తరణ,
                  రైతులకు నాణ్యమైన విత్తనాలు, విద్యుత్ సౌకర్యాలపై ప్రత్యేక దృష్టి సారించింది. ప్రజా సమస్యల
                  పరిష్కారానికి ఆయుధ్ వికాస్ ఫౌండేషన్ మరియు AV News Today నిరంతరం ప్రజల పక్షాన నిలబడుతుంది.
                </p>
                <p>
                  విద్యా, వైద్య రంగాలలో మౌలిక వసతులను భారీగా మెరుగుపరిచేందుకు నూతన నిధులను విడుదల
                  చేసింది. నగరాల్లో ట్రాఫిక్ నియంత్రణ, పర్యావరణ పరిరక్షణ కోసం పచ్చదనం పెంపొందించే
                  కార్యక్రమాలను ప్రజా ప్రతినిధులు ప్రారంభించారు. రాబోయే రోజుల్లో అన్ని రంగాల్లో
                  తెలంగాణను అగ్రగామిగా నిలపడానికి సంకల్పించినట్లు వెల్లడించారు.
                </p>
              </div>
            </div>

            {/* Newspaper Bottom Stamp */}
            <div className="border-t-2 border-black pt-2 text-[10px] font-sans flex justify-between text-slate-600">
              <span>Printed & Published for Ayudh Vikas Foundation</span>
              <span>AV News Today • Digital E-Paper Edition</span>
              <span>Page {currentPage} of 8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
