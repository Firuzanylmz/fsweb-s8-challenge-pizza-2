import { useState } from 'react'
import axios from 'axios'
import '../App.css'
import logo from '../../images/iteration-1-images/logo.svg'
import formBanner from '../../images/iteration-2-images/pictures/form-banner.png'
import Footer from './Footer'

const malzemeListesi = [
  'Pepperoni', 'Sosis', 'Kanada Jambonu', 'Tavuk Izgara',
  'Soğan', 'Domates', 'Mısır', 'Sucuk', 'Jalapeno',
  'Sarımsak', 'Biber', 'Mantar', 'Ananas', 'Kabak',
]

const boyutlar = [
  { deger: 'Küçük', etiket: 'S' },
  { deger: 'Orta', etiket: 'M' },
  { deger: 'Büyük', etiket: 'L' },
]

export default function OrderForm({ onOrderSuccess, onGoHome }) {
  const [boyut, setBoyut] = useState('')
  const [hamur, setHamur] = useState('')
  const [malzemeler, setMalzemeler] = useState([])
  const [isim, setIsim] = useState('')
  const [not, setNot] = useState('')
  const [adet, setAdet] = useState(1)
  const [gonderiliyor, setGonderiliyor] = useState(false)
  const [hata, setHata] = useState('')
  const [basarili, setBasarili] = useState(false)

  const malzemeTutari = malzemeler.length * 5
  const toplam = (85.5 + malzemeTutari) * adet

  const formGecerli =
    isim.trim().length >= 3 &&
    boyut !== '' &&
    hamur !== '' &&
    malzemeler.length >= 4 &&
    malzemeler.length <= 10

  function handleMalzemeChange(event) {
    const { value, checked } = event.target

    setMalzemeler((onceki) => {
      if (checked) {
        if (onceki.length >= 10 || onceki.includes(value)) {
          return onceki
        }

        return [...onceki, value]
      }

      return onceki.filter((malzeme) => malzeme !== value)
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formGecerli || gonderiliyor) return

    setGonderiliyor(true)
    setHata('')
    setBasarili(false)

    const siparis = {
      isim: isim.trim(),
      boyut,
      hamur,
      malzemeler,
      not,
      adet,
      malzemeTutari: malzemeTutari * adet,
      toplam,
    }

    try {
      const response = await axios.post(
        'https://reqres.in/api/pizza',
        siparis,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_REQRES_API_KEY,
          },
        }
      )

      console.log('Sipariş yanıtı:', response.data)
      setBasarili(true)

      if (onOrderSuccess) {
        onOrderSuccess(response.data)
      }
    } catch (error) {
      console.error('Sipariş hatası:', error.response?.data)

      setHata(
        error.response
          ? `Sipariş gönderilemedi. Sunucu hata kodu: ${error.response.status}`
          : 'Sunucuya ulaşılamadı. Bağlantınızı kontrol edip tekrar deneyin.'
      )
    } finally {
      setGonderiliyor(false)
    }
  }

  return (
    <div className="order-layout">
      <header className="site-header order-header">
        <img src={logo} alt="Teknolojik Yemekler" />
      </header>

      <main>
        <section className="order-intro">
          <div className="order-intro-inner">
            <img
              className="order-banner"
              src={formBanner}
              alt="Position Absolute Acı Pizza"
            />

            <nav className="order-breadcrumb" aria-label="Sayfa yolu">
              {onGoHome ? (
                <button type="button" onClick={onGoHome}>
                  Anasayfa
                </button>
              ) : (
                <span>Anasayfa</span>
              )}
              <span aria-hidden="true"> - </span>
              <strong>Sipariş Oluştur</strong>
            </nav>

            <section className="pizza-info">
              <h1>Position Absolute Acı Pizza</h1>

              <div className="pizza-price">
                <strong>85.50₺</strong>
                <span>4.9</span>
                <span>(200)</span>
              </div>

              <p>
                Frontend Dev olarak hâlâ position:absolute kullanıyorsan
                bu çok acı pizza tam sana göre. Pizza, domates, peynir ve
                genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra
                geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta
                pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday
                bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.
                Küçük bir pizzaya bazen pizzetta denir.
              </p>
            </section>
          </div>
        </section>

        <div className="order-page order-form-container">
          <form
            className="order-form"
            onSubmit={handleSubmit}
            aria-busy={gonderiliyor}
          >
            <div className="pizza-options">
              <fieldset className="size-option">
                <legend>
                  Boyut Seç <span className="required-mark">*</span>
                </legend>

                <div className="size-options">
                  {boyutlar.map(({ deger, etiket }) => (
                    <label className="size-choice" key={deger}>
                      <input
                        type="radio"
                        name="boyut"
                        value={deger}
                        aria-label={deger}
                        checked={boyut === deger}
                        onChange={(event) => setBoyut(event.target.value)}
                        disabled={gonderiliyor}
                        required
                      />
                      <span>{etiket}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="dough-option">
                <label htmlFor="hamur">
                  Hamur Seç <span className="required-mark">*</span>
                </label>

                <select
                  id="hamur"
                  name="hamur"
                  value={hamur}
                  onChange={(event) => setHamur(event.target.value)}
                  disabled={gonderiliyor}
                  required
                >
                  <option value="" disabled>Hamur Kalınlığı</option>
                  <option value="İnce">İnce</option>
                  <option value="Normal">Normal</option>
                  <option value="Kalın">Kalın</option>
                </select>
              </div>
            </div>

            <fieldset className="ingredients">
              <legend>Ek Malzemeler</legend>

              <p id="ingredients-help">
                En az 4, en fazla 10 malzeme seçmelisiniz.
                Her biri 5₺. Seçilen: {malzemeler.length}
              </p>

              <div className="ingredients-grid">
                {malzemeListesi.map((malzeme) => (
                  <label key={malzeme}>
                    <input
                      type="checkbox"
                      name="malzemeler"
                      value={malzeme}
                      checked={malzemeler.includes(malzeme)}
                      onChange={handleMalzemeChange}
                      disabled={
                        gonderiliyor ||
                        (malzemeler.length >= 10 &&
                          !malzemeler.includes(malzeme))
                      }
                      aria-describedby="ingredients-help"
                    />
                    <span>{malzeme}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="text-field">
              <label htmlFor="isim">
                Adınız <span className="required-mark">*</span>
              </label>

              <input
                id="isim"
                name="isim"
                type="text"
                autoComplete="given-name"
                placeholder="Adınızı girin"
                value={isim}
                onChange={(event) => setIsim(event.target.value)}
                minLength={3}
                disabled={gonderiliyor}
                required
              />
            </div>

            <div className="text-field">
              <label htmlFor="siparis-notu">Sipariş Notu</label>

              <textarea
                id="siparis-notu"
                name="not"
                placeholder="Siparişine eklemek istediğin bir not var mı?"
                value={not}
                onChange={(event) => setNot(event.target.value)}
                rows={3}
                disabled={gonderiliyor}
              />
            </div>

            <div className="order-bottom">
              <div className="quantity-controls">
                <button
                  type="button"
                  aria-label="Adedi azalt"
                  onClick={() => setAdet((onceki) => Math.max(1, onceki - 1))}
                  disabled={adet <= 1 || gonderiliyor}
                >
                  −
                </button>

                <span aria-live="polite">{adet}</span>

                <button
                  type="button"
                  aria-label="Adedi artır"
                  onClick={() => setAdet((onceki) => onceki + 1)}
                  disabled={gonderiliyor}
                >
                  +
                </button>
              </div>

              <div className="order-summary">
                <div className="summary-content">
                  <h2>Sipariş Toplamı</h2>

                  <p>
                    <span>Seçimler ({adet} adet)</span>
                    <strong>{(malzemeTutari * adet).toFixed(2)}₺</strong>
                  </p>

                  <p className="total-price">
                    <span>Toplam</span>
                    <strong>{toplam.toFixed(2)}₺</strong>
                  </p>
                </div>

                <button
                  className="submit-button"
                  type="submit"
                  disabled={!formGecerli || gonderiliyor}
                >
                  {gonderiliyor ? 'GÖNDERİLİYOR...' : 'SİPARİŞ VER'}
                </button>
              </div>
            </div>

            {hata && <p className="order-error" role="alert">{hata}</p>}
            {basarili && (
              <p role="status">Siparişiniz başarıyla alındı!</p>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}