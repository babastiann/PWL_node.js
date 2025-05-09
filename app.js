const http = require("http");
const fileSys = require("fs");
const url = require("url");

function serveStaticFile(req, res) {
  const filePath = path.join(__dirname, "public", req.url);
  const ext = path.extname(filePath);
  const mimeTypes = {
    ".css": "text/css",
    ".js": "application/javascript",
  };

  if (fs.existsSync(filePath)) {
    const contentType = mimeTypes[ext] || "application/octet-stream";
    const stream = fs.createReadStream(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    stream.pipe(res);
    return true;
  }

  return false;
}

const server = http.createServer((req, res) => {
  let q = url.parse(req.url, true);
  let menu = q.query.menu;
  let fileLocation;

  switch (menu) {
    case "home":
      fileLocation = "pages/index.html";
      break;
    case "about":
      fileLocation = "pages/about.html";
      break;
    case "dosen":
      fileLocation = "pages/dosen.html";
      break;
    case "mahasiswa":
      fileLocation = "pages/mahasiswa.html";
      break;
    default:
      fileLocation = "pages/index.html";
  }
  
  fileSys.readFile(fileLocation, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page Not Found");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
});

server.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
