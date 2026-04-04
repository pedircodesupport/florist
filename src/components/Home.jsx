import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    IconSearch, IconFilter, IconWA, IconMail, IconStar, IconClose, IconArrowLeft, IconHome, 
    PRODUCTS, GALLERY_IMAGES, TESTIMONIALS, sendWA, SITE_CONFIG 
} from '../data';

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('Semua');
  const [sort, setSort] = useState('newest');
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState('Semua');
  const [visibleCount, setVisibleCount] = useState(4);
  const [citySearch, setCitySearch] = useState('');

  // Diagnostic Log
  console.log('Home Render:', { hasSiteConfig: !!SITE_CONFIG, productCount: PRODUCTS?.length });

  // SEO & Schema.org Logic
  React.useEffect(() => {
    document.title = SITE_CONFIG?.title || 'Florist.AI';
    
    // Inject JSON-LD
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": SITE_CONFIG.name,
      "description": SITE_CONFIG.description,
      "url": SITE_CONFIG.url,
      "telephone": "+628123456789",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ruko Sinpasa Summarecon Bekasi",
        "addressLocality": "Bekasi",
        "addressRegion": "Jawa Barat",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-6.2238",
        "longitude": "106.9996"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);
  const loaderRef = React.useRef(null);

  // Gallery Swipe State
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [swipe, setSwipe] = useState({ x: 0, y: 0, rotation: 0, isMoving: false, direction: null });
  const touchStart = React.useRef({ x: 0, y: 0 });

  // Filter & Sort Logic
  const filtered = useMemo(() => {
    let res = (PRODUCTS || []).filter(p => {
      const matchSearch = (p.name?.toLowerCase() || '').includes(search.toLowerCase()) || 
                          (p.sku?.toLowerCase() || '').includes(search.toLowerCase());
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
  
  // Reset visibleCount when filters change
  React.useEffect(() => {
    setVisibleCount(4);
  }, [search, city, category, sort]);

  // Infinite Scroll Observer
  React.useEffect(() => {
    const options = {
        rootMargin: '250px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setVisibleCount(prev => {
                if (prev < filtered.length) return prev + 4;
                return prev;
            });
        }
    }, options);

    const currentLoader = loaderRef.current;
    if (currentLoader) {
        observer.observe(currentLoader);
    }

    return () => {
        if (currentLoader) observer.unobserve(currentLoader);
        observer.disconnect();
    };
  }, [filtered.length]);

  const visibleProducts = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  // Best Seller Logic
  const bestSellers = useMemo(() => {
    return (PRODUCTS || []).filter(p => (p.sold || 0) > 100).sort((a, b) => (b.sold || 0) - (a.sold || 0));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
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
                <h1 className="font-black text-slate-800 text-sm tracking-tight uppercase m-0">FLORIST.AI</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.open('https://wa.me/628123456789', '_blank')}
                className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/10 transition-all shadow-sm"
              >
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
            <span className="text-[10px] font-black text-pink-100 tracking-widest uppercase mb-1 drop-shadow-sm">Promo Lebaran</span>
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
            <Link to="/best-sellers" className="text-[10px] font-bold text-pink-500">Lihat Semua</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 no-scrollbar pb-2">
            {bestSellers.map(p => (
                <div 
                    key={p.id} 
                    className="flex-shrink-0 w-32 bg-white rounded-2xl p-2 border border-slate-100 shadow-sm active:scale-95 transition-all cursor-pointer"
                    onClick={() => setSelectedProduct(p)}
                >
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2">
                        <img 
                            src={p.img} 
                            className="w-full h-full object-cover img-skeleton" 
                            alt={p.name} 
                            loading={bestSellers.indexOf(p) < 4 ? "eager" : "lazy"}
                            onLoad={(e) => e.target.classList.remove('img-skeleton')}
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #fce7f3, #fda4af)'; }}
                        />
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
      <div className="px-4 mt-8 mb-4 flex justify-between items-end">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2 tracking-tight uppercase">
              <span className="w-1.5 h-4 bg-pink-500 rounded-full"></span>
              PRODUK KAMI
          </h2>
      </div>
      <div className="px-4 grid grid-cols-2 gap-4 py-4">
        {visibleProducts.map((p, idx) => {
          const finalPrice = p.price - (p.price * p.disc / 100);
          return (
            <div 
              key={p.id} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col active:scale-[0.98] transition-all cursor-pointer"
              onClick={() => setSelectedProduct(p)}
            >
              <div className="relative aspect-[4/5]">
                <img 
                  src={p.img} 
                  alt={p.name} 
                  className="w-full h-full object-cover img-skeleton" 
                  loading={idx < 4 ? "eager" : "lazy"} 
                  onLoad={(e) => e.target.classList.remove('img-skeleton')}
                  onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #fce7f3, #fda4af)'; }}
                />
                {p.disc > 0 && <span className="absolute top-3 left-3 bg-pink-500 text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-lg">-{p.disc}%</span>}
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[8px] font-black text-slate-900 shadow-sm">{p.city}</span>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <div className="flex items-center gap-1 mb-1.5 opacity-60">
                  <div className="w-2.5 h-2.5"><IconStar /></div>
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

      {/* Load More & Sentinel */}
      <div className="px-4 mb-8">
        {visibleCount < filtered.length ? (
            <div className="flex flex-col items-center gap-4">
                <button 
                    onClick={() => setVisibleCount(prev => prev + 4)}
                    className="px-8 py-3 bg-white border-2 border-pink-100 text-pink-500 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-pink-50 transition-all"
                >
                    Muat Lebih Banyak
                </button>
                <div ref={loaderRef} className="h-10 w-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce mx-0.5"></div>
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce mx-0.5 delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce mx-0.5 delay-200"></div>
                </div>
            </div>
        ) : filtered.length > 0 && (
            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest py-8">Semua produk telah ditampilkan</p>
        )}
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
                <div 
                  key={idx} 
                  className="aspect-square rounded-[1.5rem] overflow-hidden border-2 border-slate-50 shadow-inner cursor-pointer active:scale-95 transition-all"
                  onClick={() => {
                    setActiveGalleryIndex(idx);
                    setIsGalleryOpen(true);
                  }}
                >
                    <img src={img} className="w-full h-full object-cover img-skeleton" alt={`Hasil Pengiriman ${idx + 1}`} loading="lazy" onLoad={(e) => e.target.classList.remove('img-skeleton')} onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #fce7f3, #fda4af)'; }} />
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
                <div className="relative">
                  <div className="absolute left-4 top-4 text-slate-400">
                    <IconSearch />
                  </div>
                  <input 
                    type="text"
                    placeholder="Cari Kota/Kabupaten..."
                    className="w-full h-12 bg-slate-50 border-none rounded-2xl pl-12 pr-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-pink-200 transition-all mb-3"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar py-1">
                    {['Semua', ...(SITE_CONFIG?.locations || [])]
                      .filter(c => c.toLowerCase().includes(citySearch?.toLowerCase() || ''))
                      .map(c => (
                      <button 
                        key={c}
                        onClick={() => setCity(c)}
                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black border transition-all ${city === c ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200' : 'bg-white border-slate-100 text-slate-400'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
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
                <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover img-skeleton" onLoad={(e) => e.target.classList.remove('img-skeleton')} onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #fce7f3, #fda4af)'; }} />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
              </div>
              
              <div className="px-8 -mt-6 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-pink-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-lg shadow-pink-100">{selectedProduct.cat}</span>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    <div className="w-3 h-3"><IconStar /></div>
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

      {/* Gallery Lightbox (Tinder Swipe) */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-xl animate-in fade-in">
          <button 
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-8 right-8 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white border border-white/20 transition-all"
          >
            <IconClose />
          </button>

          <div className="relative w-full max-w-sm aspect-[3/4]">
            {GALLERY_IMAGES.map((img, idx) => {
              const isActive = idx === activeGalleryIndex;
              if (!isActive && idx !== (activeGalleryIndex + 1) % GALLERY_IMAGES.length) return null;

              return (
                <div 
                  key={idx}
                  className={`absolute inset-0 tinder-card rounded-[2.5rem] overflow-hidden shadow-2xl bg-white ${isActive ? 'z-10' : 'z-0 scale-95 opacity-50'} ${swipe.isMoving && isActive ? 'tinder-card-moving' : ''} ${swipe.direction === 'right' && !swipe.isMoving ? 'animate-swipe-right' : ''} ${swipe.direction === 'left' && !swipe.isMoving ? 'animate-swipe-left' : ''}`}
                  style={isActive ? {
                    transform: `translate(${swipe.x}px, ${swipe.y}px) rotate(${swipe.rotation}deg)`,
                  } : {}}
                  onTouchStart={(e) => {
                    if (!isActive) return;
                    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                    setSwipe(prev => ({ ...prev, isMoving: true }));
                  }}
                  onTouchMove={(e) => {
                    if (!isActive) return;
                    const dx = e.touches[0].clientX - touchStart.current.x;
                    const dy = e.touches[0].clientY - touchStart.current.y;
                    setSwipe({
                        x: dx,
                        y: dy,
                        rotation: dx * 0.1,
                        isMoving: true,
                        direction: dx > 50 ? 'right' : dx < -50 ? 'left' : null
                    });
                  }}
                  onTouchEnd={() => {
                    if (!isActive) return;
                    if (Math.abs(swipe.x) > 100) {
                        // Swipe triggered
                        setSwipe(prev => ({ ...prev, isMoving: false }));
                        const nextIndex = swipe.direction === 'left' 
                            ? (activeGalleryIndex + 1) % GALLERY_IMAGES.length
                            : (activeGalleryIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
                        
                        // Wait for animation to finish (matching transition-duration in index.css)
                        setTimeout(() => {
                            setActiveGalleryIndex(nextIndex);
                            setSwipe({ x: 0, y: 0, rotation: 0, isMoving: false, direction: null });
                        }, 300);
                    } else {
                        // Reset position
                        setSwipe({ x: 0, y: 0, rotation: 0, isMoving: false, direction: null });
                    }
                  }}
                >
                  <img src={img} className="w-full h-full object-cover pointer-events-none img-skeleton" alt={`Hasil Pengiriman ${idx + 1}`} onLoad={(e) => e.target.classList.remove('img-skeleton')} onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #fce7f3, #fda4af)'; }} />
                  
                  {/* Swipe Overlays */}
                  <div className={`absolute top-10 left-10 border-4 border-green-500 text-green-500 font-black px-4 py-2 rounded-xl text-2xl uppercase tracking-widest -rotate-12 transition-opacity ${swipe.direction === 'right' ? 'opacity-100' : 'opacity-0'}`}>
                    LIKE
                  </div>
                  <div className={`absolute top-10 right-10 border-4 border-red-500 text-red-500 font-black px-4 py-2 rounded-xl text-2xl uppercase tracking-widest rotate-12 transition-opacity ${swipe.direction === 'left' ? 'opacity-100' : 'opacity-0'}`}>
                    NOPE
                  </div>

                  <div className="absolute bottom-10 left-0 right-0 px-8 text-center bg-gradient-to-t from-black/60 to-transparent pt-20 pb-6">
                    <p className="text-white font-black text-sm uppercase tracking-widest shadow-sm">Foto Real Pengiriman</p>
                    <p className="text-white/70 text-[10px] font-bold mt-1">Gambar {idx + 1} dari {GALLERY_IMAGES.length}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Controls */}
          <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-6 z-[110]">
             <button 
                onClick={() => setActiveGalleryIndex(prev => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
                className="w-12 h-12 bg-white/10 hover:bg-red-500/20 text-white rounded-full flex items-center justify-center border border-white/20 transition-all group"
             >
                <div className="group-hover:scale-110 transition-transform"><IconArrowLeft /></div>
             </button>
             <button 
                onClick={() => setIsGalleryOpen(false)}
                className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl font-black text-sm"
             >
                OK
             </button>
             <button 
                onClick={() => setActiveGalleryIndex(prev => (prev + 1) % GALLERY_IMAGES.length)}
                className="w-12 h-12 bg-white/10 hover:bg-green-500/20 text-white rounded-full flex items-center justify-center border border-white/20 transition-all group rotate-180"
             >
                <div className="group-hover:scale-110 transition-transform"><IconArrowLeft /></div>
             </button>
          </div>
        </div>
      )}

      {/* Navigasi Bawah */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t flex justify-around items-center h-20 px-8 sm:hidden z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-pink-600 flex flex-col items-center gap-1.5 transition-all"
        >
          <div className="w-8 h-8 flex items-center justify-center"><IconHome /></div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
        </button>
        <button 
          onClick={() => navigate('/best-sellers')}
          className="text-slate-400 flex flex-col items-center gap-1.5 opacity-80"
        >
          <div className="w-6 h-6 flex items-center justify-center"><IconStar /></div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Best Seller</span>
        </button>
        <button 
          onClick={() => window.open('https://wa.me/628123456789', '_blank')}
          className="text-[#25D366] flex flex-col items-center gap-1.5 transition-all"
        >
          <div className="w-8 h-8 flex items-center justify-center"><IconWA /></div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Whatsapp</span>
        </button>
      </div>

      {/* SEO Footer (Localized Service Areas) */}
      <footer className="mt-12 mb-24 px-6 py-8 border-t border-slate-100 bg-white opacity-80">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
              Area Pengiriman Kami
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
              {SITE_CONFIG.locations.map(loc => (
                <span key={loc} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full text-nowrap">
                  Toko Bunga {loc}
                </span>
              ))}
          </div>
          <p className="mt-6 text-[10px] text-slate-400 leading-relaxed font-medium">
            {SITE_CONFIG.description} Kami melayani pengiriman bunga 24 jam dengan jaminan kesegaran dan ketepatan waktu. 
            Cukup pesan via WhatsApp, bunga langsung sampai di lokasi Anda.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
