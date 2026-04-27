import { getStats, type Stat } from '@/lib/apicalls/stats';
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
} from 'lucide-react';

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

export default async function StatsHorizontal() {
  let stats: Stat[] = [];
  let error: string | null = null;

  try {
    stats = await getStats();
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stats';
    error = errorMessage;
    console.error('Error fetching stats in StatsHorizontal:', errorMessage);
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-600">Unable to load statistics. Please try again later.</p>
        {process.env.NODE_ENV === 'development' && (
          <p className="text-xs text-red-500 mt-2">Debug: {error}</p>
        )}
      </div>
    );
  }

  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between gap-6">
      {stats.map((item) => {
        const iconKey = item.icon?.toLowerCase().trim() || 'file';
        const Icon = iconMap[iconKey] || FileText;

        return (
          <div key={item.id} className="flex-1 text-start">
            <div className="flex items-center justify-center text-gray-900 p-2 rounded-md bg-blue-100 w-12 h-12">
              <Icon className="w-6 h-6" />
            </div>

            <h3 className="text-lg md:text-lg font-bold text-gray-800 mt-4">
              {item.number}
            </h3>

            <p className="text-sm text-gray-600 font-medium">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}