import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import dayjs from "dayjs";

function Datepicker({ onDateChange, selectedDates }) {
  const [selectedView, setSelectedView] = useState("Sélectionner");
  const [dateRange, setDateRange] = useState([]);

  // Update date range based on selected view
  useEffect(() => {
    const today = dayjs();

    let start, end;

    if (selectedView === "Monthly") {
      start = today.startOf("month").toDate();
      end = today.endOf("month").toDate();
    } else if (selectedView === "Weekly") {
      start = today.startOf("week").toDate();
      end = today.endOf("week").toDate();
    } else if (selectedView === "Daily") {
      start = today.startOf("day").toDate();
      end = today.endOf("day").toDate();
    }

    const range = [start, end];
    setDateRange(range);

    
    if (onDateChange) {
      onDateChange(range);
    }
  }, [selectedView]);

  const options = {
    mode: "range",
    static: true,
    monthSelectorType: "static",
    dateFormat: "M j, Y",
    defaultDate: dateRange,
    prevArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    onReady: (selectedDates, dateStr, instance) => {
      instance.element.value =
        selectedDates.length === 0
          ? "Sélectionner"
          : dateStr.replace("to", "-");
    },
    onChange: (selectedDates) => {
      if (selectedDates.length === 2 && onDateChange) {
        onDateChange(selectedDates);
      }
    },
  };

  const handleViewChange = (e) => {
    setSelectedView(e.target.value);
  };

  return (
    <div>
      <label className="block text-slate-500 font-medium mb-2" htmlFor="datepicker">
        Date
      </label>
      <div className="flex items-center space-x-4">
        {/* Datepicker */}
        <div className="relative">
          <Flatpickr
            id="datepicker"
            className="form-input pr-9 text-slate-400 hover:text-slate-300 font-sm focus:border-slate-300 w-60"
            options={options}
            value={dateRange}
            placeholder="Sélectionner"
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg
              className="w-3 h-3 shrink-0 fill-current text-slate-300"
              viewBox="0 0 12 12"
            >
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div>
        </div>

        {/* View Selector Dropdown */}
        <div className="relative">
          <select
            value={selectedView}
            onChange={handleViewChange}
            className="form-select text-[#032958] text-center hover:text-[#032958] focus:ring-2 focus:ring-[#032958] mr-5 px-4 py-2 rounded-md w-40"
          >
            {selectedView === "Sélectionner" ? (
              <option value="Sélectionner" disabled>
                Sélectionner
              </option>
            ) : null}
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Datepicker;
