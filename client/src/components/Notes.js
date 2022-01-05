function Notes({ note, deleteNote }) {
  // console.log(deleteNote(note._id));
  return (
    <div className="flex flex-col border-8 rounded-md space-x-4 m-12 w-fit px-10 py-5 items-start">
      <h1 className="text-4xl">{note.name}</h1>
      <h1 className="text-lg">{note.description}</h1>
      <div className="flex justify-around">
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-md text-sm w-fit mx-4"
          onClick={() => deleteNote(note._id)}
        >
          Delete
        </button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm w-fit mx-4">
          Edit
        </button>
      </div>
      <p className="text-[10px]"> {note.createdAt}</p>
    </div>
  );
}

export default Notes;
