'use client';

import { getStats, type Stat } from '@/lib/apicalls/stats';
import { useEffect, useState } from 'react';

interface UseStatsReturn {
  stats: Stat[];
  loading: boolean;
  error: string | null;
}

export function useStats(): UseStatsReturn {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    async function loadStats() {
      try {
        setLoading(true);
        setError(null);

        const data = await getStats({
          signal: controller.signal,
          source: 'client',
        });

        if (mounted) {
          setStats(data);
        }
      } catch (err) {
        if (mounted && (err as Error).name !== 'AbortError') {
          setError('Failed to load stats');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return {
    stats,
    loading,
    error,
  };
}
