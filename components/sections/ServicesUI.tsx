import { getServices } from "@/lib/apicalls/services";
import { ServicesGrid } from "./ServicesGrid";


export async function ServicesUI() {
    console.log("Services component called");

  const services = await getServices({
    source: "server",
  });
  console.log("Services length:", services.length);
  if (services.length === 0) {
    console.log("No services, returning null");
    return null;
  }

  return <ServicesGrid initialServices={services} />;
}