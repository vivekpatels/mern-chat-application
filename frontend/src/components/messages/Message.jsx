const Message = () => {
  return (
    <div className="chat chat-end">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
            <img 
                alt="Tailwind Css that bubble component"
                src={
                    "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-512.png"
                }
                />
                </div>
        </div>
        <div className={`chat-bubble text-white  pb-2`}>Hii whats up?</div>
		<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
    </div>
  )
}

export default Message