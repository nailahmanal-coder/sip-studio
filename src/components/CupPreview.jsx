const LIQ_COLORS = {
  matcha: '#7ab840',
  hojicha: '#c87840', 
  coffee: '#6a3818',
  ube: '#9070c0',
  other: '#484038',
}

const FOAM_COLORS = {
  oat: '#f8f4e4',
  coconut: '#fffaf0',
  matcha: '#a0c860',
  hojicha: '#d09860',
  ube: '#c0a8f0',
  salted: '#fdfbf5',
  vanilla: '#fdf8e4',
}

const TOPPING_COLORS = {
  'Boba Pearls': '#3a2010',
  'Crystal Boba': '#a0d8f0',
  'Popping Boba': '#f88080',
  'Red Bean': '#7a2820',
  'Grass Jelly': '#303820',
  'Egg Pudding': '#f0d890',
  'Matcha Dust': '#70a030',
  'Cinnamon': '#b86020',
  'Cocoa Powder': '#5a2810',
  'Rose Petals': '#f09090',
  'Sea Salt': '#d0dce8',
  'Honey Drizzle': '#d4a020',
  'Caramel Drizzle': '#b06010',
  'Lavender Buds': '#a890e0',
  'Edible Gold': '#d4b030',
  'Sesame Seeds': '#c8a860',
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

  const toppingColors = toppings?.slice(0,7).map((t,i) => ({
    color: TOPPING_COLORS[t] || '#999',
    x: [18,30,42,54,24,38,50][i],
  })) || []

  return (
    <div className="w-56 flex-shrink-0 bg-[#f5ede0] border-l-2 border-[#e0d0bc] flex flex-col items-center justify-start pt-6 gap-3">
      
      {/* floating label */}
      <div className="text-[10px] font-black text-[#a09080] uppercase tracking-widest">Your drink</div>

      {/* Cup */}
      <div className="animate-float" style={{filter:'drop-shadow(0 6px 12px rgba(0,0,0,0.12))'}}>
        <svg width="100" height="150" viewBox="0 0 100 150" style={{overflow:'visible'}}>
          <defs>
            <clipPath id="cupClip">
              <polygon points="10,14 90,14 80,138 20,138"/>
            </clipPath>
          </defs>

          {/* liquid */}
          <rect x="10" y="50" width="78" height="88"
            clipPath="url(#cupClip)"
            fill={liqColor}
            opacity={base ? 0.88 : 0.3}
          />

          {/* milk layer */}
          <rect x="10" y={milkY} width="78" height={milkH}
            clipPath="url(#cupClip)"
            fill="#fdfaf5"
            opacity={milkOpacity}
          />

          {/* ice cubes */}
          {isCold && icePositions.slice(0, iceCount).map(([x,y], i) => (
            <rect key={i} x={x} y={y} width="14" height="14" rx="3"
              fill="#b8e0f8" opacity="0.8"
              clipPath="url(#cupClip)"
            />
          ))}

          {/* foam */}
          {foamColor && (
            <rect x="10" y="14" width="78" height="30"
              clipPath="url(#cupClip)"
              fill={foamColor}
              opacity="0.93"
            />
          )}

          {/* topping dots */}
          {toppingColors.map((t, i) => (
            <circle key={i} cx={t.x} cy="18" r="3.5"
              fill={t.color} opacity="0.9"
              clipPath="url(#cupClip)"
            />
          ))}

          {/* cup outline */}
          <polygon points="10,14 90,14 80,138 20,138"
            fill="none" stroke="#c8b898" strokeWidth="3"/>
          {/* rim */}
          <line x1="10" y1="14" x2="90" y2="14"
            stroke="#d4c4a4" strokeWidth="3.5" strokeLinecap="round"/>
          {/* shine */}
          <line x1="22" y1="20" x2="18" y2="132"
            stroke="white" strokeWidth="3.5" opacity="0.28" strokeLinecap="round"/>

          {/* straw */}
          {isCold && (
            <rect x="70" y="0" width="7" height="65" rx="3.5" fill="#f8b8c8" opacity="0.9"/>
          )}

          {/* steam */}
          {isHot && (
            <g>
              <path d="M32 10 Q36 3 32 -5" stroke="#ccc" strokeWidth="2" fill="none" strokeLinecap="round" className="steam-1"/>
              <path d="M50 7 Q54 0 50 -8" stroke="#ccc" strokeWidth="2" fill="none" strokeLinecap="round" className="steam-2"/>
              <path d="M68 10 Q72 3 68 -5" stroke="#ccc" strokeWidth="2" fill="none" strokeLinecap="round" className="steam-3"/>
            </g>
          )}
        </svg>
      </div>

      {/* drink name */}
      <div className="text-center px-4">
        <div className="text-xs font-black text-[#2c1a08] leading-tight">
          {base ? base.name : 'Select a base to start'}
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