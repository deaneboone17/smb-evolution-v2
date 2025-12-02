import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Mail, Handshake } from "lucide-react";

const MasteryPlaybook = () => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Initialize IntersectionObserver
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0");
                        entry.target.classList.remove("opacity-0", "translate-y-[30px]");
                        observerRef.current?.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.2,
            }
        );

        // Observe all elements with the 'animate-hidden' class
        const hiddenElements = document.querySelectorAll(".animate-hidden");
        hiddenElements.forEach((el) => observerRef.current?.observe(el));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-inter print:bg-white">
            {/* Print Styles */}
            <style>{`
        @media print {
          .no-print { display: none !important; }
          .infographic-panel { 
            min-height: 100vh; 
            height: auto; 
            box-shadow: none; 
            border: none; 
            page-break-after: always;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .animate-hidden { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

            {/* Navigation - Back to Dashboard */}
            <div className="absolute top-6 left-6 z-50 no-print">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-[#1B1B3A] font-semibold hover:text-[#1C77C3] transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </Link>
            </div>

            {/* Floating PDF Button */}
            <button
                onClick={handlePrint}
                className="fixed bottom-8 right-8 bg-[#1B1B3A] text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.3)] cursor-pointer z-[9999] transition-transform hover:scale-105 hover:bg-[#121225] border-2 border-[#06D6A0] font-semibold text-sm no-print"
            >
                <Download className="w-5 h-5" />
                <span>Save to PDF</span>
            </button>

            {/* PAGE 01: COVER */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-[#1B1B3A] text-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#F8FAFC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="flex-1 flex flex-col justify-center items-start">
                    <div className="w-[100px] h-[100px] border-[8px] border-[#06D6A0] rounded-tl-[50%] rounded-tr-[50%] rounded-br-none rounded-bl-[50%] -rotate-45 mb-8 shadow-[0_0_30px_rgba(6,214,160,0.3)] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"></div>
                    <span className="text-sm font-bold tracking-[0.2em] text-[#06D6A0] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        SMB EVOLUTION ELITE RESOURCE
                    </span>
                    <h1 className="text-[3.5rem] leading-[1.1] font-black mb-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        AI QUICK WINS<br />
                        <span className="text-[#06D6A0]">MASTERY EDITION</span>
                    </h1>
                    <p className="text-2xl leading-relaxed max-w-[600px] text-[#CBD5E1] mb-6 animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        The Blueprint for the AI-Native Organization.<br />
                        From "Integrated" to "Autonomous."
                    </p>
                    <div className="mt-12 border-t border-white/20 pt-4 w-full animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <span className="font-montserrat font-bold text-white">PHASE 3: MASTERY</span>
                        <br />
                        <span className="text-[#94A3B8]">The Final Evolution</span>
                    </div>
                </div>
                <div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-center text-sm text-[#94A3B8]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#06D6A0] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 01</div>
                </div>
            </div>

            {/* PAGE 02: THE SHIFT */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#F8FAFC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        THE BIFURCATION
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#06D6A0] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        OBSERVERS VS.<br />ACHIEVERS
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#475569] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        The economy is splitting. <strong>"Observers"</strong> are stuck in Pilot Purgatory—using chatbots but seeing no revenue lift.
                    </p>
                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#475569] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        <strong>"Achievers"</strong> (The Mastery Class) have moved beyond tools. They are building a "Nervous System" where AI agents monitor, route, and execute work autonomously.
                    </p>

                    <div className="flex justify-between items-center mt-8 p-4 bg-[#f1f5f9] rounded-lg animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        <div className="text-center flex-1 opacity-50 scale-90 transform transition-all">
                            <h4 className="text-[#1B1B3A] mb-2 font-montserrat uppercase">SPARK</h4>
                            <div className="text-xs">Ad-hoc Prompts</div>
                        </div>
                        <div className="text-2xl text-[#1C77C3]">→</div>
                        <div className="text-center flex-1 opacity-50 scale-90 transform transition-all">
                            <h4 className="text-[#1B1B3A] mb-2 font-montserrat uppercase">MOMENTUM</h4>
                            <div className="text-xs">Connected Workflows</div>
                        </div>
                        <div className="text-2xl text-[#1C77C3]">→</div>
                        <div className="text-center flex-1 opacity-100 scale-110 transform transition-all">
                            <h4 className="text-[#1B1B3A] mb-2 font-montserrat uppercase text-[1.4rem] text-[#06D6A0]">MASTERY</h4>
                            <div className="text-sm font-bold">Superagency<br />& Orchestration</div>
                        </div>
                    </div>

                    <div className="mt-12 bg-[#1B1B3A] text-white p-6 rounded-lg animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <strong>THE GOAL:</strong> Shift from a "Human-centric" model assisted by tools, to an "Agent-centric" model orchestrated by humans.
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#94A3B8]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#06D6A0] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 02</div>
                </div>
            </div>

            {/* PAGE 03: INFRASTRUCTURE */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#F8FAFC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        THE ENGINE ROOM
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#06D6A0] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        INFRASTRUCTURE<br />REALITY CHECK
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#475569] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        You cannot build a skyscraper on a swamp. To run advanced AI agents, you need a resilient foundation.
                    </p>

                    {/* Visual Tech Stack */}
                    <div className="my-8 relative animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        <div className="text-[0.8rem] uppercase text-[#94A3B8] mb-2 tracking-widest">The Mastery Stack</div>

                        <div className="bg-white border border-[#E2E8F0] p-4 mb-2 rounded-lg flex items-center justify-between relative z-20">
                            <div className="flex items-center">
                                <div className="w-[30px] h-[30px] bg-[#F1F5F9] rounded-md flex items-center justify-center text-[1.2rem] mr-[15px]">⚡</div>
                                <div>
                                    <h5 className="m-0 text-[1rem] text-[#1B1B3A] font-bold">Logic & Action</h5>
                                    <span className="text-[0.8rem] text-[#64748B]">Where the agents "live" and work.</span>
                                </div>
                            </div>
                            <div className="text-[0.75rem] bg-[#06D6A0] text-[#1B1B3A] px-2 py-0.5 rounded font-bold">Self-Hosted n8n</div>
                        </div>

                        <div className="bg-white border border-[#E2E8F0] p-4 mb-2 rounded-lg flex items-center justify-between relative z-20">
                            <div className="absolute left-[20px] -top-[10px] w-[2px] h-[10px] bg-[#CBD5E1] z-10"></div>
                            <div className="flex items-center">
                                <div className="w-[30px] h-[30px] bg-[#F1F5F9] rounded-md flex items-center justify-center text-[1.2rem] mr-[15px]">🧠</div>
                                <div>
                                    <h5 className="m-0 text-[1rem] text-[#1B1B3A] font-bold">Context & Memory</h5>
                                    <span className="text-[0.8rem] text-[#64748B]">Vector database for AI recall.</span>
                                </div>
                            </div>
                            <div className="text-[0.75rem] bg-[#06D6A0] text-[#1B1B3A] px-2 py-0.5 rounded font-bold">Pinecone / Supabase</div>
                        </div>

                        <div className="bg-white border border-[#E2E8F0] p-4 mb-2 rounded-lg flex items-center justify-between relative z-20">
                            <div className="absolute left-[20px] -top-[10px] w-[2px] h-[10px] bg-[#CBD5E1] z-10"></div>
                            <div className="flex items-center">
                                <div className="w-[30px] h-[30px] bg-[#F1F5F9] rounded-md flex items-center justify-center text-[1.2rem] mr-[15px]">🗄️</div>
                                <div>
                                    <h5 className="m-0 text-[1rem] text-[#1B1B3A] font-bold">Source of Truth</h5>
                                    <span className="text-[0.8rem] text-[#64748B]">Structured data warehouse.</span>
                                </div>
                            </div>
                            <div className="text-[0.75rem] bg-[#06D6A0] text-[#1B1B3A] px-2 py-0.5 rounded font-bold">BigQuery / Postgres</div>
                        </div>
                    </div>

                    <div className="bg-[#FFF1F2] border border-[#E2E8F0] p-6 rounded-xl shadow-sm border-l-4 border-l-[#F43F5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <div className="text-[#881337] font-bold text-[1.2rem] mb-2 flex items-center gap-2">
                            ⚠️ The "Fragile" Stack
                        </div>
                        <p className="text-[0.9rem] mb-0 text-[#475569]">
                            Running your business on <strong>Google Sheets + Zapier</strong> is fine for "Spark." But it breaks at scale. Data is siloed, expensive, and insecure. Upgrade to SQL.
                        </p>
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#94A3B8]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#06D6A0] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 03</div>
                </div>
            </div>

            {/* PAGE 04: ACQUISITION */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#F8FAFC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        WIN #1: ACQUISITION ENGINE
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#06D6A0] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        PRECISION PROSPECTING
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#475569] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        <strong>The Shift:</strong> Stop buying static lists. Build a "Waterfall Enrichment" engine that creates its own data.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Tool 1: Clay */}
                        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2 flex items-center gap-2">
                                <span className="text-[1.2rem]">💎</span> Clay.com
                            </div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">THE WATERFALL</div>
                            <p className="text-[0.85rem] mt-2 text-[#475569]">
                                <strong>The Data Layer:</strong> Queries 50+ providers to find valid emails. If one fails, it tries the next. Doubles your reachable market.
                            </p>
                        </div>

                        {/* Tool 2: AirOps */}
                        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#06D6A0] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2 flex items-center gap-2">
                                <span className="text-[1.2rem]">📝</span> AirOps
                            </div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">CONTENT SUPPLY CHAIN</div>
                            <p className="text-[0.85rem] mt-2 text-[#475569]">
                                <strong>The Asset Layer:</strong> It's not just a chatbot. It connects LLMs to your <em>live data</em> to generate programmatic SEO pages, SOPs, and sales assets at scale.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#1B1B3A] text-white p-6 rounded-xl mt-4 animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <strong>THE WORKFLOW:</strong> Clay finds the prospect -&gt; AirOps reads their website & writes a custom 1-pager -&gt; You hit send.
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#94A3B8]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#06D6A0] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 04</div>
                </div>
            </div>

            {/* PAGE 05: ORCHESTRATION */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#F8FAFC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        WIN #2: THE NERVOUS SYSTEM
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#06D6A0] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        TRUE ORCHESTRATION
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#475569] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        <strong>The Problem:</strong> You have 20 SaaS tools, but they don't talk. You are still the "Router" copy-pasting data.
                    </p>

                    <div className="flex items-start gap-6 mb-8 relative animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        <div className="bg-[#1C77C3] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold font-montserrat flex-shrink-0 z-10">1</div>
                        <div className="absolute left-[20px] top-[40px] bottom-[-30px] w-[2px] bg-[linear-gradient(to_bottom,#1C77C3_50%,transparent_50%)] bg-[length:2px_10px] z-0"></div>
                        <div>
                            <h4 className="font-montserrat uppercase font-bold">The Brain (n8n)</h4>
                            <p className="text-sm mb-0 text-[#475569]">We use <strong>n8n</strong> because it is self-hostable and loops intelligently. It connects your "Organs" (CRM, Email, Slack).</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 mb-8 relative animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <div className="bg-[#1C77C3] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold font-montserrat flex-shrink-0 z-10">2</div>
                        <div>
                            <h4 className="font-montserrat uppercase font-bold">The Logic Loop</h4>
                            <p className="text-sm mb-0 text-[#475569]">Unlike Zapier (linear), n8n can "Think." <br /><em>"Did the client reply? If yes, analyze sentiment. If negative, alert CEO. If positive, book meeting."</em></p>
                        </div>
                    </div>

                    <div className="bg-[#ECFEFF] border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-4 border-l-4 border-l-[#06D6A0] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">
                        <strong>💡 STRATEGY:</strong> Use <strong>Make</strong> for simple tasks. Use <strong>n8n</strong> for complex, data-heavy agent loops.
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#94A3B8]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#06D6A0] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 05</div>
                </div>
            </div>

            {/* PAGE 06: RETENTION */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#F8FAFC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        WIN #3: RETENTION CORE
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#06D6A0] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        ALGORITHMIC DEFENSE
                    </h2>
                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#475569] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        Churn is the silent killer. Traditional "exit surveys" are autopsies. We need emergency surgery.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Tool 1 */}
                        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2">RetentionEngine</div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">THE SHIELD</div>
                            <p className="text-[0.85rem] mt-2 text-[#475569]">
                                <strong>Dynamic Rebuttal:</strong> When a user clicks cancel, AI analyzes their reason and offers a precise save offer (Discount, Pause, or Pivot).
                            </p>
                        </div>
                        {/* Tool 2 */}
                        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2">Forethought.ai</div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">SUPPORT AGENT</div>
                            <p className="text-[0.85rem] mt-2 text-[#475569]">
                                <strong>Resolution, not Deflection:</strong> It reads historical tickets to actually <em>solve</em> the problem, not just send a link.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#1B1B3A] text-white p-6 rounded-xl mt-8 animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <strong>💰 ROI IMPACT:</strong> OLIPOP used this stack to grow subscription revenue by 35% and reduce churn by 26%.
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#94A3B8]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#06D6A0] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 06</div>
                </div>
            </div>

            {/* PAGE 07: INTELLIGENCE */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#F8FAFC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        WIN #4: INTELLIGENCE LAYER
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#06D6A0] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        DEMOCRATIZED DATA
                    </h2>
                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#475569] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        Stop making decisions based on "Gut Feel." The Mastery organization runs on predictive SQL.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2">Hex</div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">DATA APPS</div>
                            <p className="text-[0.85rem] mt-2 text-[#475569]">Turns SQL queries into interactive, shareable apps. Allows executives to "play" with data without breaking it.</p>
                        </div>
                        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2">BigQuery ML</div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">PREDICTION</div>
                            <p className="text-[0.85rem] mt-2 text-[#475569]">Run machine learning models directly in your data warehouse. Predict churn probability for every user in real-time.</p>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-[#64748B] italic animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">
                        <em>"The AI Achiever is data-driven, not gut-driven."</em>
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#94A3B8]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#06D6A0] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 07</div>
                </div>
            </div>

            {/* PAGE 08: ROADMAP */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#F8FAFC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        EXECUTION
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#06D6A0] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        THE 90-DAY SPRINT
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#475569] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        Implementation paralysis is the enemy. Execute this timeline to achieve Superagency.
                    </p>

                    <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg border-l-4 border-[#CBD5E1] hover:border-[#06D6A0] transition-colors duration-300 animate-hidden opacity-0 translate-y-[30px] ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        <div className="w-[30px] h-[30px] bg-[#1B1B3A] text-white rounded-md flex items-center justify-center text-[0.8rem] font-bold">01</div>
                        <div>
                            <strong>Days 1-30: Foundation (CRITICAL)</strong><br />
                            <span className="text-[0.85rem] text-[#64748B]">
                                • Deploy <strong>BigQuery</strong> or Postgres.<br />
                                • Set up self-hosted <strong>n8n</strong> instance.<br />
                                • Audit "Shadow AI" usage.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg border-l-4 border-[#CBD5E1] hover:border-[#06D6A0] transition-colors duration-300 animate-hidden opacity-0 translate-y-[30px] ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <div className="w-[30px] h-[30px] bg-[#1B1B3A] text-white rounded-md flex items-center justify-center text-[0.8rem] font-bold">02</div>
                        <div>
                            <strong>Days 31-60: Revenue</strong><br />
                            <span className="text-[0.85rem] text-[#64748B]">
                                • Configure <strong>Clay</strong> data waterfalls.<br />
                                • Build <strong>AirOps</strong> content supply chain.<br />
                                • Launch first "Claygent" campaign.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg border-l-4 border-[#CBD5E1] hover:border-[#06D6A0] transition-colors duration-300 animate-hidden opacity-0 translate-y-[30px] ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">
                        <div className="w-[30px] h-[30px] bg-[#1B1B3A] text-white rounded-md flex items-center justify-center text-[0.8rem] font-bold">03</div>
                        <div>
                            <strong>Days 61-90: Scale</strong><br />
                            <span className="text-[0.85rem] text-[#64748B]">
                                • Connect Clay + AirOps via n8n.<br />
                                • Deploy Hex dashboards for executive view.
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#94A3B8]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#06D6A0] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 08</div>
                </div>
            </div>

            {/* PAGE 09: CONCLUSION */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-[#1B1B3A] text-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#F8FAFC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-[60px] h-[60px] border-[4px] border-[#06D6A0] rounded-full mb-8 shadow-[0_0_30px_rgba(6,214,160,0.3)] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"></div>

                    <h2 className="text-[3rem] mb-4 font-montserrat uppercase font-bold animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        WELCOME TO<br />THE HYBRID ORG.
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] max-w-[600px] mx-auto mb-12 text-[#CBD5E1] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        You have graduated from efficiency to <strong>Autonomy.</strong><br />
                        The human's role is no longer to do the work, but to design the workflow.
                    </p>

                    {/* CTA CARDS CONTAINER */}
                    <div className="w-full max-w-[550px] flex flex-col gap-4 mb-8 animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">

                        {/* CTA 1: Mastery Letter */}
                        <a href="#" className="bg-[#121225] border border-[#2A2A45] rounded-xl p-5 flex items-center justify-between transition-all duration-300 hover:border-[#1C77C3] hover:-translate-y-0.5 hover:bg-[#1F1F35] group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-xl">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-white text-[1.1rem] mb-1 font-bold">The Mastery Letter</h4>
                                    <p className="text-[#94A3B8] text-[0.85rem] m-0">Deep-dive architecture for AI leaders.</p>
                                </div>
                            </div>
                            <div className="text-[#1C77C3] text-[1.2rem] font-bold group-hover:translate-x-1 transition-transform">→</div>
                        </a>

                        {/* CTA 2: Strategy Session */}
                        <a href="https://calendly.com/deane-boone-smbevolution/30min" target="_blank" rel="noopener noreferrer" className="bg-[#121225] border border-[#2A2A45] rounded-xl p-5 flex items-center justify-between transition-all duration-300 hover:border-[#1C77C3] hover:-translate-y-0.5 hover:bg-[#1F1F35]">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-xl">
                                    <Handshake className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-white text-[1.1rem] mb-1 font-bold">Book a Strategy Session</h4>
                                    <p className="text-[#94A3B8] text-[0.85rem] m-0">Custom architecture for your team.</p>
                                </div>
                            </div>
                            <div className="bg-[#06D6A0] text-[#1B1B3A] px-5 py-2 rounded-md font-bold text-[0.9rem] uppercase">Book</div>
                        </a>

                    </div>

                    <div className="mt-8 text-[0.8rem] opacity-50">
                        © 2024 SMB Evolution. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MasteryPlaybook;
