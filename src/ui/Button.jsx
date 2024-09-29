import { Link } from "react-router-dom"

function Button({children , disabled, to}) {
    const className ="bg-yellow-400 text-stone-800 uppercase font-semibold px-4 py-3 inline-block rounded-full tracking-wide hover:bg-yellow-300 transition-colorscolors duration-300 focus:outline-none focus:bg-yellow-300 focus:ring-yellow-300 focus:ring focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4 "
    if(to)
        return (
            <Link to={to} className={className}>{children}</Link>
        )
  return (
    <button disabled={disabled} className={className}>{children}</button>
  )
}

export default Button