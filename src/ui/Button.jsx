import { Link } from "react-router-dom"

function Button({children , disabled, to, type, onClick}) {

    const base = " text-sm bg-yellow-400 text-stone-800 uppercase font-semibold  inline-block rounded-full tracking-wide hover:bg-yellow-300 transition-colorscolors duration-300 focus:outline-none focus:bg-yellow-300 focus:ring-yellow-300 focus:ring focus:ring-offset-2 disabled:cursor-not-allowed  "
   
    const style= {
      primary: base + " px-4 py-3 sm:px-6 sm:py-4",
      small: base + " px-4 py-2 sm:px-5 sm:py-2.5 text-xs",
      round : base + " px-2 py-1 sm:px-3 sm:py-1.5 text-sm",
      secondary : "text-sm px-4 py-3 sm:px-6 sm:py-4 bg-stone-200 text-stone-800 uppercase font-semibold  inline-block rounded-full tracking-wide hover:bg-stone-300 transition-colorscolors duration-300 focus:outline-none focus:bg-stone-300 focus:ring-stone-300 focus:ring focus:ring-offset-2 disabled:cursor-not-allowed"
    }
   
    if(to)
        return (
            <Link to={to} className={style[type]}>{children}</Link>
        )
      if(onClick)
        return (
          <button onClick={onClick} disabled={disabled} className={style[type]}>{children}</button>
        )
  return (
    <button disabled={disabled} className={style[type]}>{children}</button>
  )
}

export default Button