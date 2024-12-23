addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const acceptLang = (
    request.headers.get("Accept-Language") || ""
  ).toLowerCase();
  let lang = "zh-TW";
  if (acceptLang.startsWith("ja")) lang = "ja";
  else if (acceptLang.startsWith("en")) lang = "en";

  if (url.pathname === "/invalid-short-code") {
    return new Response(buildInvalid(lang), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  } else if (url.pathname === "/") {
    // Decide if you want to return maintenance page or 404
    // For example, here show 404
    return new Response(build404(lang), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  } else if (url.pathname === "/maintenance") {
    return new Response(buildMaintenance(lang), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  } else {
    // Fallback to 404
    return new Response(build404(lang), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  }
}

function buildInvalid(lang) {
  const content = {
    "zh-TW": {
      title: "無效網址",
      heading: "找不到網頁!",
      paragraph1: "歡迎使用名琮的短網址服務",
      paragraph2: "您所需要的網頁已經過期或已被刪除",
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
  const c = content[lang];
  return `<!DOCTYPE html>
  <html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <title>${c.title}</title>
    <meta name="description" content="${c.paragraph1}">
  </head>
  <body>
    <h1>${c.heading}</h1>
    <hr>
    <p>${c.paragraph1}</p>
    <p>${c.paragraph2}</p>
    <p>${c.paragraph3}</p>
  </body>
  </html>`;
}

function build404(lang) {
  const content = {
    "zh-TW": {
      title: "名琮短網址",
      heading: "歡迎使用名琮的短網址服務",
      paragraph: "找不到網頁，請確認網址是否正確。",
    },
    en: {
      title: "Ming-Tsung URL Shortener",
      heading: "Welcome to Ming-Tsung's URL Shortening Service",
      paragraph: "Page not found. Please check your URL.",
    },
    ja: {
      title: "名琮の短縮URLサービス",
      heading: "名琮の短縮URLサービスへようこそ",
      paragraph: "ページが見つかりませんでした。URLをご確認ください。",
    },
  };
  const c = content[lang];
  return `<!DOCTYPE html>
  <html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <title>${c.title}</title>
    <meta name="description" content="${c.paragraph}">
  </head>
  <body>
    <h1>${c.heading}</h1>
    <hr>
    <p>${c.paragraph}</p>
  </body>
  </html>`;
}
function buildMaintenance(lang) {
  const content = {
    "zh-TW": {
      title: "網站維護中",
      heading: "網站維護中",
      paragraph: "請稍後再試，正在維護中。",
    },
    en: {
      title: "Maintenance",
      heading: "Website Under Maintenance",
      paragraph: "Please try again later. Our site is under maintenance.",
    },
    ja: {
      title: "メンテナンス中",
      heading: "メンテナンス中",
      paragraph: "ただいまメンテナンス中です。後ほど再度お試しください。",
    },
  };
  const c = content[lang];
  return `<!DOCTYPE html>
  <html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <title>${c.title}</title>
    <meta name="description" content="${c.paragraph}">
  </head>
  <body>
    <h1>${c.heading}</h1>
    <hr>
    <p>${c.paragraph}</p>
  </body>
  </html>`;
}
