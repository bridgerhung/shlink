const express = require("express");
const app = express();

app.get("/", (req, res) => {
    // 取得使用者的 Accept-Language
    const lang = req.headers["accept-language"];

    // 預設為繁體中文
    let content = {
        title: "網站維護中",
        heading: "網站維護中",
        message: "請稍等，我正在恢復服務，請稍後再試"
    };

    if (lang.includes("en")) {
        content = {
            title: "Website Under Maintenance",
            heading: "Website Under Maintenance",
            message: "Please wait, I am restoring the service. Please try again later."
        };
    } else if (lang.includes("ja")) {
        content = {
            title: "ウェブサイトはメンテナンス中",
            heading: "ウェブサイトはメンテナンス中",
            message: "少々お待ちください。サービスを復旧中です。後ほどお試しください。"
        };
    }

    // 輸出對應的 HTML
    res.send(`
        <!DOCTYPE html>
        <html lang="${lang.includes("en") ? "en" : lang.includes("ja") ? "ja" : "zh-TW"}">
            <head>
                <title>${content.title}</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
                <h1>${content.heading}</h1>
                <p>${content.message}</p>
            </body>
        </html>
    `);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
