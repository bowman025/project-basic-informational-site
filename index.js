import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = 8080;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      let filePath;
      switch (req.url) {
        case '/':
          filePath = path.join(__dirname, 'public', 'index.html');
          break;
        case '/about':
          filePath = path.join(__dirname, 'public', 'about.html');
          break;
        case '/contact-me':
          filePath = path.join(__dirname, 'public', 'contact-me.html');
          break;
        default:
          filePath = path.join(__dirname, 'public', '404.html');
          break;
      }
      const statusCode = filePath.includes('404.html') ? 404 : 200;
      const data = await fs.readFile(filePath);
      res.writeHead(statusCode, { 'Content-Type': 'text/html', });
      res.end(data);
    } else throw new Error('Method not allowed.');
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});