import "./NoteApp.css";
import moment from "moment";
import { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { NoteContext } from "../../context/context";
import Loader from "../Loader/Loader";
import Air from '../assets/airbnb.svg'

const NoteApp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setLoading(true);
  }, []);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showNote, setShowNote] = useState(true);
  const [warning, setWarning] = useState(false);
  const [savedItems, setSavedItems] = useState(() =>
    JSON.parse(localStorage.getItem("notes"))
  );

  const [fields, setFields] = useState({
    title: "",
    about: "",
  });

  const [notes, setNotes] = useState(
    savedItems || [
      {
        id: nanoid(),
        title: "First Note",
        about: "This is the testing note right here bro",
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      },
      {
        id: nanoid(),
        title: "Second Note",
        about: "This is another testing note right here bro",
        date: moment.format("MMMM Do YYYY, h:mm:ss a"),
      },
    ]
  );

  const { myNotes, setMyNotes } = useContext(NoteContext);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const { title, about } = fields;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const filteredNote = notes.filter(
    (note) =>
      note.about.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      note.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  const toggleForm = () => {
    setShowForm(true);
    setShowNote(false);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    setMyNotes(savedItems);
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !about) {
      setWarning(true);
    } else {
      const adding = {
        id: nanoid(),
        title: title,
        about: about,
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      };

      const addingNew = [adding, ...notes];
      setNotes(addingNew);
      setFields({});
      setShowForm(false);
      setShowNote(true);
      setWarning(false);
    }
  };

  const deleteNote = (id) => {
    const newList = notes.filter((note) => note.id !== id);
    setNotes(newList);
  };

  const goBack = () => {
    setShowForm(false);
    setShowNote(true);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="note">
          {showNote && (
            <>
              <div className="note__title">
                <h1>Notepad.</h1>
                <div>
                  <i onClick={toggleForm} className="add__icon bi bi-plus"></i>
                </div>
              </div>
              <div className="search__box">
                <img
                  src="https://d.img.vision/detayo/Search.png"
                  alt=""
                />
                <input
                  type="text"
                  placeholder="Search notes"
                  value={search}
                  onChange={handleChange}
                />
              </div>

              {filteredNote.map((note) => {
                const { title, about, date, id } = note;
                return (
                  <div key={id} className="note__body">
                    <Link to={`/${note.id}`}>
                      <>
                        <h2 className="title">{title}</h2>
                        <p className="about">{about.substring(0, 18)}...</p>
                      </>
                    </Link>
                    <div className="trash-div">
                      <p className="time">{date}</p>
                      <i
                        onClick={() => deleteNote(id)}
                        className="bi bi-trash3-fill"
                      ></i>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {showForm && (
            <form onSubmit={handleSubmit} className="add-form">
              <i onClick={goBack} className="bi bi-arrow-left"></i>
              {warning && (
                <h6>
                  Not you trying to submit without filling these fields, lmao
                </h6>
              )}
              <h1>
                <input
                  className="add-form-input"
                  name="title"
                  type="text"
                  placeholder="ADD TITLE"
                  value={title}
                  onChange={handleInput}
                />
              </h1>
              <textarea
                placeholder="WRITE NOTES.."
                name="about"
                value={about}
                onChange={handleInput}
              />
              <button type="submit">Add</button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default NoteApp;
