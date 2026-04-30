import { getPartners } from "@/lib/apicalls/partner";
import { PartnersTicker } from "./PartnersTicker";


export async function PartnersUI() {
  const partners = await getPartners({
    source: "server",
  });

  if (partners.length === 0) {
    return null;
  }

  return <PartnersTicker initialPartners={partners} />;
}