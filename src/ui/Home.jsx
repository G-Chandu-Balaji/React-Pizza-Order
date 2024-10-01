import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser"
import Button from "./Button";

function Home() {
  const userName = useSelector(store => store.user.userName)
  return (
    <div className="text-center my-10 sm:my-16 ">
      <h1 className="text-stone-800 px-4 mb-5 text-xl md:text-3xl font-semibold   ">
        The best pizza.
        <br />
        <span className="text-yellow-500">
        Straight out of the oven, straight to you.
        </span>
       </h1>



      {userName === "" ? <CreateUser /> : <Button type="primary" to="/menu">Continue ordering {userName}</Button>}
    </div>
  );
}

export default Home;
