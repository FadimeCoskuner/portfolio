// İçerik modülü: sitedeki tüm yazılar data/content.tr.json ve data/content.en.json dosyalarında.
// Yeni proje, deneyim veya yetenek eklemek için sadece bu JSON dosyalarını düzenlemen yeterli.

const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const SUPPORTED_LANGS = ['tr', 'en'];

// GET /api/content?lang=tr
router.get('/', (req, res) => {
    const lang = SUPPORTED_LANGS.includes(req.query.lang) ? req.query.lang : 'tr';
    const filePath = path.join(__dirname, '..', 'data', `content.${lang}.json`);

    try {
        // Her istekte dosyadan okunur: JSON'u değiştirince sunucuyu yeniden başlatmaya gerek yok
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        res.json(content);
    } catch (error) {
        console.error('İçerik okunamadı:', error.message);
        res.status(500).json({ message: 'İçerik okunamadı', status: 'error' });
    }
});

module.exports = router;
