import { forEach } from "core-js/core/array";
import { fetchData } from "../app";
import { domain } from "../app";
import handleCancelBooking from "./handleCancelBooking";

const book = (reservedSlot) => {
  const [
    ,
    ,
    venueID,
    pitchNumber,
    sportID,
    year,
    week,
    day,
    timeslotID,
    liText,
  ] = reservedSlot;

  const url = `${domain}makeProvisionalBooking.php?venueID=${venueID}&pitchNumber=${pitchNumber}&sportID=${pitchNumber}&sportID=${sportID}&year=${year}&week=${week}&day=${day}&timeslotID=${timeslotID}&submit=submit`;

  const separateLiText = liText.replace("on", ",");
  const splitLiText = separateLiText.split(",");
  const [venue, , time] = splitLiText;

  fetchData(url).then((data) => {
    let bookingDetails = data;

    let savedDate = sessionStorage.getItem("date");
    savedDate = savedDate.slice(2);

    // Provisional Booking element
    const provisionalBookingsInfo = document.querySelector(
      "#provisionalbookings"
    );

    let pbContents = provisionalBookingsInfo.innerHTML;

    if (data.Error === "Successful" && data.BookingDate.includes(savedDate)) {
      let slotStatusMessage = document.querySelector(
        `[data-venue="${venue.trimEnd()}"] > div > input[name="${time.trimStart()}"] + label .status-message`
      );
      slotStatusMessage.innerHTML = `You have reserved this appoinment time`;

      if (pbContents.length <= 0) {
        // Update the provisional Booking element with the selected slot info
        provisionalBookingsInfo.innerHTML = `<p>You have reserved the following appointments: <ul class="reserved-bookings"></ul> <p>They will be reserved for 15 minutes to allow you time to complete the rest of your booking.<br/> Please click 'Next' if you are happy to accept & proceed.</p>`;
      }

      const reservedBookingsList = document.querySelector(".reserved-bookings");

      reservedBookingsList.innerHTML += `<li>${liText.replace(
        ",",
        " at"
      )}<span><button class="cancel-booking" type="submit" name="cancel" value="Cancel" data-id=${
        data.bookingID
      } data-bid=${data.bookingDetailsID} data-venue=${JSON.stringify(
        venue.trimEnd()
      )} data-time=${time.trimStart()}>Cancel</button> </span></li>`;

      [...document.querySelectorAll(".cancel-booking")].forEach((item) => {
        item.addEventListener("click", handleCancelBooking);
      });

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

      let hiddenIds = document.getElementById(
        "q753c6ace46c10e4096c0a566e311fca3af57f4ec"
      );

      const id = document.querySelector(".cancel-booking[data-id]");
      hiddenIds.innerText = id.getAttribute("data-id");
    } else if (
      data.Error.includes("You have already booked 4") &&
      data.BookingDate.includes(savedDate)
    ) {
      let slotStatusMessage = document.querySelector(
        `[data-venue="${venue.trimEnd()}"] > div > input[name="${time.trimStart()}"] + label .status-message`
      );
      slotStatusMessage.innerHTML = `No longer available, <br/>you have reserved your maximum number of appointment times.`;
    } else if (
      data.Error.includes("You have already booked 2") &&
      data.BookingDate.includes(savedDate)
    ) {
      let slotStatusMessage = document.querySelector(
        `[data-venue="${venue.trimEnd()}"] > div > input[name="${time.trimStart()}"] + label .status-message`
      );
      slotStatusMessage.innerHTML = `No longer available, <br/>please choose another day & appointment time.`;
    }
  }); // call `then()` on the returned promise
};

export { book as default };
