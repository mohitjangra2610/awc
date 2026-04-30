"use client";

import { useMemo } from "react";
import type { Partner } from "@/type/supabase";

interface UsePartnersOptions {
  readonly initialPartners?: readonly Partner[];
}

interface UsePartnersReturn {
  readonly partners: Partner[];
  readonly activePartners: Partner[];
  readonly hasPartners: boolean;
}

function normalizePartners(partners: readonly Partner[]): Partner[] {
  return [...partners]
    .filter((partner) => partner.is_active)
    .sort((left, right) => left.display_order - right.display_order);
}

export function usePartners(
  options: UsePartnersOptions = {}
): UsePartnersReturn {
  const { initialPartners = [] } = options;

  const partners = useMemo(
    () => normalizePartners(initialPartners),
    [initialPartners]
  );

  return {
    partners,
    activePartners: partners,
    hasPartners: partners.length > 0,
  };
}