// Fadime Mutlu - Kişisel web sitesi API'si
//
// GET  /api/content?lang=tr   -> sitenin tüm içeriği (tr veya en)
// POST /api/contact           -> iletişim formundan gelen mesajı kaydeder
// GET  /api/health            -> sunucu çalışıyor mu?
//
// Geliştirme sırasında React (Vite) 5173 portunda çalışır ve /api isteklerini buraya yönlendirir.
// "npm run build" sonrası bu sunucu, client/dist klasöründeki hazır siteyi de kendisi sunar.

const express = require('express');
const path = require('path');
const fs = require('fs');

const contentRouter = require('./routes/content');
const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API route'ları
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api/content', contentRouter);
app.use('/api/contact', contactRouter);

// Olmayan bir /api adresi istenirse
app.use('/api', (req, res) => {
    res.status(404).json({ message: 'Endpoint bulunamadı', status: 'error' });
});

// Build alınmış React sitesi varsa onu sun (production)
const clientDist = path.join(__dirname, '..', '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));

    // Tek sayfalık uygulama: diğer tüm adreslerde index.html döner
    app.use((req, res) => {
        res.sendFile(path.join(clientDist, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`API http://localhost:${PORT} adresinde çalışıyor.`);
});
