// İletişim modülü: formdan gelen mesajlar data/messages.json dosyasına kaydedilir (fs modülü).
// Bu dosya .gitignore'da olduğu için GitHub'a gitmez.

const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const MESSAGES_PATH = path.join(__dirname, '..', 'data', 'messages.json');

function readMessages() {
    if (!fs.existsSync(MESSAGES_PATH)) {
        return [];
    }
    return JSON.parse(fs.readFileSync(MESSAGES_PATH, 'utf-8'));
}

function saveMessages(messages) {
    fs.writeFileSync(MESSAGES_PATH, JSON.stringify(messages, null, 2), 'utf-8');
}

// Basit e-posta kontrolü: "bir@şey.uzantı" biçiminde mi?
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/contact
// Body: { "name": "...", "email": "...", "message": "..." }
router.post('/', (req, res) => {
    const name = (req.body.name || '').trim();
    const email = (req.body.email || '').trim();
    const message = (req.body.message || '').trim();

    if (!name || !email || !message) {
        return res.status(400).json({ code: 'required', status: 'error' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ code: 'invalidEmail', status: 'error' });
    }

    if (message.length > 2000) {
        return res.status(400).json({ code: 'tooLong', status: 'error' });
    }

    const messages = readMessages();
    messages.push({
        id: messages.length + 1,
        name,
        email,
        message,
        createdAt: new Date().toISOString()
    });
    saveMessages(messages);

    console.log(`Yeni mesaj: ${name} <${email}>`);
    res.status(201).json({ code: 'sent', status: 'success' });
});

module.exports = router;
