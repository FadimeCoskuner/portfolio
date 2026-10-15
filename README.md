# Fadime Mutlu · Kişisel Web Sitesi

React + TypeScript + Tailwind CSS (frontend) ve Node.js + Express (backend) ile geliştirilmiş kişisel web sitesi.

## Klasör yapısı

```
portfolio/
├── client/                     React + TypeScript + Tailwind CSS (Vite)
│   ├── public/                 favicon, proje ekran görüntüleri (projects/)
│   └── src/
│       ├── components/         Navbar, Hero, About, Experience, Services, Projects (+ Mockup), Lab, Education, Faq, Contact, Footer
│       ├── hooks/              useContent (API), usePreferences (dil), useReveal (animasyon)
│       ├── types.ts            İçerik tipleri
│       └── index.css           Renkler, yazı tipleri, animasyonlar
└── server/                     Node.js + Express API
    └── src/
        ├── index.js            Sunucu
        ├── routes/             content.js (GET /api/content), contact.js (POST /api/contact)
        └── data/               content.tr.json, content.en.json  ← sitedeki tüm yazılar burada
```

## Çalıştırma

İlk kez (paketleri kur):

```
npm install
npm run install:all
```

Geliştirme (iki sunucu birlikte açılır):

```
npm run dev
```

Tarayıcıda **http://localhost:5173** adresini aç. Kodu kaydettikçe sayfa kendiliğinden yenilenir.

Yayına hazır sürüm:

```
npm run build
npm start
```

Bu durumda site ve API birlikte **http://localhost:5000** adresinden çalışır.

## İçerik nasıl güncellenir?

Sitedeki tüm yazılar `server/src/data/content.tr.json` (Türkçe) ve `content.en.json` (İngilizce) dosyalarında. Kod değiştirmeden:

- **Öne çıkan proje:** `projects.featured` listesine ekle (`kind`: `panel`, `web` veya `sheet`). Ekran görüntüsü için `client/public/projects/` klasörüne bir resim koy ve `"image": "/projects/dosya.jpg"` yaz; resim yoksa çizilmiş arayüz gösterilir.
- **Diğer projeler:** `projects.others` listesine ekle.
- **Sık sorulan sorular:** `faq.items` listesine ekle.
- **Başlıklar:** `*yıldız*` arasına yazdığın kelimeler italik vurgulu görünür.
- **Laboratuvar projesi:** `lab.items` listesine ekle. `folder` alanı GitHub'daki klasör adıdır, `status` `dev` veya `done`.
- **Deneyim, yetenek, kurs:** ilgili listeye ekle.

Her iki dil dosyasını da güncellemeyi unutma.

## İletişim formu

Gelen mesajlar `server/src/data/messages.json` dosyasına kaydedilir. Bu dosya `.gitignore`'da olduğu için GitHub'a gönderilmez.
