import "./Read.css";
import { useContext } from "react";
import { NoteContext } from "../../context/context";
import { useParams, useNavigate } from "react-router-dom";

const Read = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const { myNotes } = useContext(NoteContext);
  return (
    <div className="read">
      <i onClick={()=> navigate(-1)} className="bi bi-arrow-left"></i>
      {myNotes && myNotes
        .filter((note) => note.id === id)
        .map((note) => {
          const { title, date, about, id } = note;
          return (
            <div key={about} className="read">
              <span>{date}</span>
              <h3>{title}</h3>
              <p className="content">{about}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Read;
