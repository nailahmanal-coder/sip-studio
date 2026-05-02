import { useState } from 'react'
import { supabase } from '../supabase'

const ADMIN_PASSWORD = 'naisoatmatcha'

const CAT_COLORS = {
  matcha: { tag: 'bg-[#eef8e0] text-[#5a8a3c]' },
  hojicha: { tag: 'bg-[#faecd8] text-[#b86830]' },
  coffee: { tag: 'bg-[#f5e8d8] text-[#7a4828]' },
  ube: { tag: 'bg-[#e0d8ff] text-[#7868c0]' },
  other: { tag: 'bg-[#f5ede0] text-[#6a5040]' },
}

const LIQ_COLORS = {
  matcha: '#7ab840', hojicha: '#c87840',
  coffee: '#6a3818', ube: '#9070c0', other: '#484038',
}

function MiniCup({ order }) {
  const lc = LIQ_COLORS[order.base_cat] || '#b0d880'
  const fc = order.foam_color || 'transparent'
  return (
    <svg width="44" height="64" viewBox="0 0 44 64"
      style={{overflow:'visible', filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.1))', flexShrink:0}}>
      <defs><clipPath id={`mc${order.id}`}><polygon points="4,6 40,6 36,60 8,60"/></clipPath></defs>
      <rect x="4" y="24" width="34" height="36" clipPath={`url(#mc${order.id})`} fill={lc} opacity="0.88"/>
      <rect x="4" y="6" width="34" height="14" clipPath={`url(#mc${order.id})`} fill={fc} opacity={fc!=='transparent'?0.9:0}/>
      <polygon points="4,6 40,6 36,60 8,60" fill="none" stroke="#c8b898" strokeWidth="2"/>
      {order.is_cold && <rect x="32" y="0" width="4" height="30" rx="2" fill="#f8b8c8" opacity="0.9"/>}
    </svg>
  )
}

