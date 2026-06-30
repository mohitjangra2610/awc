type DateInput = string | null | undefined;

const ISO_NAIVE_PATTERN = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/;

export function parseDate(date: DateInput): Date | null {
  if (date == null || typeof date !== "string") {
    return null;
  }

  const trimmed = date.trim();
  if (!trimmed) {
    return null;
  }

  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }

  if (ISO_NAIVE_PATTERN.test(trimmed)) {
    const withZ = new Date(trimmed + "Z");
    if (!isNaN(withZ.getTime())) {
      return withZ;
    }
  }

  return null;
}

export function getEventTimestamp(date: DateInput): number {
  const parsed = parseDate(date);
  if (!parsed) {
    return Number.MAX_SAFE_INTEGER;
  }
  return parsed.getTime();
}

export function formatDate(
  date: DateInput,
  options?: Intl.DateTimeFormatOptions & { locale?: string },
): string {
  const parsed = parseDate(date);
  if (!parsed) {
    return "Date TBA";
  }

  const { locale = "en-IN", ...formatOptions } = options ?? {};

  try {
    return new Intl.DateTimeFormat(locale, formatOptions).format(parsed);
  } catch {
    return "Date TBA";
  }
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatDateRange(
  startAt: DateInput,
  endAt: DateInput,
): string {
  const start = parseDate(startAt);
  if (!start) {
    return "Date TBA";
  }

  const end = parseDate(endAt);

  if (!end) {
    return formatDate(startAt);
  }

  if (sameDay(start, end)) {
    const dayPart = new Intl.DateTimeFormat("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(start);

    const startTime = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(start);

    const endTime = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(end);

    return `${dayPart}, ${startTime} - ${endTime}`;
  }

  const startFormatted = formatDate(startAt, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const endFormatted = formatDate(endAt, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${startFormatted} - ${endFormatted}`;
}
