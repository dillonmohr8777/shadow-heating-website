# Editing the Shadow website

Mike and Lauren have two supported editing paths.

## Edit through Netlify

Open the Shadow project in Netlify and use **Build with an AI agent** on the project overview. Describe the change in plain English, review the generated preview, and publish it when it is correct. This path can change any page, component, image, form, or integration without exposing another client's source.

The repository is also prepared for Netlify Visual Editor. Once the separate Netlify Visual Editor GitHub app is authorized for this repository, open **Content** and choose **Shadow website content**. The structured editor covers:

- business contact details and social links
- navigation
- trust statistics and marketing cards
- services and service features
- maintenance packages and pricing
- reviews
- service areas
- service process
- FAQs
- About page values
- financing partners and benefits

Publishing an approved change updates the private Git repository and triggers a fresh production build.

## Full source editing

The private GitHub repository contains the entire website. Repository collaborators can edit any page, component, image, integration, or form and use a pull request for review.

## Safety notes

- Keep phone links in `tel:+18477579450` format.
- Keep email links in `mailto:name@example.com` format.
- Upload site images to `public/img`.
- Preview changes before publishing.
- Never paste passwords, API keys, or private customer information into the repository.
