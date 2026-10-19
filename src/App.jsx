import { useEffect, useRef, useState } from "react";
import {
  WashingMachine,
  Truck,
  Timer,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Phone,
  ChatCircleText,
  Check,
  ListChecks,
  TShirt,
  Baby,
  Sparkle,
  ArrowRight,
  ArrowUpRight,
  X,
} from "@phosphor-icons/react";

/* ---------------------------------- data ---------------------------------- */

const WA_LAUNDRY = "6281234567890";
const WA_DEV = "6281546543913";

const waLink = (text) =>
  `https://wa.me/${WA_LAUNDRY}?text=${encodeURIComponent(text)}`;

const waDev = (text) =>
  `https://wa.me/${WA_DEV}?text=${encodeURIComponent(text)}`;

const NAV = [
  { label: "Layanan", href: "#layanan" },
  { label: "Harga", href: "#harga" },
  { label: "Cara Order", href: "#cara-order" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
];

const PRICES = [
  {
    name: "Kiloan Reguler",
    price: "Rp7rb",
    unit: "/kg",
    desc: "Cuci + kering + lipat. Selesai 2 hari.",
    cta: "Pesan via WhatsApp",
    href: waLink("Halo LaundryKilat! Saya mau order Kiloan Reguler."),
    features: ["Cuci, kering, lipat rapi", "Deterjen + pewangi standar", "Gratis antar min. 3 kg", "Garansi cuci ulang jika bau"],
    featured: false,
  },
  {
    name: "Kilat 1 Hari",
    price: "Rp12rb",
    unit: "/kg",
    desc: "Prioritas mesin. Masuk pagi, sore diambil.",
    cta: "Pesan via WhatsApp",
    href: waLink("Halo LaundryKilat! Saya mau order Kilat 1 Hari."),
    features: ["Semua isi paket Reguler", "Mesin prioritas, tanpa antre", "Pewangi premium", "Notifikasi WA tiap tahap", "Gratis antar tanpa minimum"],
    featured: true,
  },
  {
    name: "Satuan Premium",
    price: "Rp25rb",
    unit: "/pcs",
    desc: "Jas, gaun, boneka, sepatu. Dry clean.",
    cta: "Pesan via WhatsApp",
    href: waLink("Halo LaundryKilat! Saya mau tanya Satuan Premium."),
    features: ["Dry clean / wet clean khusus", "Spotting noda manual", "Packing gantung + cover", "Asuransi ganti rugi tertulis"],
    featured: false,
  },
];

const STEPS = [
  { n: "1", title: "Chat WhatsApp", desc: "Klik tombol order, tulis alamat jemput." },
  { n: "2", title: "Kami jemput", desc: "Kurir datang, timbang di depan Anda." },
  { n: "3", title: "Dicuci + update", desc: "Foto nota + update status via WA." },
  { n: "4", title: "Diantar bersih", desc: "Bayar tunai / QRIS saat terima." },
];

const TESTIS = [
  { quote: "Seragam kerja 8 kg dijemput jam 9, besok sore sudah rapi dan wangi.", name: "Bu Ratna", role: "Ibu rumah tangga, Katapang" },
  { quote: "Jas kondangan dry clean-nya rapi, cover gantung, tidak bau kimia.", name: "Dadan H.", role: "Karyawan, Soreang" },
  { quote: "Langganan kos 20 kamar. Nota jelas per kamar, tidak pernah tertukar.", name: "Kang Yana", role: "Pemilik kos, Banjaran" },
];

const FAQS = [
  { q: "Berapa minimum order antar-jemput?", a: "Reguler minimum 3 kg untuk gratis antar radius 3 km (Katapang, Soreang, Banjaran). Di bawah itu tambah Rp5rb ongkir. Paket Kilat gratis antar tanpa minimum." },
  { q: "Bagaimana jika pakaian hilang atau rusak?", a: "Setiap order difoto dan dicatat per pcs saat penimbangan. Klaim maksimal 1x24 jam setelah terima, diganti maksimal 10x ongkos cuci per pcs sesuai nota tertulis." },
  { q: "Bisa bayar apa saja?", a: "Tunai, QRIS, dan transfer BCA. Bayar di akhir saat pakaian diterima, bukan di muka." },
  { q: "Apakah terima boneka, sepatu, dan karpet?", a: "Terima. Boneka dan sepatu masuk Satuan Premium. Karpet dihitung per meter, cuci di workshop agar kering sempurna." },
  { q: "Jam operasional?", a: "Senin–Sabtu 07.00–20.00, Minggu 08.00–15.00. Penjemputan terakhir 1 jam sebelum tutup." },
];

/* Harga jasa TIDAK ditulis di demo ini. Satu-satunya sumber harga ada di
   halaman paket (URL_JASA) supaya tidak ada dua daftar harga yang bertabrakan
   dan membingungkan calon klien. */
const URL_JASA = "https://my-portfolio-three-azure-32.vercel.app/jasa";

const JASA_ISI = [
  "Katalog produk / daftar layanan beserta harganya",
  "Tombol order langsung masuk ke WhatsApp Anda",
  "Bot WhatsApp yang menjawab pertanyaan umum",
  "Rapi dibuka di HP dan cepat dimuat",
];

/* ------------------------------- reveal hook ------------------------------ */

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShow(true), io.disconnect()),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-700 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

