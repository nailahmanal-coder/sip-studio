import { useState } from 'react'

const BASES = [
  { id:'ceremonial-matcha', name:'Ceremonial Matcha', icon:'🍵', sub:'First harvest · Uji', cat:'matcha' },
  { id:'culinary-matcha', name:'Culinary Matcha', icon:'🌿', sub:'Bold & earthy', cat:'matcha' },
  { id:'hojicha', name:'Hojicha Powder', icon:'🍂', sub:'Roasted · low caf', cat:'hojicha' },
  { id:'jasmine-green', name:'Jasmine Green Tea', icon:'🌸', sub:'Floral · delicate', cat:'matcha' },
  { id:'oolong', name:'Oolong', icon:'🌊', sub:'Creamy · floral', cat:'matcha' },
  { id:'chai', name:'Masala Chai', icon:'🫖', sub:'Spiced · warming', cat:'hojicha' },
  { id:'espresso', name:'Espresso', icon:'☕', sub:'Double shot', cat:'coffee' },
  { id:'cold-brew', name:'Cold Brew', icon:'🫙', sub:'18 hr steep', cat:'coffee' },
  { id:'cortado', name:'Cortado', icon:'🤎', sub:'Equal parts', cat:'coffee' },
  { id:'ube', name:'Ube Latte', icon:'💜', sub:'Purple yam · sweet', cat:'ube' },
  { id:'black-sesame', name:'Black Sesame', icon:'🖤', sub:'Nutty · toasty', cat:'other' },
  { id:'americano', name:'Americano', icon:'⬛', sub:'Espresso + water', cat:'coffee' },
]

const GRADES = {
  'ceremonial-matcha': ['Uji Single Origin','Nishio AAA','Kyoto Blend','Kagoshima First Flush'],
  'culinary-matcha': ['Premium Culinary','Latte Grade','Baking Grade'],
  'hojicha': ['Roasted Stem Powder','Roasted Leaf','Hojicha Concentrate'],
  'jasmine-green': ['Jasmine Pearl','Silver Needle','Dragon Pearl'],
  'oolong': ['High Mountain Alishan','Milk Oolong','Roasted Tie Guan Yin'],
  'chai': ['Classic Masala','Cardamom-heavy','Ginger-forward'],
}

const COFFEE_BASES = ['espresso','cold-brew','cortado','americano']

const MILKS = [
  { id:'oat', name:'Oat Milk', icon:'🌾', sub:'creamy & neutral' },
  { id:'barista-oat', name:'Barista Oat', icon:'⭐', sub:'extra foamy' },
  { id:'almond', name:'Almond', icon:'🤍', sub:'light & nutty' },
  { id:'coconut', name:'Coconut', icon:'🥥', sub:'tropical & rich' },
  { id:'whole', name:'Whole Milk', icon:'🥛', sub:'classic & full' },
  { id:'macadamia', name:'Macadamia', icon:'🌰', sub:'buttery smooth' },
  { id:'soy', name:'Soy', icon:'🫘', sub:'protein-rich' },
  { id:'hemp', name:'Hemp', icon:'🌱', sub:'earthy & light' },
  { id:'none', name:'No Milk', icon:'🚫', sub:'straight up' },
]

const SWEETENERS = [
  'No sugar','🍯 Honey','Vanilla syrup','Brown sugar','Agave',
  '🍁 Maple','💜 Lavender','🌹 Rose','Coconut sugar','Date syrup','Hazelnut','Caramel'
]

const FOAMS = [
  { id:'none', icon:'🚫', name:'No Foam' },
  { id:'oat', icon:'☁️', name:'Oat Foam' },
  { id:'coconut', icon:'🥥', name:'Coconut Cold Foam' },
  { id:'matcha', icon:'🍵', name:'Matcha Foam' },
  { id:'hojicha', icon:'🍂', name:'Hojicha Foam' },
  { id:'ube', icon:'💜', name:'Ube Foam' },
  { id:'salted', icon:'🧂', name:'Salted Cream' },
  { id:'vanilla', icon:'🫛', name:'Vanilla Foam' },
]

