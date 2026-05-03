import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Build from './pages/Build'
import Make from './pages/Make'
import Board from './pages/Board'

export default function App() {
  const [page, setPage] = useState('build')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [pendingOrder, setPendingOrder] = useState(null)

  useEffect(() => { fetchOrders() }, [])

  async function fetchOrders() {
    const { data, error } = await supabase
      .from('orders').select('*')
      .order('created_at', { ascending: false })
    if (!error) setOrders(data)
    setLoading(false)
  }

  function handleMakeIt(order) {
    setPendingOrder(order)
    setPage('make')
  }

  async function handlePin() {
    if (!pendingOrder) return
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        base: pendingOrder.base,
        base_icon: pendingOrder.baseIcon,
        base_cat: pendingOrder.baseCat,
        grade: pendingOrder.grade,
        shots: pendingOrder.shots,
        milk: pendingOrder.milk,
        milk_ratio: pendingOrder.milkRatio,
        temp: pendingOrder.temp,
        ice: pendingOrder.ice,
        size: pendingOrder.size,
        sweetener: pendingOrder.sweetener,
        sweetness: pendingOrder.sweetness,
        foam: pendingOrder.foam,
        toppings: pendingOrder.toppings,
        dessert: pendingOrder.dessert,
        savoury: pendingOrder.savoury,
        from_name: pendingOrder.from,
        msg: pendingOrder.msg,
        liq_color: pendingOrder.liqColor,
        foam_color: pendingOrder.foamColor,
        is_cold: pendingOrder.isCold,
      }]).select()
    if (!error && data) setOrders(prev => [data[0], ...prev])
    setPendingOrder(null)
    setPage('board')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2]">
      {/* Rainbow strip */}
      <div className="h-1.5 w-full flex-shrink-0" style={{
        background:'repeating-linear-gradient(90deg,#b8d890 0,#b8d890 12px,#e8a860 12px,#e8a860 24px,#f5e8d8 24px,#f5e8d8 36px,#e0d8ff 36px,#e0d8ff 48px)'
      }}/>

      {/* Nav — hide on make page */}
      {page !== 'make' && (
        <nav className="bg-[#2c1a08] px-4 flex items-center justify-between flex-shrink-0" style={{height:'52px'}}>
          <div className="text-[#faf7f2] font-black text-lg tracking-tight flex items-center gap-2">
            <span className="emoji-bubble">☕</span> sip studio
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => setPage('build')}
              className={`pill-btn px-3 py-1.5 rounded-full text-[11px] font-bold border-2 transition-all ${page==='build'?'bg-[#5a8a3c] border-[#7aaa50] text-white':'border-white/20 text-white/50'}`}>
              ✦ Build
            </button>
            <button onClick={() => setPage('board')}
              className={`pill-btn px-3 py-1.5 rounded-full text-[11px] font-bold border-2 transition-all ${page==='board'?'bg-[#5a8a3c] border-[#7aaa50] text-white':'border-white/20 text-white/50'}`}>
              📌 Wall {orders.length > 0 && (
                <span className="ml-1 bg-white/20 rounded-full px-1.5 py-0.5 text-[9px]">{orders.length}</span>
              )}
            </button>
          </div>
        </nav>
      )}

      {/* Pages */}
      <div className="flex-1 overflow-hidden">
        {page === 'build' && <Build onClip={handleMakeIt}/>}
        {page === 'make' && pendingOrder && (
          <Make
            order={pendingOrder}
            onPin={handlePin}
            onBack={() => setPage('build')}
          />
        )}
        {page === 'board' && <Board orders={orders} setOrders={setOrders} loading={loading}/>}
      </div>
    </div>
  )
}