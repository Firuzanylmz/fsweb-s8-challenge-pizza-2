import { useState } from 'react'
import './App.css'
import logo from '../images/iteration-1-images/logo.svg'

const malzemeListesi = [
  'Pepperoni',
  'Sosis',
  'Kanada Jambonu',
  'Tavuk Izgara',
  'Soğan',
  'Domates',
  'Mısır',
  'Sucuk',
  'Jalapeno',
  'Sarımsak',
  'Biber',
  'Mantar',
  'Ananas',
  'Kabak',
]

function App() {
  const [boyut, setBoyut] = useState('')
  const [hamur, setHamur] = useState('')
  const [malzemeler, setMalzemeler] = useState([])
  const [isim, setIsim] = useState('')
  const [not, setNot] = useState('')
  const [adet, setAdet] = useState(1)

const malzemeTutari = malzemeler.length * 5
const toplam = (85.5 + malzemeTutari) * adet

const formGecerli =
  isim.trim().length >= 3 &&
  boyut !== '' &&
  hamur !== '' &&
  malzemeler.length >= 4 &&
  malzemeler.length <= 10

function handleSubmit(event) {
  event.preventDefault()

  if (!formGecerli) return

  console.log({
    isim: isim.trim(),
    boyut,
    hamur,
    malzemeler,
    not,
    adet,
    toplam,
  })
}

  function handleMalzemeChange(event) {
    const { value, checked } = event.target

    if (checked) {
      if (malzemeler.length >= 10) return

      setMalzemeler([...malzemeler, value])
    } else {
      setMalzemeler(
        malzemeler.filter((malzeme) => malzeme !== value)
      )
    }
  }

  return (
    <>
      <header className="site-header">
        <img src={logo} alt="Teknolojik Yemekler" />

        <nav aria-label="Sayfa yolu">
          Anasayfa - Seçenekler - <strong>Sipariş Oluştur</strong>
        </nav>
      </header>

      <main className="order-page">
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

        <form className="order-form" onSubmit={handleSubmit}>
          <div className="pizza-options">
            <fieldset>
              <legend>Boyut Seç *</legend>

              <label>
                <input
                  type="radio"
                  name="boyut"
                  value="Küçük"
                  checked={boyut === 'Küçük'}
                  onChange={(event) => setBoyut(event.target.value)}
                  required
                />
                Küçük
              </label>

              <label>
                <input
                  type="radio"
                  name="boyut"
                  value="Orta"
                  checked={boyut === 'Orta'}
                  onChange={(event) => setBoyut(event.target.value)}
                />
                Orta
              </label>

              <label>
                <input
                  type="radio"
                  name="boyut"
                  value="Büyük"
                  checked={boyut === 'Büyük'}
                  onChange={(event) => setBoyut(event.target.value)}
                />
                Büyük
              </label>
            </fieldset>

            <div className="dough-option">
              <label htmlFor="hamur">Hamur Seç *</label>

              <select
                id="hamur"
                name="hamur"
                value={hamur}
                onChange={(event) => setHamur(event.target.value)}
                required
              >
                <option value="" disabled>
                  Hamur Kalınlığı
                </option>
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
                      malzemeler.length >= 10 &&
                      !malzemeler.includes(malzeme)
                    }
                    aria-describedby="ingredients-help"
                  />
                  {malzeme}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="text-field">
  <label htmlFor="isim">Adınız *</label>

  <input
    id="isim"
    name="isim"
    type="text"
    placeholder="Adınızı girin"
    value={isim}
    onChange={(event) => setIsim(event.target.value)}
    minLength={3}
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
  />
</div>
<div className="order-bottom">
  <div className="quantity-controls">
    <button
      type="button"
      aria-label="Adedi azalt"
      onClick={() => setAdet(adet - 1)}
      disabled={adet <= 1}
    >
      −
    </button>

    <span aria-live="polite">{adet}</span>

    <button
      type="button"
      aria-label="Adedi artır"
      onClick={() => setAdet(adet + 1)}
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
      disabled={!formGecerli}
    >
      SİPARİŞ VER
    </button>
  </div>
</div>
        </form>
      </main>
    </>
  )
}

export default App