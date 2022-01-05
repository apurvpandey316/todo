function Login({ closeLogin, userLogin }) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center fixed bg-[rgba(0,0,0,0.5)] z-2 ">
      <div className="bg-white p-10 flex flex-col justify-around">
        <form action="" onSubmit={userLogin}>
          <div className="py-5 flex justify-between items-center">
            <label htmlFor="userName">UserName</label>
            <input
              className="mx-2 p-2 rounded-xl border-4 "
              type="text"
              name="userName"
              id="userName"
              autoComplete="off"
            />
          </div>
          <div className="py-5 flex justify-between items-center">
            <label htmlFor=""> Email</label>
            <input
              className="mx-2 p-2 rounded-xl border-4 "
              type="text"
              name="email"
              id="email"
              autoComplete="off"
            />
          </div>
          <div className="py-5 flex justify-between items-center">
            <label htmlFor="">Password</label>
            <input
              className="mx-2 p-2 rounded-xl border-4 "
              type="password"
              name="password"
              id="password"
              autoComplete="off"
            />
          </div>
          <div className="flex justify-between mt-5 ">
            <button
              className="bg-red-600 text-white py-2 px-4 rounded-md"
              onClick={closeLogin}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
