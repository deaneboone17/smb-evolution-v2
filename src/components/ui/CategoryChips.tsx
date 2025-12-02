import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Category {
    label: string;
    value: string;
}

interface CategoryChipsProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (value: string) => void;
    className?: string;
}

export const CategoryChips = ({ categories, activeCategory, onCategoryChange, className }: CategoryChipsProps) => {
    // Ensure 'All' is present and first
    const allCategory = { label: 'All', value: 'all' };
    const filteredCategories = categories.filter(c => c.value !== 'all');
    const displayCategories = [allCategory, ...filteredCategories];

    return (
        <div className={cn("flex flex-wrap justify-center gap-2 md:gap-3 px-4", className)}>
            {displayCategories.map((cat) => (
                <Button
                    key={cat.value}
                    variant="ghost"
                    size="sm"
                    onClick={() => onCategoryChange(cat.value)}
                    className={cn(
                        "rounded-full px-5 py-2 text-sm font-medium transition-all h-auto",
                        activeCategory === cat.value
                            ? "bg-[#1C77C3] text-white shadow-md hover:bg-[#1C77C3]/90 hover:text-white"
                            : "bg-transparent border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    )}
                >
                    {cat.label}
                </Button>
            ))}
        </div>
    );
};
