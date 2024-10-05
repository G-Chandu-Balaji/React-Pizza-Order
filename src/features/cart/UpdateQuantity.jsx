import React from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { decreaseItem, increaseItem } from './CartSlice'

function UpdateQuantity({pizzaId, currentQuantity}) {
    const dispatch = useDispatch()
  return (
    <div className='flex gap-1 md:gap-3 items-center'>
    <Button  type="round" onClick={()=> dispatch(decreaseItem(pizzaId)) }>-</Button>
    <span className='font-medium '>{currentQuantity}</span>
    <Button  type="round" onClick={()=> dispatch(increaseItem(pizzaId)) }>+</Button>
    </div>
  )
}

export default UpdateQuantity