import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import { closeTicket, getSingleTicket } from "../features/tickets/ticketSlice";
import ModaL from "react-modal";
import { FaPlus } from "react-icons/fa";
import { createNote } from "../features/notes/noteSlice";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%,-50%)",
    position: "relative",
  },
};

ModaL.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const { isSuccess, ticket, isError, message } = useSelector(
    (state) => state.ticket
  );

  const { notes } = useSelector((state) => state.note);

  const dispatch = useDispatch();
  const {ticketId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getSingleTicket(ticketId));
    // eslint-disable-next-line
  }, [ticketId, message, isError]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  // Open/Close Modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(true);

  const onNoteSubmit = (e) => {
    e.preventDefault()

    dispatch(createNote({noteText, ticketId}))

    closeModal()
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID : {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product : {ticket.product} </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description Of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus />
          Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note Text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">Submit</button>
          </div>
        </form>
      </Modal>

      {notes?.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
