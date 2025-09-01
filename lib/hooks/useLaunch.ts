import { useQuery } from "@tanstack/react-query";
import type { Launch, Rocket, Launchpad } from "@/lib/types/launches";
import { fetchLaunch, fetchLaunchpad, fetchRocket } from "../api/launches";

interface UseLaunchReturn {
  data: {
    launch: Launch | null;
    rocket: Rocket | null;
    launchpad: Launchpad | null;
  };
  loading: boolean;
  error: string | null;
}

export function useLaunch({ id }: { id: string }): UseLaunchReturn {
  // Fetch launch data first
  const launchQuery = useQuery({
    queryKey: ["launch", id],
    queryFn: () => fetchLaunch({ id }),
    enabled: !!id,
    retry: (failureCount, error: Error & { status: number }) => {
      // Retry only for 429 or 5xx errors
      if (error.status === 429 || (error.status >= 500 && error.status < 600)) {
        return failureCount < 5; // max 5 retries
      }
      return false; // don't retry other errors
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  });

  // Fetch rocket data based on launch data
  const rocketQuery = useQuery({
    queryKey: ["rocket", launchQuery.data?.rocket],
    queryFn: () => fetchRocket(launchQuery.data!.rocket),
    enabled: !!launchQuery.data?.rocket,
    retry: (failureCount, error: Error & { status: number }) => {
      // Retry only for 429 or 5xx errors
      if (error.status === 429 || (error.status >= 500 && error.status < 600)) {
        return failureCount < 5; // max 5 retries
      }
      return false; // don't retry other errors
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  });

  // Fetch launchpad data based on launch data
  const launchpadQuery = useQuery({
    queryKey: ["launchpad", launchQuery.data?.launchpad],
    queryFn: () => fetchLaunchpad(launchQuery.data!.launchpad),
    enabled: !!launchQuery.data?.launchpad,
    retry: (failureCount, error: Error & { status: number }) => {
      // Retry only for 429 or 5xx errors
      if (error.status === 429 || (error.status >= 500 && error.status < 600)) {
        return failureCount < 5; // max 5 retries
      }
      return false; // don't retry other errors
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  });

  const loading =
    launchQuery.isLoading ||
    (launchQuery.data?.rocket && rocketQuery.isLoading) ||
    (launchQuery.data?.launchpad && launchpadQuery.isLoading);

  const error =
    launchQuery.error?.message ||
    rocketQuery.error?.message ||
    launchpadQuery.error?.message ||
    null;

  return {
    data: {
      launch: launchQuery.data || null,
      rocket: rocketQuery.data || null,
      launchpad: launchpadQuery.data || null,
    },
    loading: !!loading,
    error,
  };
}
