import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";
import { getTickets, reset } from "../features/tickets/ticketSlice";

function Tickets() {
  const { tickets, isSuccess } = useSelector((state) => state.ticket);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return <>
    <BackButton url='/' />
    <h1>Tickets</h1>
    <div className="tickets">
        <div className="ticket-headings">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
        </div>
        {tickets?.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
        ))}
    </div>
  </>;
}

export default Tickets;