function OrderCard({ order, isAdmin, onDelete }) {
  const cat = CAT_COLORS[order.base_cat] || CAT_COLORS.other
  const tags = [
    order.temp==='hot' ? {label:'Hot 🔥',cls:'bg-[#ffe8e8] text-[#c03020]'} :
    order.temp==='cold' ? {label:'Iced 🧊',cls:'bg-[#e8f0ff] text-[#3070c8]'} : null,
    order.size ? {label:order.size, cls:'bg-[#f5ede0] text-[#6a5040]'} : null,
    order.milk ? {label:order.milk, cls:'bg-[#f5ede0] text-[#6a5040]'} : null,
    order.foam ? {label:order.foam, cls:'bg-[#f5ede0] text-[#6a5040]'} : null,
    order.dessert ? {label:order.dessert.split(' ').slice(0,2).join(' '), cls:'bg-[#fde8f0] text-[#c0607a]'} : null,
    order.savoury ? {label:order.savoury.split(' ').slice(0,2).join(' '), cls:'bg-[#faecd8] text-[#b86830]'} : null,
    ...(order.toppings?.slice(0,2).map(t=>({label:t, cls:'bg-[#f5ede0] text-[#6a5040]'})) || []),
  ].filter(Boolean)

  return (
    <div className="bg-white rounded-2xl border-2 border-[#e0d0bc] overflow-hidden animate-stamp hover-bounce relative">
      {isAdmin && (
        <button onClick={()=>onDelete(order.id)}
          className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-full">
          🗑 delete
        </button>
      )}
      <div className="p-3 flex gap-3 border-b-2 border-dashed border-[#e0d0bc] bg-[#f5ede0]">
        <MiniCup order={order}/>
        <div className="flex-1 min-w-0">
          <div className="font-black text-[11.5px] text-[#2c1a08] leading-tight mb-1.5">
            {order.base}
            {order.grade && <span className="block text-[9px] font-semibold text-[#a09080] mt-0.5">{order.grade}</span>}
          </div>
          <div className="flex flex-wrap gap-1">
            <span className={`text-[8.5px] font-black px-2 py-0.5 rounded-full ${cat.tag}`}>{order.base_cat}</span>
            {tags.map((t,i)=>(
              <span key={i} className={`text-[8.5px] font-bold px-2 py-0.5 rounded-full ${t.cls}`}>{t.label}</span>
            ))}
          </div>
        </div>
        <div className="text-[9px] text-[#a09080] font-semibold flex-shrink-0">
          {new Date(order.created_at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
        </div>
      </div>
      <div className="p-3 bg-white">
        <div className="text-[15px] text-[#5a4a38] leading-snug min-h-5"
          style={{fontFamily:"'Caveat', cursive"}}>
          {order.msg || '...'}
        </div>
        <div className="mt-2 text-[10px] text-[#a09080] font-bold">
          with love from <span className="text-[#5a8a3c] font-black text-[12px]"
            style={{fontFamily:"'Caveat', cursive"}}>{order.from_name}</span> 🤍
        </div>
      </div>
    </div>
  )
}

export default function Board({ orders, setOrders, loading }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [pwInput, setPwInput] = useState('')
  const [showPwBox, setShowPwBox] = useState(false)

  function handleAdminLogin() {
    if (pwInput === ADMIN_PASSWORD) {
      setIsAdmin(true)
      setShowPwBox(false)
      setPwInput('')
    } else alert('Wrong password!')
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this order?')) return
    const { error } = await supabase.from('orders').delete().eq('id', id)
    if (!error) setOrders(prev=>prev.filter(o=>o.id!==id))
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{height:'calc(100vh - 54px)'}}>
      <div className="px-4 py-3 border-b-2 border-[#e0d0bc] bg-[#f5ede0] flex items-center justify-between flex-shrink-0">
        <div>
          <div className="text-base font-black text-[#2c1a08]">📌 Message Wall</div>
          <div className="text-[11px] font-semibold text-[#a09080]">Orders pinned by the community</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#5a8a3c] text-white text-xs font-black px-3 py-1.5 rounded-full">
            {orders.length} {orders.length===1?'order':'orders'}
          </div>
          {!isAdmin ? (
            <button onClick={()=>setShowPwBox(!showPwBox)}
              className="text-[10px] text-[#a09080] hover:text-[#2c1a08] font-bold">⚙️</button>
          ) : (
            <button onClick={()=>setIsAdmin(false)}
              className="text-[10px] bg-red-100 text-red-500 font-black px-2 py-1 rounded-full">exit admin</button>
          )}
        </div>
      </div>

      {showPwBox && (
        <div className="px-4 py-2 bg-[#2c1a08] flex items-center gap-2 flex-shrink-0">
          <span className="text-white text-[11px] font-bold">Password:</span>
          <input type="password" value={pwInput} onChange={e=>setPwInput(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&handleAdminLogin()}
            placeholder="enter password"
            className="flex-1 rounded-lg px-3 py-1 text-[11px] font-bold outline-none"/>
          <button onClick={handleAdminLogin}
            className="bg-[#5a8a3c] text-white text-[11px] font-black px-3 py-1 rounded-lg">Login</button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 md:p-4" style={{scrollbarWidth:'thin'}}>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-[#a09080]">
            <div className="text-5xl animate-float">☕</div>
            <div className="text-base font-black">Loading orders...</div>
          </div>
        ) : orders.length===0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-[#a09080]">
            <div className="text-5xl animate-float">☕</div>
            <div className="text-base font-black">No orders yet!</div>
            <div className="text-xs font-semibold">Build yours and pin it to the wall</div>
          </div>
        ) : (
          <div className="grid gap-3"
            style={{gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))'}}>
            {orders.map(order=>(
              <OrderCard key={order.id} order={order} isAdmin={isAdmin} onDelete={handleDelete}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}