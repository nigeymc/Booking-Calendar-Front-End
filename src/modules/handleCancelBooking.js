import cancelBooking from "./cancelBooking";

const handleCancelBooking = (e) => {
  e.preventDefault();
  const bid = e.target.getAttribute("data-bid");
  const venue = e.target.getAttribute("data-venue");
  const time = e.target.getAttribute("data-time");
  const listItem = e.target.parentNode.parentNode;
  cancelBooking(bid, listItem, venue, time);
};

export { handleCancelBooking as default };
