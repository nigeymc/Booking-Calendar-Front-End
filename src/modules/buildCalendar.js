import insertMobileMenu from "./insertMobileMenu";
import insertTabs from "./insertTabs";
import insertTimeSlots from "./insertTimeSlots";
import selectTabs from "./selectMobileTabs";
import handleBooking from "./handleBooking";
import handleCancelBooking from "./handleCancelBooking";

const buildCalendar = (data) => {
  // Get object keys for venue names
  const keys = Object.keys(data);

  // Insert tabs in to calendar container
  const tabsWrapper = `<article id="tabs" class="tabs"></article>`;

  const getCalendarContainer = document.getElementById("calendar");

  getCalendarContainer.innerHTML += tabsWrapper;

  const getTabsContainer = document.getElementById("tabs");
  getTabsContainer.innerHTML = insertTabs(keys);

  const tabone = document.getElementById("tab0");
  tabone.setAttribute("checked", "checked");

  // Insert Mobile Menu
  const mobileMenu = insertMobileMenu(keys);

  getTabsContainer.innerHTML = mobileMenu + getTabsContainer.innerHTML;

  // Individual venue data
  let dataArr = [];
  Object.values(data).forEach((item) => {
    dataArr.push(item);
  });

  // Check availability status
  const checkAvailability = (keys) => {
    const result = Object.entries(keys).reduce((acc, element) => {
      // Destrcuture key, values here
      const [key, status] = element;
      // Run a map to fetch the status and then assign it to the key
      acc[key] = status.map((item) => item.Status);
      return acc;
    }, {});

    return result;
  };

  // Create a array of availabilty status
  const availability = Object.values(dataArr).map((item) => {
    return checkAvailability(item);
  }, []);

  // Loop over tab elements in DOM and insert available time slots
  const tabsArr = document.querySelectorAll(
    ".tabs__tab > .tab__inner > .tabs__slots-container"
  );

  for (let i = 0; i < tabsArr.length; i++) {
    for (let i = 0; i < availability.length; i++) {
      tabsArr[i].innerHTML = insertTimeSlots(availability[i]);
    }
  }

  // Set an ID for the checkboxes
  const slotsCheckBoxes = document.querySelectorAll(".slots__checkbox");
  slotsCheckBoxes.forEach((el, index) => {
    el.setAttribute("id", `slot${index}`);
  });

  // Set corresponding for ID to checkboxes labels
  const slotsLabels = document.querySelectorAll(".slots__label");
  slotsLabels.forEach((el, index) => {
    el.setAttribute("for", `slot${index}`);
  });

  // Show message if there are no slots available
  if (slotsCheckBoxes.length < 1) {
    const tabsContentMsg = document.querySelector(".tabs__tab p");
    tabsContentMsg.innerHTML = `There are currently no slots available for this date.`;
  }

  // Only allow one slot to be checked/booked at the same time
  // Loop over all slots adding an eventListener to each
  const slots = document.querySelectorAll(".slots__checkbox");
  for (let i = 0; i < slots.length; i++)
    slots[i].addEventListener("change", (e) => {
      if (slots[i].checked) {
        // If checkbox is checked run limiter function
        checkboxLimiter();
      } else {
        // If checkbox is not checked run enable function
        enable();
      }
    });

  const checkboxLimiter = () => {
    let markedBoxCount = document.querySelectorAll(
      ".slots__checkbox:checked"
    ).length;
    // If one checkbox is checked run disable function
    if (markedBoxCount >= 4) {
      disable();
    }
  };

  const disable = () => {
    let unmarkedBoxCount = document.querySelectorAll(
      ".slots__checkbox:not(:checked)"
    );
    // Get all unchecked checkboxes and disable
    for (let i = 0; i < unmarkedBoxCount.length; i++)
      unmarkedBoxCount[i].disabled = true;
  };

  const enable = () => {
    let unmarkedBoxCount = document.querySelectorAll(
      ".slots__checkbox:not(:checked)"
    );
    // Get all unchecked checkboxes and enable again
    for (let i = 0; i < unmarkedBoxCount.length; i++)
      unmarkedBoxCount[i].disabled = false;
  };

  // Get select element for mobile navigation
  const select = document.getElementById("location");

  // Event listener for selecting tabs event for mobile
  select.addEventListener("change", (e) => {
    selectTabs(e);
  });

  // Create status objects from data array
  const getSlotData = (keys) => {
    const result = Object.entries(keys).reduce((acc, element) => {
      // Destrcuture key, values here
      const [key, slot] = element;
      // Run a map to fetch the status and then assign it to the key
      // If bookingID exists then return it too
      acc[key] = slot.map((item) => {
        return [
          item.Status,
          item.Span_id,
          item.Venue,
          item.Pitch_num,
          item.Sport,
          item.Year,
          item.Week,
          item.Day,
          item.Slot,
          item.Li_text,
        ];
      });
      return acc;
    }, []);
    return result;
  };

  // Create a booking data array
  const bookingDataArr = dataArr.map((item) => {
    return getSlotData(item);
  }, []);

  // Condense status data
  const allSlotData = [];
  for (const slot of bookingDataArr) {
    for (const time in slot) {
      allSlotData.push(slot[time]);
    }
  }

  // Flatten the new arrays to just one large array
  const flattenArrData = allSlotData.reduce((acc, item) => {
    return acc.concat(item);
  }, []);

  [...document.querySelectorAll(".cancel-booking")].forEach((item) => {
    item.addEventListener("click", handleCancelBooking);
  });

  handleBooking(flattenArrData);
};

export { buildCalendar as default };
