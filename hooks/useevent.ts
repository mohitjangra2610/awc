"use client";

import { EventItem, EventStatus, EventType } from "@/type/supabase";
import { useCallback, useMemo, useState } from "react";

type EventFilter = "all" | EventType;

interface UseEventsOptions {
  initialEvents?: EventItem[];
  initialFilter?: EventFilter;
}

interface UseEventsReturn {
  events: EventItem[];
  filteredEvents: EventItem[];
  ongoingEvents: EventItem[];
  upcomingEvents: EventItem[];
  onlineEvents: EventItem[];
  offlineEvents: EventItem[];
  selectedFilter: EventFilter;
  hasEvents: boolean;
  setSelectedFilter: (filter: EventFilter) => void;
  resetFilter: () => void;
}

function getEventTimestamp(date: string): number {
  const timestamp = new Date(date).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function isVisibleHomeEvent(status: EventStatus): boolean {
  return status === "ongoing" || status === "upcoming";
}

function normalizeEvents(events: EventItem[]): EventItem[] {
  return events
    .filter((event) => event.is_active)
    .filter((event) => isVisibleHomeEvent(event.status))
    .sort(
      (left, right) =>
        left.display_order - right.display_order ||
        getEventTimestamp(left.start_at) - getEventTimestamp(right.start_at)
    );
}

export function useEvents(options: UseEventsOptions = {}): UseEventsReturn {
  const { initialEvents = [], initialFilter = "all" } = options;

  const [selectedFilter, setSelectedFilter] =
    useState<EventFilter>(initialFilter);

  const events = useMemo(() => normalizeEvents(initialEvents), [initialEvents]);

  const ongoingEvents = useMemo(
    () => events.filter((event) => event.status === "ongoing"),
    [events]
  );

  const upcomingEvents = useMemo(
    () => events.filter((event) => event.status === "upcoming"),
    [events]
  );

  const onlineEvents = useMemo(
    () => events.filter((event) => event.event_type === "online"),
    [events]
  );

  const offlineEvents = useMemo(
    () => events.filter((event) => event.event_type === "offline"),
    [events]
  );

  const filteredEvents = useMemo(() => {
    if (selectedFilter === "all") {
      return events;
    }

    return events.filter((event) => event.event_type === selectedFilter);
  }, [events, selectedFilter]);

  const resetFilter = useCallback(() => {
    setSelectedFilter("all");
  }, []);

  return {
    events,
    filteredEvents,
    ongoingEvents,
    upcomingEvents,
    onlineEvents,
    offlineEvents,
    selectedFilter,
    hasEvents: events.length > 0,
    setSelectedFilter,
    resetFilter,
  };
}