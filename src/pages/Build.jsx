import { useState } from 'react'
import Cup from '../components/Cup'

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
  'ceremonial-matcha':['Uji Single Origin','Nishio AAA','Kyoto Blend','Kagoshima First Flush'],
  'culinary-matcha':['Premium Culinary','Latte Grade','Baking Grade'],
  'hojicha':['Roasted Stem Powder','Roasted Leaf','Hojicha Concentrate'],
  'jasmine-green':['Jasmine Pearl','Silver Needle','Dragon Pearl'],
  'oolong':['High Mountain Alishan','Milk Oolong','Roasted Tie Guan Yin'],
  'chai':['Classic Masala','Cardamom-heavy','Ginger-forward'],
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
const CAT = {
  matcha:{border:'border-[#5a8a3c]',bg:'bg-[#eef8e0]'},
  hojicha:{border:'border-[#b86830]',bg:'bg-[#faecd8]'},
  coffee:{border:'border-[#7a4828]',bg:'bg-[#f5e8d8]'},
  ube:{border:'border-[#7868c0]',bg:'bg-[#e0d8ff]'},
  other:{border:'border-[#6a5040]',bg:'bg-[#f5ede0]'},
}
const FOAM_IDS = {
  oat:'oat',coconut:'coconut',matcha:'matcha',
  hojicha:'hojicha',ube:'ube',salted:'salted',vanilla:'vanilla'
}

function Head({num,title,sub}){
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="bg-[#2c1a08] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">{String(num).padStart(2,'0')}</span>
        <span className="text-sm font-black text-[#2c1a08]">{title}</span>
        {sub && <span className="text-[10px] font-bold text-[#a09080] ml-auto">{sub}</span>}
      </div>
      <div className="h-0.5 rounded-full" style={{background:'repeating-linear-gradient(90deg,#e0d0bc 0,#e0d0bc 6px,transparent 6px,transparent 10px)'}}/>
    </div>
  )
}

function Chip({label,sel,onClick,color}){
  return (
    <button onClick={onClick}
      className={`pill-btn px-3 py-1.5 rounded-full border-2 text-[11px] font-bold whitespace-nowrap ${
        sel ? color==='hojicha'?'bg-[#b86830] border-[#b86830] text-white':
              color==='coffee'?'bg-[#7a4828] border-[#7a4828] text-white':
              'bg-[#5a8a3c] border-[#5a8a3c] text-white'
            : 'bg-white border-[#e0d0bc] text-[#6a5040]'
      }`}>{label}</button>
  )
}

