import { getEvents } from "@/lib/apicalls/events";
import { EventsClientSection } from "./EventSection";

export async function EventsUI() {
  const events = await getEvents({ source: "server" });

  if (events.length === 0) {
    return null;
  }

  return <EventsClientSection initialEvents={events} />;
}