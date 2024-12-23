addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const acceptLang = (
    request.headers.get("Accept-Language") || ""
  ).toLowerCase();
  let lang = "zh-TW";
  if (acceptLang.startsWith("ja")) lang = "ja";
  else if (acceptLang.startsWith("en")) lang = "en";

  const html = buildPage(lang);
  return new Response(html, {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
}

function buildPage(lang) {
  let title = "無效網址";
  if (lang === "ja") title = "無効なURL";
  else if (lang === "en") title = "Invalid URL";

  return `<!DOCTYPE html>
  <html lang="${lang}">
  <head><title>${title}</title></head>
  <body><h1>${title}</h1></body>
  </html>`;
}
