# LaundryKilat — Demo Landing UMKM (by MansxDev)

Demo landing niche **laundry antar-jemput**, dibuat sebagai contoh tampilan untuk
calon klien jasa pembuatan website UMKM.

**Demo langsung:** https://mansxdev.github.io/demo-laundry-kilat/
**Paket & harga jasa:** https://my-portfolio-three-azure-32.vercel.app/jasa

React 19 + Vite 8 + Tailwind v4 + daisyUI 5 + Phosphor Icons + Plus Jakarta Sans.

## Isi demo

- Hero split + badge jemput gratis + statistik (4.9/5, 12rb+ order)
- Layanan bento asimetris (5 layanan, tiap kartu klik → order WA)
- Harga 3 paket laundry (Reguler / Kilat 1 Hari / Satuan Premium), tombol order WA per paket
- Cara order 4 langkah, testimoni 3 kutipan, FAQ accordion 5 item
- Kontak (alamat, jam, `tel:`, rute Maps) + tombol WA mengambang
- Section `#jasa`: penjelasan singkat + **tautan ke halaman paket & harga**

> Semua nama, nomor, dan harga di demo ini **contoh**. Harga jasa pembuatan
> website sengaja **tidak** ditulis di sini — satu-satunya sumber harga adalah
> halaman paket (`URL_JASA` di `src/App.jsx`), supaya tidak ada dua daftar harga
> yang bertabrakan.

## Jalankan lokal

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output dist/
npm run preview  # http://localhost:4173
```

## Deploy

Otomatis: setiap push ke `main` di-deploy ke GitHub Pages lewat
`.github/workflows/deploy-pages.yml` (build dengan `VITE_BASE=/demo-laundry-kilat/`).

Alamat lain yang bisa dipakai: Vercel / Netlify / Cloudflare Pages — jalankan
`npm run build` lalu unggah folder `dist/` (tanpa `VITE_BASE`). `vercel.json`
sudah disiapkan.

## Menyesuaikan untuk klien

1. `WA_LAUNDRY` (nomor order contoh) dan `WA_DEV` (nomor kontak pengembang) di `src/App.jsx`.
2. Data layanan, harga, dan FAQ ada di bagian atas `src/App.jsx`.
3. Foto/logo: taruh di `public/`, lalu ganti rujukannya.
