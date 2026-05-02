import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Build from './pages/Build'
import Board from './pages/Board'

export default function App() {
  const [page, setPage] = useState('build')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchOrders() }, [])

  async function fetchOrders() {
    const { data, error } = await supabase
      .from('orders').select('*')
      .order('created_at', { ascending: false })
    if (!error) setOrders(data)
    setLoading(false)
  }

  async function addOrder(order) {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        base: order.base, base_icon: order.baseIcon, base_cat: order.baseCat,
        grade: order.grade, shots: order.shots, milk: order.milk,
        milk_ratio: order.milkRatio, temp: order.temp, ice: order.ice,
        size: order.size, sweetener: order.sweetener, sweetness: order.sweetness,
        foam: order.foam, toppings: order.toppings, dessert: order.dessert,
        savoury: order.savoury, from_name: order.from, msg: order.msg,
        liq_color: order.liqColor, foam_color: order.foamColor, is_cold: order.isCold,
      }]).select()
    if (!error && data) setOrders(prev => [data[0], ...prev])
    setPage('board')
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#faf7f2]">
      <div className="h-1.5 w-full flex-shrink-0" style={{
        background:'repeating-linear-gradient(90deg,#b8d890 0,#b8d890 12px,#e8a860 12px,#e8a860 24px,#f5e8d8 24px,#f5e8d8 36px,#e0d8ff 36px,#e0d8ff 48px)'
      }}/>
      <nav className="bg-[#2c1a08] px-5 flex items-center justify-between flex-shrink-0" style={{height:'52px'}}>
        <div className="text-[#faf7f2] font-black text-xl tracking-tight flex items-center gap-2">
          <span className="emoji-bubble">☕</span> sip studio
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPage('build')}
            className={`pill-btn px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${page==='build' ? 'bg-[#5a8a3c] border-[#7aaa50] text-white' : 'border-white/20 text-white/50'}`}>
            ✦ Build
          </button>
          <button onClick={() => setPage('board')}
            className={`pill-btn px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${page==='board' ? 'bg-[#5a8a3c] border-[#7aaa50] text-white' : 'border-white/20 text-white/50'}`}>
            📌 Message Wall {orders.length > 0 && (
              <span className="ml-1 bg-white/20 rounded-full px-2 py-0.5 text-[9px]">{orders.length}</span>
            )}
          </button>
        </div>
      </nav>
      <div className="flex-1 overflow-hidden">
        {page === 'build'
          ? <Build onClip={addOrder} />
          : <Board orders={orders} setOrders={setOrders} loading={loading} />}
      </div>
    </div>
  )
}