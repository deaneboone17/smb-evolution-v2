import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ContentCardProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    link?: string;
    tag?: string;
    className?: string;
}

export const ContentCard = ({
    title,
    description,
    icon: Icon,
    link,
    tag,
    className,
}: ContentCardProps) => {
    const CardContent = (
        <div
            className={cn(
                "bg-white dark:bg-white/5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-8 h-full transition-transform duration-200 hover:scale-105 border border-transparent hover:border-primary-blue/10",
                className
            )}
        >
            <div className="space-y-4">
                {Icon && <Icon className="h-12 w-12 text-primary-blue" />}

                {tag && (
                    <span className="inline-block px-3 py-1 bg-primary-blue/10 text-primary-blue text-xs font-space-grotesk font-semibold rounded-full">
                        {tag}
                    </span>
                )}

                <h3 className="text-2xl font-montserrat font-bold text-foreground">
                    {title}
                </h3>

                <p className="text-muted-foreground font-inter leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );

    if (link) {
        return (
            <Link to={link} className="block h-full">
                {CardContent}
            </Link>
        );
    }

    return CardContent;
};
