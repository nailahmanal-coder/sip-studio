export default function OrderPanel({
  base, grade, shots, milk, milkRatio,
  temp, ice, size, sweetener, sweetness,
  foam, toppings, dessert, savoury,
  name, setName, msg, setMsg, onClip
}) {
  const rows = []
  if (base) rows.push(['Base', base.name])
  if (grade) rows.push(['Grade', grade])
  if (shots) rows.push(['Shots', shots])
  if (temp) rows.push(['Temp', temp==='hot'?'🔥 Hot':temp==='cold'?'🧊 Iced':'🌡️ Warm'])
  if (ice) rows.push(['Ice', ice])
  if (size) rows.push(['Size', size])
  if (milk && milk.id !== 'none') rows.push(['Milk', milk.name])
  if (milk && milk.id !== 'none') rows.push(['Milk ratio', milkRatio+'%'])
  if (sweetener) rows.push(['Sweetener', sweetener])
  if (sweetener && sweetener !== 'No sugar') rows.push(['Sweetness', sweetness+'%'])
  if (foam && foam.id !== 'none') rows.push(['Foam', foam.name])
  if (toppings?.length) rows.push(['Toppings', toppings.join(', ')])
  if (dessert && dessert.id !== 'none') rows.push(['Dessert', dessert.name])
  if (savoury && savoury.id !== 'none') rows.push(['Savoury', savoury.name])

  return (
    <div className="w-64 flex-shrink-0 bg-white border-l-2 border-[#e0d0bc] flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4" style={{scrollbarWidth:'thin'}}>
        <div className="text-sm font-black text-[#2c1a08] mb-3 flex items-center gap-1">
          <span className="emoji-peek">✦</span> Your order
        </div>
        {rows.length === 0 ? (
          <div className="text-xs text-[#a09080] font-semibold italic text-center py-4">
            Nothing yet... start building! <span className="emoji-swing">☕</span>
          </div>
        ) : (
          <div className="flex flex-col gap-0">
            {rows.map(([k,v]) => (
              <div key={k} className="flex justify-between items-start py-1.5 border-b border-dashed border-[#e0d0bc] last:border-none gap-2">
                <span className="text-[10px] text-[#a09080] font-bold flex-shrink-0">{k}</span>
                <span className="text-[10px] font-black text-[#2c1a08] text-right leading-tight">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t-2 border-[#e0d0bc] bg-[#fde8f0] flex flex-col gap-2 flex-shrink-0">
        <div className="text-[11px] font-black text-[#c0607a] flex items-center gap-1">
          <span className="emoji-heartbeat" style={{animation:'heartbeat 1.5s ease-in-out infinite',display:'inline-block'}}>🌸</span> Personal note
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-[#c0607a]">from</span>
          <input value={name} onChange={e=>setName(e.target.value)}
            placeholder="your name" maxLength={24}
            className="flex-1 border-2 border-[#f0b8d0] rounded-lg px-2 py-1 text-[11px] font-bold bg-white text-[#2c1a08] outline-none focus:border-[#c0607a]"/>
        </div>
        <textarea value={msg} onChange={e=>setMsg(e.target.value)}
          placeholder="leave a lil message ☕" maxLength={110} rows={3}
          className="w-full border-2 border-[#f0b8d0] rounded-lg px-2.5 py-1.5 bg-white text-[#2c1a08] outline-none focus:border-[#c0607a] resize-none leading-snug"
          style={{fontFamily:"'Caveat', cursive", fontSize:'15px'}}/>
        <button onClick={onClip} disabled={!base}
          className="pill-btn w-full py-3 rounded-xl bg-[#2c1a08] text-[#faf7f2] text-sm font-black disabled:opacity-40 disabled:cursor-not-allowed">
          📌 Pin to message wall
        </button>
      </div>
    </div>
  )
}