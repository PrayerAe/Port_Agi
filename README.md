# Portfolio Website - Graphic Designer

Website portfolio modern dan responsif untuk Graphic Designer, dibangun menggunakan React + Vite.

## Fitur

- **Responsive Design** - Tampilan optimal di semua perangkat (desktop, tablet, mobile)
- **Smooth Animations** - Animasi halus menggunakan Framer Motion
- **Modern UI** - Design modern dengan tema gelap (dark mode)
- **Interactive Portfolio** - Filter proyek berdasarkan kategori
- **Contact Form** - Form kontak yang siap digunakan
- **Smooth Scrolling** - Navigasi dengan scroll yang halus

## Tech Stack

- **React 18** - Library JavaScript untuk membangun UI
- **Vite** - Build tool yang cepat untuk development
- **Framer Motion** - Library animasi untuk React
- **React Icons** - Koleksi icon populer
- **React Scroll** - Smooth scrolling untuk navigasi

---

## Requirements / Prasyarat

Pastikan Anda sudah menginstall:

### 1. Node.js (WAJIB)
- **Versi**: 18.0.0 atau lebih baru
- **Download**: https://nodejs.org/
- Pilih versi **LTS (Long Term Support)** yang direkomendasikan

### 2. npm (Package Manager)
- Biasanya sudah terinstall otomatis bersama Node.js
- Alternatif: **yarn** atau **pnpm**

### Cara Cek Instalasi

```bash
# Cek versi Node.js
node -v

# Cek versi npm
npm -v
```

---

## Instalasi

### Langkah 1: Buka Terminal/Command Prompt

Buka terminal dan navigasi ke folder project:

```bash
cd path/to/portfolio-designer
```

### Langkah 2: Install Dependencies

Jalankan perintah berikut untuk menginstall semua package yang diperlukan:

```bash
npm install
```

Package yang akan diinstall:
- react
- react-dom
- react-icons
- react-scroll
- framer-motion

### Langkah 3: Jalankan Development Server

```bash
npm run dev
```

### Langkah 4: Buka di Browser

Buka browser dan akses:
```
http://localhost:5173
```

---

## Perintah yang Tersedia

| Perintah | Deskripsi |
|----------|-----------|
| `npm install` | Install semua dependencies |
| `npm run dev` | Jalankan development server |
| `npm run build` | Build project untuk production |
| `npm run preview` | Preview hasil build |

---

## Build untuk Production

```bash
# Build project
npm run build

# Preview hasil build
npm run preview
```

Hasil build akan tersimpan di folder `dist/`

---

## Struktur Folder

```
portfolio-designer/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/              # Gambar dan assets
│   ├── components/          # Komponen React
│   │   ├── Header/          # Navigation bar
│   │   ├── Hero/            # Hero section
│   │   ├── About/           # About section
│   │   ├── Skills/          # Skills & tools section
│   │   ├── Portfolio/       # Portfolio/projects section
│   │   ├── Contact/         # Contact form section
│   │   └── Footer/          # Footer
│   ├── styles/              # Additional styles
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styles
│   ├── index.css            # Global styles
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Kustomisasi

### Mengubah Informasi Personal

| Komponen | File | Yang Perlu Diubah |
|----------|------|-------------------|
| Hero Section | `src/components/Hero/Hero.jsx` | Nama, tagline, social links |
| About | `src/components/About/About.jsx` | Bio, pengalaman, highlights |
| Skills | `src/components/Skills/Skills.jsx` | Tools, skill levels, services |
| Portfolio | `src/components/Portfolio/Portfolio.jsx` | Projects, categories |
| Contact | `src/components/Contact/Contact.jsx` | Email, phone, location |
| Footer | `src/components/Footer/Footer.jsx` | Social links, copyright |

### Menambahkan Foto Profil

1. Simpan foto ke folder `src/assets/`
2. Import di komponen yang diinginkan:

```jsx
import profilePhoto from '../assets/your-photo.jpg';

// Gunakan di JSX
<img src={profilePhoto} alt="Your Name" />
```

### Mengubah Warna Tema

Edit variabel di `src/index.css`:

```css
:root {
  --primary-purple: #8b5cf6;   /* Warna utama ungu */
  --primary-pink: #ec4899;     /* Warna aksen pink */
  --bg-dark: #0a0a0a;          /* Background gelap */
  /* ... warna lainnya */
}
```

---

## Dependencies

### Production Dependencies
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-icons": "^5.x",
  "react-scroll": "^1.x",
  "framer-motion": "^11.x"
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^4.x",
  "vite": "^6.x",
  "eslint": "^9.x"
}
```

---

## Deployment

### Vercel (Direkomendasikan)

1. Push project ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Import repository GitHub
4. Klik Deploy

### Netlify

1. Push project ke GitHub
2. Buka [netlify.com](https://netlify.com)
3. Klik "New site from Git"
4. Pilih repository dan deploy

### Manual (Hosting Biasa)

1. Jalankan `npm run build`
2. Upload semua file di folder `dist/` ke hosting

---

## Browser Support

- Chrome (terbaru)
- Firefox (terbaru)
- Safari (terbaru)
- Edge (terbaru)

---

## Troubleshooting

### Error: "npm is not recognized"
- Node.js belum terinstall atau belum ditambahkan ke PATH
- Install ulang Node.js dari https://nodejs.org

### Error: "EACCES permission denied"
- Jalankan terminal sebagai Administrator (Windows)
- Atau gunakan `sudo npm install` (Mac/Linux)

### Port 5173 sudah digunakan
- Vite akan otomatis mencari port lain
- Atau matikan aplikasi yang menggunakan port tersebut

---

## License

MIT License - Bebas digunakan untuk keperluan pribadi maupun komersial.

---

Dibuat dengan React + Vite
