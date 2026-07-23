const checks = [
  {
    name: "Shadow homepage and GA4",
    url: "https://shadow-heating.com/",
    markers: ["G-3LBKY5NWQQ", "Shadow Heating &amp; Cooling"],
  },
  {
    name: "Shadow contact form",
    url: "https://shadow-heating.com/contact/",
    markers: ["name='contact'", "Send us a message"],
  },
  {
    name: "Shadow service request form",
    url: "https://shadow-heating.com/book-a-service/",
    markers: ["name='service-request'", "What do you need?"],
  },
  {
    name: "AMI form and chatbot",
    url: "https://www.ami-cleaning.com/",
    markers: ["ami-site-assistant.js", 'id="walkForm"'],
  },
];

async function inspect(check) {
  let lastFailure = `${check.name}: unknown failure`;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(check.url, {
        headers: {
          accept: "text/html,application/xhtml+xml",
          "user-agent": "Mozilla/5.0 (compatible; DillonMohrSiteMonitor/1.0)",
        },
        signal: AbortSignal.timeout(15000),
      });
      const body = await response.text();
      const missing = check.markers.filter((marker) => !body.includes(marker));

      if (response.ok && missing.length === 0) {
        return null;
      }

      lastFailure = `${check.name}: HTTP ${response.status}; missing ${missing.join(", ") || "none"}`;
    } catch (error) {
      lastFailure = `${check.name}: ${error instanceof Error ? error.message : String(error)}`;
    }

    if (attempt < 3) {
      await new Promise((resolve) => setTimeout(resolve, 750 * attempt));
    }
  }

  return lastFailure;
}

async function sendAlert(failures, checkedAt) {
  const payload = new URLSearchParams({
    "form-name": "site-health-alert",
    checked_at: checkedAt,
    failures: failures.join("\n"),
  });

  const response = await fetch("https://shadow-heating.com/", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: payload.toString(),
  });

  if (!response.ok) {
    throw new Error(`Alert submission failed with HTTP ${response.status}`);
  }
}

export default async () => {
  const checkedAt = new Date().toISOString();
  const failures = (await Promise.all(checks.map(inspect))).filter(Boolean);

  if (failures.length) {
    await sendAlert(failures, checkedAt);
  }

  return new Response(
    JSON.stringify({ checkedAt, ok: failures.length === 0, failures }),
    { headers: { "content-type": "application/json" } },
  );
};

export const config = {
  schedule: "0 13 * * *",
};
