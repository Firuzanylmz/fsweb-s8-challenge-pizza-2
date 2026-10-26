import logo from '../../images/iteration-1-images/logo.svg'

export default function Success({ siparis }) {
  return (
    <main className="success-page success-detail">
      <img
        className="success-logo"
        src={logo}
        alt="Teknolojik Yemekler"
      />

      <section className="success-content">
        <p className="success-tagline">lezzetin yolda</p>
        <h1>SİPARİŞ ALINDI</h1>

        <hr />

        <h2>Position Absolute Acı Pizza</h2>

        <dl className="success-order-details">
          <div>
            <dt>İsim:</dt>
            <dd>{siparis.isim}</dd>
          </div>

          <div>
            <dt>Boyut:</dt>
            <dd>{siparis.boyut}</dd>
          </div>

          <div>
            <dt>Hamur:</dt>
            <dd>{siparis.hamur}</dd>
          </div>

          <div>
            <dt>Ek Malzemeler:</dt>
            <dd>{siparis.malzemeler.join(', ')}</dd>
          </div>

          <div>
            <dt>Adet:</dt>
            <dd>{siparis.adet}</dd>
          </div>

          {siparis.not && (
            <div>
              <dt>Sipariş Notu:</dt>
              <dd>{siparis.not}</dd>
            </div>
          )}
        </dl>

        <section className="success-total">
          <h3>Sipariş Toplamı</h3>

          <p>
            <span>Seçimler</span>
            <strong>
              {Number(siparis.malzemeTutari).toFixed(2)}₺
            </strong>
          </p>

          <p>
            <span>Toplam</span>
            <strong>{Number(siparis.toplam).toFixed(2)}₺</strong>
          </p>
        </section>
      </section>
    </main>
  )
}