/* --------------------------------- navbar --------------------------------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 z-40 w-full bg-base-100/85 backdrop-blur-xl border-b border-base-content/10">
      <nav aria-label="Navigasi utama" className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <a href="#atas" className="flex items-center gap-2 font-extrabold text-lg tracking-tight" aria-label="LaundryKilat - ke atas">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-primary text-primary-content">
            <WashingMachine size={20} weight="bold" aria-hidden="true" />
          </span>
          Laundry<span className="text-primary">Kilat</span>
        </a>
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="btn btn-ghost btn-sm font-semibold">{n.label}</a>
            </li>
          ))}
          <li>
            <a href={waLink("Halo LaundryKilat! Saya mau order laundry.")} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm ml-2">
              <ChatCircleText size={16} weight="bold" aria-hidden="true" />
              Pesan via WhatsApp
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="btn btn-ghost btn-square lg:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <ListChecks size={22} aria-hidden="true" />}
        </button>
      </nav>
      {open && (
        <ul className="lg:hidden menu bg-base-100 border-t border-base-content/10 p-3 space-y-1" role="menu">
          {NAV.map((n) => (
            <li key={n.href} role="none">
              <a role="menuitem" href={n.href} onClick={() => setOpen(false)} className="font-semibold">{n.label}</a>
            </li>
          ))}
          <li role="none">
            <a role="menuitem" href={waLink("Halo LaundryKilat! Saya mau order laundry.")} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm mt-2">
              Pesan via WhatsApp
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}

/* ----------------------------------- app ----------------------------------- */

