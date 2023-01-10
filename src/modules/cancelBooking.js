import { domain } from "../app";
import { fetchData } from "../app";

const cancelBooking = (bookingDetailsID, listItem, venue, time) => {
  let url = `${domain}/cancelBooking.php?bookingDetailsID=${bookingDetailsID}`;

  fetchData(url).then((data) => {
    if (data.status.includes("booking cancelled")) {
      const listItems = document.querySelectorAll(".reserved-bookings li");
      const provisionalBookingsInfo = document.querySelector(
        "#provisionalbookings"
      );

      let slotStatusMessage = document.querySelector(
        `[data-venue="${venue}"] > div > input[name="${time}"] + label .status-message`
      );
      slotStatusMessage.innerHTML = `This appointment time is free to reserve`;

      let uncheckSlot = document.querySelector(
        `[data-venue="${venue}"] > div > input[name="${time}"]`
      );

      uncheckSlot.checked = false;
      uncheckSlot.removeAttribute("checked");
      uncheckSlot.setAttribute("tabindex", "0");

      if (listItems.length <= 1) {
        provisionalBookingsInfo.innerHTML = "";
        sessionStorage.setItem("pb", provisionalBookingsInfo.innerHTML);
      } else {
        listItem.parentNode.removeChild(listItem);
        sessionStorage.setItem("pb", provisionalBookingsInfo.innerHTML);
      }
    }
  });
};

export { cancelBooking as default };
