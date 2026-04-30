"use client";

import { useMemo } from "react";
import type { ServiceItem } from "@/type/supabase";

interface UseServicesOptions {
  readonly initialServices?: readonly ServiceItem[];
}

interface UseServicesReturn {
  readonly services: ServiceItem[];
  readonly activeServices: ServiceItem[];
  readonly hasServices: boolean;
}

function normalizeServices(services: readonly ServiceItem[]): ServiceItem[] {
  return [...services]
    .filter((service) => service.is_active)
    .sort((left, right) => left.display_order - right.display_order);
}

export function useServices(
  options: UseServicesOptions = {},
): UseServicesReturn {
  const { initialServices = [] } = options;

  const services = useMemo(
    () => normalizeServices(initialServices),
    [initialServices],
  );

  return {
    services,
    activeServices: services,
    hasServices: services.length > 0,
  };
}