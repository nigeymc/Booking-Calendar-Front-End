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
      slotStatusMessage.innerHTML = `This slot is free to reserve`;

      let uncheckSlot = document.querySelector(
        `[data-venue="${venue}"] > div > input[name="${time}"]`
      );

      uncheckSlot.checked = false;
      uncheckSlot.removeAttribute("checked");
      uncheckSlot.setAttribute("tabindex", "0");

      let hiddenIds = document.getElementById(
        "q753c6ace46c10e4096c0a566e311fca3af57f4ec"
      );

      const id = document.querySelector(".cancel-booking[data-id]");
      hiddenIds.innerText = id.getAttribute("data-id");

      if (listItems.length <= 1) {
        provisionalBookingsInfo.innerHTML = "";
        sessionStorage.setItem("pb", provisionalBookingsInfo.innerHTML);

        const hiddenTextArea = document.getElementById(
          "qc97852880a6626c7c41cbca507482946fb202b9c"
        );
        const provisionalBookingsList = document.querySelector(
          "#provisionalbookings ul"
        );

        hiddenTextArea.innerText = "";
      } else {
        listItem.parentNode.removeChild(listItem);
        sessionStorage.setItem("pb", provisionalBookingsInfo.innerHTML);

        const hiddenTextArea = document.getElementById(
          "qc97852880a6626c7c41cbca507482946fb202b9c"
        );
        const provisionalBookingsList = document.querySelector(
          "#provisionalbookings ul"
        );

        hiddenTextArea.innerText = provisionalBookingsList.textContent
          .replaceAll("Cancel", ",")
          .trimEnd();
      }
    }
  });
};

export { cancelBooking as default };
