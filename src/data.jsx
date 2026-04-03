import React from 'react';

// --- ICONS (Inline SVG) ---
export const IconSearch = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
export const IconFilter = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>;
export const IconWA = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.347.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.417z"/></svg>;
export const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
export const IconStar = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
export const IconMail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
export const IconArrowLeft = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12,19 5,12 12,5"></polyline></svg>;

// --- MOCK DATA ---
export const PRODUCTS = [
  { id: 1, sku: 'BP-001', name: 'Bunga Papan Wedding Klasik', price: 500000, disc: 5, city: 'Jakarta', cat: 'Papan', sold: 450, date: '2024-03-20', img: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop', desc: 'Rangkaian bunga papan pernikahan dengan desain klasik nan elegan.' },
  { id: 2, sku: 'BP-002', name: 'Papan Duka Cita Eksklusif', price: 850000, disc: 15, city: 'Bandung', cat: 'Papan', sold: 45, date: '2024-03-21', img: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&h=600&fit=crop', desc: 'Ungkapan belasungkawa terdalam dengan karangan bunga papan premium.' },
  { id: 3, sku: 'HB-001', name: 'Mawar Merah Bouquet', price: 300000, disc: 25, city: 'Jakarta', cat: 'Bouquet', sold: 820, date: '2024-03-18', img: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=600&h=600&fit=crop', desc: 'Bukit mawar merah segar isi 20 tangkai dengan pembungkus premium.' },
  { id: 4, sku: 'ST-001', name: 'Standing Flower Congratulation', price: 1200000, disc: 0, city: 'Surabaya', cat: 'Standing', sold: 120, date: '2024-03-19', img: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=600&fit=crop', desc: 'Standing flower mewah untuk ucapan selamat atas peresmian kantor.' },
  { id: 5, sku: 'BP-003', name: 'Papan Ucapan Selamat & Sukses', price: 600000, disc: 10, city: 'Medan', cat: 'Papan', sold: 388, date: '2024-03-15', img: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&h=600&fit=crop', desc: 'Karangan bunga papan untuk apresiasi kesuksesan rekan bisnis.' },
  { id: 6, sku: 'HB-002', name: 'Tulip Putih Elegant', price: 450000, disc: 10, city: 'Jakarta', cat: 'Bouquet', sold: 150, date: '2024-03-22', img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&h=600&fit=crop', desc: 'Buket tulip putih segar untuk suasana yang tenang dan elegan.' },
  { id: 7, sku: 'BP-004', name: 'Papan Grand Opening', price: 950000, disc: 5, city: 'Surabaya', cat: 'Papan', sold: 88, date: '2024-03-23', img: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=600&fit=crop', desc: 'Bunga papan megah untuk memeriahkan pembukaan usaha baru.' },
  { id: 8, sku: 'ST-002', name: 'Standing Flower Simplicity', price: 750000, disc: 0, city: 'Bandung', cat: 'Standing', sold: 65, date: '2024-03-24', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=600&fit=crop', desc: 'Standing flower minimalis dengan perpaduan warna yang lembut.' },
  { id: 9, sku: 'HB-003', name: 'Lily & Rose Mix', price: 550000, disc: 20, city: 'Medan', cat: 'Bouquet', sold: 210, date: '2024-03-25', img: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=600&fit=crop', desc: 'Perpaduan bunga lily dan mawar yang harum dan menawan.' },
  { id: 10, sku: 'BP-005', name: 'Papan Duka Cita Standard', price: 400000, disc: 0, city: 'Jakarta', cat: 'Papan', sold: 320, date: '2024-03-26', img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&h=600&fit=crop', desc: 'Bunga papan duka cita dengan desain standard namun penuh makna.' },
  { id: 11, sku: 'HB-004', name: 'Sun Flower Bouquet', price: 250000, disc: 15, city: 'Surabaya', cat: 'Bouquet', sold: 450, date: '2024-03-27', img: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=600&h=600&fit=crop', desc: 'Buket bunga matahari ceria untuk menyemangati hari orang tersayang.' },
  { id: 12, sku: 'ST-003', name: 'Standing Flower Premium', price: 1500000, disc: 10, city: 'Jakarta', cat: 'Standing', sold: 40, date: '2024-03-28', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&h=600&fit=crop', desc: 'Standing flower khusus dengan bunga-bunga import pilihan.' },
  { id: 13, sku: 'BP-006', name: 'Papan Selamat Ulang Tahun', price: 550000, disc: 0, city: 'Bandung', cat: 'Papan', sold: 125, date: '2024-03-29', img: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop&q=80', desc: 'Bunga papan meriah untuk perayaan ulang tahun rekan atau keluarga.' },
  { id: 14, sku: 'HB-005', name: 'Orchid Flower Box', price: 650000, disc: 5, city: 'Medan', cat: 'Bouquet', sold: 95, date: '2024-03-30', img: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&h=600&fit=crop', desc: 'Rangkaian anggrek dalam box eksklusif yang tahan lama.' },
  { id: 15, sku: 'ST-004', name: 'Standing Flower Colorful', price: 900000, disc: 10, city: 'Jakarta', cat: 'Standing', sold: 75, date: '2024-03-31', img: 'https://images.unsplash.com/photo-1471696035578-3d8c78d99571?w=600&h=600&fit=crop', desc: 'Standing flower dengan nuansa warna-warni yang ceria.' },
];

export const GALLERY_IMAGES = [
    'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=400&fit=crop'
];

export const TESTIMONIALS = [
    { id: 1, name: 'Santi Rahayu', review: 'Bunganya sangat segar dan pengirimannya tepat waktu. Sukses terus!', rate: 5 },
    { id: 2, name: 'Budi Santoso', review: 'Proses pemesanan via WA sangat mudah. AI-nya pintar membantu.', rate: 5 },
    { id: 3, name: 'Linda Wijaya', review: 'Papan bunganya mewah banget, jauh lebih bagus dari web lain.', rate: 5 },
    { id: 4, name: 'Andi Pratama', review: 'Fast response dan bunga sesuai foto. Rekomendasi banget!', rate: 4 },
];

export const sendWA = (p) => {
    const finalPrice = p.price - (p.price * p.disc / 100);
    const msg = `Halo, saya mau pesan:\nID: ${p.sku}\nProduk: ${p.name}\nHarga: Rp ${finalPrice.toLocaleString('id-ID')}\nArea: ${p.city}`;
    window.open(`https://api.whatsapp.com/send?phone=628123456789&text=${encodeURIComponent(msg)}`, '_blank');
};
