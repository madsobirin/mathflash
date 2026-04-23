<div align="center">

# 🧮 MathFlash: Interactive Basic Math Learning

**MathFlash** adalah aplikasi pembelajaran matematika dasar (Penjumlahan, Pengurangan, Perkalian, dan Pembagian) berbasis flashcard interaktif yang dirancang untuk memperkuat fondasi berhitung dengan pengalaman yang seru.

[Lihat Demo](https://your-demo-link.vercel.app) • [Lapor Bug](https://github.com/madsob/mathflash/issues)

</div>

---

## ✨ Fitur Utama

- **4 Operasi Dasar:** Penjumlahan, Pengurangan (no-negative), Perkalian, dan Pembagian (integer result).
- **Interactive Flashcards:** Animasi kartu yang mulus menggunakan Framer Motion.
- **Difficulty Levels:** Pilihan tingkat kesulitan (Easy, Medium, Hard) untuk menyesuaikan kemampuan.
- **Logic-Driven:** Jawaban dihitung secara real-time di sisi client menggunakan TypeScript (Tanpa API AI).
- **Responsive UI:** Didesain dengan Tailwind CSS agar nyaman diakses dari perangkat mobile maupun desktop.

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animasi:** [Framer Motion](https://www.framer.com/motion/)
- **Design Pattern:** Strategy Pattern (untuk logika operasi matematika).

## 🏗️ Arsitektur Proyek

Proyek ini menerapkan prinsip **Clean Code** dan **SOLID** dengan struktur folder sebagai berikut:
- `src/lib/strategies/`: Logika algoritma matematika yang terpisah.
- `src/hooks/`: Custom hooks untuk manajemen state permainan.
- `src/pages/`: Halaman aplikasi (Menu, Practice, Stats, dll).

## 🚀 Cara Menjalankan Lokal

Pastikan kamu sudah menginstal **Node.js**.

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/username/mathflash.git](https://github.com/username/mathflash.git)
   cd mathflash