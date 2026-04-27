import { getStats, type Stat } from "@/lib/apicalls/stats";
import {
  FileText,
  Users,
  Star,
  Briefcase,
  Globe,
  Trophy,
  Heart,
  Shield,
  Zap,
  BarChart3,
  Wallet,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  file: FileText,
  users: Users,
  star: Star,
  briefcase: Briefcase,
  globe: Globe,
  trophy: Trophy,
  heart: Heart,
  shield: Shield,
  zap: Zap,
  chart: BarChart3,
  wallet: Wallet,
};

export default async function StatsSection() {
  let stats: Stat[] = [];
  let error: string | null = null;

  try {
    stats = await getStats();
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch stats";
    error = errorMessage;
    console.error("Error fetching stats in StatsSection:", errorMessage);
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-red-600">Unable to load statistics. Please try again later.</p>
          {process.env.NODE_ENV === "development" && (
            <p className="text-xs text-red-500 mt-2">Debug: {error}</p>
          )}
        </div>
      </section>
    );
  }

  if (!stats || stats.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-gray-500">No stats available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-between gap-4 md:gap-6 w-full">
        {stats.map((item) => {
          const iconKey = item.icon?.toLowerCase().trim() || "file";
          const Icon = iconMap[iconKey] || FileText;

          return (
            <div
              key={item.id}
              className="p-4 md:p-6 flex flex-col items-start w-full md:flex-1"
            >
              <div className="flex items-center justify-center text-gray-900 p-2 rounded-md bg-blue-100 w-12 h-12">
                <Icon className="w-6 h-6 md:w-6 md:h-6" />
              </div>

              <h3 className="text-lg md:text-xs font-bold text-gray-800 mt-2 wrap-break-words">
                {item.number}
              </h3>

              <p className="mt-2 text-sm md:text-base text-gray-600 font-medium line-clamp-2">
                {item.title}
              </p>  

              {item.description && (
                <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}