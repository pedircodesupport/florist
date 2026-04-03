import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
    IconArrowLeft, IconWA, IconStar, IconClose, 
    PRODUCTS, sendWA 
} from '../data';

const BestSellerPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const bestSellers = useMemo(() => {
        return PRODUCTS.filter(p => p.sold > 100).sort((a, b) => b.sold - a.sold);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
            {/* Header */}
            <header className="sticky top-0 bg-white z-50 shadow-sm border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link to="/" className="p-2 bg-slate-50 rounded-full text-slate-500 hover:text-pink-500 transition-colors">
                        <IconArrowLeft />
                    </Link>
                    <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase">Semua Best Seller</h1>
                </div>
            </header>

            {/* Grid */}
            <div className="px-4 grid grid-cols-2 gap-4 py-6">
                {bestSellers.map(p => {
                    const finalPrice = p.price - (p.price * p.disc / 100);
                    return (
                        <div 
                            key={p.id} 
                            className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col active:scale-[0.98] transition-all cursor-pointer"
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

            {/* Modal Detail Produk (Reusing from Home for consistency) */}
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
        </div>
    );
};

export default BestSellerPage;
