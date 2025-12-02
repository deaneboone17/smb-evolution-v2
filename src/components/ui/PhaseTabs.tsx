import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Phase {
    id: string;
    slug: string;
    title: string;
}

interface PhaseTabsProps {
    phases?: Phase[]; // Made optional as we hardcode the tabs now
    activePhase: string;
    onPhaseChange: (slug: string) => void;
    className?: string;
}

export const PhaseTabs = ({ activePhase, onPhaseChange, className }: PhaseTabsProps) => {
    const tabs = [
        { id: 'all', slug: 'all', title: 'All' },
        { id: 'spark', slug: 'spark', title: 'Spark' },
        { id: 'momentum', slug: 'momentum', title: 'Momentum' },
        { id: 'mastery', slug: 'mastery', title: 'Mastery' },
    ];

    const getTabStyle = (slug: string) => {
        const baseStyle = "font-space-grotesk bg-transparent border-b-2 px-6 py-2 transition-colors duration-200 text-lg font-medium rounded-none hover:bg-transparent";
        const inactiveStyle = "border-transparent text-gray-400 hover:text-gray-600";

        if (activePhase !== slug) return cn(baseStyle, inactiveStyle);

        switch (slug) {
            case 'spark':
                return cn(baseStyle, "text-[#FF6B6B] border-[#FF6B6B]");
            case 'momentum':
                return cn(baseStyle, "text-[#FFD166] border-[#FFD166]");
            case 'mastery':
                return cn(baseStyle, "text-[#06D6A0] border-[#06D6A0]");
            default: // 'all'
                return cn(baseStyle, "text-[#1B1B3A] border-[#1B1B3A]");
        }
    };

    return (
        <div className={cn("w-full overflow-x-auto no-scrollbar px-4 flex justify-start md:justify-center gap-6 md:gap-8 mb-8", className)}>
            {tabs.map((tab) => (
                <Button
                    key={tab.id}
                    variant="ghost"
                    onClick={() => onPhaseChange(tab.slug)}
                    className={cn(
                        getTabStyle(tab.slug),
                        "flex-shrink-0 text-base md:text-lg"
                    )}
                >
                    {tab.title}
                </Button>
            ))}
        </div>
    );
};
