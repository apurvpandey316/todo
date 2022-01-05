function Modal({ closeModel, saveNote }) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center fixed bg-[rgba(0,0,0,0.5)] z-2 ">
      <div className="bg-white p-10 flex flex-col justify-around">
        <form action="" onSubmit={saveNote}>
          <div className="py-5 flex justify-between items-center">
            <label htmlFor="name">Name</label>
            <input
              className="mx-2 p-2 rounded-xl border-4 "
              type="text"
              name="name"
              id="name"
              autoComplete="off"
            />
          </div>
          <div className="py-5 flex justify-between items-center">
            <label htmlFor=""> Description</label>
            <input
              className="mx-2 p-2 rounded-xl border-4 "
              type="text"
              name="description"
              id="description"
              autoComplete="off"
            />
          </div>
          <div className="flex justify-between mt-5 ">
            <button
              className="bg-red-600 text-white py-2 px-4 rounded-md"
              onClick={closeModel}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
