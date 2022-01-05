function DashBoard({ addnote, login, signup, user, logout }) {
  let buttons = [];
  if (user) {
    buttons.push(
      <button className="font-bolder text-4xl" onClick={logout}>
        Log Out
      </button>
    );
  } else {
    buttons.push(
      <button className="font-bolder text-4xl" onClick={login}>
        Login
      </button>
    );
    buttons.push(
      <button className="font-bolder text-4xl" onClick={signup}>
        Sign Up
      </button>
    );
  }
  return (
    <div className="flex bg-gray-300 h-16 px-2 my-6 py-4 justify-between items-center">
      {/* Left Part  */}
      <div className="">
        <h1 className="text-xl font-semibold font-red-300">Todos</h1>
      </div>
      {/* buttons */}
      <div className="">
        <button className="font-bolder text-4xl" onClick={addnote}>
          +
        </button>
      </div>
      <div className="space-x-10">{buttons.map((button) => button)}</div>
    </div>
  );
}

export default DashBoard;
