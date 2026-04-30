'use client';

import { useStats } from '@/hooks/useStats';
import StatsHorizontal from './StatsHorizontal';
import StatsSection from './stats_section';

export default function Stats() {
  const { stats, loading, error } = useStats();

  return (
    <div className="w-full space-y-4">
      {/* Desktop Stats (Horizontal) */}
      <div className="hidden md:block">
        <StatsHorizontal stats={stats} loading={loading} error={error} />
      </div>

      {/* Mobile Stats (Grid) */}
      <div className="md:hidden">
        <StatsSection stats={stats} loading={loading} error={error} />
      </div>
    </div>
  );
}