const TOPPINGS = [
  { id:'boba', icon:'🧋', name:'Boba Pearls' },
  { id:'crystal-boba', icon:'🫧', name:'Crystal Boba' },
  { id:'popping-boba', icon:'🍬', name:'Popping Boba' },
  { id:'red-bean', icon:'🫘', name:'Red Bean' },
  { id:'grass-jelly', icon:'🟫', name:'Grass Jelly' },
  { id:'pudding', icon:'🍮', name:'Egg Pudding' },
  { id:'matcha-dust', icon:'🟢', name:'Matcha Dust' },
  { id:'cinnamon', icon:'🟤', name:'Cinnamon' },
  { id:'cocoa', icon:'🍫', name:'Cocoa Powder' },
  { id:'rose-petals', icon:'🌹', name:'Rose Petals' },
  { id:'honey-drizzle', icon:'🍯', name:'Honey Drizzle' },
  { id:'caramel', icon:'🫕', name:'Caramel Drizzle' },
  { id:'sea-salt', icon:'🧂', name:'Sea Salt' },
  { id:'lavender', icon:'💜', name:'Lavender Buds' },
  { id:'gold', icon:'✨', name:'Edible Gold' },
  { id:'sesame', icon:'🌾', name:'Sesame Seeds' },
]

const DESSERTS = [
  { id:'mochi', icon:'🍡', name:'Matcha Mochi Ice Cream', sub:'Chewy rice cake shell' },
  { id:'tiramisu', icon:'🍮', name:'Hojicha Tiramisu', sub:'Layered & mascarpone' },
  { id:'cheesecake', icon:'🎂', name:'Matcha Basque Cheesecake', sub:'Burnt top, creamy center' },
  { id:'crepe', icon:'🍓', name:'Strawberry Crepe Cake', sub:'20 delicate layers' },
  { id:'sesame-pud', icon:'🖤', name:'Black Sesame Pudding', sub:'Rich, silky & nutty' },
  { id:'cookie', icon:'🍪', name:'Hojicha Cookie', sub:'Roasted & crisp edges' },
  { id:'butter-mochi', icon:'💜', name:'Ube Butter Mochi', sub:'Dense, chewy, purple' },
  { id:'financier', icon:'🫘', name:'Matcha Financier', sub:'Browned butter cake' },
  { id:'yuzu', icon:'🍋', name:'Yuzu Tart', sub:'Tangy citrus curd' },
  { id:'croffle', icon:'🧇', name:'Matcha Croffle', sub:'Croissant waffle' },
  { id:'montblanc', icon:'🌰', name:'Chestnut Mont Blanc', sub:'French pastry classic' },
  { id:'none', icon:'🚫', name:'No dessert', sub:'Just the drink' },
]

const SAVOURY = [
  { id:'avo', icon:'🥑', name:'Avocado Toast', sub:'Sourdough + chilli flakes' },
  { id:'tamago', icon:'🍞', name:'Tamago Sando', sub:'Japanese egg sandwich' },
  { id:'onigiri', icon:'🍙', name:'Salmon Onigiri', sub:'Grilled salmon filling' },
  { id:'cheese-toast', icon:'🧀', name:'Matcha Cheese Toast', sub:'Sweet & salty contrast' },
  { id:'bagel', icon:'🐟', name:'Smoked Salmon Bagel', sub:'Cream cheese + capers' },
  { id:'galette', icon:'🍄', name:'Mushroom Galette', sub:'Buckwheat + gruyère' },
  { id:'croissant', icon:'🥐', name:'Prosciutto Croissant', sub:'Buttery & flaky' },
  { id:'none', icon:'🚫', name:'No savoury', sub:'Sweet tooth only' },
]

const CAT_COLORS = {
  matcha: { border:'border-[#5a8a3c]', bg:'bg-[#eef8e0]' },
  hojicha: { border:'border-[#b86830]', bg:'bg-[#faecd8]' },
  coffee: { border:'border-[#7a4828]', bg:'bg-[#f5e8d8]' },
  ube: { border:'border-[#7868c0]', bg:'bg-[#e0d8ff]' },
  other: { border:'border-[#6a5040]', bg:'bg-[#f5ede0]' },
}

