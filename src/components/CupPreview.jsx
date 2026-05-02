const LIQ_COLORS = {
  matcha:'#7ab840', hojicha:'#c87840',
  coffee:'#6a3818', ube:'#9070c0', other:'#484038',
}
const FOAM_COLORS = {
  oat:'#f8f4e4', coconut:'#fffaf0', matcha:'#a0c860',
  hojicha:'#d09860', ube:'#c0a8f0', salted:'#fdfbf5', vanilla:'#fdf8e4',
}
const TOPPING_COLORS = {
  'Boba Pearls':'#3a2010','Crystal Boba':'#a0d8f0','Popping Boba':'#f88080',
  'Red Bean':'#7a2820','Grass Jelly':'#303820','Egg Pudding':'#f0d890',
  'Matcha Dust':'#70a030','Cinnamon':'#b86020','Cocoa Powder':'#5a2810',
  'Rose Petals':'#f09090','Sea Salt':'#d0dce8','Honey Drizzle':'#d4a020',
  'Caramel Drizzle':'#b06010','Lavender Buds':'#a890e0',
  'Edible Gold':'#d4b030','Sesame Seeds':'#c8a860',
}

export default function CupPreview({ base, milk, milkRatio, temp, ice, foam, toppings }) {
  const liqColor = base ? (LIQ_COLORS[base.cat] || '#b0d880') : '#c8e8a0'
  const foamColor = foam ? (FOAM_COLORS[foam] || null) : null
  const hasMilk = milk && milk !== 'none'
  const mr = milkRatio / 100
  const milkOpacity = hasMilk ? (0.5 + mr * 0.45) : 0
  const milkY = 46 - mr * 18
  const milkH = 8 + mr * 14
  const isCold = temp === 'cold'
  const isHot = temp === 'hot'
  const iceCount = ice === 'Light ice' ? 2 : ice === 'Regular ice' ? 4 : ice === 'Extra ice' ? 6 : 0
  const icePositions = [[12,72],[28,82],[44,68],[18,92],[38,90],[54,78]]
  const toppingDots = toppings?.slice(0,7).map((t,i) => ({
    color: TOPPING_COLORS[t] || '#999',
    x: [18,30,42,54,24,38,50][i],
  })) || []

  return (
    <div className="w-56 flex-shrink-0 bg-[#f5ede0] border-l-2 border-[#e0d0bc] flex flex-col items-center justify-start pt-6 gap-3">
      <div className="text-[10px] font-black text-[#a09080] uppercase tracking-widest">Your drink</div>

      <div className="animate-float" style={{filter:'drop-shadow(0 6px 16px rgba(0,0,0,0.14))'}}>
        <svg width="110" height="160" viewBox="0 0 110 160" style={{overflow:'visible'}}>
          <defs>
            <clipPath id="cupClip">
              <polygon points="12,14 98,14 88,148 22,148"/>
            </clipPath>
          </defs>
          <rect x="12" y="55" width="84" height="93" clipPath="url(#cupClip)" fill={liqColor} opacity={base ? 0.88 : 0.3}/>
          <rect x="12" y={milkY} width="84" height={milkH} clipPath="url(#cupClip)" fill="#fdfaf5" opacity={milkOpacity}/>
          {isCold && icePositions.slice(0,iceCount).map(([x,y],i) => (
            <rect key={i} x={x+4} y={y} width="16" height="16" rx="3" fill="#b8e0f8" opacity="0.8" clipPath="url(#cupClip)"/>
          ))}
          {foamColor && (
            <rect x="12" y="14" width="84" height="34" clipPath="url(#cupClip)" fill={foamColor} opacity="0.93"/>
          )}
          {toppingDots.map((t,i) => (
            <circle key={i} cx={t.x+4} cy="20" r="4" fill={t.color} opacity="0.9" clipPath="url(#cupClip)"/>
          ))}
          <polygon points="12,14 98,14 88,148 22,148" fill="none" stroke="#c8b898" strokeWidth="3"/>
          <line x1="12" y1="14" x2="98" y2="14" stroke="#d4c4a4" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="24" y1="22" x2="20" y2="142" stroke="white" strokeWidth="4" opacity="0.28" strokeLinecap="round"/>
          {isCold && <rect x="76" y="0" width="8" height="72" rx="4" fill="#f8b8c8" opacity="0.9"/>}
          {isHot && (
            <g>
              <path d="M36 10 Q41 2 36 -7" stroke="#ccc" strokeWidth="2.5" fill="none" strokeLinecap="round" className="steam-1"/>
              <path d="M55 7 Q60 -1 55 -10" stroke="#ccc" strokeWidth="2.5" fill="none" strokeLinecap="round" className="steam-2"/>
              <path d="M74 10 Q79 2 74 -7" stroke="#ccc" strokeWidth="2.5" fill="none" strokeLinecap="round" className="steam-3"/>
            </g>
          )}
        </svg>
      </div>

      <div className="text-center px-4">
        <div className="text-xs font-black text-[#2c1a08] leading-tight">
          {base ? base.name : 'Select a base to start ✦'}
        </div>
        {temp && (
          <div className="text-[10px] font-semibold text-[#a09080] mt-1">
            {temp === 'hot' ? '🔥 Hot' : temp === 'cold' ? '🧊 Iced' : '🌡️ Warm'}
          </div>
        )}
      </div>
    </div>
  )
}