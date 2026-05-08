import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Build from './pages/Build'
import Make from './pages/Make'
import Note from './pages/Note'
import Board from './pages/Board'

const STEP_LABELS = ['① Build','② Make It','③ Note','④ Wall']
const STEPS = ['build','make','note','board']

export default function App() {
  const [page, setPage] = useState('build')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [pendingOrder, setPendingOrder] = useState(null)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => { fetchOrders() }, [])

  async function fetchOrders() {
    const { data, error } = await supabase
      .from('orders').select('*')
      .order('created_at', { ascending: false })
    if (!error) setOrders(data)
    setLoading(false)
  }

  function handleBuildNext(order) {
    setPendingOrder(order)
    setName('')
    setMsg('')
    setPage('make')
  }

  function handleMakeNext() {
    setPage('note')
  }

  async function handlePin() {
    if (!pendingOrder) return
    const { data, error } = await supabase.from('orders').insert([{
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
      from_name: name || 'someone',
      msg: msg,
      liq_color: pendingOrder.liqColor,
      foam_color: pendingOrder.foamColor,
      is_cold: pendingOrder.isCold,
    }]).select()
    if (!error && data) setOrders(prev => [data[0], ...prev])
    setPendingOrder(null)
    setPage('board')
  }

  const stepIdx = STEPS.indexOf(page)

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2]">
      <div className="h-1.5 w-full flex-shrink-0" style={{
        background:'repeating-linear-gradient(90deg,#b8d890 0,#b8d890 12px,#e8a860 12px,#e8a860 24px,#f5e8d8 24px,#f5e8d8 36px,#e0d8ff 36px,#e0d8ff 48px)'
      }}/>

      <nav className="bg-[#2c1a08] px-4 flex items-center justify-between flex-shrink-0" style={{height:'52px'}}>
        <div className="text-[#faf7f2] font-black text-lg flex items-center gap-2">
          <span className="emoji-bubble">☕</span>
          <span className="hidden sm:inline">sip studio</span>
        </div>
        <div className="flex items-center gap-1">
          {STEP_LABELS.map((label, i) => (
            <button key={i}
              onClick={() => {
                if (i === 3) setPage('board')
                if (i === 0) setPage('build')
              }}
              className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-all ${
                i === stepIdx ? 'bg-[#5a8a3c] text-white'
                : i < stepIdx ? 'bg-white/15 text-white/70'
                : 'text-white/30'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex-1 overflow-hidden">
        {page === 'build' && (
          <Build onNext={handleBuildNext}/>
        )}
        {page === 'make' && pendingOrder && (
          <Make
            order={pendingOrder}
            onNext={handleMakeNext}
            onBack={() => setPage('build')}
          />
        )}
        {page === 'note' && pendingOrder && (
          <Note
            order={pendingOrder}
            name={name}
            setName={setName}
            msg={msg}
            setMsg={setMsg}
            onPin={handlePin}
            onBack={() => setPage('make')}
          />
        )}
        {page === 'board' && (
          <Board orders={orders} setOrders={setOrders} loading={loading}/>
        )}
      </div>
    </div>
  )
}