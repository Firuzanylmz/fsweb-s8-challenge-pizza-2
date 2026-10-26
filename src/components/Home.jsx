import { useState } from 'react'
import logo from '../../images/iteration-1-images/logo.svg'
import Footer from './Footer'

const gorseller = import.meta.glob(
  '../../images/iteration-2-images/**/*.{png,svg}',
  { eager: true, import: 'default' }
)

function gorsel(yol) {
  return gorseller[`../../images/iteration-2-images/${yol}`]
}

const kategoriler = [
  { id: 'ramen', isim: 'Ramen', ustIsim: 'YENİ! Kore', ikon: '1.svg' },
  { id: 'pizza', isim: 'Pizza', ustIsim: 'Pizza', ikon: '2.svg' },
  { id: 'burger', isim: 'Burger', ustIsim: 'Burger', ikon: '3.svg' },
  {
    id: 'fries',
    isim: 'French fries',
    ustIsim: 'Kızartmalar',
    ikon: '4.svg',
  },
  {
    id: 'fastfood',
    isim: 'Fast food',
    ustIsim: 'Fast food',
    ikon: '5.svg',
  },
  {
    id: 'drinks',
    isim: 'Soft drinks',
    ustIsim: 'Gazlı İçecek',
    ikon: '6.svg',
  },
]

const urunler = [
  {
    isim: 'Terminal Pizza',
    kategori: 'pizza',
    resim: 'food-1.png',
    fiyat: 60,
    puan: '4.9',
    yorum: 200,
  },
  {
    isim: 'Position Absolute Acı Pizza',
    kategori: 'pizza',
    resim: 'food-2.png',
    fiyat: 85.5,
    puan: '4.9',
    yorum: 200,
  },
  {
    isim: 'useEffect Tavuklu Burger',
    kategori: 'burger',
    resim: 'food-3.png',
    fiyat: 75,
    puan: '4.9',
    yorum: 200,
  },
]

function ProductCard({ urun, onOrder }) {
  return (
    <article className="product-card">
      <img
        src={gorsel(`pictures/${urun.resim}`)}
        alt={urun.isim}
        loading="lazy"
      />

      <h3>{urun.isim}</h3>

      <div className="product-meta">
        <span>{urun.puan}</span>
        <span>({urun.yorum})</span>
        <strong>{urun.fiyat.toFixed(2)}₺</strong>
      </div>

      <button
        className="product-order"
        type="button"
        onClick={onOrder}
      >
        Position Absolute Acı Pizza sipariş et
      </button>
    </article>
  )
}

export default function Home({ onOrder }) {
  const [kategori, setKategori] = useState('pizza')

  const gorunenUrunler =
    kategori === 'pizza'
      ? urunler
      : urunler.filter((urun) => urun.kategori === kategori)

  function kategoriSec(id) {
    setKategori(id)
    document.getElementById('menu')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <>
      <main>
        <section className="home-page" aria-label="Hoş geldiniz">
          <img
            className="home-logo"
            src={logo}
            alt="Teknolojik Yemekler"
          />

          <p className="hero-tagline">fırsatı kaçırma</p>

          <h1>
            KOD ACIKTIRIR
            <br />
            PİZZA, DOYURUR
          </h1>

          <button
            className="home-order-button"
            type="button"
            onClick={onOrder}
          >
            ACIKTIM
          </button>
        </section>

        <nav className="category-bar" aria-label="Yemek kategorileri">
          <div className="category-bar-inner">
            {kategoriler.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => kategoriSec(item.id)}
              >
                <img src={gorsel(`icons/${item.ikon}`)} alt="" />
                <span>{item.ustIsim}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="home-content">
          <section className="promo-grid" aria-label="Öne çıkan menüler">
            <article className="promo-card promo-main">
              <h2>Özel<br />Lezzetus</h2>
              <p>Position: Absolute Acı Burger</p>
              <button type="button" onClick={onOrder}>
                SİPARİŞ VER
              </button>
            </article>

            <article className="promo-card promo-burger">
              <h2>Hackathlon<br />Burger Menü</h2>
              <button type="button" onClick={onOrder}>
                SİPARİŞ VER
              </button>
            </article>

            <article className="promo-card promo-delivery">
              <h2>
                <span>Çoooook</span> hızlı
                <br />
                npm gibi kurye
              </h2>
              <button type="button" onClick={onOrder}>
                SİPARİŞ VER
              </button>
            </article>
          </section>

          <section className="menu-section" id="menu">
            <p className="menu-tagline">en çok paketlenen menüler</p>
            <h2>Acıktıran Kodlara Doyuran Lezzetler</h2>

            <div className="menu-categories" aria-label="Menüyü filtrele">
              {kategoriler.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={kategori === item.id ? 'active' : ''}
                  aria-pressed={kategori === item.id}
                  onClick={() => setKategori(item.id)}
                >
                  <img src={gorsel(`icons/${item.ikon}`)} alt="" />
                  {item.isim}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {gorunenUrunler.map((urun) => (
                <ProductCard
                  key={urun.isim}
                  urun={urun}
                  onOrder={onOrder}
                />
              ))}
            </div>

            {gorunenUrunler.length === 0 && (
              <p className="empty-menu" role="status">
                Bu kategoride henüz ürün bulunmuyor.
              </p>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}