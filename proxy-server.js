const http = require('http');
const httpProxy = require('http-proxy');


const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permet à toutes les origines d'accéder à votre serveur proxy (vous pouvez limiter cela si nécessaire)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Définit les méthodes HTTP autorisées
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Définit les en-têtes autorisés

    const targetUrl = req.url.slice('/api?url='.length);
    proxy.web(req, res, { target: targetUrl });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Serveur proxy en cours d'exécution sur le port ${port}`);
});

const natural = require('natural');
require('phonetics');

const arabicWord = 'مرحبا';
const transcription = arabicTransliteration.transliterate(arabicWord);
console.log(`La transcription phonétique de "${arabicWord}" est "${transcription}".`);