const LIQ_COLORS = {
  matcha:'#7ab840', hojicha:'#c87840',
  coffee:'#6a3818', ube:'#9070c0', other:'#484038',
}

const FOAM_COLORS = {
  oat:'#f8f4e4', coconut:'#fffaf0', matcha:'#a0c860',
  hojicha:'#d09860', ube:'#c0a8f0', salted:'#fdfbf5', vanilla:'#fdf8e4',
}

function SectionHead({ num, title, sub }) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-[#2c1a08] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">0{num}</span>
        <span className="text-sm font-black text-[#2c1a08]">{title}</span>
        {sub && <span className="text-[11px] font-semibold text-[#a09080] ml-auto">{sub}</span>}
      </div>
      <div className="h-0.5 w-full rounded-full" style={{background:'repeating-linear-gradient(90deg,#e0d0bc 0,#e0d0bc 6px,transparent 6px,transparent 10px)'}}/>
    </div>
  )
}

function Chip({ label, selected, onClick, color }) {
  return (
    <button onClick={onClick}
      className={`pill-btn px-3 py-1.5 rounded-full border-2 text-[11px] font-bold ${
        selected
          ? color==='hojicha' ? 'bg-[#b86830] border-[#b86830] text-white shadow-md'
          : color==='coffee' ? 'bg-[#7a4828] border-[#7a4828] text-white shadow-md'
          : 'bg-[#5a8a3c] border-[#5a8a3c] text-white shadow-md'
          : 'bg-white border-[#e0d0bc] text-[#6a5040]'
      }`}>
      {label}
    </button>
  )
}

function MiniCup({ base, temp, foam, toppings }) {
  const liqColor = base ? (LIQ_COLORS[base.cat] || '#b0d880') : '#c8e8a0'
  const foamColor = foam ? (FOAM_COLORS[foam] || null) : null
  const isCold = temp === 'cold'
  const isHot = temp === 'hot'

  return (
    <div className="animate-float" style={{filter:'drop-shadow(0 4px 10px rgba(0,0,0,0.12))'}}>
      <svg width="60" height="90" viewBox="0 0 60 90" style={{overflow:'visible'}}>
        <defs><clipPath id="mc"><polygon points="6,8 54,8 48,84 12,84"/></clipPath></defs>
        <rect x="6" y="32" width="48" height="52" clipPath="url(#mc)" fill={liqColor} opacity={base?0.88:0.3}/>
        {foamColor && <rect x="6" y="8" width="48" height="20" clipPath="url(#mc)" fill={foamColor} opacity="0.93"/>}
        <polygon points="6,8 54,8 48,84 12,84" fill="none" stroke="#c8b898" strokeWidth="2.5"/>
        <line x1="6" y1="8" x2="54" y2="8" stroke="#d4c4a4" strokeWidth="3" strokeLinecap="round"/>
        <line x1="14" y1="14" x2="12" y2="80" stroke="white" strokeWidth="3" opacity="0.25" strokeLinecap="round"/>
        {isCold && <rect x="44" y="0" width="5" height="42" rx="2.5" fill="#f8b8c8" opacity="0.9"/>}
        {isHot && <>
          <path d="M20 5 Q23 0 20 -5" stroke="#ccc" strokeWidth="1.8" fill="none" strokeLinecap="round" className="steam-1"/>
          <path d="M30 3 Q33 -2 30 -7" stroke="#ccc" strokeWidth="1.8" fill="none" strokeLinecap="round" className="steam-2"/>
          <path d="M40 5 Q43 0 40 -5" stroke="#ccc" strokeWidth="1.8" fill="none" strokeLinecap="round" className="steam-3"/>
        </>}
      </svg>
    </div>
  )
}

