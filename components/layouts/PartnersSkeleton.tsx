import { Skeleton } from "@/components/ui/skeleton";

export function PartnersSkeleton() {
  return (
    <section className="w-full overflow-hidden bg-white py-10">
      <div className="mx-auto mb-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-3 h-9 w-72" />
      </div>

      <div className="mx-auto flex max-w-7xl gap-5 px-4 sm:px-6 lg:px-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-[320px] shrink-0 rounded-2xl border border-border-muted bg-white p-5 shadow-sm"
          >
            <div className="flex gap-4">
              <Skeleton className="h-14 w-14 rounded-xl" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}