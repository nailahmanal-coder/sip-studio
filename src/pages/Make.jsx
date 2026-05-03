import { useState } from 'react'

const LIQ_COLORS = {
  matcha:'#7ab840', hojicha:'#c87840',
  coffee:'#6a3818', ube:'#9070c0', other:'#484038',
}
const FOAM_COLORS = {
  oat:'#f8f4e4', coconut:'#fffaf0', matcha:'#a0c860',
  hojicha:'#d09860', ube:'#c0a8f0', salted:'#fdfbf5', vanilla:'#fdf8e4',
}
const MILK_COLOR = '#fdfaf5'
const ICE_COLOR = '#b8e0f8'

const TOPPING_COLORS = {
  'Boba Pearls':'#3a2010','Crystal Boba':'#a0d8f0','Popping Boba':'#f88080',
  'Red Bean':'#7a2820','Grass Jelly':'#303820','Egg Pudding':'#f0d890',
  'Matcha Dust':'#70a030','Cinnamon':'#b86020','Cocoa Powder':'#5a2810',
  'Rose Petals':'#f09090','Sea Salt':'#d0dce8','Honey Drizzle':'#d4a020',
  'Caramel Drizzle':'#b06010','Lavender Buds':'#a890e0',
  'Edible Gold':'#d4b030','Sesame Seeds':'#c8a860',
}

function BigCup({ steps, order }) {
  const liqColor = LIQ_COLORS[order.baseCat] || '#b0d880'
  const foamColor = order.foam ? (FOAM_COLORS[order.foamId] || null) : null
  const hasBase = steps.includes('base')
  const hasMilk = steps.includes('milk')
  const hasFoam = steps.includes('foam')
  const hasIce = steps.includes('ice')
  const addedToppings = steps.filter(s => s.startsWith('topping-'))
  const isCold = order.isCold

  return (
    <svg width="160" height="220" viewBox="0 0 160 220"
      style={{overflow:'visible', filter:'drop-shadow(0 8px 20px rgba(0,0,0,0.15))'}}>
      <defs><clipPath id="bigcup"><polygon points="18,20 142,20 128,206 32,206"/></clipPath></defs>

      {/* liquid base */}
      {hasBase && (
        <rect x="18" y="80" width="122" height="126"
          clipPath="url(#bigcup)" fill={liqColor} opacity="0.88"
          style={{animation:'pop 0.4s cubic-bezier(0.34,1.4,0.64,1)'}}/>
      )}

      {/* milk layer */}
      {hasMilk && (
        <rect x="18" y="60" width="122" height="28"
          clipPath="url(#bigcup)" fill={MILK_COLOR} opacity="0.85"
          style={{animation:'pop 0.4s cubic-bezier(0.34,1.4,0.64,1)'}}/>
      )}

      {/* ice cubes */}
      {hasIce && (
        <g style={{animation:'pop 0.4s cubic-bezier(0.34,1.4,0.64,1)'}}>
          {[[25,130],[55,145],[85,132],[40,158],[70,162],[100,148]].map(([x,y],i)=>(
            <rect key={i} x={x} y={y} width="22" height="22" rx="5"
              fill={ICE_COLOR} opacity="0.8" clipPath="url(#bigcup)"/>
          ))}
        </g>
      )}

      {/* foam */}
      {hasFoam && foamColor && (
        <rect x="18" y="20" width="122" height="38"
          clipPath="url(#bigcup)" fill={foamColor} opacity="0.93"
          style={{animation:'pop 0.4s cubic-bezier(0.34,1.4,0.64,1)'}}/>
      )}

      {/* topping dots */}
      {addedToppings.map((s,i) => {
        const name = s.replace('topping-','')
        const xs = [40,65,90,50,75,100,55,80]
        return (
          <circle key={i} cx={xs[i%8]} cy="26" r="6"
            fill={TOPPING_COLORS[name]||'#999'} opacity="0.9"
            clipPath="url(#bigcup)"
            style={{animation:'pop 0.3s cubic-bezier(0.34,1.4,0.64,1)'}}/>
        )
      })}

      {/* cup outline */}
      <polygon points="18,20 142,20 128,206 32,206"
        fill="none" stroke="#c8b898" strokeWidth="4"/>
      <line x1="18" y1="20" x2="142" y2="20"
        stroke="#d4c4a4" strokeWidth="5" strokeLinecap="round"/>
      <line x1="32" y1="30" x2="28" y2="200"
        stroke="white" strokeWidth="5" opacity="0.22" strokeLinecap="round"/>

      {/* straw */}
      {isCold && (
        <rect x="118" y="0" width="10" height="100" rx="5" fill="#f8b8c8" opacity="0.9"/>
      )}

      {/* steam */}
      {!isCold && hasBase && (
        <g>
          <path d="M55 15 Q62 5 55 -8" stroke="#ddd" strokeWidth="3" fill="none" strokeLinecap="round" className="steam-1"/>
          <path d="M80 12 Q87 2 80 -11" stroke="#ddd" strokeWidth="3" fill="none" strokeLinecap="round" className="steam-2"/>
          <path d="M105 15 Q112 5 105 -8" stroke="#ddd" strokeWidth="3" fill="none" strokeLinecap="round" className="steam-3"/>
        </g>
      )}
    </svg>
  )
}

