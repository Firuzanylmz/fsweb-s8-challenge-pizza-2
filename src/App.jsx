import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import OrderForm from './components/OrderForm'
import Success from './components/Success'

function App() {
  const [sayfa, setSayfa] = useState('anasayfa')
  const [siparis, setSiparis] = useState(null)

  function sayfaDegistir(yeniSayfa) {
    setSayfa(yeniSayfa)
    window.scrollTo(0, 0)
  }

  function handleOrderSuccess(yanit) {
    setSiparis(yanit)
    sayfaDegistir('onay')
  }

  return (
    <>
      {sayfa === 'anasayfa' && (
        <Home onOrder={() => sayfaDegistir('siparis')} />
      )}

      {sayfa === 'siparis' && (
        <OrderForm
          onGoHome={() => sayfaDegistir('anasayfa')}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {sayfa === 'onay' && siparis && (
       <Success siparis={siparis} />
      )}
    </>
  )
}

export default App