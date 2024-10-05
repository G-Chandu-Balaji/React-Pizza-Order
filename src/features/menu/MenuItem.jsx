import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button"
import { addItem, getCurrentQuantityById } from "../cart/CartSlice";
import {useDispatch, useSelector} from "react-redux"
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UpdateQuantity";

function MenuItem( {pizza} ) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  
  
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  
  const isIncart = currentQuantity > 0;
  const dispatch = useDispatch()

  

  function handleAddToCart(){
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    }
    dispatch(addItem(newItem))

  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? "opacity-70 grayscale": ""}`} />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium ">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
        
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm text-stone-500 font-medium uppercase">Sold out</p>}
          {isIncart && (<div className="flex items-center gap-2 sm:gap-8"> 
            <UpdateQuantity pizzaId={id} currentQuantity={currentQuantity} />
            
            <DeleteItem pizzaId={id}/>
             </div>)}
          {!soldOut && !isIncart && <Button type="small" onClick={handleAddToCart}>Add to Cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
