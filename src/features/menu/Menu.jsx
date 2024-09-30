import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import Menuitem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  console.log(menu);
  return (
    <ul className="px-4 divide-y divide-stone-200">
      {menu.map((pizza) => (
        <Menuitem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
