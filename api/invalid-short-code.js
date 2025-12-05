import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { code } = req.query;
  
  try {
    // 讀取 invalid-short-code. html 檔案
    const htmlPath = path.join(process.cwd(), 'invalid-short-code.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    // 如果有短代碼參數，注入到 JavaScript 中
    if (code) {
      const shortCodeScript = `
        <script>
          window.INVALID_SHORT_CODE = "${code}";
        </script>
      `;
      html = html.replace('</head>', `${shortCodeScript}</head>`);
    }
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(404).send(html);
  } catch (error) {
    console.error('Error reading HTML file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}