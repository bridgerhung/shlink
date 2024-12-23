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
      p1: "歡迎使用名琮的短網址服務",
      p2: "您所需要的網頁已經過期，或已經被刪除",
      p3: "若有需要請與我聯絡",
    },
    en: {
      title: "Invalid URL",
      heading: "Page Not Found!",
      p1: "Welcome to Ming-Tsung's URL Shortening Service",
      p2: "The page you are looking for has expired or been deleted.",
      p3: "If necessary, please contact me.",
    },
    ja: {
      title: "無効なURL",
      heading: "ページが見つかりません!",
      p1: "名琮の短縮URLサービスへようこそ",
      p2: "お探しのページは期限切れか削除されています。",
      p3: "必要であればご連絡ください。",
    },
  };
  const c = content[lang];
  return `<!DOCTYPE html>
  <html lang="${lang}">
    <head>
      <title>${c.title}</title>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
      <link rel="shortcut icon" href="/favicon.ico">
      <style>
        html, body {height: 100%}
        .app {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: column;
        }
        p {margin-bottom: 20px;}
        body {text-align: center;}
      </style>
    </head>
    <body>
      <div class="app">
        <main class="container">
          <h1>${c.heading}</h1>
          <hr>
          <p>${c.p1}</p>
          <p>${c.p2}</p>
          <p>${c.p3}</p>
        </main>
      </div>
    </body>
  </html>`;
}
