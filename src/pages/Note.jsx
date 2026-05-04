export default function Note({order, onPin, onBack}){
  return (
    <div className="flex flex-col" style={{height:'calc(100vh - 54px)'}}>
      <div className="px-4 py-3 bg-[#f5ede0] border-b-2 border-[#e0d0bc] flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack}
          className="pill-btn text-[11px] font-black text-[#a09080] border-2 border-[#e0d0bc] px-3 py-1.5 rounded-full bg-white">
          ← back
        </button>
        <div className="text-sm font-black text-[#2c1a08]">Leave a note 🌸</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4" style={{scrollbarWidth:'thin'}}>
        <div className="max-w-md mx-auto flex flex-col gap-4">

          {/* Order summary card */}
          <div className="bg-white rounded-2xl border-2 border-[#e0d0bc] overflow-hidden">
            <div className="bg-[#f5ede0] px-4 py-3 border-b border-[#e0d0bc]">
              <div className="font-black text-sm text-[#2c1a08]">{order.baseIcon} {order.base}</div>
              {order.grade&&<div className="text-[10px] text-[#a09080] font-semibold">{order.grade}</div>}
            </div>
            <div className="p-4 flex flex-wrap gap-1.5">
              {[
                order.temp&&(order.temp==='hot'?'🔥 Hot':order.temp==='cold'?'🧊 Iced':'🌡️ Warm'),
                order.size,
                order.milk&&order.milk!=='No Milk'&&order.milk,
                order.sweetener&&order.sweetener!=='No sugar'&&order.sweetener,
                order.foam&&order.foam!=='No Foam'&&order.foam,
                ...(order.toppings||[]),
                order.dessert,
                order.savoury,
              ].filter(Boolean).map((tag,i)=>(
                <span key={i} className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#f5ede0] text-[#6a5040]">{tag}</span>
              ))}
            </div>
          </div>

          {/* Name + message */}
          <div className="bg-[#fde8f0] rounded-2xl p-4 border-2 border-dashed border-[#f0b8d0] flex flex-col gap-3">
            <div className="text-[11px] font-black text-[#c0607a]">🌸 Your personal note</div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black text-[#c0607a] flex-shrink-0">from</span>
              <input
                value={order.from==='someone'?'':order.from}
                onChange={e=>order.from=e.target.value||'someone'}
                placeholder="your name"
                maxLength={24}
                className="flex-1 border-2 border-[#f0b8d0] rounded-xl px-3 py-2 text-[12px] font-bold bg-white text-[#2c1a08] outline-none focus:border-[#c0607a]"
              />
            </div>
            <textarea
              value={order.msg}
              onChange={e=>order.msg=e.target.value}
              placeholder="leave a lil message... ☕"
              maxLength={110}
              rows={3}
              className="w-full border-2 border-[#f0b8d0] rounded-xl px-3 py-2 bg-white text-[#2c1a08] outline-none resize-none focus:border-[#c0607a]"
              style={{fontFamily:"'Caveat',cursive",fontSize:'16px'}}
            />
          </div>

          <button onClick={onPin}
            className="pill-btn w-full py-4 rounded-2xl bg-[#2c1a08] text-[#faf7f2] font-black text-sm shadow-lg hover-bounce sticker">
            📌 Pin to message wall
          </button>

        </div>
      </div>
    </div>
  )
}
