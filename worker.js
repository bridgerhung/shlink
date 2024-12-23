addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const acceptLang = (
    request.headers.get("Accept-Language") || ""
  ).toLowerCase();
  let lang = "zh-TW";
  if (acceptLang.startsWith("en")) lang = "en";
  else if (acceptLang.startsWith("ja")) lang = "ja";

  return new Response(buildPage(lang), {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
}

function buildPage(lang) {
  const content = {
    "zh-TW": {
      title: "無效網址",
      heading: "找不到網頁!",
      paragraph1: "歡迎使用名琮的短網址服務",
      paragraph2: "您所需要的網頁已經過期，或已經被刪除",
      paragraph3: "若有需要請與我聯絡",
    },
    en: {
      title: "Invalid URL",
      heading: "Page Not Found!",
      paragraph1: "Welcome to Ming-Tsung's URL Shortening Service",
      paragraph2: "The page you are looking for has expired or been deleted.",
      paragraph3: "If necessary, please contact me.",
    },
    ja: {
      title: "無効なURL",
      heading: "ページが見つかりません!",
      paragraph1: "名琮の短縮URLサービスへようこそ",
      paragraph2: "お探しのページは期限切れか削除されています。",
      paragraph3: "必要であればご連絡ください。",
    },
  };

  const chosen = content[lang];
  return `<!DOCTYPE html>
  <html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <title>${chosen.title}</title>
  </head>
  <body>
    <h1>${chosen.heading}</h1>
    <hr>
    <p>${chosen.paragraph1}</p>
    <p>${chosen.paragraph2}</p>
    <p>${chosen.paragraph3}</p>
  </body>
  </html>`;
}
