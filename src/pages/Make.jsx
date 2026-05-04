import { useState } from 'react'
import Cup from '../components/Cup'

const FOAM_IDS = {
  'Oat Foam':'oat','Coconut Cold Foam':'coconut','Matcha Foam':'matcha',
  'Hojicha Foam':'hojicha','Ube Foam':'ube','Salted Cream':'salted','Vanilla Foam':'vanilla'
}

export default function Make({order, onNext, onBack}){
  const [doneSteps, setDoneSteps] = useState([])
  const [plateItems, setPlateItems] = useState([])

  const drinkSteps = []
  if(order.base) drinkSteps.push({id:'base',label:`Pour ${order.base}`,icon:order.baseIcon||'🍵',desc:'The foundation'})
  if(order.milk&&order.milk!=='No Milk') drinkSteps.push({id:'milk',label:`Add ${order.milk}`,icon:'🥛',desc:'Pour slowly'})
  if(order.isCold&&order.ice&&order.ice!=='No ice') drinkSteps.push({id:'ice',label:`Add ${order.ice}`,icon:'🧊',desc:'Drop in the ice'})
  if(order.foam&&order.foam!=='No Foam') drinkSteps.push({id:'foam',label:`Top with ${order.foam}`,icon:'☁️',desc:'Spoon it on'})
  order.toppings?.forEach(t=>drinkSteps.push({id:`top-${t}`,label:`Add ${t}`,icon:'✨',desc:'Finishing touch'}))

  const foodItems = []
  if(order.dessert) foodItems.push({name:order.dessert,icon:order.dessertIcon||'🍰'})
  if(order.savoury) foodItems.push({name:order.savoury,icon:order.savouryIcon||'🍽️'})

  const nextDrink = drinkSteps.find(s=>!doneSteps.includes(s.id))
  const drinkDone = drinkSteps.every(s=>doneSteps.includes(s.id))
  const nextFood = foodItems.find(f=>!plateItems.find(p=>p.name===f.name))
  const foodDone = foodItems.length===0||foodItems.every(f=>plateItems.find(p=>p.name===f.name))
  const allDone = drinkDone&&foodDone

  const progress = drinkSteps.length+foodItems.length===0 ? 1 :
    (doneSteps.length+plateItems.length)/(drinkSteps.length+foodItems.length)

  const cupOrder = {
    base: order.base,
    baseCat: order.baseCat,
    isCold: order.isCold,
    temp: order.temp,
    hasMilk: doneSteps.includes('milk'),
    ice: doneSteps.includes('ice') ? order.ice : null,
    foamId: doneSteps.includes('foam') ? (order.foamId || FOAM_IDS[order.foam]) : null,
    toppings: doneSteps.filter(s=>s.startsWith('top-')).map(s=>s.replace('top-','')),
  }

  return (
    <div className="flex flex-col" style={{height:'calc(100vh - 54px)'}}>

      {/* Progress header */}
      <div className="px-4 py-3 bg-[#f5ede0] border-b-2 border-[#e0d0bc] flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack}
          className="pill-btn text-[11px] font-black text-[#a09080] border-2 border-[#e0d0bc] px-3 py-1.5 rounded-full bg-white flex-shrink-0">
          ← back
        </button>
        <div className="flex-1">
          <div className="text-xs font-black text-[#2c1a08] mb-1">
            {allDone ? '✨ All done!' : nextDrink ? `Next: ${nextDrink.label}` : nextFood ? `Plate: ${nextFood.name}` : ''}
          </div>
          <div className="h-2.5 bg-[#e0d0bc] rounded-full overflow-hidden">
            <div className="h-full bg-[#5a8a3c] rounded-full transition-all duration-500"
              style={{width:`${progress*100}%`}}/>
          </div>
        </div>
        <div className="text-xs font-black text-[#5a8a3c] flex-shrink-0">{Math.round(progress*100)}%</div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{scrollbarWidth:'thin'}}>
        <div className="max-w-md mx-auto p-4 flex flex-col items-center gap-6 pb-8">

          {/* BIG CUP */}
          <div className={allDone?'animate-wobble':'animate-float'}>
            <Cup order={cupOrder} size="lg"/>
          </div>

          {/* DRINK STEPS */}
          {!drinkDone ? (
            <button onClick={()=>setDoneSteps(p=>[...p,nextDrink.id])}
              className="pill-btn w-full bg-[#2c1a08] text-[#faf7f2] rounded-2xl py-4 px-5 flex items-center gap-3 hover-bounce sticker shadow-lg">
              <span className="text-3xl">{nextDrink?.icon}</span>
              <div className="text-left flex-1">
                <div className="text-sm font-black">{nextDrink?.label}</div>
                <div className="text-[10px] opacity-60">{nextDrink?.desc} · tap to add</div>
              </div>
              <span className="text-xl">👆</span>
            </button>
          ) : (
            <div className="w-full bg-[#eef8e0] border-2 border-[#5a8a3c] rounded-2xl py-3 text-center">
              <span className="text-sm font-black text-[#5a8a3c]">✓ Drink done!</span>
            </div>
          )}

          {/* Step icons */}
          <div className="flex gap-3 flex-wrap justify-center">
            {drinkSteps.map(s=>(
              <div key={s.id} className={`text-2xl transition-all duration-300 ${doneSteps.includes(s.id)?'opacity-100 scale-110':'opacity-20 scale-90'}`}>
                {s.icon}
              </div>
            ))}
          </div>

          {/* FOOD PLATING */}
          {foodItems.length>0&&(
            <div className="w-full">
              <div className="text-[10px] font-black text-[#a09080] uppercase tracking-widest text-center mb-3">🍽️ Your food</div>

              {/* Plate */}
              <div className="flex justify-center mb-4">
                <div className="relative w-56 h-32">
                  <div className="absolute inset-0 rounded-full"
                    style={{background:'radial-gradient(ellipse,#faf8f4 60%,#ede8e0 100%)',border:'3px solid #e0d8cc',boxShadow:'0 4px 20px rgba(0,0,0,0.08)'}}/>
                  <div className="absolute inset-4 rounded-full"
                    style={{background:'#fffdf8',border:'1.5px solid #eee8e0'}}/>
                  <div className="absolute inset-0 flex items-center justify-center gap-3">
                    {plateItems.map((item,i)=>(
                      <span key={i} className="text-3xl animate-stamp">{item.icon}</span>
                    ))}
                    {plateItems.length===0&&(
                      <span className="text-[11px] font-bold text-[#c8b898]">empty plate</span>
                    )}
                  </div>
                </div>
              </div>

              {!foodDone?(
                <button onClick={()=>setPlateItems(p=>[...p,nextFood])}
                  className="pill-btn w-full bg-[#c0607a] text-white rounded-2xl py-4 px-5 flex items-center gap-3 hover-bounce sticker shadow-lg">
                  <span className="text-3xl">{nextFood?.icon}</span>
                  <div className="text-left flex-1">
                    <div className="text-sm font-black">Plate the {nextFood?.name}</div>
                    <div className="text-[10px] opacity-70">Tap to place it</div>
                  </div>
                  <span className="text-xl">👆</span>
                </button>
              ):(
                <div className="w-full bg-[#fde8f0] border-2 border-[#c0607a] rounded-2xl py-3 text-center">
                  <span className="text-sm font-black text-[#c0607a]">✓ Plated!</span>
                </div>
              )}
            </div>
          )}

          {/* Note preview */}
          {order.msg&&(
            <div className="w-full bg-[#fde8f0] rounded-2xl p-4 border-2 border-dashed border-[#f0b8d0]">
              <div className="text-[16px] text-[#5a4a38]" style={{fontFamily:"'Caveat',cursive"}}>{order.msg}</div>
              <div className="text-[10px] text-[#a09080] font-bold mt-1">from <span className="text-[#5a8a3c] font-black">{order.from}</span> 🤍</div>
            </div>
          )}

          {/* NEXT button */}
          {allDone&&(
            <button onClick={onNext}
              className="pill-btn w-full py-4 rounded-2xl bg-[#5a8a3c] text-white font-black text-sm animate-bounce-in shadow-lg">
              Add your note & pin →
            </button>
          )}
          {!allDone&&(
            <p className="text-[11px] font-bold text-[#a09080] text-center">Complete all steps above to continue ☕</p>
          )}

        </div>
      </div>
    </div>
  )
}