export default function App() {
  const [faqOpen, setFaqOpen] = useState(0);

  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans overflow-x-hidden">
      <a href="#konten" className="skip-link">Lompat ke konten utama</a>
      <Navbar />

      <main id="konten">
        {/* HERO — split screen */}
        <section id="atas" className="pt-16 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-10 lg:py-16 min-h-[calc(100dvh-4rem)]">
            <div className="lg:col-span-6">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary bg-primary/10 rounded-full px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                Katapang · Soreang · Banjaran
              </p>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                Laundry beres 1 hari, dijemput di depan pintu.
              </h1>
              <p className="mt-4 text-base md:text-lg opacity-70 leading-relaxed max-w-[55ch]">
                Kiloan mulai Rp7rb/kg. Gratis antar-jemput, update status via WA.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={waLink("Halo LaundryKilat! Saya mau order laundry.")} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  <ChatCircleText size={20} weight="bold" aria-hidden="true" />
                  Pesan via WhatsApp
                </a>
                <a href="#harga" className="btn btn-outline btn-lg">Lihat Harga</a>
              </div>
              <dl className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                {[
                  ["4.9/5", "rating Google"],
                  ["12rb+", "order selesai"],
                  ["1 hari", "paket kilat"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd className="text-2xl font-black text-primary">{v}</dd>
                    <dd className="text-xs opacity-60 font-medium">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-base-content/10 shadow-2xl">
                <img
                  src="https://picsum.photos/seed/laundry-rapi/960/720"
                  alt="Tumpukan pakaian bersih hasil laundry yang dilipat rapi"
                  className="w-full aspect-[4/3] object-cover"
                  loading="eager"
                  width={960}
                  height={720}
                />
                <div className="absolute bottom-3 left-3 right-3 sm:right-auto flex flex-wrap gap-2">
                  <span className="badge badge-lg bg-base-100/95 border-base-content/10 gap-1.5 font-semibold shadow">
                    <Truck size={15} className="text-primary" aria-hidden="true" /> Jemput gratis 3 km
                  </span>
                  <span className="badge badge-lg bg-base-100/95 border-base-content/10 gap-1.5 font-semibold shadow">
                    <Timer size={15} className="text-primary" aria-hidden="true" /> Kilat 1 hari
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-base-content/10 bg-base-200 px-4 py-3">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-success/15 text-success shrink-0">
                  <ShieldCheck size={20} weight="bold" aria-hidden="true" />
                </span>
                <p className="text-sm font-medium">Ditimbang di depan Anda, difoto per nota. Klaim garansi tertulis 1x24 jam.</p>
              </div>
            </div>
          </div>
        </section>

        {/* LAYANAN — bento asimetris */}
        <section id="layanan" className="scroll-mt-20 bg-base-200 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight max-w-xl">Semua urusan cucian, satu chat beres.</h2>
              <p className="mt-3 opacity-70 max-w-[65ch]">Pilih layanan di bawah, klik untuk langsung order via WhatsApp.</p>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              <Reveal className="md:col-span-2 md:row-span-2">
                <a
                  href={waLink("Halo! Saya mau order Cuci Kiloan.")}
                  target="_blank" rel="noopener noreferrer"
                  className="group relative rounded-2xl overflow-hidden border border-base-content/10 bg-base-100 block h-full min-h-72 hover:border-primary/50 hover:shadow-xl transition"
                >
                  <img src="https://picsum.photos/seed/laundry-mesin/900/700" alt="Mesin cuci laundry modern" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={900} height={700} />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-0 p-6 text-white">
                    <span className="badge bg-white/15 text-white border-white/25 font-bold">Paling laris</span>
                    <span className="block mt-2 text-2xl font-black">Cuci Kiloan</span>
                    <span className="block text-sm opacity-90">Mulai Rp7rb/kg · cuci, kering, lipat <span className="inline-flex items-center gap-1 font-bold">Order <ArrowRight size={14} aria-hidden="true" /></span></span>
                  </span>
                </a>
              </Reveal>
              <Reveal delay={80}>
                <a href={waLink("Halo! Saya mau order Dry Clean.")} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-base-content/10 bg-base-100 p-5 flex gap-4 items-start hover:border-primary/50 hover:shadow-lg transition h-full">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0"><Sparkle size={22} weight="bold" aria-hidden="true" /></span>
                  <span><span className="block font-extrabold">Dry Clean & Satuan</span><span className="block text-sm opacity-70 mt-1">Jas, gaun, boneka, sepatu. Mulai Rp25rb/pcs.</span></span>
                </a>
              </Reveal>
              <Reveal delay={140}>
                <a href={waLink("Halo! Saya mau order Setrika saja.")} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-base-content/10 bg-base-100 p-5 flex gap-4 items-start hover:border-primary/50 hover:shadow-lg transition h-full">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0"><TShirt size={22} weight="bold" aria-hidden="true" /></span>
                  <span><span className="block font-extrabold">Setrika Saja</span><span className="block text-sm opacity-70 mt-1">Rp5rb/kg. Cocok untuk baju kantor harian.</span></span>
                </a>
              </Reveal>
              <Reveal delay={100}>
                <a href={waLink("Halo! Saya mau order paket Baby & Karpet.")} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-base-content/10 bg-primary text-primary-content p-5 flex gap-4 items-start hover:shadow-lg transition h-full">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-white/20 shrink-0"><Baby size={22} weight="bold" aria-hidden="true" /></span>
                  <span><span className="block font-extrabold">Baby, Karpet & Gorden</span><span className="block text-sm opacity-90 mt-1">Deterjen hypoallergenic untuk bayi. Karpet per meter.</span></span>
                </a>
              </Reveal>
              <Reveal delay={160}>
                <a href={waLink("Halo! Saya mau langganan Kos & Kantor.")} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-base-content/10 bg-base-100 p-5 flex gap-4 items-start hover:border-primary/50 hover:shadow-lg transition h-full">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0"><Star size={22} weight="bold" aria-hidden="true" /></span>
                  <span><span className="block font-extrabold">Langganan Kos & Kantor</span><span className="block text-sm opacity-70 mt-1">Nota per kamar, jemput terjadwal, diskon 15%.</span></span>
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* HARGA */}
        <section id="harga" className="scroll-mt-20 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Harga jujur</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tight">Pilih paket, klik langsung order.</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {PRICES.map((p, i) => (
                <Reveal key={p.name} delay={i * 80} className="h-full">
                  <article className={`rounded-2xl border p-6 flex flex-col h-full ${p.featured ? "border-primary bg-primary text-primary-content shadow-xl md:-translate-y-2" : "border-base-content/15 bg-base-100"}`}>
                    {p.featured && <span className="badge bg-white/20 text-white border-white/30 font-bold self-start">Paling dipilih</span>}
                    <h3 className="mt-2 font-extrabold text-lg">{p.name}</h3>
                    <p className="mt-1 text-4xl font-black">{p.price}<span className={`text-base font-bold ${p.featured ? "opacity-80" : "opacity-60"}`}>{p.unit}</span></p>
                    <p className={`mt-2 text-sm ${p.featured ? "opacity-90" : "opacity-70"}`}>{p.desc}</p>
                    <ul className="mt-4 space-y-2 text-sm font-medium flex-1">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-2 items-start">
                          <Check size={16} weight="bold" className={`mt-0.5 shrink-0 ${p.featured ? "" : "text-primary"}`} aria-hidden="true" />{f}
                        </li>
                      ))}
                    </ul>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className={`btn mt-6 w-full ${p.featured ? "bg-white text-teal-800 border-white hover:bg-teal-50" : "btn-primary"}`}>
                      <ChatCircleText size={17} weight="bold" aria-hidden="true" />{p.cta}
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-5 text-sm opacity-60">Harga demo untuk contoh. Ganti dengan pricelist asli saat dipakai jualan.</p>
          </div>
        </section>

        {/* CARA ORDER — strip bernomor horizontal */}
        <section id="cara-order" className="scroll-mt-20 bg-secondary text-secondary-content py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Order dalam 2 menit.</h2>
            </Reveal>
            <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 70}>
                  <li className="rounded-2xl bg-white/10 border border-white/15 p-5 h-full">
                    <span className="text-4xl font-black opacity-40">{s.n}</span>
                    <p className="mt-1 font-extrabold">{s.title}</p>
                    <p className="mt-1 text-sm opacity-80">{s.desc}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal>
              <a href={waLink("Halo LaundryKilat! Saya mau order, alamat jemput saya: ")} target="_blank" rel="noopener noreferrer" className="btn btn-lg bg-white text-teal-900 border-white hover:bg-teal-50 mt-8">
                <ChatCircleText size={20} weight="bold" aria-hidden="true" />Pesan via WhatsApp
              </a>
            </Reveal>
          </div>
        </section>

        {/* TESTIMONI — 3 kutipan pendek */}
        <section id="testimoni" className="scroll-mt-20 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Reveal className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Kata tetangga.</h2>
              <p className="mt-3 opacity-70">Rating 4.9/5 dari 800+ ulasan Google. Ini tiga yang paling sering disebut.</p>
              <img src="https://picsum.photos/seed/laundry-lipat/640/420" alt="Pakaian laundry dilipat rapi siap antar" className="mt-6 rounded-2xl border border-base-content/10 w-full aspect-[3/2] object-cover" loading="lazy" width={640} height={420} />
            </Reveal>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {TESTIS.map((t, i) => (
                <Reveal key={t.name} delay={i * 80} className="h-full">
                  <figure className="rounded-2xl border border-base-content/15 bg-base-100 p-5 flex flex-col h-full">
                    <span className="flex gap-0.5 text-warning" aria-label="Rating 5 dari 5">
                      {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={15} weight="fill" aria-hidden="true" />)}
                    </span>
                    <blockquote className="mt-3 text-sm leading-relaxed flex-1">“{t.quote}”</blockquote>
                    <figcaption className="mt-4 text-sm"><span className="block font-extrabold">{t.name}</span><span className="block opacity-60 text-xs">{t.role}</span></figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ + KONTAK berdampingan */}
        <section id="faq" className="scroll-mt-20 bg-base-200 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <Reveal><h2 className="text-3xl md:text-4xl font-black tracking-tight">Sering ditanyakan.</h2></Reveal>
              <div className="mt-6 space-y-3">
                {FAQS.map((f, i) => (
                  <Reveal key={f.q} delay={i * 50}>
                    <div className={`rounded-2xl border bg-base-100 ${faqOpen === i ? "border-primary" : "border-base-content/15"}`}>
                      <button
                        type="button"
                        className="w-full text-left px-5 py-4 font-bold flex justify-between items-center gap-3"
                        aria-expanded={faqOpen === i}
                        onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}
                      >
                        {f.q}
                        <span className={`shrink-0 grid place-items-center w-7 h-7 rounded-full ${faqOpen === i ? "bg-primary text-primary-content" : "bg-base-200"}`}>{faqOpen === i ? "−" : "+"}</span>
                      </button>
                      {faqOpen === i && <p className="px-5 pb-5 text-sm leading-relaxed opacity-80">{f.a}</p>}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal className="lg:col-span-5 lg:sticky lg:top-24" delay={120}>
              <aside id="kontak" className="rounded-2xl bg-base-100 border border-base-content/15 p-6 scroll-mt-24">
                <h2 className="text-xl font-black">Kunjungi / hubungi.</h2>
                <ul className="mt-4 space-y-3 text-sm font-medium">
                  <li className="flex gap-2.5"><MapPin size={18} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />Jl. Raya Katapang No. 88, Kab. Bandung</li>
                  <li className="flex gap-2.5"><Clock size={18} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />Senin–Sabtu 07.00–20.00 · Minggu 08.00–15.00</li>
                  <li className="flex gap-2.5"><Phone size={18} className="text-primary shrink-0 mt-0.5" aria-hidden="true" /><a href="tel:+6281234567890" className="hover:text-primary underline-offset-2 hover:underline">0812-3456-7890</a></li>
                </ul>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <a href={waLink("Halo LaundryKilat! Saya mau order.")} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm"><ChatCircleText size={16} weight="bold" aria-hidden="true" />Chat WA</a>
                  <a href="https://maps.google.com/?q=Katapang+Kabupaten+Bandung" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm"><MapPin size={16} aria-hidden="true" />Rute Maps</a>
                </div>
                <div className="mt-4 rounded-xl overflow-hidden border border-base-content/10">
                  <img src="https://picsum.photos/seed/laundry-toko/640/300" alt="Tampak depan outlet laundry" className="w-full aspect-[21/10] object-cover" loading="lazy" width={640} height={300} />
                </div>
              </aside>
            </Reveal>
          </div>
        </section>

        {/* PORTOFOLIO JASA — mengarah ke halaman paket, bukan menulis harga lagi */}
        <section id="jasa" className="scroll-mt-20 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Portofolio MansxDev</p>
                <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tight max-w-2xl">Suka demo ini? Saya buatkan versi usaha Anda.</h2>
                <p className="mt-3 opacity-70 max-w-[65ch]">
                  Halaman yang Anda lihat ini adalah <strong>demo jualan no. 1</strong> (niche laundry).
                  Nama, daftar layanan, harga, nomor WA, dan foto diganti punya Anda.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 max-w-2xl text-sm font-medium">
                  {JASA_ISI.map((isi) => (
                    <li key={isi} className="flex gap-2 items-start">
                      <Check size={16} weight="bold" className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                      {isi}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120} className="lg:col-span-5">
                <div className="rounded-2xl border border-base-content/15 bg-base-100 p-6">
                  <h3 className="font-extrabold">Paket &amp; harga lengkapnya</h3>
                  <p className="mt-2 text-sm opacity-70">
                    Harga saya buka apa adanya di satu halaman: tiga paket, waktu pengerjaan, dan
                    apa saja yang Anda dapat di setiap paket.
                  </p>
                  <a
                    href={URL_JASA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg w-full mt-5"
                  >
                    Lihat paket &amp; harga
                    <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                  </a>
                  <a
                    href={waDev("Halo Mans! Saya mau dibuatkan website seperti demo LaundryKilat untuk usaha saya.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline w-full mt-3"
                  >
                    <ChatCircleText size={20} weight="bold" aria-hidden="true" />Chat MansxDev
                  </a>
                  <p className="mt-4 text-xs opacity-60">
                    Rohiman (MansxDev) · Katapang, Kabupaten Bandung. Rincian paket, harga, dan waktu
                    pengerjaan ada di halaman paket.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-neutral text-neutral-content py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="font-black text-lg">Laundry<span className="text-accent">Kilat</span> <span className="font-medium text-xs opacity-60">· demo by MansxDev</span></p>
            <p className="text-sm opacity-70 mt-1">© {new Date().getFullYear()} Demo jualan. Semua nomor & harga contoh.</p>
          </div>
          <nav aria-label="Navigasi footer" className="flex flex-wrap gap-2">
            {NAV.map((n) => <a key={n.href} href={n.href} className="btn btn-ghost btn-sm text-neutral-content/80">{n.label}</a>)}
            <a href="#jasa" className="btn btn-ghost btn-sm text-accent">Mau dibuatkan?</a>
          </nav>
        </div>
      </footer>

      {/* WA mengambang */}
      <a
        href={waLink("Halo LaundryKilat! Saya mau order laundry.")}
        target="_blank" rel="noopener noreferrer"
        aria-label="Order via WhatsApp"
        className="fixed bottom-5 right-5 z-40 btn btn-primary btn-circle btn-lg shadow-2xl hover:scale-105 active:scale-95 transition"
      >
        <ChatCircleText size={26} weight="fill" aria-hidden="true" />
      </a>
    </div>
  );
}