export default function Build({onNext}){
  const [base,setBase]=useState(null)
  const [grade,setGrade]=useState(null)
  const [shots,setShots]=useState(null)
  const [milk,setMilk]=useState(null)
  const [milkRatio,setMilkRatio]=useState(50)
  const [temp,setTemp]=useState(null)
  const [ice,setIce]=useState(null)
  const [size,setSize]=useState(null)
  const [sweetener,setSweetener]=useState(null)
  const [sweetness,setSweetness]=useState(50)
  const [foam,setFoam]=useState(null)
  const [toppings,setToppings]=useState([])
  const [dessert,setDessert]=useState(null)
  const [savoury,setSavoury]=useState(null)
  const [cupOpen,setCupOpen]=useState(false)

  const baseObj=BASES.find(b=>b.id===base)
  const milkObj=MILKS.find(m=>m.id===milk)
  const foamObj=FOAMS.find(f=>f.id===foam)
  const isCoffee=COFFEE_BASES.includes(base)
  const grades=base?GRADES[base]:null

  const cupOrder={
    base:baseObj?.name, baseCat:baseObj?.cat,
    isCold:temp==='cold', temp,
    hasMilk:milk&&milk!=='none',
    ice, foamId:foam&&foam!=='none'?FOAM_IDS[foam]:null,
    toppings:toppings.map(t=>TOPPINGS.find(x=>x.id===t)?.name).filter(Boolean),
  }

  function handleNext(){
    if(!base) return
    onNext({
      base:baseObj?.name, baseIcon:baseObj?.icon, baseCat:baseObj?.cat,
      grade, shots,
      milk:milkObj?.name, milkRatio,
      temp, ice, size,
      sweetener, sweetness,
      foam:foamObj?.name, foamId:foam&&foam!=='none'?foam:null,
      toppings:toppings.map(t=>TOPPINGS.find(x=>x.id===t)?.name).filter(Boolean),
      dessert:DESSERTS.find(d=>d.id===dessert)?.id!=='none'?DESSERTS.find(d=>d.id===dessert)?.name:null,
      dessertIcon:DESSERTS.find(d=>d.id===dessert)?.icon,
      savoury:SAVOURY.find(s=>s.id===savoury)?.id!=='none'?SAVOURY.find(s=>s.id===savoury)?.name:null,
      savouryIcon:SAVOURY.find(s=>s.id===savoury)?.icon,
      liqColor:{matcha:'#7ab840',hojicha:'#c87840',coffee:'#6a3818',ube:'#9070c0',other:'#484038'}[baseObj?.cat]||'#b0d880',
      foamColor:{oat:'#f8f4e4',coconut:'#fffaf0',matcha:'#a0c860',hojicha:'#d09860',ube:'#c0a8f0',salted:'#fdfbf5',vanilla:'#fdf8e4'}[foam]||null,
      isCold:temp==='cold',
    })
  }

  return (
    <div className="flex h-full">

      {/* ── MAIN SCROLL ── */}
      <div className="flex-1 overflow-y-auto pb-28" style={{scrollbarWidth:'thin'}}>
        <div className="max-w-2xl mx-auto p-4 flex flex-col gap-5">

          {/* 01 BASE */}
          <div>
            <Head num={1} title="Choose your base" sub="matcha · coffee · tea"/>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {BASES.map(b=>{
                const c=CAT[b.cat], sel=base===b.id
                return (
                  <button key={b.id} onClick={()=>{setBase(b.id);setGrade(null);setShots(null)}}
                    className={`hover-bounce sticker border-2 rounded-xl p-2.5 text-center relative bg-white ${sel?`${c.border} ${c.bg} shadow-md`:'border-[#e0d0bc]'}`}>
                    {sel&&<span className="absolute top-1 right-1.5 text-[9px]">✓</span>}
                    <div className="card-icon text-2xl mb-1">{b.icon}</div>
                    <div className="text-[10px] font-black text-[#2c1a08] leading-tight">{b.name}</div>
                    <div className="text-[8px] text-[#a09080] font-semibold mt-0.5 hidden sm:block">{b.sub}</div>
                  </button>
                )
              })}
            </div>
            {grades&&(
              <div className="mt-3">
                <div className="text-[10px] font-black text-[#a09080] uppercase tracking-wider mb-2">
                  {base?.includes('matcha')?'Grade':base==='hojicha'?'Type':'Variety'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {grades.map(g=><Chip key={g} label={g} sel={grade===g} onClick={()=>setGrade(g)} color={baseObj?.cat}/>)}
                </div>
              </div>
            )}
            {isCoffee&&(
              <div className="mt-3">
                <div className="text-[10px] font-black text-[#a09080] uppercase tracking-wider mb-2">Shots</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Single (1)','Double (2)','Triple (3)','Quad (4)'].map(s=>(
                    <Chip key={s} label={s} sel={shots===s} onClick={()=>setShots(s)} color="coffee"/>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 02 MILK */}
          <div>
            <Head num={2} title="Milk" sub="dairy · plant-based"/>
            <div className="grid grid-cols-3 gap-2">
              {MILKS.map(m=>(
                <button key={m.id} onClick={()=>setMilk(m.id)}
                  className={`hover-bounce sticker border-2 rounded-xl p-2 text-center ${milk===m.id?'border-[#5a8a3c] bg-[#eef8e0] shadow-md':'border-[#e0d0bc] bg-white'}`}>
                  <div className="card-icon text-xl mb-1">{m.icon}</div>
                  <div className="text-[10px] font-black text-[#2c1a08]">{m.name}</div>
                  <div className="text-[8px] text-[#a09080] hidden sm:block">{m.sub}</div>
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

          {/* 03 TEMP */}
          <div>
            <Head num={3} title="Temperature"/>
            <div className="grid grid-cols-3 gap-2">
              {[
                {id:'hot',icon:'🔥',label:'Hot',on:'border-[#d04030] bg-[#fff2f0]'},
                {id:'cold',icon:'🧊',label:'Iced',on:'border-[#3080c8] bg-[#f0f4ff]'},
                {id:'warm',icon:'🌡️',label:'Warm',on:'border-[#b86830] bg-[#faecd8]'},
              ].map(t=>(
                <button key={t.id} onClick={()=>{setTemp(t.id);if(t.id!=='cold')setIce(null)}}
                  className={`hover-bounce sticker border-2 rounded-xl p-3 text-center ${temp===t.id?`${t.on} shadow-md`:'border-[#e0d0bc] bg-white'}`}>
                  <div className="card-icon text-2xl mb-1">{t.icon}</div>
                  <div className="text-xs font-black text-[#2c1a08]">{t.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 04 ICE */}
          {temp==='cold'&&(
            <div>
              <Head num={4} title="Ice level"/>
              <div className="flex flex-wrap gap-2 mb-3">
                {['No ice','Light ice','Regular ice','Extra ice'].map(i=>(
                  <Chip key={i} label={i} sel={ice===i} onClick={()=>setIce(i)} color="coffee"/>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-[#e8f4ff] rounded-xl p-3">
                {[0,1,2,3,4,5].map(i=>{
                  const on=ice==='Light ice'?i<2:ice==='Regular ice'?i<4:ice==='Extra ice'?i<6:false
                  return <div key={i} style={{
                    width:22,height:22,borderRadius:5,flexShrink:0,
                    background:on?'#60b8f8':'#c8e8ff',
                    opacity:on?1:0.4,
                    border:'2px solid #90c8f8',
                    transition:'all 0.3s',
                    boxShadow:on?'0 2px 6px rgba(96,184,248,0.5)':'none'
                  }}/>
                })}
                {ice&&<span className="text-[11px] font-black text-[#3080c8] ml-2">{ice}</span>}
              </div>
            </div>
          )}

          {/* 05 SIZE */}
          <div>
            <Head num={temp==='cold'?5:4} title="Size"/>
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
                  <div className="text-[9px] text-[#a09080]">{s.vol}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 06 SWEETENER */}
          <div>
            <Head num={temp==='cold'?6:5} title="Sweetener"/>
            <div className="flex flex-wrap gap-1.5">
              {SWEETENERS.map(s=><Chip key={s} label={s} sel={sweetener===s} onClick={()=>setSweetener(s)}/>)}
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

          {/* 07 FOAM */}
          <div>
            <Head num={temp==='cold'?7:6} title="Foam"/>
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

          {/* 08 TOPPINGS */}
          <div>
            <Head num={temp==='cold'?8:7} title="Toppings" sub="pick any ✦"/>
            <div className="grid grid-cols-4 gap-1.5">
              {TOPPINGS.map(t=>(
                <button key={t.id}
                  onClick={()=>setToppings(prev=>prev.includes(t.id)?prev.filter(x=>x!==t.id):[...prev,t.id])}
                  className={`hover-bounce sticker border-2 rounded-xl p-2 text-center ${toppings.includes(t.id)?'border-[#7aaa50] bg-[#eef8e0] shadow-md':'border-[#e0d0bc] bg-white'}`}>
                  <div className="card-icon text-xl mb-1">{t.icon}</div>
                  <div className="text-[8.5px] font-black text-[#2c1a08] leading-tight">{t.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 09 DESSERTS */}
          <div>
            <Head num={temp==='cold'?9:8} title="Sweet treats" sub="pick one 🍡"/>
            <div className="grid grid-cols-2 gap-2">
              {DESSERTS.map(d=>(
                <button key={d.id} onClick={()=>setDessert(d.id)}
                  className={`hover-bounce sticker border-2 rounded-xl p-2.5 flex items-center gap-2 text-left ${dessert===d.id?'border-[#c0607a] bg-[#fde8f0] shadow-md':'border-[#e0d0bc] bg-white'}`}>
                  <span className="card-icon text-xl flex-shrink-0">{d.icon}</span>
                  <div>
                    <div className="text-[10px] font-black text-[#2c1a08] leading-tight">{d.name}</div>
                    <div className="text-[8px] text-[#a09080] hidden sm:block">{d.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 10 SAVOURY */}
          <div>
            <Head num={temp==='cold'?10:9} title="Savoury bites" sub="pick one 🥑"/>
            <div className="grid grid-cols-2 gap-2">
              {SAVOURY.map(s=>(
                <button key={s.id} onClick={()=>setSavoury(s.id)}
                  className={`hover-bounce sticker border-2 rounded-xl p-2.5 flex items-center gap-2 text-left ${savoury===s.id?'border-[#b86830] bg-[#faecd8] shadow-md':'border-[#e0d0bc] bg-white'}`}>
                  <span className="card-icon text-xl flex-shrink-0">{s.icon}</span>
                  <div>
                    <div className="text-[10px] font-black text-[#2c1a08] leading-tight">{s.name}</div>
                    <div className="text-[8px] text-[#a09080] hidden sm:block">{s.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── CUP SIDEBAR (desktop only) ── */}
      <div className="hidden lg:flex w-64 flex-shrink-0 bg-[#f5ede0] border-l-2 border-[#e0d0bc] flex-col items-center pt-8 gap-4">
        <div className="text-[10px] font-black text-[#a09080] uppercase tracking-widest">Your drink</div>
        <div className="animate-float">
          <Cup order={cupOrder} size="lg"/>
        </div>
        <div className="text-center px-4">
          <div className="text-xs font-black text-[#2c1a08]">
            {baseObj?.name || 'Select a base ✦'}
          </div>
          {temp && (
            <div className="text-[10px] text-[#a09080] font-semibold mt-1">
              {temp==='hot'?'🔥 Hot':temp==='cold'?'🧊 Iced':'🌡️ Warm'}
            </div>
          )}
        </div>
      </div>

      {/* ── CUP FLOAT BUTTON (mobile/tablet) ── */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <button onClick={()=>setCupOpen(!cupOpen)}
          className="w-14 h-14 rounded-full bg-[#2c1a08] shadow-xl flex items-center justify-center hover-bounce"
          style={{boxShadow:'0 4px 20px rgba(44,26,8,0.35)'}}>
          <Cup order={cupOrder} size="sm"/>
        </button>

        {/* Cup popup */}
        {cupOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border-2 border-[#e0d0bc] p-4 flex flex-col items-center gap-3 w-44 animate-pop">
            <div className="text-[10px] font-black text-[#a09080] uppercase tracking-widest">Your drink</div>
            <Cup order={cupOrder} size="md"/>
            <div className="text-[11px] font-black text-[#2c1a08] text-center">
              {baseObj?.name || 'Nothing yet'}
            </div>
          </div>
        )}
      </div>

      {/* ── NEXT BUTTON ── */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-auto lg:w-64 bg-white border-t-2 border-[#e0d0bc] p-3 z-30">
        <button onClick={handleNext} disabled={!base}
          className="pill-btn w-full py-3.5 rounded-xl bg-[#2c1a08] text-[#faf7f2] font-black text-sm disabled:opacity-40 disabled:cursor-not-allowed">
          {base ? `Make my ${baseObj?.name} →` : 'Choose a base to continue'}
        </button>
      </div>

    </div>
  )
}