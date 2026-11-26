// Terzibali Hukuk sitesi için küçük yerel sunucu (bağımlılık yok).
// Videoların Safari/iPhone dahil her tarayıcıda oynaması için "Range" (parçalı) isteklerini destekler.
// Çalıştırma:  node sunucu.js   →   http://localhost:8080
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname);
const PORT = Number(process.env.PORT) || 8080;
// Varsayılan olarak yalnızca bu bilgisayardan erişilir. Ağdaki başka cihazlardan
// (ör. telefonla) test etmek için: HOST=0.0.0.0 node sunucu.js
const HOST = process.env.HOST || "127.0.0.1";
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8",
  ".mp4": "video/mp4", ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml"
};
// Yalnızca bu uzantılar sunulur; sunucu kodu, README, .git, .env vb. asla sunulmaz.
const SECURITY = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
};

function send(res, code, text) {
  res.writeHead(code, { ...SECURITY, "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "İzin verilmeyen yöntem");
  let rel;
  try { rel = decodeURIComponent(req.url.split("?")[0]); } catch (e) { return send(res, 400, "Geçersiz adres"); }
  if (rel.includes("\0")) return send(res, 400, "Geçersiz adres");
  if (rel.endsWith("/")) rel += "index.html";
  const file = path.resolve(ROOT, "." + path.posix.normalize("/" + rel));
  // Kök klasörün dışına çıkışı ve gizli dosyaları (.git, .env ...) engelle
  if (file !== ROOT && !file.startsWith(ROOT + path.sep)) return send(res, 403, "Erişim engellendi");
  if (path.relative(ROOT, file).split(path.sep).some((seg) => seg.startsWith("."))) return send(res, 404, "Bulunamadı");
  const type = TYPES[path.extname(file).toLowerCase()];
  if (!type) return send(res, 404, "Bulunamadı");
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, "Bulunamadı");
    const range = req.headers.range;
    const base = { ...SECURITY, "Content-Type": type, "Accept-Ranges": "bytes", "Cache-Control": "no-cache" };
    if (range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(range);
      let start = m && m[1] ? parseInt(m[1], 10) : 0;
      let end = m && m[2] ? parseInt(m[2], 10) : st.size - 1;
      if (m && !m[1] && m[2]) { start = Math.max(0, st.size - parseInt(m[2], 10)); end = st.size - 1; }
      if (!m || start >= st.size || start > end) {
        res.writeHead(416, { ...SECURITY, "Content-Range": `bytes */${st.size}` }); return res.end();
      }
      end = Math.min(end, st.size - 1);
      res.writeHead(206, { ...base, "Content-Range": `bytes ${start}-${end}/${st.size}`, "Content-Length": end - start + 1 });
      if (req.method === "HEAD") return res.end();
      return fs.createReadStream(file, { start, end }).on("error", () => res.destroy()).pipe(res);
    }
    res.writeHead(200, { ...base, "Content-Length": st.size });
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(file).on("error", () => res.destroy()).pipe(res);
  });
}).listen(PORT, HOST, () => console.log(`Site hazır: http://localhost:${PORT}`));
