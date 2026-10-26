import footerLogo from '../../images/iteration-2-images/footer/logo-footer.svg'

const gorseller = import.meta.glob(
  '../../images/iteration-2-images/footer/**/*.png',
  { eager: true, import: 'default' }
)

function gorsel(yol) {
  return gorseller[
    `../../images/iteration-2-images/footer/${yol}`
  ]
}

const menuler = [
  'Terminal Pizza',
  '5 Kişilik Hackathon Pizza',
  'useEffect Tavuklu Pizza',
  'Beyaz Console Frosty',
  'Testler Geçti Mutlu Burger',
  'Position Absolute Acı Burger',
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <section className="footer-contact" aria-label="İletişim">
          <img
            className="footer-logo"
            src={footerLogo}
            alt="Teknolojik Yemekler"
          />

          <address>
            <p>
              <img src={gorsel('icons/icon-1.png')} alt="" />
              <span>341 Londonderry Road,<br />İstanbul Türkiye</span>
            </p>
            <p>
              <img src={gorsel('icons/icon-2.png')} alt="" />
              <a href="mailto:iletisim@teknolojikyemekler.com">
                iletisim@teknolojikyemekler.com
              </a>
            </p>
            <p>
              <img src={gorsel('icons/icon-3.png')} alt="" />
              <a href="tel:+902161234567">+90 216 123 45 67</a>
            </p>
          </address>
        </section>

        <section className="footer-menu">
          <h2>Sıcacık Menüler</h2>
          <ul>
            {menuler.map((menu) => (
              <li key={menu}>{menu}</li>
            ))}
          </ul>
        </section>

        <section className="footer-instagram">
          <h2>Instagram</h2>
          <div className="instagram-grid">
            {[0, 1, 2, 3, 4, 5].map((sayi) => (
              <img
                key={sayi}
                src={gorsel(`insta/li-${sayi}.png`)}
                alt={`Menümüzden lezzetler ${sayi + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        </section>
      </div>

      <div className="footer-bottom">
        <p>© 2023 Teknolojik Yemekler.</p>
      </div>
    </footer>
  )
}