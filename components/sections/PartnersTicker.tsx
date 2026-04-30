"use client";

import Image from "next/image";
import Link from "next/link";

import type { Partner } from "@/type/supabase";
import { usePartners } from "@/hooks/usepartner";

interface PartnersTickerProps {
  readonly initialPartners: readonly Partner[];
}

export function PartnersTicker({
  initialPartners,
}: Readonly<PartnersTickerProps>) {
  const { partners, hasPartners } = usePartners({
    initialPartners,
  });

  if (!hasPartners) {
    return null;
  }

  const loopPartners = [...partners, ...partners];

  return (
    <section className="w-full overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div className="partners-marquee flex w-max min-w-max flex-nowrap gap-4 px-4">
          {loopPartners.map((partner, index) => (
            <Link
              key={`${partner.id}-${index}`}
              href={`/partners/${partner.slug}`}
              className="flex h-[230px] w-[180px] min-w-[180px] max-w-[180px] shrink-0 grow-0 flex-col overflow-hidden rounded-lg border border-[#EEF2F6] bg-white p-1 transition-all duration-300 hover:shadow-md sm:h-[250px] sm:w-[208px] sm:min-w-[208px] sm:max-w-[208px]"
            >
              <div className="flex h-20 items-center justify-center rounded-md bg-slate-100 px-4 sm:h-24">
                <Image
                  src={partner.logo_url}
                  alt={partner.company_name}
                  width={70}
                  height={70}
                  className="max-h-10 w-auto object-contain"
                />
              </div>

              <div className="flex flex-1 items-center px-2 py-3 sm:px-3 sm:py-4">
                <p className="line-clamp-5 w-full text-center text-xs leading-4 text-[#344054] sm:text-sm sm:leading-5">
                  {partner.short_description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .partners-marquee {
          animation: partnerTicker 35s linear infinite;
        }

        .partners-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes partnerTicker {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
