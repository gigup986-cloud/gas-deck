import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Clock,
  Layers,
  ShieldAlert,
  Flame,
  Home,
  Store,
  MapPin,
  ChevronRight,
  TrendingUp,
  X,
  Check,
  Search,
  Copy,
  Info,
  ExternalLink,
  Smartphone,
  Database,
  Bell
} from 'lucide-react';
import { downloadProjectArchive } from '../../utils/zipExporter';

export const SpecPortalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'screens' | 'matrix' | 'architecture' | 'donotbuild' | 'rawmd'>('timeline');
  const [selectedEvidenceFilter, setSelectedEvidenceFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const handleDownloadMarkdown = async () => {
    try {
      const response = await fetch('/GAS_MARKETPLACE_VIDEO_ANALYSIS.md');
      let text = '';
      if (response.ok) {
        text = await response.text();
      } else {
        text = `# GAS MARKETPLACE APP ("GAS DECK")\n## COMPREHENSIVE VIDEO ANALYSIS & SPECIFICATION`;
      }
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'GAS_MARKETPLACE_VIDEO_ANALYSIS.md');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      alert("Downloading specification file...");
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const evidenceLabels = [
    { label: 'ALL', color: 'bg-slate-800 text-white' },
    { label: 'VERIFIED IN VIDEO', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { label: 'OWNER-STATED', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    { label: 'INFERRED', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    { label: 'RECOMMENDED', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    { label: 'UNCONFIRMED', color: 'bg-rose-100 text-rose-800 border-rose-300' },
    { label: 'NOT DEMONSTRATED', color: 'bg-gray-100 text-gray-800 border-gray-300' },
  ];

  const traceabilityData = [
    {
      id: "TR-01",
      item: "Application Brand Identity: 'Gas Deck'",
      source: "00:00, 00:07",
      evidence: "VERIFIED IN VIDEO",
      details: "Flame icon with gradient (orange to violet) and brand name 'Gas Deck' prominently on registration screen.",
      actor: "Global"
    },
    {
      id: "TR-02",
      item: "Dual Role Selection ('Order gas' vs 'Sell gas')",
      source: "00:06 – 00:10",
      evidence: "OWNER-STATED",
      details: "Spoken narration: 'When you wan register, e go ask you if you want to order gas or you want to sell gas.' Left card has purple border when selected.",
      actor: "Auth"
    },
    {
      id: "TR-03",
      item: "Nigerian Phone MSISDN (+234 format)",
      source: "00:08 – 00:11",
      evidence: "VERIFIED IN VIDEO",
      details: "Form field shows prefilled/placeholder '+234 801 234 5678' alongside full name 'Amina Bello'.",
      actor: "Auth"
    },
    {
      id: "TR-04",
      item: "Customer Delivery Location: '24 Blueberry, Alakahia'",
      source: "00:01 – 00:03",
      evidence: "VERIFIED IN VIDEO",
      details: "Customer header shows address in Alakahia (Port Harcourt, Rivers State) with location pin and dropdown indicator.",
      actor: "Customer"
    },
    {
      id: "TR-05",
      item: "Estimated Delivery SLA: '15 - 25 min delivery time'",
      source: "00:01 – 00:03",
      evidence: "VERIFIED IN VIDEO",
      details: "Badge on the 'Running low?' hero card indicating rapid on-demand dispatch window.",
      actor: "Customer"
    },
    {
      id: "TR-06",
      item: "Refill Presets: ₦8,500 / 12 kg / Custom",
      source: "00:01 – 00:03",
      evidence: "VERIFIED IN VIDEO",
      details: "Three interactive control boxes allowing users to order by monetary amount, cylinder weight, or custom volume.",
      actor: "Customer"
    },
    {
      id: "TR-07",
      item: "Itemized Price Breakdown (₦18,500 + ₦1,500 = ₦20,000)",
      source: "00:01 – 00:03",
      evidence: "VERIFIED IN VIDEO",
      details: "Transparent display of Gas Refill cost (₦18,500), Delivery Fee (₦1,500), and bold Total (₦20,000).",
      actor: "Customer"
    },
    {
      id: "TR-08",
      item: "Matching Dispatch Button: 'Find my gas merchant'",
      source: "00:01 – 00:03",
      evidence: "VERIFIED IN VIDEO",
      details: "High-contrast purple full-width pill button initiating geo-matching.",
      actor: "Customer"
    },
    {
      id: "TR-09",
      item: "One-Tap Reorder ('Son And Father Oil & Gas')",
      source: "00:01 – 00:03",
      evidence: "VERIFIED IN VIDEO",
      details: "'Your last refill' section displays 12.5 kg Full refill from 14 Oct by Son And Father Oil & Gas with 'Reorder' button.",
      actor: "Customer"
    },
    {
      id: "TR-10",
      item: "Merchant Branding: 'Son And Father Oil & Gas'",
      source: "00:03 – 00:05",
      evidence: "VERIFIED IN VIDEO",
      details: "Merchant workspace header explicitly identifies registered station with gas flame branding.",
      actor: "Merchant"
    },
    {
      id: "TR-11",
      item: "Store Open/Closed Availability Toggle",
      source: "00:03 – 00:05",
      evidence: "VERIFIED IN VIDEO",
      details: "'You're open for orders / Orders in your area will find you' with active green toggle switch.",
      actor: "Merchant"
    },
    {
      id: "TR-12",
      item: "Performance Analytics ('Today at a glance')",
      source: "00:03 – 00:05",
      evidence: "VERIFIED IN VIDEO",
      details: "Dark navy card displaying ₦148,000 (+18% vs yesterday) and 8 Delivered orders.",
      actor: "Merchant"
    },
    {
      id: "TR-13",
      item: "Incoming Order Card (#ORD-2048) with Accept/Decline",
      source: "00:03 – 00:06",
      evidence: "VERIFIED IN VIDEO",
      details: "Order from Amina Bello (12.5 kg LPG, 1.4 km away, ₦20,000) with Decline (✕) and Accept order (✓) buttons.",
      actor: "Merchant"
    },
    {
      id: "TR-14",
      item: "Online Payment Settlement Tag ('Paid online')",
      source: "00:04 – 00:06",
      evidence: "VERIFIED IN VIDEO",
      details: "Green pill tag indicating customer already paid via online payment gateway prior to merchant fulfillment.",
      actor: "Merchant"
    },
    {
      id: "TR-15",
      item: "Merchant Gas Stock / Inventory Monitor",
      source: "00:04, 00:10",
      evidence: "VERIFIED IN VIDEO",
      details: "'Your gas stock' widget and dedicated bottom navigation tab for monitoring bulk LPG capacity.",
      actor: "Merchant"
    }
  ];

  const filteredData = traceabilityData.filter((item) => {
    const matchesFilter = selectedEvidenceFilter === 'ALL' || item.evidence === selectedEvidenceFilter;
    const matchesSearch = item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Action Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Gas Deck Specification &amp; Video Analysis
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
              v1.0.0
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full requirements document, second-by-second timeline, and architectural handoff guide.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadMarkdown}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD Spec</span>
          </button>
          <button
            onClick={downloadProjectArchive}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Code .ZIP</span>
          </button>
          <button
            onClick={handlePrintPdf}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'timeline'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          Timeline &amp; Audio Transcripts
        </button>
        <button
          onClick={() => setActiveTab('screens')}
          className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'screens'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          Figma Screen Inventory
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'matrix'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Traceability Matrix ({traceabilityData.length})
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'architecture'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          Database &amp; APIs
        </button>
        <button
          onClick={() => setActiveTab('donotbuild')}
          className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'donotbuild'
              ? 'bg-rose-600 text-white font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          DO NOT BUILD YET
        </button>
        <button
          onClick={() => setActiveTab('rawmd')}
          className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'rawmd'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Markdown Source
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-xs text-indigo-900">
            <strong>Key Context:</strong> The video shows a prototype titled "Gas Deck" created in Figma.
            The owner's voice in West African / Nigerian Pidgin confirms:
            <em> "Then this one na the merchant dashboard. Then when you wan register, e go ask you if you want to order gas or you want to sell gas."</em>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-mono font-bold text-indigo-600">00:00 – 00:02</span>: Wide angle on Registration, Customer Dashboard, and Merchant Dashboard artboards.
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-mono font-bold text-indigo-600">00:02 – 00:04</span>: Close-up on Customer Dashboard: "Hi, Ezekiel 👋", "24 Blueberry, Alakahia", "Running low? 15-25 min delivery time", Presets (₦8,500 / 12 kg / Custom), Total ₦20,000.
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-mono font-bold text-indigo-600">00:04 – 00:06</span>: Presenter points to Merchant Dashboard: "Son And Father Oil &amp; Gas", "You're open for orders", "Today at a glance: ₦148,000 / 8 Delivered", Incoming order #ORD-2048 from Amina Bello.
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-mono font-bold text-indigo-600">00:06 – 00:11</span>: Presenter points to Registration role selector cards: "Order gas (Customer)" and "Sell gas (Merchant)", with full name Amina Bello and phone +234 801 234 5678.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'matrix' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-slate-900">Requirements Traceability Matrix</h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-semibold">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Requirement</th>
                  <th className="p-3">Video Timestamp</th>
                  <th className="p-3">Evidence Status</th>
                  <th className="p-3">Observations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredData.map((row) => (
                  <tr key={row.id}>
                    <td className="p-3 font-mono font-bold text-indigo-600">{row.id}</td>
                    <td className="p-3 font-bold text-slate-900">{row.item}</td>
                    <td className="p-3 font-mono text-slate-600">{row.source}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {row.evidence}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 text-[11px]">{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'donotbuild' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-rose-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-rose-600" />
            <div>
              <h3 className="text-lg font-bold text-rose-950">DO NOT BUILD YET LIST</h3>
              <p className="text-xs text-rose-700">Crucial boundaries preventing premature assumptions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
              <strong className="text-rose-900 block mb-1">1. 3rd-Party Courier Fleet App</strong>
              <p className="text-rose-800/80">Only Customer and Merchant are shown in video. Do not build an independent driver platform until the owner confirms whether stations employ their own drivers.</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
              <strong className="text-rose-900 block mb-1">2. Single Payment Gateway Lock-In</strong>
              <p className="text-rose-800/80">Keep Paystack, Flutterwave, and Monnify interchangeable behind a gateway interface.</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
              <strong className="text-rose-900 block mb-1">3. Hardcoded Depot Price Logic</strong>
              <p className="text-rose-800/80">Terminal wholesale LPG prices fluctuate weekly. Each station must maintain its own price per kg.</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
              <strong className="text-rose-900 block mb-1">4. Mandatory Cylinder Swaps</strong>
              <p className="text-rose-800/80">Allow both refill of customer's tank and pre-filled certified tank swaps.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rawmd' && (
        <div className="bg-slate-950 text-slate-200 rounded-3xl p-6 font-mono text-xs overflow-x-auto max-h-[600px] leading-relaxed">
          <p className="text-slate-400 mb-4">// GAS_MARKETPLACE_VIDEO_ANALYSIS.md is saved to the workspace root.</p>
          <pre>{`# GAS MARKETPLACE APP ("GAS DECK")
## COMPREHENSIVE VIDEO ANALYSIS, PRODUCT SPECIFICATION & HANDOFF DOCUMENT

Source: 11-second Figma Prototype Walkthrough
Deliverable File: GAS_MARKETPLACE_VIDEO_ANALYSIS.md

[VERIFIED IN VIDEO]
- Registration with role toggle ("Order gas - Customer" vs "Sell gas - Merchant")
- Customer Dashboard with "Hi, Ezekiel 👋", "24 Blueberry, Alakahia", "Running low?", 15-25m SLA
- Presets: ₦8,500 / 12 kg / Custom
- Breakdown: ₦18,500 + ₦1,500 = ₦20,000
- Merchant Dashboard: "Son And Father Oil & Gas", "You're open for orders", ₦148,000 / 8 Delivered
- Incoming Order #ORD-2048 from Amina Bello with Accept & Decline buttons`}</pre>
        </div>
      )}
    </div>
  );
};