function Plate({ items }) {
  const positions = [
    {x:50, y:50}, {x:150, y:50}, {x:100, y:120},
    {x:40, y:130}, {x:165, y:120},
  ]
  return (
    <div className="relative w-full flex justify-center">
      <svg width="240" height="180" viewBox="0 0 240 180"
        style={{filter:'drop-shadow(0 6px 16px rgba(0,0,0,0.1))'}}>
        {/* plate */}
        <ellipse cx="120" cy="130" rx="110" ry="40" fill="#f0ece4" stroke="#e0d8cc" strokeWidth="3"/>
        <ellipse cx="120" cy="124" rx="95" ry="34" fill="#faf8f4" stroke="#e8e0d4" strokeWidth="1.5"/>
        {/* tray surface */}
        <ellipse cx="120" cy="118" rx="88" ry="30" fill="#fffdf8"/>

        {/* placed items */}
        {items.map((item, i) => {
          const pos = positions[i % positions.length]
          return (
            <text key={i} x={pos.x} y={pos.y} fontSize="36" textAnchor="middle"
              style={{animation:'stamp 0.4s cubic-bezier(0.34,1.4,0.64,1)'}}>
              {item.icon}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

export default function Make({ order, onPin, onBack }) {
  const [steps, setSteps] = useState([])
  const [plateItems, setPlateItems] = useState([])
  const [celebrating, setCelebrating] = useState(false)

  // Build the drink steps list
  const drinkSteps = []
  if (order.base) drinkSteps.push({
    id:'base', label:`Pour ${order.base}`, icon: order.baseIcon || '🍵',
    desc:'The foundation of your drink'
  })
  if (order.milk && order.milk !== 'No Milk') drinkSteps.push({
    id:'milk', label:`Add ${order.milk}`, icon:'🥛',
    desc:'Pour it in slowly'
  })
  if (order.isCold && order.ice) drinkSteps.push({
    id:'ice', label:`Add ${order.ice}`, icon:'🧊',
    desc:'Drop in the ice'
  })
  if (order.foam && order.foam !== 'No Foam') drinkSteps.push({
    id:'foam', label:`Top with ${order.foam}`, icon:'☁️',
    desc:'Spoon on the foam'
  })
  if (order.toppings?.length) {
    order.toppings.forEach(t => {
      drinkSteps.push({
        id:`topping-${t}`, label:`Add ${t}`, icon:'✨',
        desc:'Finishing touch'
      })
    })
  }

  // Food items
  const foodItems = []
  if (order.dessert) {
    const dessertIcons = {
      'Matcha Mochi Ice Cream':'🍡','Hojicha Tiramisu':'🍮',
      'Matcha Basque Cheesecake':'🎂','Strawberry Crepe Cake':'🍓',
      'Black Sesame Pudding':'🖤','Hojicha Cookie':'🍪',
      'Ube Butter Mochi':'💜','Matcha Financier':'🫘',
      'Yuzu Tart':'🍋','Matcha Croffle':'🧇','Chestnut Mont Blanc':'🌰'
    }
    foodItems.push({ name: order.dessert, icon: dessertIcons[order.dessert] || '🍰' })
  }
  if (order.savoury) {
    const savIcons = {
      'Avocado Toast':'🥑','Tamago Sando':'🍞','Salmon Onigiri':'🍙',
      'Matcha Cheese Toast':'🧀','Smoked Salmon Bagel':'🐟',
      'Mushroom Galette':'🍄','Prosciutto Croissant':'🥐'
    }
    foodItems.push({ name: order.savoury, icon: savIcons[order.savoury] || '🍽️' })
  }

  const nextDrinkStep = drinkSteps.find(s => !steps.includes(s.id))
  const drinkDone = drinkSteps.every(s => steps.includes(s.id))
  const nextFoodItem = foodItems.find(f => !plateItems.find(p => p.name === f.name))
  const foodDone = foodItems.length === 0 || foodItems.every(f => plateItems.find(p => p.name === f.name))
  const allDone = drinkDone && foodDone

  function tapDrinkStep() {
    if (!nextDrinkStep) return
    setSteps(prev => [...prev, nextDrinkStep.id])
    if (drinkSteps.indexOf(nextDrinkStep) === drinkSteps.length - 1 && foodDone) {
      setCelebrating(true)
      setTimeout(() => setCelebrating(false), 1000)
    }
  }

  function tapFoodItem() {
    if (!nextFoodItem) return
    setPlateItems(prev => [...prev, nextFoodItem])
    if (!nextDrinkStep && foodItems.indexOf(nextFoodItem) === foodItems.length - 1) {
      setCelebrating(true)
      setTimeout(() => setCelebrating(false), 1000)
    }
  }

  function handlePin() {
    onPin()
  }

  const progress = (steps.length + plateItems.length) / (drinkSteps.length + foodItems.length || 1)

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] pb-8">

      {/* Header */}
      <div className="px-4 py-3 bg-[#f5ede0] border-b-2 border-[#e0d0bc] flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack}
          className="pill-btn text-[11px] font-black text-[#a09080] border-2 border-[#e0d0bc] px-3 py-1.5 rounded-full bg-white">
          ← back
        </button>
        <div className="flex-1">
          <div className="text-sm font-black text-[#2c1a08]">
            {allDone ? '✨ Ready to serve!' : `Making your ${order.base}...`}
          </div>
          <div className="mt-1 h-2 bg-[#e0d0bc] rounded-full overflow-hidden">
            <div className="h-full bg-[#5a8a3c] rounded-full transition-all duration-500"
              style={{width:`${progress*100}%`}}/>
          </div>
        </div>
        <div className="text-xs font-black text-[#5a8a3c]">
          {Math.round(progress*100)}%
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">

        {/* DRINK SECTION */}
        <div>
          <div className="text-xs font-black text-[#a09080] uppercase tracking-widest mb-3">
            ☕ Your drink
          </div>

          <div className="flex flex-col items-center gap-4">
            {/* Big cup */}
            <div className={celebrating ? 'animate-wobble' : 'animate-float'}>
              <BigCup steps={steps} order={{
                ...order,
                foamId: order.foam?.toLowerCase().split(' ')[0],
              }}/>
            </div>

            {/* Next step button */}
            {!drinkDone ? (
              <button onClick={tapDrinkStep}
                className="pill-btn w-full max-w-xs bg-[#2c1a08] text-[#faf7f2] rounded-2xl py-4 px-6 flex items-center gap-3 hover-bounce sticker">
                <span className="text-3xl">{nextDrinkStep?.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-black">{nextDrinkStep?.label}</div>
                  <div className="text-[10px] opacity-70">{nextDrinkStep?.desc}</div>
                </div>
                <span className="ml-auto text-lg">👆</span>
              </button>
            ) : (
              <div className="w-full max-w-xs bg-[#eef8e0] border-2 border-[#5a8a3c] rounded-2xl py-3 px-6 text-center">
                <div className="text-sm font-black text-[#5a8a3c]">✓ Drink done!</div>
              </div>
            )}

            {/* Steps progress */}
            <div className="flex gap-2 flex-wrap justify-center">
              {drinkSteps.map(s => (
                <div key={s.id}
                  className={`text-lg transition-all duration-300 ${steps.includes(s.id) ? 'opacity-100 scale-110' : 'opacity-25 scale-90'}`}>
                  {s.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOD SECTION */}
        {foodItems.length > 0 && (
          <div>
            <div className="text-xs font-black text-[#a09080] uppercase tracking-widest mb-3">
              🍽️ Your order
            </div>

            <div className="flex flex-col items-center gap-4">
              <Plate items={plateItems}/>

              {!foodDone ? (
                <button onClick={tapFoodItem}
                  className="pill-btn w-full max-w-xs bg-[#c0607a] text-white rounded-2xl py-4 px-6 flex items-center gap-3 hover-bounce sticker">
                  <span className="text-3xl">{nextFoodItem?.icon}</span>
                  <div className="text-left">
                    <div className="text-sm font-black">Plate the {nextFoodItem?.name}</div>
                    <div className="text-[10px] opacity-70">Tap to place it</div>
                  </div>
                  <span className="ml-auto text-lg">👆</span>
                </button>
              ) : (
                <div className="w-full max-w-xs bg-[#fde8f0] border-2 border-[#c0607a] rounded-2xl py-3 px-6 text-center">
                  <div className="text-sm font-black text-[#c0607a]">✓ Plated!</div>
                </div>
              )}

              <div className="flex gap-2 flex-wrap justify-center">
                {foodItems.map(f => (
                  <div key={f.name}
                    className={`text-2xl transition-all duration-300 ${plateItems.find(p=>p.name===f.name)?'opacity-100 scale-110':'opacity-25 scale-90'}`}>
                    {f.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NOTE PREVIEW */}
        {order.msg && (
          <div className="bg-[#fde8f0] rounded-2xl p-4 border-2 border-dashed border-[#f0b8d0]">
            <div className="text-[10px] font-black text-[#c0607a] mb-1">📝 Your note</div>
            <div className="text-[16px] text-[#5a4a38]"
              style={{fontFamily:"'Caveat', cursive"}}>
              {order.msg}
            </div>
            <div className="text-[10px] text-[#a09080] font-bold mt-1">
              from <span className="text-[#5a8a3c] font-black">{order.from}</span> 🤍
            </div>
          </div>
        )}

        {/* PIN BUTTON */}
        {allDone && (
          <button onClick={handlePin}
            className="pill-btn w-full py-4 rounded-2xl bg-[#5a8a3c] text-white text-base font-black animate-bounce-in hover-bounce sticker shadow-lg">
            📌 Pin to message wall ✨
          </button>
        )}

        {!allDone && (
          <div className="text-center text-[11px] font-bold text-[#a09080]">
            Complete all steps to pin your order ☕
          </div>
        )}

      </div>
    </div>
  )
}