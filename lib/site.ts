// Owner-editable content is stored in content/site.json.
// Netlify Visual Editor reads and writes that file; this facade preserves typed imports.
import content from "@/content/site.json";

export type Service = {
  slug: string;
  name: string;
  short: string;
  body: string;
  bullets: string[];
  tone: "ember" | "ice" | "gold";
  icon: "flame" | "snowflake" | "wind" | "shield" | "siren" | "gauge" | "wrench" | "leaf";
  img?: string;
};

export type Pkg = {
  name: string;
  price: number;
  cadence: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export type Review = {
  name: string;
  location: string;
  stars: number;
  quote: string;
};

export type FAQItem = { q: string; a: string };

export const business = content.business;
export const nav = content.nav;
export const stats = content.stats;
export const valueProps = content.valueProps;
export const playbook = content.playbook;
export const services = content.services as Service[];
export const packages = content.packages as Pkg[];
export const reviews = content.reviews as Review[];
export const serviceAreas = content.serviceAreas;
export const process = content.process;
export const faqs = content.faqs as FAQItem[];
export const aboutValues = content.aboutValues;
export const financing = content.financing;
