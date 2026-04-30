import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ExternalLink,
  MapPin,
  UserRound,
  Video,
} from "lucide-react";
import { notFound } from "next/navigation";

import { getEvents } from "@/lib/apicalls/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EventDetailPageProps {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

function formatEventDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

export default async function EventDetailPage({
  params,
}: Readonly<EventDetailPageProps>) {
  const { slug } = await params;

  const events = await getEvents({ source: "server" });
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  const isOnline = event.event_type === "online";

  let locationText = "Location will be updated soon";

  if (isOnline) {
    locationText = event.online_platform || "Online Event";
  } else if (event.event_addresses) {
    locationText = `${event.event_addresses.address_line_1}, ${event.event_addresses.city}, ${event.event_addresses.state}, ${event.event_addresses.country}`;
  }

  const heroImage =
    event.cover_image_url ||
    event.event_gallery[0]?.image_url ||
    "https://placehold.co/1200x650.png";

  return (
    <main className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
        <section className="space-y-8">
          <div className="overflow-hidden rounded-3xl border border-[#EAECF0] bg-[#F9FAFB]">
            <Image
              src={heroImage}
              alt={event.event_name}
              width={1200}
              height={650}
              className="h-[260px] w-full object-cover sm:h-[420px]"
              priority
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Event Detail
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-black sm:text-5xl">
              {event.event_name}
            </h1>

            <p className="text-lg leading-8 text-[#344054]">
              {event.short_description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="rounded-2xl border-[#EAECF0] shadow-sm">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">
                    Date & Time
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#344054]">
                    {formatEventDate(event.start_at)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-[#EAECF0] shadow-sm">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  {isOnline ? (
                    <Video className="h-5 w-5" />
                  ) : (
                    <MapPin className="h-5 w-5" />
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">
                    {isOnline ? "Online Platform" : "Location"}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#344054]">
                    {locationText}
                  </p>

                  {!isOnline && event.event_addresses?.google_map_location ? (
                    <a
                      href={event.event_addresses.google_map_location}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600"
                    >
                      View on map
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">About this event</h2>

            <p className="whitespace-pre-line text-base leading-8 text-[#344054]">
              {event.complete_description}
            </p>
          </section>

          {event.event_organizers.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">Organizers</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {event.event_organizers.map((organizer) => (
                  <Card
                    key={organizer.id}
                    className="rounded-2xl border-[#EAECF0] shadow-sm"
                  >
                    <CardContent className="flex gap-4 p-5">
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F2F4F7]">
                        {organizer.image_url ? (
                          <Image
                            src={organizer.image_url}
                            alt={organizer.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <UserRound className="h-6 w-6 text-[#667085]" />
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-black">
                          {organizer.name}
                        </p>

                        {organizer.occupation ? (
                          <p className="mt-1 text-sm text-blue-600">
                            {organizer.occupation}
                          </p>
                        ) : null}

                        {organizer.about ? (
                          <p className="mt-2 text-sm leading-6 text-[#344054]">
                            {organizer.about}
                          </p>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          {event.event_gallery.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">Gallery</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {event.event_gallery.map((image) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-2xl border border-[#EAECF0] bg-[#F9FAFB]"
                  >
                    <Image
                      src={image.image_url}
                      alt={image.alt_text || event.event_name}
                      width={600}
                      height={360}
                      className="h-[220px] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </section>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <Card className="rounded-2xl border-[#EAECF0] shadow-sm">
            <CardContent className="space-y-4 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Registration
              </p>

              <h2 className="text-xl font-bold text-black">
                Reserve your spot
              </h2>

              <p className="text-sm leading-6 text-[#344054]">
                Register for this event using the official registration link.
              </p>

              <Button
                asChild
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
              >
                <a
                  href={event.registration_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Register for Event
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-[#EAECF0] shadow-sm">
            <CardContent className="p-5">
              <h2 className="text-lg font-bold text-black">Other Events</h2>

              <div className="mt-4 space-y-2">
                {events.map((item) => {
                  const isActive = item.slug === event.slug;

                  return (
                    <Button
                      key={item.id}
                      asChild
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-between rounded-xl ${
                        isActive
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "text-[#344054] hover:bg-[#F2F4F7]"
                      }`}
                    >
                      <Link href={`/events/${item.slug}`}>
                        <span className="truncate">{item.event_name}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}