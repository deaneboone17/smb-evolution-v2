import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Mail, Handshake } from "lucide-react";

const SparkPlaybook = () => {
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
                className="fixed bottom-8 right-8 bg-[#1B1B3A] text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.3)] cursor-pointer z-[9999] transition-transform hover:scale-105 hover:bg-[#121225] border-2 border-[#FF6B6B] font-semibold text-sm no-print"
            >
                <Download className="w-5 h-5" />
                <span>Save to PDF</span>
            </button>

            {/* PAGE 01: COVER */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-[#1B1B3A] text-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="flex-1 flex flex-col justify-center items-start">
                    <div className="w-[100px] h-[100px] border-[8px] border-[#FF6B6B] rounded-tl-[50%] rounded-tr-[50%] rounded-br-none rounded-bl-[50%] -rotate-45 mb-8 shadow-[0_0_30px_rgba(255,107,107,0.3)] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"></div>
                    <span className="text-sm font-bold tracking-[0.2em] text-[#FF6B6B] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        SMB EVOLUTION STARTER GUIDE
                    </span>
                    <h1 className="text-[3.5rem] leading-[1.1] font-black mb-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        AI QUICK WINS<br />
                        <span className="text-[#FF6B6B]">SPARK EDITION</span>
                    </h1>
                    <p className="text-2xl leading-relaxed max-w-[600px] text-[#D1D5DB] mb-6 animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        From "Overwhelmed" to "Equipped."<br />
                        Your first practical steps into Artificial Intelligence.
                    </p>
                    <div className="mt-12 border-t border-white/20 pt-4 w-full animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <span className="font-montserrat font-bold text-white">PHASE 1: SPARK</span>
                        <br />
                        <span className="text-[#888]">Next Up: The Momentum Edition</span>
                    </div>
                </div>
                <div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FF6B6B] rounded-full"></div>
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
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#FF6B6B] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        IGNITE YOUR EFFICIENCY
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        You’ve heard the hype. But where do you start?
                    </p>
                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        <strong>The Spark Phase</strong> isn't about firing your staff or buying $10k software. It is about equipping your team with "Super Tools" to reclaim 5-10 hours a week from repetitive drudgery.
                    </p>

                    <div className="flex justify-between items-center mt-8 p-4 bg-[#f8f9fa] rounded-lg animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        <div className="text-center flex-1 opacity-100 scale-110 transform transition-all">
                            <h4 className="text-[#1B1B3A] mb-2 font-montserrat uppercase text-[1.4rem] text-[#FF6B6B]">SPARK</h4>
                            <div className="text-sm font-bold">Quick Wins<br />Individual Tools</div>
                        </div>
                        <div className="text-2xl text-[#1C77C3]">→</div>
                        <div className="text-center flex-1 opacity-50 scale-90 transform transition-all">
                            <h4 className="text-[#1B1B3A] mb-2 font-montserrat uppercase">MOMENTUM</h4>
                            <div className="text-xs">Connected Systems<br />Workflows</div>
                        </div>
                        <div className="text-2xl text-[#1C77C3]">→</div>
                        <div className="text-center flex-1 opacity-50 scale-90 transform transition-all">
                            <h4 className="text-[#1B1B3A] mb-2 font-montserrat uppercase">MASTERY</h4>
                            <div className="text-xs">Full Autonomy<br />Custom AI</div>
                        </div>
                    </div>

                    <div className="mt-12 bg-[#1B1B3A] text-white p-6 rounded-lg animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <strong>THE GOAL:</strong> Don't try to change your whole business at once. Just light a spark. Fix the "Friday Bottleneck" first.
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FF6B6B] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 02</div>
                </div>
            </div>

            {/* PAGE 03: QUICK WIN 1 (WRITING) */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        QUICK WIN #1: COMMUNICATION
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#FF6B6B] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        THE 24/7 JUNIOR ASSISTANT
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        <strong>The Pain:</strong> Staring at a blinking cursor. Writing difficult emails, newsletters, or policy updates from scratch.
                    </p>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-4 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2 flex items-center gap-2">
                            <span className="text-2xl">✍️</span> The Spark Fix
                        </div>
                        <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E]">Never start from a blank page again. Treat AI like an eager intern, not a search engine.</p>
                        <div className="bg-[#F3F4F6] p-4 rounded-lg border border-dashed border-[#1C77C3] text-center mt-4">
                            <strong>Input (The Prompt):</strong><br />
                            "Act as a professional copywriter. Draft a polite but firm email to a client explaining that our prices are increasing by 10% next month due to supply costs."
                            <br />⬇️<br />
                            <strong>Output (The Spark):</strong><br />
                            A perfectly formatted draft in 5 seconds. You edit 10% of it, and hit send.
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8 animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <div className="flex-1">
                            <h4 className="text-[#1C77C3] font-montserrat uppercase font-bold">TOOLS TO USE</h4>
                            <ul className="list-none mt-2 text-sm">
                                <li>• ChatGPT (OpenAI)</li>
                                <li>• Claude (Anthropic)</li>
                            </ul>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-[#FF6B6B] font-montserrat uppercase font-bold">THE RESULT</h4>
                            <p className="text-sm mt-2">Reduces writing time by 80%.<br />Improves clarity and tone.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FF6B6B] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 03</div>
                </div>
            </div>

            {/* PAGE 04: QUICK WIN 2 (VISUALS) */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        QUICK WIN #2: CREATIVE ASSETS
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#FF6B6B] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        UNLIMITED CREATIVE STUDIO
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        <strong>The Pain:</strong> Using generic stock photos that look fake, or needing a logo for a new product launch yesterday.
                    </p>

                    <div className="flex items-start gap-6 mb-8 relative animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        <div className="bg-[#1C77C3] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold font-montserrat flex-shrink-0 z-10">1</div>
                        <div className="absolute left-[20px] top-[40px] bottom-[-30px] w-[2px] bg-[linear-gradient(to_bottom,#1C77C3_50%,transparent_50%)] bg-[length:2px_10px] z-0"></div>
                        <div>
                            <h4 className="font-montserrat uppercase font-bold">Describe It</h4>
                            <p className="text-sm mb-0 text-[#4A4A5E]">Instead of searching, describe what you need. "A futuristic coffee shop with neon lights, cinematic lighting."</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 mb-8 relative animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <div className="bg-[#1C77C3] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold font-montserrat flex-shrink-0 z-10">2</div>
                        <div className="absolute left-[20px] top-[40px] bottom-[-30px] w-[2px] bg-[linear-gradient(to_bottom,#1C77C3_50%,transparent_50%)] bg-[length:2px_10px] z-0"></div>
                        <div>
                            <h4 className="font-montserrat uppercase font-bold">Generate & Refine</h4>
                            <p className="text-sm mb-0 text-[#4A4A5E]"><strong>Tool: Midjourney.</strong> It creates 4 high-end art options. Pick one. "Make it brighter."</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 mb-8 relative animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">
                        <div className="bg-[#1C77C3] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold font-montserrat flex-shrink-0 z-10">3</div>
                        <div>
                            <h4 className="font-montserrat uppercase font-bold">Brand It (Bonus)</h4>
                            <p className="text-sm mb-0 text-[#4A4A5E]"><strong>Tool: Logome.ai.</strong> Need a logo or brand kit fast? Type your company name and get a full identity package in minutes.</p>
                        </div>
                    </div>

                    <div className="bg-[#FFF5F5] border border-gray-200 rounded-xl p-6 shadow-sm mb-4 border-l-4 border-l-[#FF6B6B] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">
                        <strong>💡 PRO TIP:</strong> Don't just ask for "an image." Ask for a specific style: "In the style of a watercolor painting" or "Isometric 3D icon."
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FF6B6B] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 04</div>
                </div>
            </div>

            {/* PAGE 05: QUICK WIN 3 (MEETINGS) */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        QUICK WIN #3: OPERATIONS
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#FF6B6B] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        THE PERFECT MEMORY
                    </h2>
                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        How much detail is lost because you were trying to listen and type at the same time? Stop being the stenographer.
                    </p>

                    <div className="bg-[#1B1B3A] text-white p-8 rounded-xl relative animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        {/* Visual Flow */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-center">
                                <div className="text-[2rem]">🗣️</div>
                                <div className="text-xs mt-1">The Meeting</div>
                            </div>
                            <div className="h-[2px] flex-1 bg-[#555] mx-2"></div>
                            <div className="text-center">
                                <div className="text-[2rem] text-[#FF6B6B]">🤖</div>
                                <div className="text-xs mt-1">AI Joiner</div>
                            </div>
                            <div className="h-[2px] flex-1 bg-[#555] mx-2"></div>
                            <div className="text-center">
                                <div className="text-[2rem]">📄</div>
                                <div className="text-xs mt-1">Summary</div>
                            </div>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg">
                            <h4 className="text-[#FF6B6B] mb-2 font-montserrat uppercase font-bold">THE WORKFLOW:</h4>
                            <ol className="text-sm pl-5 list-decimal leading-relaxed">
                                <li><strong>Invite:</strong> Add "fred@fireflies.ai" (or similar) to your calendar invite.</li>
                                <li><strong>Record:</strong> The bot joins the Zoom/Teams call silently.</li>
                                <li><strong>Recap:</strong> 5 minutes after the call, you get an email with a transcript, key decisions, and a list of action items.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="mt-8 text-center animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <span className="text-sm text-[#666]">Tools: Fireflies.ai, Otter.ai, Zoom AI Companion.</span>
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FF6B6B] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 05</div>
                </div>
            </div>

            {/* PAGE 06: TOOL SPOTLIGHT */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        THE SPARK STACK
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#FF6B6B] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        ESSENTIAL TOOLS
                    </h2>
                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        You don't need 100 tools. You need these 4 basics to cover text, image, and organization.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Tool 1 */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2">ChatGPT Plus</div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">THE BRAIN</div>
                            <p className="text-[0.85rem] mt-2 text-[#4A4A5E]">The gold standard for reasoning, writing, and coding assistance. Worth the $20/mo.</p>
                        </div>

                        {/* Tool 2 */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2">Midjourney</div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">THE ARTIST</div>
                            <p className="text-[0.85rem] mt-2 text-[#4A4A5E]">Best-in-class image generation. Operated via Discord (for now). Unbeatable realism.</p>
                        </div>

                        {/* Tool 3 */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2">Logome.ai</div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">THE BRAND</div>
                            <p className="text-[0.85rem] mt-2 text-[#4A4A5E]">The easiest way to generate a professional logo and brand kit in minutes. Great for new projects.</p>
                        </div>

                        {/* Tool 4 */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-0 border-l-4 border-l-[#1C77C3] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                            <div className="text-[#1B1B3A] font-bold text-[1.2rem] mb-2">Perplexity</div>
                            <div className="bg-[#1B1B3A] text-white px-2 py-0.5 rounded text-[0.7rem] uppercase inline-block">THE RESEARCHER</div>
                            <p className="text-[0.85rem] mt-2 text-[#4A4A5E]">Like Google on steroids. It gives you the answer, not a list of links, and cites its sources.</p>
                        </div>
                    </div>

                    <div className="mt-6 text-[0.85rem] text-[#666] italic animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">
                        *Note: Start with free versions, but the paid versions are usually 10x more capable.
                    </div>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FF6B6B] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 06</div>
                </div>
            </div>

            {/* PAGE 07: CHECKLIST */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper">
                    <span className="text-sm font-bold tracking-[0.2em] text-[#1C77C3] mb-2 block uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        TAKE ACTION
                    </span>
                    <h2 className="text-[2.5rem] text-[#1B1B3A] mb-8 border-l-[6px] border-[#FF6B6B] pl-6 font-montserrat uppercase animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        THE FRIDAY CHALLENGE
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] mb-6 text-[#4A4A5E] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        Take one hour this Friday. If you find yourself doing these manually, apply a "Spark" tool immediately.
                    </p>

                    <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg border-l-4 border-[#ddd] hover:border-[#FF6B6B] transition-colors duration-300 animate-hidden opacity-0 translate-y-[30px] ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">
                        <div className="w-6 h-6 border-2 border-[#1B1B3A] rounded"></div>
                        <div>
                            <strong>Email Repetition:</strong> Typing the same reply twice? <br />
                            <span className="text-[0.85rem] text-[#666]">Solution: Save it in ChatGPT or Grammarly.</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg border-l-4 border-[#ddd] hover:border-[#FF6B6B] transition-colors duration-300 animate-hidden opacity-0 translate-y-[30px] ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-400">
                        <div className="w-6 h-6 border-2 border-[#1B1B3A] rounded"></div>
                        <div>
                            <strong>Meeting Notes:</strong> Frantically typing during a call? <br />
                            <span className="text-[0.85rem] text-[#666]">Solution: Turn on Fireflies/Otter.</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg border-l-4 border-[#ddd] hover:border-[#FF6B6B] transition-colors duration-300 animate-hidden opacity-0 translate-y-[30px] ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">
                        <div className="w-6 h-6 border-2 border-[#1B1B3A] rounded"></div>
                        <div>
                            <strong>Data Entry:</strong> Copying names from email to Excel? <br />
                            <span className="text-[0.85rem] text-[#666]">Solution: Paste the email into ChatGPT and ask for a "CSV format."</span>
                        </div>
                    </div>

                    <h4 className="mt-8 text-[#1C77C3] font-montserrat uppercase font-bold animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500">THE RULE OF 3</h4>
                    <p className="animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-500 text-[#4A4A5E]">If you do a digital task more than 3 times a day, there is a 99% chance AI can do it for you.</p>
                </div>

                <div className="mt-auto border-t border-black/10 pt-4 flex justify-between items-center text-sm text-[#888]">
                    <div className="font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#FF6B6B] rounded-full"></div>
                        SMB EVOLUTION
                    </div>
                    <div>PG 07</div>
                </div>
            </div>

            {/* PAGE 08: CONCLUSION (UPDATED CTAs) */}
            <div className="infographic-panel w-full max-w-[900px] mx-auto bg-[#1B1B3A] text-white min-h-screen relative p-12 md:p-16 flex flex-col justify-between border-b-2 border-[#E8EBF0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="content-wrapper flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-[60px] h-[60px] border-[4px] border-[#FF6B6B] rounded-tl-[50%] rounded-tr-[50%] rounded-br-none rounded-bl-[50%] -rotate-45 mb-8 shadow-[0_0_30px_rgba(255,107,107,0.3)] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"></div>

                    <h2 className="text-[3rem] mb-4 font-montserrat uppercase font-bold animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                        YOU ARE IGNITED.
                    </h2>

                    <p className="text-[1.1rem] leading-[1.6] max-w-[600px] mx-auto mb-12 text-[#D1D5DB] animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-200">
                        You have moved from "Curious" to "Capable." <br />
                        The next phase is <strong>Momentum</strong>, where we stop using tools individually and start connecting them into systems.
                    </p>

                    {/* NEW CTA CARDS CONTAINER */}
                    <div className="w-full max-w-[550px] flex flex-col gap-4 mb-8 animate-hidden opacity-0 translate-y-[30px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300">

                        {/* CTA 1: Spark Letter */}
                        <a href="#" className="bg-[#121225] border border-[#2A2A45] rounded-xl p-5 flex items-center justify-between transition-all duration-300 hover:border-[#1C77C3] hover:-translate-y-0.5 hover:bg-[#1F1F35] group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-xl">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-white text-[1.1rem] mb-1 font-bold">The "Spark" Letter</h4>
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
                            <div className="bg-[#FF6B6B] text-white px-5 py-2 rounded-md font-bold text-[0.9rem] uppercase">Book</div>
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

export default SparkPlaybook;
