import book from "./book";

const handleBooking = (flattenedArrData) => {
  const availableSlotData = flattenedArrData;

  // Select all checkboxes/time slots
  const timeSlots = document.querySelectorAll(".slots__checkbox");

  // Add an event listener to each checkbox
  [...timeSlots].forEach((item) => {
    item.addEventListener("change", (e) => {
      const venue = e.target.parentNode.parentNode.getAttribute("data-venue");

      const time = e.target.name;

      const reservedSlot = availableSlotData
        .filter((slot) => {
          return slot[9].includes(time) && slot[9].includes(venue);
        })
        .reduce((acc, item) => {
          return acc.concat(item);
        }, []);

      book(reservedSlot);
    });
  });

  // prevent keyboard users from unchecking slots with keyboard
  [...timeSlots].forEach((item) => {
    item.addEventListener("keydown", (e) => {
      if (e.target.checked) {
        e.target.setAttribute("tabindex", "-1");
        e.target.checked;
      }
    });
  });
};

export { handleBooking as default };
