import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabase'
import Build from './pages/Build'
import Make from './pages/Make'
import Note from './pages/Note'
import Board from './pages/Board'

const STEPS = ['build','make','note','board']
const STEP_LABELS = ['① Build','② Make It','③ Note','④ Wall']

export default function App() {
  const [page, setPage] = useState('build')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const orderRef = useRef(null)

  useEffect(() => { fetchOrders() }, [])

  async function fetchOrders() {
    const { data, error } = await supabase
      .from('orders').select('*')
      .order('created_at', { ascending: false })
    if (!error) setOrders(data)
    setLoading(false)
  }

  function handleBuildNext(order) {
    orderRef.current = { ...order, from: '', msg: '' }
    setPage('make')
  }

  function handleMakeNext() {
    setPage('note')
  }

  async function handlePin() {
    const o = orderRef.current
    if (!o) return
    const { data, error } = await supabase.from('orders').insert([{
      base: o.base, base_icon: o.baseIcon, base_cat: o.baseCat,
      grade: o.grade, shots: o.shots,
      milk: o.milk, milk_ratio: o.milkRatio,
      temp: o.temp, ice: o.ice, size: o.size,
      sweetener: o.sweetener, sweetness: o.sweetness,
      foam: o.foam, toppings: o.toppings,
      dessert: o.dessert, savoury: o.savoury,
      from_name: o.from || 'someone', msg: o.msg,
      liq_color: o.liqColor, foam_color: o.foamColor,
      is_cold: o.isCold,
    }]).select()
    if (!error && data) setOrders(prev => [data[0], ...prev])
    orderRef.current = null
    setPage('board')
  }

  const stepIdx = STEPS.indexOf(page)

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2]">
      {/* Rainbow strip */}
      <div className="h-1.5 w-full flex-shrink-0" style={{
        background:'repeating-linear-gradient(90deg,#b8d890 0,#b8d890 12px,#e8a860 12px,#e8a860 24px,#f5e8d8 24px,#f5e8d8 36px,#e0d8ff 36px,#e0d8ff 48px)'
      }}/>

      {/* Nav */}
      <nav className="bg-[#2c1a08] px-4 flex items-center justify-between flex-shrink-0" style={{height:'52px'}}>
        <div className="text-[#faf7f2] font-black text-lg flex items-center gap-2">
          <span className="emoji-bubble">☕</span>
          <span className="hidden sm:inline">sip studio</span>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-1">
          {STEP_LABELS.map((label, i) => (
            <button key={i}
              onClick={() => {
                if (i === 3) setPage('board')
                else if (i === 0) setPage('build')
              }}
              className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-all ${
                i === stepIdx
                  ? 'bg-[#5a8a3c] text-white'
                  : i < stepIdx
                  ? 'bg-white/15 text-white/70'
                  : 'text-white/30'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Pages */}
      <div className="flex-1 overflow-hidden">
        {page === 'build' && <Build onNext={handleBuildNext}/>}
        {page === 'make' && orderRef.current && (
          <Make order={orderRef.current} onNext={handleMakeNext} onBack={()=>setPage('build')}/>
        )}
        {page === 'note' && orderRef.current && (
          <Note order={orderRef.current} onPin={handlePin} onBack={()=>setPage('make')}/>
        )}
        {page === 'board' && (
          <Board orders={orders} setOrders={setOrders} loading={loading}/>
        )}
      </div>
    </div>
  )
}