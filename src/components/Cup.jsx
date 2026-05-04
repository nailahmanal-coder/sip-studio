const LIQ = {
  matcha:'#7ab840', hojicha:'#c87840',
  coffee:'#6a3818', ube:'#9070c0', other:'#484038',
}
const FOAM = {
  oat:'#f8f4e4', coconut:'#fffaf0', matcha:'#a0c860',
  hojicha:'#d09860', ube:'#c0a8f0', salted:'#fdfbf5', vanilla:'#fdf8e4',
}
const TOPPING_C = {
  'Boba Pearls':'#3a2010','Crystal Boba':'#a0d8f0','Popping Boba':'#f88080',
  'Red Bean':'#7a2820','Grass Jelly':'#303820','Egg Pudding':'#f0d890',
  'Matcha Dust':'#70a030','Cinnamon':'#b86020','Cocoa Powder':'#5a2810',
  'Rose Petals':'#f09090','Sea Salt':'#d0dce8','Honey Drizzle':'#d4a020',
  'Caramel Drizzle':'#b06010','Lavender Buds':'#a890e0',
  'Edible Gold':'#d4b030','Sesame Seeds':'#c8a860',
}

export default function Cup({ order, size = 'md', animate = true }) {
  const w = size === 'sm' ? 60 : size === 'md' ? 100 : size === 'lg' ? 160 : 100
  const h = w * 1.6
  const lc = LIQ[order?.baseCat] || '#c8e8a0'
  const fc = order?.foamId ? (FOAM[order.foamId] || null) : null
  const isCold = order?.isCold
  const isHot = order?.temp === 'hot'
  const hasBase = !!order?.base

  // scale clip points
  const s = w / 100
  const pts = `${18*s},${20*s} ${82*s},${20*s} ${72*s},${130*s} ${28*s},${130*s}`

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}
      style={{overflow:'visible', filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.12))'}}>
      <defs><clipPath id={`cup-${size}`}><polygon points={pts}/></clipPath></defs>

      {/* liquid */}
      <rect x={18*s} y={50*s} width={64*s} height={80*s}
        clipPath={`url(#cup-${size})`}
        fill={lc} opacity={hasBase ? 0.88 : 0.2}
        style={animate ? {animation:'pop 0.4s cubic-bezier(0.34,1.4,0.64,1)'} : {}}/>

      {/* milk */}
      {order?.hasMilk && (
        <rect x={18*s} y={38*s} width={64*s} height={16*s}
          clipPath={`url(#cup-${size})`}
          fill="#fdfaf5" opacity="0.85"/>
      )}

      {/* ice */}
      {isCold && order?.ice && order.ice !== 'No ice' && (
        <g>
          {[[20,70],[38,80],[56,68],[28,88],[46,85]].slice(0,
            order.ice==='Light ice'?2:order.ice==='Regular ice'?4:5
          ).map(([x,y],i)=>(
            <rect key={i} x={x*s} y={y*s} width={12*s} height={12*s} rx={3*s}
              fill="#b8e0f8" opacity="0.8"
              clipPath={`url(#cup-${size})`}/>
          ))}
        </g>
      )}

      {/* foam */}
      {fc && (
        <rect x={18*s} y={20*s} width={64*s} height={22*s}
          clipPath={`url(#cup-${size})`}
          fill={fc} opacity="0.93"/>
      )}

      {/* toppings */}
      {order?.toppings?.slice(0,6).map((t,i) => (
        <circle key={i} cx={[22,34,46,28,40,52][i]*s} cy={24*s} r={4*s}
          fill={TOPPING_C[t]||'#999'} opacity="0.9"
          clipPath={`url(#cup-${size})`}/>
      ))}

      {/* outline */}
      <polygon points={pts} fill="none" stroke="#c8b898" strokeWidth={2.5*s}/>
      <line x1={18*s} y1={20*s} x2={82*s} y2={20*s}
        stroke="#d4c4a4" strokeWidth={3*s} strokeLinecap="round"/>
      <line x1={24*s} y1={26*s} x2={22*s} y2={124*s}
        stroke="white" strokeWidth={3*s} opacity="0.22" strokeLinecap="round"/>

      {/* straw */}
      {isCold && (
        <rect x={70*s} y={0} width={6*s} height={55*s} rx={3*s}
          fill="#f8b8c8" opacity="0.9"/>
      )}

      {/* steam */}
      {isHot && hasBase && (
        <g>
          <path d={`M${30*s} ${16*s} Q${34*s} ${8*s} ${30*s} ${0}`}
            stroke="#ccc" strokeWidth={2*s} fill="none" strokeLinecap="round" className="steam-1"/>
          <path d={`M${44*s} ${13*s} Q${48*s} ${5*s} ${44*s} ${-5*s}`}
            stroke="#ccc" strokeWidth={2*s} fill="none" strokeLinecap="round" className="steam-2"/>
          <path d={`M${58*s} ${16*s} Q${62*s} ${8*s} ${58*s} ${0}`}
            stroke="#ccc" strokeWidth={2*s} fill="none" strokeLinecap="round" className="steam-3"/>
        </g>
      )}
    </svg>
  )
}