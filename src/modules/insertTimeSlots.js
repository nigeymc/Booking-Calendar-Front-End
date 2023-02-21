const insertTimeSlots = (status) => {
  // Show message if there are no slots available
  if (Object.keys(status).length > -1) {
    // insert time slots

    return `
                ${Object.entries(status)
                  .map((item, index) => {
                    const [key, statusArr] = item;

                    if (statusArr.includes("Available")) {
                      return `<div class="tabs__slot">
                        <input class="slots__checkbox" type="checkbox" tabindex="0" name=${key}>
                        <label class="slots__label" title="Reserve this ${key} slot">${key}<br/> <span class="status-message">This slot is free to reserve</span></label>
                    </div>`;
                    } else if (statusArr.includes("Reserved")) {
                      return `<div class="tabs__slot">
                        <input class="slots__checkbox" type="checkbox" tabindex="0" name=${key} checked>
                        <label class="slots__label" title="This slot is currently being reserved">${key}<br><span class="status-message">This slot is unavailable</span></label>
                    </div>`;
                    } else if (statusArr.includes("Booked")) {
                      return `<div class="tabs__slot">
                        <input class="slots__checkbox" type="checkbox" tabindex="0" name=${key} checked>
                        <label class="slots__label" title="This slot has already been booked">${key}<br/><span class="status-message">This slot is unavailable</span></label>
                    </div>`;
                    } else if (statusArr.includes("Unavailable")) {
                      return `<div class="tabs__slot">
                        <input class="slots__checkbox" type="checkbox" tabindex="0" name=${key} disabled>
                        <label class="slots__label" title="This slot is no longer available">${key}<br/><span class="status-message">This slot is unavailable</span></label>
                    </div>`;
                    }
                  })
                  .join("")}`;
  }
};

export { insertTimeSlots as default };
