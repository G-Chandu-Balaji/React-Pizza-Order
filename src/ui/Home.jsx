import CreateUser from "../features/user/CreateUser"

function Home() {
  return (
    <div className="text-center my-10 sm:my-16 ">
      <h1 className="text-stone-800 px-4 mb-5 text-xl md:text-3xl font-semibold   ">
        The best pizza.
        <br />
        <span className="text-yellow-500">
        Straight out of the oven, straight to you.
        </span>
       </h1>



      <CreateUser />
    </div>
  );
}

export default Home;
