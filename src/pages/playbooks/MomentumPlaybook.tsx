import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Mail, Handshake } from "lucide-react";

const MomentumPlaybook = () => {
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
        <div className="min-h-screen bg-[#E8EBF0] text-[#2D2D2D] font-inter print:bg-white">
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
                className="fixed bottom-8 right-8 bg-[#1B1B3A] text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.3)] cursor-pointer z-[9999] transition-transform hover:scale-105 hover:bg-[#121225] border-2 border-[#FFD166] font-semibold text-sm no-print"
            >
                <Download className="w-5 h-5" />
                <span>Save to PDF</span>
            </button>

            {/* PAGE 01: COVER */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-[#1B1B3A] text-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="flex-1 flex flex-col justify-center items-start">
                    <div className="w-[100px] h-[100px] border-[8px] border-[#FFD166] rounded-tl-[50%] rounded-tr-[50%] rounded-br-none rounded-bl-[50%] -rotate-45 mb-8 shadow-[0_0_30px_rgba(255,209,102,0.3)] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"></div>
                    <span className="text-sm font-bold tracking-[0.2em] text-[#FFD166] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        SMB EVOLUTION PREMIUM RESOURCE
                    </span>
                    <h1 className="text-[3.5rem] leading-[1.1] font-black mb-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        AI QUICK WINS<br />
                        <span className="text-[#FFD166]">MOMENTUM EDITION</span>
                    </h1>
                    <p className="text-2xl leading-relaxed max-w-[600px] text-[#D1D5DB] mb-6 animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        Stop doing "Random Acts of AI."<br />
                        Start building connected, automated systems.
                    </p>
                    <div className="mt-12 border-t border-white/20 pt-4 w-full animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <span className="font-montserrat font-bold text-white">PHASE 2: MOMENTUM</span>
                        <br />
                        <span className="text-[#888]">Follows: The Spark Edition</span>
                    </div>
                </div>
                <div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FFD166] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 01</div>
                </div>
            </div>

            {/* PAGE 02: THE SHIFT */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        THE EXECUTIVE SUMMARY
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#FFD166] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        FROM EXPERIMENTATION<br />TO INTEGRATION
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        In the <strong>Spark</strong> phase, you used ChatGPT to write an email or Midjourney to make an image. It was magical, but manual.
                    </p>
                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        <strong>Momentum</strong> is different. Momentum is when AI stops being a "task" you do, and starts being a "layer" that runs in the background. We are moving from single prompts to <strong>connected workflows</strong>.
                    </p>

                    <div className="flex justify-between items-center mt-8 p-4 bg-[#f8f9fa] rounded-lg animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        <div className="text-center flex-1 opacity-50 scale-90 transform transition-all">
                            <h4 className="text-[#1B1B3A] mb-2 font-montserrat uppercase">SPARK</h4>
                            <div className="text-xs">Ad-hoc Prompts<br />Manual Copy-Paste</div>
                        </div>
                        <div className="text-2xl text-[#1C77C3]">→</div>
                        <div className="text-center flex-1 opacity-100 scale-110 transform transition-all">
                            <h4 className="text-[#1B1B3A] mb-2 font-montserrat uppercase text-[1.4rem] text-[#1C77C3]">MOMENTUM</h4>
                            <div className="text-sm font-bold">Connected Systems<br />Repeatable Workflows</div>
                        </div>
                        <div className="text-2xl text-[#1C77C3]">→</div>
                        <div className="text-center flex-1 opacity-50 scale-90 transform transition-all">
                            <h4 className="text-[#1B1B3A] mb-2 font-montserrat uppercase">MASTERY</h4>
                            <div className="text-xs">Custom API<br />Full Autonomy</div>
                        </div>
                    </div>

                    <div className="mt-12 bg-[#1B1B3A] text-white p-6 rounded-lg animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <strong>THE GOAL:</strong> Stop being the "Human Router" moving data between tools. Let AI handle the hand-offs.
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FFD166] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 02</div>
                </div>
            </div>

            {/* PAGE 03: OPERATIONAL WIN 1 (SALES) */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        QUICK WIN #1: SALES INTELLIGENCE
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#FFD166] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        AUTOMATED LEAD ENRICHMENT
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        <strong>The Problem:</strong> You get a new lead. You spend 15 minutes Googling them, checking LinkedIn, and guessing their company size before you call.
                    </p>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-4 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2 flex items-center gap-2">
                            <span className="text-2xl">⚙️</span> The Momentum Fix
                        </div>
                        <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E]">Don't research manually. Have AI prep the dossier for you the second the lead arrives.</p>
                        <div className="bg-[#F3F4F6] p-4 rounded-lg border border-dashed border-[#1C77C3] text-center mt-4">
                            <strong>Trigger:</strong> New Lead in CRM (HubSpot/Pipedrive)<br />
                            ⬇️<br />
                            <strong>Action:</strong> Clay / Zapier looks up LinkedIn data<br />
                            ⬇️<br />
                            <strong>Result:</strong> AI writes a personalized opener based on their recent news
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8 animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <div className="flex-1">
                            <h4 className="text-[#1C77C3] font-montserrat uppercase font-bold">TOOLS NEEDED</h4>
                            <ul className="list-none mt-2 text-sm">
                                <li>• CRM (HubSpot/Salesforce)</li>
                                <li>• Clay.com (or Apollo)</li>
                            </ul>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-[#D97706] font-montserrat uppercase font-bold">THE LIFT</h4>
                            <p className="text-sm mt-2">Saves 15 mins per lead.<br />Increases response rate by 30%.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FFD166] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 03</div>
                </div>
            </div>

            {/* PAGE 04: OPERATIONAL WIN 2 (CONTENT) */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        QUICK WIN #2: CONTENT SCALE
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#FFD166] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        THE REPURPOSING PIPELINE
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        <strong>The Problem:</strong> You record a great video or podcast. Then it dies. You don't have time to write the blog, the tweets, and the newsletter.
                    </p>

                    <div className="flex items-start gap-6 mb-8 relative animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        <div className="bg-[#1C77C3] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold font-montserrat flex-shrink-0 z-10">1</div>
                        <div className="absolute left-[20px] top-[40px] bottom-[-30px] w-[2px] bg-[linear-gradient(to_bottom,#1C77C3_50%,transparent_50%)] bg-[length:2px_10px] z-0"></div>
                        <div>
                            <h4 className="font-montserrat uppercase font-bold">Record Once</h4>
                            <p className="text-sm mb-0 text-[#4A4A5E]">Record a 10-min Zoom or Loom video explaining a core concept.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 mb-8 relative animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <div className="bg-[#1C77C3] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold font-montserrat flex-shrink-0 z-10">2</div>
                        <div className="absolute left-[20px] top-[40px] bottom-[-30px] w-[2px] bg-[linear-gradient(to_bottom,#1C77C3_50%,transparent_50%)] bg-[length:2px_10px] z-0"></div>
                        <div>
                            <h4 className="font-montserrat uppercase font-bold">Transcribe & Clip</h4>
                            <p className="text-sm mb-0 text-[#4A4A5E]"><strong>Tool: Descript.</strong> It transcribes audio and lets you edit video by deleting text. It also finds "highlight clips" automatically.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 mb-8 relative animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">
                        <div className="bg-[#1C77C3] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold font-montserrat flex-shrink-0 z-10">3</div>
                        <div>
                            <h4 className="font-montserrat uppercase font-bold">AI Transformation</h4>
                            <p className="text-sm mb-0 text-[#4A4A5E]"><strong>Tool: Castmagic / ChatGPT.</strong> Upload transcript. Ask for: 1 LinkedIn Post, 1 Blog Post, 1 Newsletter.</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFBEB] border border-gray-200 rounded-xl p-6 shadow-sm mb-4 border-l-4 border-l-[#FFD166] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">
                        <strong>💡 REAL WORLD RESULT:</strong> An SMB consultant turned 1 weekly webinar into 15 pieces of content, doubling LinkedIn traffic in 4 weeks.
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FFD166] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 04</div>
                </div>
            </div>

            {/* PAGE 05: DEEP DIVE WORKFLOW */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        CORE WORKFLOW
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#FFD166] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        THE "SPEED-TO-LEAD" ENGINE
                    </h2>
                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        Speed kills the competition. This workflow ensures that when a human raises their hand, they get an immediate, intelligent response—and your team gets alerted instantly.
                    </p>

                    <div className="bg-[#1B1B3A] text-white p-8 rounded-xl relative animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        {/* Visual Flow */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-center">
                                <div className="text-[2rem]">📝</div>
                                <div className="text-xs mt-1">Form Fill</div>
                            </div>
                            <div className="h-[2px] flex-1 bg-[#555] mx-2"></div>
                            <div className="text-center">
                                <div className="text-[2rem] text-[#FFD166]">⚡</div>
                                <div className="text-xs mt-1">Zapier</div>
                            </div>
                            <div className="h-[2px] flex-1 bg-[#555] mx-2"></div>
                            <div className="text-center">
                                <div className="text-[2rem]">💬</div>
                                <div className="text-xs mt-1">Slack Alert</div>
                            </div>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg">
                            <h4 className="text-[#FFD166] mb-2 font-montserrat uppercase font-bold">HOW TO BUILD IT:</h4>
                            <ol className="text-sm pl-5 list-decimal leading-relaxed">
                                <li><strong>Trigger:</strong> New Typeform or Website submission.</li>
                                <li><strong>Action 1 (AI):</strong> Send text to ChatGPT API. Prompt: "Analyze this lead request. Is it urgent? Draft a polite email reply."</li>
                                <li><strong>Action 2 (Internal):</strong> Post summary to Slack channel #sales-leads.</li>
                                <li><strong>Action 3 (Draft):</strong> Create a <em>draft</em> email in Gmail for you to review and hit send.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="mt-8 text-center animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <span className="text-sm text-[#666]">Lift: Reduces response time from hours to minutes.</span>
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FFD166] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 05</div>
                </div>
            </div>

            {/* PAGE 06: TOOL SPOTLIGHT */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        THE MOMENTUM STACK
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#FFD166] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        TOOLS THAT "TALK"
                    </h2>
                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        We are moving past "chatbots." These tools integrate with your existing business data.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Tool 1 */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2">Zapier / Make</div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">THE GLUE</div>
                            <p className="text-[0.85rem] mt-2 text-[#4A4A5E]">Essential for Momentum. It connects your email, CRM, and forms so data flows automatically.</p>
                        </div>

                        {/* Tool 2 */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2">Fireflies.ai</div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">MEETING INTEL</div>
                            <p className="text-[0.85rem] mt-2 text-[#4A4A5E]">Doesn't just record. It logs action items directly into your project management tools (Asana/Trello).</p>
                        </div>

                        {/* Tool 3 */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2">Descript</div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">MEDIA EDITING</div>
                            <p className="text-[0.85rem] mt-2 text-[#4A4A5E]">Edit video by editing text. The fastest way to repurpose content for marketing teams.</p>
                        </div>

                        {/* Tool 4 */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2">Perplexity</div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">RESEARCH</div>
                            <p className="text-[0.85rem] mt-2 text-[#4A4A5E]">Replaces Google for deep research. "Find me 5 competitors in Ohio and list their pricing."</p>
                        </div>
                    </div>

                    <div className="mt-6 text-[0.85rem] text-[#666] italic animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">
                        *Note: These tools were selected for their ability to integrate into workflows, not just standalone utility.
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FFD166] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 06</div>
                </div>
            </div>

            {/* PAGE 07: CHECKLIST */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        IMPLEMENTATION
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#FFD166] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        ARE YOU READY FOR MOMENTUM?
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        Don't try to automate a mess. Ensure you have these basics before building complex workflows.
                    </p>

                    <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg border-l-4 border-[#ddd] hover:border-[#FFD166] transition-colors duration-300 animate-hidden opacity-0 translate-y-[30px] ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        <div className="w-6 h-6 border-2 border-[#1B1B3A] rounded"></div>
                        <div>
                            <strong>Defined Process:</strong> You can write down the steps of the task on paper. (AI cannot guess your process).
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg border-l-4 border-[#ddd] hover:border-[#FFD166] transition-colors duration-300 animate-hidden opacity-0 translate-y-[30px] ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <div className="w-6 h-6 border-2 border-[#1B1B3A] rounded"></div>
                        <div>
                            <strong>Digital Inputs:</strong> Your data (leads, orders) arrives digitally, not on paper or phone calls.
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg border-l-4 border-[#ddd] hover:border-[#FFD166] transition-colors duration-300 animate-hidden opacity-0 translate-y-[30px] ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">
                        <div className="w-6 h-6 border-2 border-[#1B1B3A] rounded"></div>
                        <div>
                            <strong>High Volume / Repetition:</strong> You do this task at least 5x a week. (Don't automate things you do once a month).
                        </div>
                    </div>

                    <h4 className="mt-8 text-[#1C77C3] font-montserrat uppercase font-bold animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">WHERE TO START?</h4>
                    <p className="animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500 text-[#4A4A5E]">Pick the <strong>"Boring Bottleneck."</strong> What is the one task you dread every Friday? Automate that first.</p>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FFD166] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 07</div>
                </div>
            </div>

            {/* PAGE 08: CONCLUSION (Updated CTAs) */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-[#1B1B3A] text-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-[60px] h-[60px] border-[4px] border-[#FFD166] rounded-tl-[50%] rounded-tr-[50%] rounded-br-none rounded-bl-[50%] -rotate-45 mb-8 shadow-[0_0_30px_rgba(255,209,102,0.3)] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"></div>

                    <h2 className="text-[3rem] mb-4 font-montserrat uppercase font-bold animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        KEEP MOVING.
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] max-w-[600px] mx-auto mb-12 text-[#D1D5DB] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        You have ignited the spark. You are building momentum. <br />
                        When your systems are fully connected, you will be ready for the final stage: <strong>Mastery.</strong>
                    </p>

                    {/* NEW CTA CARDS CONTAINER */}
                    <div className="w-full max-w-[550px] flex flex-col gap-4 mb-8 animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">

                        {/* CTA 1: Momentum Letter */}
                        <a href="#" className="bg-[#121225] border border-[#2A2A45] rounded-xl p-5 flex items-center justify-between transition-all duration-300 hover:border-[#1C77C3] hover:-translate-y-0.5 hover:bg-[#1F1F35] group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-xl">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-white text-[1.1rem] mb-1 font-bold">The "Momentum" Letter</h4>
                                    <p className="text-[#8899A6] text-[0.85rem] m-0">Get weekly workflows in your inbox.</p>
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
                                    <p className="text-[#8899A6] text-[0.85rem] m-0">Custom implementation for your team.</p>
                                </div>
                            </div>
                            <div className="bg-[#FFD166] text-[#1B1B3A] px-5 py-2 rounded-md font-bold text-[0.9rem] uppercase">Book</div>
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

export default MomentumPlaybook;
