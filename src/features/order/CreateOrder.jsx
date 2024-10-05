import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../Store"
import { clearItem, getTotalPrice } from "../cart/CartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/UserSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const navigation = useNavigation();
  const formErrors = useActionData();
  const isSubmitting = navigation.state === "submitting";
   const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(store => store.cart.cart)
  const {userName, status: addressStatus , position , address , error : errorAddress} = useSelector(store => store.user)
  const totalCartPrice = useSelector(getTotalPrice)
  const priorityPrice = withPriority ? totalCartPrice*0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch()

  const isLoadingAddress = addressStatus === "loading"


  if(!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-6">
      <h2 className=" mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" defaultValue={userName} required className="input grow"/>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow"> 
            <input type="tel" name="phone" required className="input w-full "/>
            {formErrors?.phone && <p className="text-xs text-red-700 bg-red-100 round-md p-2 mt-2">{formErrors.phone}</p>}
          </div>
          
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required  className="input w-full" defaultValue={address} disabled={isLoadingAddress}/>
             { addressStatus === "error" && <p className="text-xs text-red-700 bg-red-100 round-md p-2 mt-2">{errorAddress}</p>}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px] z-50">
          <Button type="small" onClick={(e)=> 
            { e.preventDefault();
               dispatch(fetchAddress())}
               } disabled={isLoadingAddress}>get Position</Button>
          </span>)}
          
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 accent-yellow-400  focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
             onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button disabled={isSubmitting || isLoadingAddress} type="primary" >
            {isSubmitting ? "Placing Order .... " : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="postion" value={position.longitude && position.latitude ? `${position.longitude}, ${position.latitude}` : ""} />
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  console.log(order)

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please Provide your Correct Phone Number. We Might Need It to Contact you";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearItem());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
