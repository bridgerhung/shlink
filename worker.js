addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const acceptLang = (
    request.headers.get("Accept-Language") || ""
  ).toLowerCase();
  let lang = "zh-TW";

  if (acceptLang.startsWith("ja")) {
    lang = "ja";
  } else if (acceptLang.startsWith("en")) {
    lang = "en";
  }

  if (url.pathname === "/invalid-short-code") {
    return new Response(buildInvalid(lang), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  } else if (url.pathname === "/maintenance") {
    return new Response(buildMaintenance(lang), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  } else if (url.pathname === "/") {
    return new Response(build404(lang), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  } else {
    // 其他未指定的路由也返回 404 頁面
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
      paragraph1: "Welcome to Bridger's short URL service",
      paragraph2: "The page you need has expired or has been deleted..",
      paragraph3: "Please contact me if you need it.",
    },
    ja: {
      title: "無効なURL",
      heading: "ページが見つかりません!",
      paragraph1: "名琮の短縮URLサービスへようこそ",
      paragraph2: "お探しのページは古いか削除されています。",
      paragraph3: "このサービスが必要な場合はご連絡ください。",
    },
  };
  const c = content[lang];
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>${c.title}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <link rel="shortcut icon" href="/favicon.ico">
  <style>
    html, body {height: 100%}
    .app {height: 100vh; display: flex; align-items: center; justify-content: center; flex-flow: column;}
    p {margin-bottom: 20px;}
    body {text-align: center;}
  </style>
</head>
<body>
  <div class="app">
    <main class="container">
      <h1>${c.heading}</h1>
      <hr>
      <p>${c.paragraph1}</p>
      <p>${c.paragraph2}</p>
      <p>${c.paragraph3}</p>
    </main>
  </div>
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
      heading: "Welcome to Bridger's URL Shortening Service",
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
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <link rel="shortcut icon" href="/favicon.ico">
  <style>
    html, body {height: 100%}
    .app {height: 100vh; display: flex; align-items: center; justify-content: center; flex-flow: column;}
    p {margin-bottom: 20px;}
    body {text-align: center;}
  </style>
</head>
<body>
  <div class="app">
    <main class="container">
      <h1>${c.heading}</h1>
      <hr>
      <p>${c.paragraph}</p>
    </main>
  </div>
</body>
</html>`;
}

function buildMaintenance(lang) {
  const content = {
    "zh-TW": {
      title: "網站維護中",
      heading: "網站維護中",
      paragraph: "請稍等，我正在恢復服務，請稍後再試",
    },
    en: {
      title: "Website Under Maintenance",
      heading: "Website Under Maintenance",
      paragraph: "Please wait while we restore the service. Try again later.",
    },
    ja: {
      title: "ウェブサイトメンテナンス中",
      heading: "ウェブサイトメンテナンス中",
      paragraph: "サービスを復旧中です。後ほど再試行してください。",
    },
  };
  const c = content[lang];
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>${c.title}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <link rel="shortcut icon" href="/favicon.ico">
  <style>
    html, body {height: 100%; margin: 0; font-family: Arial, sans-serif;}
    .app {height: 100vh; display: flex; align-items: center; justify-content: center; flex-flow: column; background-color: #f8f9fa;}
    h1 {color: #343a40; margin-bottom: 10px;}
    p {color: #6c757d; margin-bottom: 20px; font-size: 1.2em;}
    .spinner-border {margin-top: 20px; color: #007bff;}
  </style>
</head>
<body>
  <div class="app">
    <main class="container text-center">
      <h1>${c.heading}</h1>
      <p>${c.paragraph}</p>
      <button type="button" class="btn btn-lg btn-danger" data-bs-toggle="popover" title="快一點" data-bs-content="我很努力了，再等一下">快一點</button>
    </main>
  </div>
</body>
</html>`;
}
