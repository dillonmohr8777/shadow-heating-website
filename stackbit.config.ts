import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

const text = (name: string, label: string) => ({
  name,
  label,
  type: "string" as const,
});

const longText = (name: string, label: string) => ({
  name,
  label,
  type: "text" as const,
});

const stringList = (name: string, label: string) => ({
  name,
  label,
  type: "list" as const,
  items: { type: "string" as const },
});

const objectList = (
  name: string,
  label: string,
  fields: any[],
) => ({
  name,
  label,
  type: "list" as const,
  items: {
    type: "object" as const,
    fields,
  },
});

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "nextjs",
  nodeVersion: "22",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      assetsConfig: {
        referenceType: "static",
        staticDir: "public",
        uploadDir: "img",
        publicPath: "/",
      },
      models: [
        {
          name: "SiteContent",
          label: "Shadow website content",
          type: "data",
          filePath: "content/site.json",
          fields: [
            {
              name: "business",
              label: "Business details",
              type: "object",
              fields: [
                text("name", "Business name"),
                text("shortName", "Short name"),
                text("tagline", "Tagline"),
                text("subTagline", "Secondary tagline"),
                text("phone", "Phone"),
                text("phoneHref", "Phone link"),
                text("email", "Email"),
                text("emailHref", "Email link"),
                {
                  name: "address",
                  label: "Address",
                  type: "object",
                  fields: [
                    text("street", "Street"),
                    text("city", "City"),
                    text("state", "State"),
                    text("zip", "ZIP"),
                    text("full", "Full address"),
                  ],
                },
                text("hours", "Hours"),
                text("bookingUrl", "Booking URL"),
                text("domain", "Domain"),
                {
                  name: "social",
                  label: "Social links",
                  type: "object",
                  fields: [
                    text("facebook", "Facebook"),
                    text("nextdoor", "Nextdoor"),
                  ],
                },
              ],
            },
            objectList("nav", "Navigation", [
              text("label", "Label"),
              text("href", "Link"),
            ]),
            objectList("stats", "Trust statistics", [
              { name: "value", label: "Value", type: "number" },
              text("suffix", "Suffix"),
              text("label", "Label"),
            ]),
            objectList("valueProps", "Why Shadow cards", [
              text("title", "Title"),
              longText("body", "Description"),
              {
                name: "tone",
                label: "Color",
                type: "enum",
                options: ["ember", "ice", "gold"],
              },
            ]),
            objectList("playbook", "Championship playbook", [
              text("num", "Number"),
              text("title", "Title"),
              longText("body", "Description"),
            ]),
            objectList("services", "Services", [
              text("slug", "URL slug"),
              text("name", "Service name"),
              text("short", "Short description"),
              longText("body", "Full description"),
              stringList("bullets", "Features"),
              {
                name: "tone",
                label: "Color",
                type: "enum",
                options: ["ember", "ice", "gold"],
              },
              {
                name: "icon",
                label: "Icon",
                type: "enum",
                options: [
                  "flame",
                  "snowflake",
                  "wind",
                  "shield",
                  "siren",
                  "gauge",
                  "wrench",
                  "leaf",
                ],
              },
              { name: "img", label: "Image", type: "image" },
            ]),
            objectList("packages", "Maintenance packages", [
              text("name", "Package name"),
              { name: "price", label: "Monthly price", type: "number" },
              text("cadence", "Billing cadence"),
              longText("blurb", "Description"),
              stringList("features", "Features"),
              { name: "featured", label: "Featured package", type: "boolean" },
            ]),
            objectList("reviews", "Customer reviews", [
              text("name", "Customer name"),
              text("location", "Location"),
              { name: "stars", label: "Stars", type: "number" },
              longText("quote", "Review"),
            ]),
            objectList("serviceAreas", "Service areas", [
              text("name", "Community"),
              text("note", "Note"),
              { name: "primary", label: "Primary area", type: "boolean" },
            ]),
            objectList("process", "Service process", [
              text("step", "Step number"),
              text("title", "Title"),
              longText("body", "Description"),
            ]),
            objectList("faqs", "Frequently asked questions", [
              text("q", "Question"),
              longText("a", "Answer"),
            ]),
            objectList("aboutValues", "About page values", [
              text("title", "Title"),
              longText("body", "Description"),
            ]),
            {
              name: "financing",
              label: "Financing",
              type: "object",
              fields: [
                stringList("partners", "Financing partners"),
                objectList("points", "Financing benefits", [
                  text("title", "Title"),
                  longText("body", "Description"),
                ]),
              ],
            },
          ],
        },
      ],
    }),
  ],
});
