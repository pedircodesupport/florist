import React, { useState, useMemo } from 'react';

// --- ICONS (Inline SVG) ---
const IconSearch = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconFilter = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>;
const IconWA = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.347.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.417z"/></svg>;
const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconStar = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
const IconMail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;

// --- MOCK DATA ---
const PRODUCTS = [
  { id: 1, sku: 'BP-001', name: 'Bunga Papan Wedding Klasik', price: 500000, disc: 5, city: 'Jakarta', cat: 'Papan', sold: 450, date: '2024-03-20', img: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600', desc: 'Rangkaian bunga papan pernikahan dengan desain klasik nan elegan.' },
  { id: 2, sku: 'BP-002', name: 'Papan Duka Cita Eksklusif', price: 850000, disc: 15, city: 'Bandung', cat: 'Papan', sold: 45, date: '2024-03-21', img: 'https://images.unsplash.com/photo-1596073413908-4412c0117a7a?w=600', desc: 'Ungkapan belasungkawa terdalam dengan karangan bunga papan premium.' },
  { id: 3, sku: 'HB-001', name: 'Mawar Merah Bouquet', price: 300000, disc: 25, city: 'Jakarta', cat: 'Bouquet', sold: 820, date: '2024-03-18', img: 'https://images.unsplash.com/photo-1561181286-d3fea73e413f?w=600', desc: 'Bukit mawar merah segar isi 20 tangkai dengan pembungkus premium.' },
  { id: 4, sku: 'ST-001', name: 'Standing Flower Congratulation', price: 1200000, disc: 0, city: 'Surabaya', cat: 'Standing', sold: 120, date: '2024-03-19', img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600', desc: 'Standing flower mewah untuk ucapan selamat atas peresmian kantor.' },
  { id: 5, sku: 'BP-003', name: 'Papan Ucapan Selamat & Sukses', price: 600000, disc: 10, city: 'Medan', cat: 'Papan', sold: 388, date: '2024-03-15', img: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=600', desc: 'Karangan bunga papan untuk apresiasi kesuksesan rekan bisnis.' },
];

const GALLERY_IMAGES = [
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400',
    'https://images.unsplash.com/photo-1525310238801-d03f99039ed4?w=400',
    'https://images.unsplash.com/photo-1550000151-093c4176774e?w=400'
];

const TESTIMONIALS = [
    { id: 1, name: 'Santi Rahayu', review: 'Bunganya sangat segar dan pengirimannya tepat waktu. Sukses terus!', rate: 5 },
    { id: 2, name: 'Budi Santoso', review: 'Proses pemesanan via WA sangat mudah. AI-nya pintar membantu.', rate: 5 },
    { id: 3, name: 'Linda Wijaya', review: 'Papan bunganya mewah banget, jauh lebih bagus dari web lain.', rate: 5 },
    { id: 4, name: 'Andi Pratama', review: 'Fast response dan bunga sesuai foto. Rekomendasi banget!', rate: 4 },
];

const App = () => {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('Semua');
  const [sort, setSort] = useState('newest');
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState('Semua');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter & Sort Logic
  const filtered = useMemo(() => {
    let res = PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      const matchCity = city === 'Semua' || p.city === city;
      const matchCat = category === 'Semua' || p.cat === category;
      return matchSearch && matchCity && matchCat;
    });

    return [...res].sort((a, b) => {
      const finalA = a.price - (a.price * a.disc / 100);
      const finalB = b.price - (b.price * b.disc / 100);
      if (sort === 'low_to_high') return finalA - finalB;
      if (sort === 'high_to_low') return finalB - finalA;
      if (sort === 'popular') return b.sold - a.sold;
      if (sort === 'discount') return b.disc - a.disc;
      return new Date(b.date) - new Date(a.date);
    });
  }, [search, city, sort, category]);

  // Best Seller Logic
  const bestSellers = useMemo(() => {
    return PRODUCTS.filter(p => p.sold > 100).sort((a, b) => b.sold - a.sold);
  }, []);

  const sendWA = (p) => {
    const finalPrice = p.price - (p.price * p.disc / 100);
    const msg = `Halo, saya mau pesan:\nID: ${p.sku}\nProduk: ${p.name}\nHarga: Rp ${finalPrice.toLocaleString('id-ID')}\nArea: ${p.city}`;
    window.open(`https://api.whatsapp.com/send?phone=628123456789&text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header with Search and Pink Accents */}
      <header className="sticky top-0 bg-white z-50 shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Row 1: Profile & WhatsApp / Mail Icons */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-md">
                F
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 leading-tight">
                  Selamat datang 👋
                </span>
                <span className="font-black text-slate-800 text-sm tracking-tight uppercase">FLORIST.AI</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 hover:text-pink-500 transition-colors">
                <IconWA />
              </button>
              <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 hover:text-pink-500 transition-colors">
                <IconMail />
              </button>
            </div>
          </div>
          
          {/* Row 2: Search Bar with Pink Focus */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <IconSearch />
            </div>
            <input 
              type="text" 
              placeholder="Cari produk favoritmu..." 
              className="w-full h-11 bg-slate-50 border-none rounded-full px-12 text-sm text-slate-600 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-pink-200 transition-all shadow-inner"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button 
              onClick={() => setShowFilter(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-pink-500 transition-colors"
            >
              <IconFilter />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="px-4 pt-6">
        <div className="relative w-full aspect-[21/9] bg-gradient-to-br from-pink-500 to-rose-600 rounded-[2rem] overflow-hidden shadow-xl shadow-pink-100 p-6 flex flex-col justify-center border-4 border-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <span className="text-[10px] font-black text-pink-100 tracking-widest uppercase mb-1 drop-shadow-sm">Promo Ramadan</span>
            <h2 className="text-xl font-black text-white leading-none mb-2 drop-shadow-md">GRATIS ONGKIR <br/>SE-INDONESIA</h2>
            <p className="text-[10px] text-pink-50 font-bold opacity-90 max-w-[150px]">Pesan sekarang, sampai dalam 3 jam ke lokasi.</p>
            <div className="mt-3">
                <button className="bg-white text-pink-600 px-4 py-1.5 rounded-full text-[10px] font-black shadow-lg">AMBIL PROMO</button>
            </div>
        </div>
      </div>

      {/* Best Seller Section */}
      <div className="mt-8 mb-8">
        <div className="px-4 flex justify-between items-end mb-4">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2 tracking-tight uppercase">
                <span className="w-1.5 h-4 bg-pink-500 rounded-full"></span>
                BEST SELLER
            </h2>
            <span className="text-[10px] font-bold text-pink-500">Lihat Semua</span>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 no-scrollbar pb-2">
            {bestSellers.map(p => (
                <div 
                    key={p.id} 
                    className="flex-shrink-0 w-32 bg-white rounded-2xl p-2 border border-slate-100 shadow-sm active:scale-95 transition-all"
                    onClick={() => setSelectedProduct(p)}
                >
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2">
                        <img src={p.img} className="w-full h-full object-cover" alt="" />
                        <div className="absolute top-1 left-1 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-md text-[8px] font-black text-pink-500 shadow-sm">HOT</div>
                    </div>
                    <h3 className="text-[10px] font-black leading-tight line-clamp-1 mb-1">{p.name}</h3>
                    <p className="text-[10px] font-black text-pink-600 tracking-tighter">Rp {(p.price - (p.price * p.disc / 100)).toLocaleString()}</p>
                </div>
            ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-slate-50 py-4 mb-2 border-y border-slate-100">
        <div className="flex gap-2 overflow-x-auto px-4 no-scrollbar">
            {['Semua', 'Papan', 'Bouquet', 'Standing'].map(c => (
            <button 
                key={c}
                onClick={() => setCategory(c)}
                className={`px-6 py-2 rounded-full text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest border ${category === c ? 'bg-pink-500 text-white border-pink-500 shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}
            >
                {c}
            </button>
            ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="px-4 grid grid-cols-2 gap-4 py-4">
        {filtered.map(p => {
          const finalPrice = p.price - (p.price * p.disc / 100);
          return (
            <div 
              key={p.id} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col active:scale-[0.98] transition-all"
              onClick={() => setSelectedProduct(p)}
            >
              <div className="relative aspect-[4/5]">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                {p.disc > 0 && <span className="absolute top-3 left-3 bg-pink-500 text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-lg">-{p.disc}%</span>}
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[8px] font-black text-slate-900 shadow-sm">{p.city}</span>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <div className="flex items-center gap-1 mb-1.5 opacity-60">
                  <IconStar />
                  <span className="text-[9px] font-bold text-slate-700">4.9</span>
                  <span className="text-[8px] text-slate-400">({p.sold} terjual)</span>
                </div>
                <h3 className="text-xs font-black leading-tight line-clamp-2 mb-3 flex-grow text-slate-800">{p.name}</h3>
                <div className="mb-4">
                  {p.disc > 0 ? (
                    <>
                      <p className="text-[8px] text-slate-400 line-through mb-0.5">Rp {p.price.toLocaleString()}</p>
                      <p className="text-sm font-black text-pink-600 tracking-tighter">Rp {finalPrice.toLocaleString()}</p>
                    </>
                  ) : (
                    <p className="text-sm font-black text-pink-600 tracking-tighter">Rp {p.price.toLocaleString()}</p>
                  )}
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); sendWA(p); }}
                  className="w-full py-3 bg-pink-500 text-white rounded-2xl text-[9px] font-black flex items-center justify-center gap-2 active:bg-pink-600 transition-all uppercase tracking-widest shadow-lg shadow-pink-100"
                >
                  <IconWA /> Pesan
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gallery */}
      <div className="px-4 py-10 bg-white mt-10 rounded-t-[3rem] border-t border-slate-100">
        <div className="mb-6 px-2">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2 tracking-tight uppercase">
                <span className="w-1.5 h-4 bg-pink-500 rounded-full"></span>
                GALERI PENGIRIMAN
            </h2>
            <p className="text-[10px] text-slate-400 font-bold mt-1 ml-3.5 italic opacity-80">Bukti asli hasil kerja kami di lokasi acara.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 px-2">
            {GALLERY_IMAGES.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-[1.5rem] overflow-hidden border-2 border-slate-50 shadow-inner">
                    <img src={img} className="w-full h-full object-cover" alt="Hasil Pengiriman" />
                </div>
            ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="px-4 py-10 bg-slate-50">
        <div className="mb-6 px-2">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2 tracking-tight uppercase">
                <span className="w-1.5 h-4 bg-pink-500 rounded-full"></span>
                APA KATA MEREKA
            </h2>
            <p className="text-[10px] text-slate-400 font-bold mt-1 ml-3.5 italic opacity-80">Ulasan jujur dari pelanggan setia kami.</p>
        </div>
        <div className="flex gap-4 overflow-x-auto px-2 no-scrollbar pb-4">
            {TESTIMONIALS.map(t => (
                <div key={t.id} className="flex-shrink-0 w-64 bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm relative">
                    <div className="flex gap-1 mb-3">
                        {[...Array(t.rate)].map((_, i) => <IconStar key={i} />)}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-5 italic">
                        "{t.review}"
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 font-black text-[10px] uppercase shadow-inner">
                            {t.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-800">{t.name}</span>
                            <span className="text-[8px] font-bold text-green-500 flex items-center gap-1">
                                <div className="w-1 h-1 bg-green-500 rounded-full"></div> Pembeli Terverifikasi
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white px-8 pt-16 pb-32">
        <div className="flex flex-col gap-10">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white font-black">F</div>
                    <span className="font-black text-lg tracking-tighter uppercase">FLORIST.AI</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium max-w-xs">
                    Pelopor pengiriman bunga digital dengan integrasi AI pertama di Indonesia. Kualitas premium, pengiriman 3 jam, garansi uang kembali.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-10">
                <div>
                    <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-pink-500">Bantuan</h3>
                    <ul className="flex flex-col gap-3 text-[11px] text-slate-400 font-bold">
                        <li className="hover:text-white transition-colors cursor-pointer">Hubungi Kami</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Syarat & Ketentuan</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Kebijakan Privasi</li>
                        <li className="hover:text-white transition-colors cursor-pointer">FAQ</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-pink-500">Kantor</h3>
                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                        Ruko Sinpasa Summarecon<br/>Blok B-32, Bekasi<br/>Jawa Barat, 17142
                    </p>
                </div>
            </div>

            <div className="pt-8 border-t border-slate-800">
                <h3 className="text-[9px] font-black uppercase tracking-widest mb-4 text-slate-500">Metode Pembayaran Aman</h3>
                <div className="flex flex-wrap gap-3 opacity-40 grayscale hover:grayscale-0 transition-all">
                    <div className="h-7 w-14 bg-white rounded flex items-center justify-center text-[8px] font-black text-slate-900">MIDTRANS</div>
                    <div className="h-7 w-12 bg-white rounded flex items-center justify-center text-[8px] font-black text-blue-800 italic">QRIS</div>
                    <div className="h-7 w-12 bg-white rounded flex items-center justify-center text-[8px] font-black text-blue-900 font-serif">BCA</div>
                    <div className="h-7 w-12 bg-white rounded flex items-center justify-center text-[8px] font-black text-green-700">GOPAY</div>
                </div>
            </div>

            <p className="text-center text-[10px] text-slate-600 font-black tracking-widest mt-4">
                © 2026 FLORIST.AI • ALL RIGHTS RESERVED
            </p>
        </div>
      </footer>

      {/* Filter Drawer */}
      {showFilter && (
        <div className="fixed inset-0 z-[60] flex items-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setShowFilter(false)} />
          <div className="relative w-full bg-white rounded-t-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-black text-xl text-slate-900 tracking-tight uppercase">Filter Produk</h2>
              <button onClick={() => setShowFilter(false)} className="p-2 bg-slate-50 rounded-full"><IconClose /></button>
            </div>

            <div className="space-y-8 max-h-[60vh] overflow-y-auto no-scrollbar pb-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-4 block tracking-widest">Urutkan Harga</label>
                <div className="grid grid-cols-1 gap-2">
                  <button onClick={() => setSort('newest')} className={`py-4 px-5 rounded-2xl text-xs font-black border text-left transition-all ${sort === 'newest' ? 'bg-pink-50 text-pink-600 border-pink-500' : 'bg-slate-50 border-transparent text-slate-400'}`}>Produk Terbaru</button>
                  <button onClick={() => setSort('low_to_high')} className={`py-4 px-5 rounded-2xl text-xs font-black border text-left transition-all ${sort === 'low_to_high' ? 'bg-pink-50 text-pink-600 border-pink-500' : 'bg-slate-50 border-transparent text-slate-400'}`}>Harga: Rendah ke Tinggi</button>
                  <button onClick={() => setSort('high_to_low')} className={`py-4 px-5 rounded-2xl text-xs font-black border text-left transition-all ${sort === 'high_to_low' ? 'bg-pink-50 text-pink-600 border-pink-500' : 'bg-slate-50 border-transparent text-slate-400'}`}>Harga: Tinggi ke Rendah</button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-4 block tracking-widest">Wilayah Operasional</label>
                <div className="flex flex-wrap gap-2">
                  {['Semua', 'Jakarta', 'Bandung', 'Surabaya', 'Medan'].map(c => (
                    <button 
                      key={c}
                      onClick={() => setCity(c)}
                      className={`px-6 py-2.5 rounded-xl text-xs font-black border transition-all ${city === c ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200' : 'bg-white border-slate-100 text-slate-400'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowFilter(false)}
              className="w-full py-5 bg-pink-500 text-white rounded-[2rem] font-black mt-6 shadow-2xl shadow-pink-200 active:bg-pink-600 transition-colors uppercase text-xs tracking-widest"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      )}

      {/* Modal Detail Produk */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-t-[3rem] sm:rounded-[3rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[95vh]">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-6 right-6 z-10 p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30"
            >
              <IconClose />
            </button>
            
            <div className="overflow-y-auto no-scrollbar flex-grow pb-12">
              <div className="relative aspect-square">
                <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
              </div>
              
              <div className="px-8 -mt-6 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-pink-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-lg shadow-pink-100">{selectedProduct.cat}</span>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    <IconStar />
                    <span className="text-xs font-black text-slate-800">4.9</span>
                    <span className="text-[10px] text-slate-400 font-bold">({selectedProduct.sold} terjual)</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-black text-slate-900 leading-none mb-3 tracking-tight uppercase">{selectedProduct.name}</h2>
                <p className="text-[10px] text-slate-400 font-black mb-8 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-500 uppercase">{selectedProduct.sku}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="uppercase">{selectedProduct.city}</span>
                </p>
                
                <div className="flex items-center gap-4 mb-8 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                  {selectedProduct.disc > 0 ? (
                    <div className="flex flex-col">
                        <span className="text-[10px] text-pink-500 font-black uppercase mb-1">Promo Terbatas</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-slate-900 tracking-tighter">Rp {(selectedProduct.price - (selectedProduct.price * selectedProduct.disc / 100)).toLocaleString()}</span>
                            <span className="text-xs text-slate-300 line-through font-bold">Rp {selectedProduct.price.toLocaleString()}</span>
                        </div>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-black uppercase mb-1">Harga Final</span>
                        <span className="text-3xl font-black text-slate-900 tracking-tighter">Rp {selectedProduct.price.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col gap-1 shadow-sm">
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Estimasi</p>
                      <p className="text-xs font-black text-slate-900">3 Jam Sampai</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col gap-1 shadow-sm">
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Kualitas</p>
                      <p className="text-xs font-black text-slate-900">Bunga Segar</p>
                  </div>
                </div>

                <div className="mb-10">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Tentang Produk</label>
                  <p className="text-xs text-slate-500 leading-relaxed font-bold opacity-80 italic">
                    "{selectedProduct.desc} Dirangkai khusus oleh florist lokal berpengalaman di {selectedProduct.city}. Kami memastikan detail ucapan terjaga dengan standar premium."
                  </p>
                </div>

                <button 
                  onClick={() => sendWA(selectedProduct)}
                  className="w-full py-5 bg-pink-600 text-white rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-2xl shadow-pink-200 active:scale-95 transition-all uppercase text-xs tracking-widest"
                >
                  <IconWA /> Pesan via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigasi Bawah */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t flex justify-around items-center h-20 px-8 sm:hidden z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <button className="text-pink-600 flex flex-col items-center gap-1.5 transition-all">
          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Katalog</span>
        </button>
        <button className="text-slate-300 flex flex-col items-center gap-1.5 opacity-60">
          <div className="w-5 h-5 bg-slate-100 rounded-md"></div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Lacak</span>
        </button>
        <button className="text-slate-300 flex flex-col items-center gap-1.5 opacity-60">
          <div className="w-5 h-5 bg-slate-100 rounded-md"></div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Kontak</span>
        </button>
      </div>
    </div>
  );
};

export default App;