export default function Build({ onClip }) {
  const [base, setBase] = useState(null)
  const [grade, setGrade] = useState(null)
  const [shots, setShots] = useState(null)
  const [milk, setMilk] = useState(null)
  const [milkRatio, setMilkRatio] = useState(50)
  const [temp, setTemp] = useState(null)
  const [ice, setIce] = useState(null)
  const [size, setSize] = useState(null)
  const [sweetener, setSweetener] = useState(null)
  const [sweetness, setSweetness] = useState(50)
  const [foam, setFoam] = useState(null)
  const [toppings, setToppings] = useState([])
  const [dessert, setDessert] = useState(null)
  const [savoury, setSavoury] = useState(null)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [showSummary, setShowSummary] = useState(false)

  function toggleTopping(id) {
    setToppings(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id])
  }

  function handleClip() {
    if (!base) return
    const baseObj = BASES.find(b=>b.id===base)
    const milkObj = MILKS.find(m=>m.id===milk)
    const foamObj = FOAMS.find(f=>f.id===foam)
    const toppingNames = toppings.map(t=>TOPPINGS.find(x=>x.id===t)?.name).filter(Boolean)
    const dessertObj = DESSERTS.find(d=>d.id===dessert)
    const savObj = SAVOURY.find(s=>s.id===savoury)
    onClip({
      id: Date.now(),
      base: baseObj?.name, baseIcon: baseObj?.icon, baseCat: baseObj?.cat,
      grade, shots,
      milk: milkObj?.name, milkRatio,
      temp, ice, size, sweetener, sweetness,
      foam: foamObj?.name,
      toppings: toppingNames,
      dessert: dessertObj?.id!=='none' ? dessertObj?.name : null,
      savoury: savObj?.id!=='none' ? savObj?.name : null,
      from: name||'someone', msg,
      liqColor: LIQ_COLORS[baseObj?.cat]||'#b0d880',
      foamColor: FOAM_COLORS[foam]||null,
      isCold: temp==='cold',
    })
  }

  const baseObj = BASES.find(b=>b.id===base)
  const isCoffee = COFFEE_BASES.includes(base)
  const grades = base ? GRADES[base] : null

  // Build summary rows
  const rows = []
  if (base) rows.push(['Base', baseObj?.name])
  if (grade) rows.push(['Grade', grade])
  if (shots) rows.push(['Shots', shots])
  if (temp) rows.push(['Temp', temp==='hot'?'🔥 Hot':temp==='cold'?'🧊 Iced':'🌡️ Warm'])
  if (ice) rows.push(['Ice', ice])
  if (size) rows.push(['Size', size])
  if (milk) rows.push(['Milk', MILKS.find(m=>m.id===milk)?.name])
  if (milk && milk!=='none') rows.push(['Ratio', milkRatio+'%'])
  if (sweetener) rows.push(['Sweetener', sweetener])
  if (sweetener && sweetener!=='No sugar') rows.push(['Sweetness', sweetness+'%'])
  if (foam) rows.push(['Foam', FOAMS.find(f=>f.id===foam)?.name])
  if (toppings.length) rows.push(['Toppings', toppings.map(t=>TOPPINGS.find(x=>x.id===t)?.name).join(', ')])
  if (dessert && dessert!=='none') rows.push(['Dessert', DESSERTS.find(d=>d.id===dessert)?.name])
  if (savoury && savoury!=='none') rows.push(['Savoury', SAVOURY.find(s=>s.id===savoury)?.name])

  return (
    <div className="flex flex-col h-full relative" style={{height:'calc(100vh - 54px)'}}>

      {/* MAIN SCROLL */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 flex flex-col gap-4 pb-32"
        style={{scrollbarWidth:'thin'}}>

        {/* BASE */}
        <div>
          <SectionHead num={1} title="Choose your base" sub="matcha · coffee · tea" />
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {BASES.map(b => {
              const col = CAT_COLORS[b.cat]
              const sel = base === b.id
              return (
                <button key={b.id}
                  onClick={()=>{setBase(b.id);setGrade(null);setShots(null)}}
                  className={`hover-bounce sticker border-2 rounded-xl p-2 text-center relative bg-white ${sel ? `${col.border} ${col.bg} shadow-lg` : 'border-[#e0d0bc]'}`}>
                  {sel && <span className="absolute top-1 right-1.5 text-[9px] animate-stamp">✓</span>}
                  <div className="card-icon text-2xl mb-1">{b.icon}</div>
                  <div className="text-[9.5px] font-black text-[#2c1a08] leading-tight">{b.name}</div>
                  <div className="text-[8px] font-semibold text-[#a09080] mt-0.5 hidden sm:block">{b.sub}</div>
                </button>
              )
            })}
          </div>
          {grades && (
            <div className="mt-3">
              <div className="text-[10px] font-black text-[#a09080] uppercase tracking-wider mb-2">
                {base?.includes('matcha')?'Matcha Grade':base==='hojicha'?'Type':'Variety'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {grades.map(g=><Chip key={g} label={g} selected={grade===g} onClick={()=>setGrade(g)} color={baseObj?.cat}/>)}
              </div>
            </div>
          )}
          {isCoffee && (
            <div className="mt-3">
              <div className="text-[10px] font-black text-[#a09080] uppercase tracking-wider mb-2">Shots</div>
              <div className="flex flex-wrap gap-1.5">
                {['Single (1)','Double (2)','Triple (3)','Quad (4)'].map(s=>(
                  <Chip key={s} label={s} selected={shots===s} onClick={()=>setShots(s)} color="coffee"/>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MILK */}
        <div>
          <SectionHead num={2} title="Milk" sub="dairy · plant-based" />
          <div className="grid grid-cols-3 gap-1.5">
            {MILKS.map(m=>(
              <button key={m.id} onClick={()=>setMilk(m.id)}
                className={`hover-bounce sticker border-2 rounded-xl p-2 text-center ${milk===m.id?'border-[#5a8a3c] bg-[#eef8e0] shadow-md':'border-[#e0d0bc] bg-white'}`}>
                <div className="card-icon text-xl mb-1">{m.icon}</div>
                <div className="text-[9.5px] font-black text-[#2c1a08]">{m.name}</div>
                <div className="text-[8px] font-semibold text-[#a09080] hidden sm:block">{m.sub}</div>
              </button>
            ))}
          </div>
          <div className="mt-3 bg-[#f5ede0] rounded-xl px-3 py-2.5">
            <div className="text-[10px] font-black text-[#a09080] uppercase tracking-wider mb-2">Milk ratio</div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#a09080] font-bold">less</span>
              <input type="range" min="10" max="90" value={milkRatio}
                onChange={e=>setMilkRatio(+e.target.value)} className="flex-1 accent-[#5a8a3c]"/>
              <span className="text-[10px] text-[#a09080] font-bold">more</span>
              <span className="text-xs font-black text-[#5a8a3c] w-8 text-right">{milkRatio}%</span>
            </div>
          </div>
        </div>

        {/* TEMPERATURE */}
        <div>
          <SectionHead num={3} title="Temperature" />
          <div className="grid grid-cols-3 gap-2">
            {[
              {id:'hot',icon:'🔥',label:'Hot',onCls:'border-[#d04030] bg-[#fff2f0]'},
              {id:'cold',icon:'🧊',label:'Iced',onCls:'border-[#3080c8] bg-[#f0f4ff]'},
              {id:'warm',icon:'🌡️',label:'Warm',onCls:'border-[#b86830] bg-[#faecd8]'},
            ].map(t=>(
              <button key={t.id}
                onClick={()=>{setTemp(t.id);if(t.id!=='cold')setIce(null)}}
                className={`hover-bounce sticker border-2 rounded-xl p-3 text-center ${temp===t.id?`${t.onCls} shadow-md`:'border-[#e0d0bc] bg-white'}`}>
                <div className="card-icon text-2xl mb-1">{t.icon}</div>
                <div className="text-xs font-black text-[#2c1a08]">{t.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ICE */}
        {temp==='cold' && (
          <div>
            <SectionHead num={4} title="Ice level" />
            <div className="flex flex-wrap gap-2">
              {['No ice','Light ice','Regular ice','Extra ice'].map(i=>(
                <Chip key={i} label={i} selected={ice===i} onClick={()=>setIce(i)} color="coffee"/>
              ))}
            </div>
            <div className="flex gap-1 mt-2">
              {[0,1,2,3,4,5].map(i=>{
                const filled=ice==='Light ice'?i<2:ice==='Regular ice'?i<4:ice==='Extra ice'?i<6:false
                return <div key={i} className={`w-3.5 h-3.5 rounded-[3px] transition-all ${filled?'bg-[#90c8f8]':'bg-[#90c8f8] opacity-15'}`}/>
              })}
            </div>
          </div>
        )}

        {/* SIZE */}
        <div>
          <SectionHead num={temp==='cold'?5:4} title="Size" />
          <div className="grid grid-cols-4 gap-2">
            {[
              {id:'small',icon:'🥛',name:'Small',vol:'8 oz'},
              {id:'medium',icon:'☕',name:'Medium',vol:'12 oz'},
              {id:'large',icon:'🧋',name:'Large',vol:'16 oz'},
              {id:'xl',icon:'🪣',name:'XL',vol:'20 oz'},
            ].map(s=>(
              <button key={s.id} onClick={()=>setSize(s.id)}
                className={`hover-bounce sticker border-2 rounded-xl p-2 text-center ${size===s.id?'border-[#5a8a3c] bg-[#eef8e0] shadow-md':'border-[#e0d0bc] bg-white'}`}>
                <div className="card-icon text-xl mb-1">{s.icon}</div>
                <div className="text-[10px] font-black text-[#2c1a08]">{s.name}</div>
                <div className="text-[9px] font-semibold text-[#a09080]">{s.vol}</div>
              </button>
            ))}
          </div>
        </div>

        {/* SWEETENER */}
        <div>
          <SectionHead num={temp==='cold'?6:5} title="Sweetener" />
          <div className="flex flex-wrap gap-1.5">
            {SWEETENERS.map(s=><Chip key={s} label={s} selected={sweetener===s} onClick={()=>setSweetener(s)}/>)}
          </div>
          <div className="mt-3 bg-[#f5ede0] rounded-xl px-3 py-2.5">
            <div className="text-[10px] font-black text-[#a09080] uppercase tracking-wider mb-2">Sweetness level</div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#a09080] font-bold">0%</span>
              <input type="range" min="0" max="100" step="25" value={sweetness}
                onChange={e=>setSweetness(+e.target.value)} className="flex-1 accent-[#5a8a3c]"/>
              <span className="text-[10px] text-[#a09080] font-bold">100%</span>
              <span className="text-xs font-black text-[#5a8a3c] w-8 text-right">{sweetness}%</span>
            </div>
          </div>
        </div>

        {/* FOAM */}
        <div>
          <SectionHead num={temp==='cold'?7:6} title="Foam" />
          <div className="grid grid-cols-4 gap-1.5">
            {FOAMS.map(f=>(
              <button key={f.id} onClick={()=>setFoam(f.id)}
                className={`hover-bounce sticker border-2 rounded-xl p-2 text-center ${foam===f.id?'border-[#5a8a3c] bg-[#eef8e0] shadow-md':'border-[#e0d0bc] bg-white'}`}>
                <div className="card-icon text-xl mb-1">{f.icon}</div>
                <div className="text-[8.5px] font-black text-[#2c1a08] leading-tight">{f.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* TOPPINGS */}
        <div>
          <SectionHead num={temp==='cold'?8:7} title="Toppings" sub="pick any ✦" />
          <div className="grid grid-cols-4 gap-1.5">
            {TOPPINGS.map(t=>(
              <button key={t.id} onClick={()=>toggleTopping(t.id)}
                className={`hover-bounce sticker border-2 rounded-xl p-2 text-center ${toppings.includes(t.id)?'border-[#7aaa50] bg-[#eef8e0] shadow-md':'border-[#e0d0bc] bg-white'}`}>
                <div className="card-icon text-xl mb-1">{t.icon}</div>
                <div className="text-[8.5px] font-black text-[#2c1a08] leading-tight">{t.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* DESSERTS */}
        <div>
          <SectionHead num={temp==='cold'?9:8} title="Sweet treats" sub="pick one 🍡" />
          <div className="grid grid-cols-2 gap-2">
            {DESSERTS.map(d=>(
              <button key={d.id} onClick={()=>setDessert(d.id)}
                className={`hover-bounce sticker border-2 rounded-xl p-2.5 flex items-center gap-2 text-left ${dessert===d.id?'border-[#c0607a] bg-[#fde8f0] shadow-md':'border-[#e0d0bc] bg-white'}`}>
                <span className="card-icon text-xl flex-shrink-0">{d.icon}</span>
                <div>
                  <div className="text-[10px] font-black text-[#2c1a08] leading-tight">{d.name}</div>
                  <div className="text-[8px] font-semibold text-[#a09080] mt-0.5 hidden sm:block">{d.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* SAVOURY */}
        <div>
          <SectionHead num={temp==='cold'?10:9} title="Savoury bites" sub="pick one 🥑" />
          <div className="grid grid-cols-2 gap-2">
            {SAVOURY.map(s=>(
              <button key={s.id} onClick={()=>setSavoury(s.id)}
                className={`hover-bounce sticker border-2 rounded-xl p-2.5 flex items-center gap-2 text-left ${savoury===s.id?'border-[#b86830] bg-[#faecd8] shadow-md':'border-[#e0d0bc] bg-white'}`}>
                <span className="card-icon text-xl flex-shrink-0">{s.icon}</span>
                <div>
                  <div className="text-[10px] font-black text-[#2c1a08] leading-tight">{s.name}</div>
                  <div className="text-[8px] font-semibold text-[#a09080] mt-0.5 hidden sm:block">{s.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* FLOATING BOTTOM BAR (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#e0d0bc] p-3 flex flex-col gap-2 z-50 shadow-xl">

        {/* Cup preview row */}
        <div className="flex items-center gap-3">
          <MiniCup base={baseObj} temp={temp} foam={foam} toppings={toppings}/>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black text-[#2c1a08] truncate">
              {baseObj ? baseObj.name : 'Select a base ✦'}
            </div>
            {rows.length > 0 && (
              <button onClick={()=>setShowSummary(!showSummary)}
                className="text-[10px] font-bold text-[#5a8a3c] underline mt-0.5">
                {showSummary ? 'hide summary' : `see ${rows.length} selections`}
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            <input value={name} onChange={e=>setName(e.target.value)}
              placeholder="your name"
              className="border-2 border-[#f0b8d0] rounded-lg px-2 py-1 text-[11px] font-bold bg-[#fde8f0] text-[#2c1a08] outline-none w-28 focus:border-[#c0607a]"/>
          </div>
        </div>

        {/* Summary dropdown */}
        {showSummary && rows.length > 0 && (
          <div className="bg-[#faf7f2] rounded-xl p-2 border border-[#e0d0bc] max-h-32 overflow-y-auto">
            {rows.map(([k,v])=>(
              <div key={k} className="flex justify-between py-0.5 border-b border-dashed border-[#e0d0bc] last:border-none">
                <span className="text-[9.5px] text-[#a09080] font-bold">{k}</span>
                <span className="text-[9.5px] font-black text-[#2c1a08] text-right max-w-[60%]">{v}</span>
              </div>
            ))}
          </div>
        )}

        {/* Message + pin row */}
        <div className="flex gap-2">
          <textarea value={msg} onChange={e=>setMsg(e.target.value)}
            placeholder="leave a lil message ☕" maxLength={110} rows={1}
            className="flex-1 border-2 border-[#f0b8d0] rounded-xl px-3 py-2 bg-[#fde8f0] text-[#2c1a08] outline-none resize-none focus:border-[#c0607a]"
            style={{fontFamily:"'Caveat', cursive", fontSize:'15px'}}/>
          <button onClick={handleClip} disabled={!base}
            className="pill-btn px-4 py-2 rounded-xl bg-[#2c1a08] text-[#faf7f2] text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0">
            📌 Pin
          </button>
        </div>
      </div>
    </div>
  )
}