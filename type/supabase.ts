export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type EventType = "online" | "offline";
export type EventTag = "free" | "paid";

export type EventStatus =
  | "ongoing"
  | "upcoming"
  | "completed"
  | "registration_closed";

export interface Testimonial {
  id: string;
  tenant_id: string;
  message: string;
  image_url: string | null;
  full_name: string;
  star_rating: number;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Stat {
  id: string;
  tenant_id: string;
  label: string;
  value: string;
  description: string | null;
  icon_name: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface EventAddress {
  id: string;
  event_id: string;
  address_line_1: string;
  city: string;
  zipcode: string;
  state: string;
  country: string;
  google_map_location: string;
  created_at: string;
}

export interface EventOrganizer {
  id: string;
  event_id: string;
  name: string;
  image_url: string | null;
  occupation: string | null;
  about: string | null;
  display_order: number;
  created_at: string;
}

export interface EventGallery {
  id: string;
  event_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  created_at: string;
}

export interface Event {
  id: string;
  tenant_id: string;
  event_name: string;
  slug: string;
  start_at: string;
  end_at: string | null;
  event_type: EventType;
  event_tag: EventTag;
  status: EventStatus;
  registration_link: string;
  online_platform: string | null;
  online_join_label: string | null;
  short_description: string | null;
  complete_description: string;
  cover_image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
export type PartnerStatus = "active" | "inactive" | "draft";

export interface Partner {
  id: string;
  tenant_id: string;

  company_name: string;
  slug: string;

  logo_url: string;
  company_website: string | null;

  heading_text: string | null;
  short_description: string;

  review: string | null;
  review_by: string | null;

  content: string | null;
  result: string | null;
  about_the_company: string | null;

  is_active: boolean;
  display_order: number;

  created_at: string;
  updated_at: string;
}
export interface EventItem extends Event {
  event_addresses: EventAddress | null;
  event_organizers: EventOrganizer[];
  event_gallery: EventGallery[];
}

export interface EventsApiResponse {
  success: boolean;
  data?: EventItem[];
  message?: string;
  error?: string;
}

export interface Service {
  id: string;
  tenant_id: string;

  slug: string;

  service_name: string;
  short_description: string;

  image_url: string | null;

  heading: string | null;
  subheading: string | null;
  content: string;

  is_active: boolean;
  display_order: number;

  created_at: string;
  updated_at: string;
}

export interface ServiceFaq {
  id: string;
  service_id: string;

  question: string;
  answer: string;

  display_order: number;

  created_at: string;
}
export interface ServiceItem extends Service {
  service_faqs: ServiceFaq[];
}
export interface Database {
  public: {
    Tables: {
      testimonials: {
        Row: Testimonial;
        Insert: {
          id?: string;
          tenant_id: string;
          message: string;
          image_url?: string | null;
          full_name: string;
          star_rating: number;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          message?: string;
          image_url?: string | null;
          full_name?: string;
          star_rating?: number;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      stats: {
        Row: Stat;
        Insert: {
          id?: string;
          tenant_id: string;
          label: string;
          value: string;
          description?: string | null;
          icon_name?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          label?: string;
          value?: string;
          description?: string | null;
          icon_name?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      events: {
        Row: Event;
        Insert: {
          id?: string;
          tenant_id: string;
          event_name: string;
          slug: string;
          start_at: string;
          end_at?: string | null;
          event_type: EventType;
          event_tag?: EventTag;
          status?: EventStatus;
          registration_link: string;
          online_platform?: string | null;
          online_join_label?: string | null;
          short_description?: string | null;
          complete_description: string;
          cover_image_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          event_name?: string;
          slug?: string;
          start_at?: string;
          end_at?: string | null;
          event_type?: EventType;
          event_tag?: EventTag;
          status?: EventStatus;
          registration_link?: string;
          online_platform?: string | null;
          online_join_label?: string | null;
          short_description?: string | null;
          complete_description?: string;
          cover_image_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      event_addresses: {
        Row: EventAddress;
        Insert: {
          id?: string;
          event_id: string;
          address_line_1: string;
          city: string;
          zipcode: string;
          state: string;
          country: string;
          google_map_location: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          address_line_1?: string;
          city?: string;
          zipcode?: string;
          state?: string;
          country?: string;
          google_map_location?: string;
          created_at?: string;
        };
      };

      event_organizers: {
        Row: EventOrganizer;
        Insert: {
          id?: string;
          event_id: string;
          name: string;
          image_url?: string | null;
          occupation?: string | null;
          about?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          name?: string;
          image_url?: string | null;
          occupation?: string | null;
          about?: string | null;
          display_order?: number;
          created_at?: string;
        };
      };

      event_gallery: {
        Row: EventGallery;
        Insert: {
          id?: string;
          event_id: string;
          image_url: string;
          alt_text?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          image_url?: string;
          alt_text?: string | null;
          display_order?: number;
          created_at?: string;
        };
      };

      partners: {
        Row: Partner;
        Insert: {
          id?: string;
          tenant_id: string;

          company_name: string;
          slug: string;

          logo_url: string;
          company_website?: string | null;

          heading_text?: string | null;
          short_description: string;

          review?: string | null;
          review_by?: string | null;

          content?: string | null;
          result?: string | null;
          about_the_company?: string | null;

          is_active?: boolean;
          display_order?: number;

          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;

          company_name?: string;
          slug?: string;

          logo_url?: string;
          company_website?: string | null;

          heading_text?: string | null;
          short_description?: string;

          review?: string | null;
          review_by?: string | null;

          content?: string | null;
          result?: string | null;
          about_the_company?: string | null;

          is_active?: boolean;
          display_order?: number;

          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: Service;
        Insert: {
          id?: string;
          tenant_id: string;

          slug: string;

          service_name: string;
          short_description: string;

          image_url?: string | null;

          heading?: string | null;
          subheading?: string | null;
          content: string;

          is_active?: boolean;
          display_order?: number;

          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;

          slug?: string;

          service_name?: string;
          short_description?: string;

          image_url?: string | null;

          heading?: string | null;
          subheading?: string | null;
          content?: string;

          is_active?: boolean;
          display_order?: number;

          created_at?: string;
          updated_at?: string;
        };
      };

      service_faqs: {
        Row: ServiceFaq;
        Insert: {
          id?: string;
          service_id: string;

          question: string;
          answer: string;

          display_order?: number;

          created_at?: string;
        };
        Update: {
          id?: string;
          service_id?: string;

          question?: string;
          answer?: string;

          display_order?: number;

          created_at?: string;
        };
      };
    };
  };
}

export type EventRow = Database["public"]["Tables"]["events"]["Row"];
export type EventInsert = Database["public"]["Tables"]["events"]["Insert"];
export type EventUpdate = Database["public"]["Tables"]["events"]["Update"];

export type TestimonialRow =
  Database["public"]["Tables"]["testimonials"]["Row"];

export type StatRow = Database["public"]["Tables"]["stats"]["Row"];
export type PartnerRow = Database["public"]["Tables"]["partners"]["Row"];
export type ServiceRow = Database["public"]["Tables"]["services"]["Row"];

export type ServiceFaqRow = Database["public"]["Tables"]["service_faqs"]["Row"];
