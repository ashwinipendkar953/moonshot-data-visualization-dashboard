import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { useDispatch } from "react-redux";
import { setFilters } from "../features/data/dataSlice";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const FiltersPanel = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();

  // Get the start and end dates of the current month
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const initialDateRange = [
    {
      startDate: null, // Keep as null to indicate no selection
      endDate: null,
      key: "selection",
    },
  ];

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  // Function to update URL parameters
  const updateURL = (filters) => {
    const params = new URLSearchParams();
    if (filters.age) params.set("age", filters.age);
    if (filters.gender) params.set("gender", filters.gender);
    if (filters.dateRange) {
      params.set("startDate", filters.dateRange[0]);
      params.set("endDate", filters.dateRange[1]);
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  useEffect(() => {
    // Read filters from URL on component mount
    const params = new URLSearchParams(window.location.search);
    const ageParam = params.get("age");
    const genderParam = params.get("gender");
    const startDateParam = params.get("startDate");
    const endDateParam = params.get("endDate");

    if (ageParam) setAge(ageParam);
    if (genderParam) setGender(genderParam);
    if (startDateParam && endDateParam) {
      setDateRange([
        {
          startDate: new Date(startDateParam),
          endDate: new Date(endDateParam),
          key: "selection",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [age, gender, dateRange]);

  const handleFilterChange = () => {
    const filters = {
      age: age || null,
      gender: gender || null,
      dateRange:
        dateRange[0].startDate && dateRange[0].endDate
          ? [
              dateRange[0].startDate.toISOString(),
              dateRange[0].endDate.toISOString(),
            ]
          : null,
    };

    dispatch(setFilters(filters));
    updateURL(filters);
  };

  const handleCancel = () => {
    setDateRange(initialDateRange);
    setAge("");
    setGender("");
    dispatch(setFilters({ dateRange: null, age: null, gender: null }));
    updateURL({ dateRange: null, age: null, gender: null }); // Clear filters in URL
  };

  return (
    <div className="d-lg-flex gap-5 mt-1 mb-3">
      <div className="border mb-3 date-range-picker-container">
        <DateRangePicker
          className="date-range-picker" // Add a class for specific styling
          ranges={dateRange}
          onChange={(item) => {
            setDateRange([item.selection]);
          }}
          minDate={startOfMonth}
          maxDate={endOfMonth}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
        />

        {/* Conditionally render the date information and buttons */}
        {dateRange[0].startDate && dateRange[0].endDate && (
          <div className="d-flex gap-2 justify-content-end border-top p-2">
            <span>
              {`Start: ${dateRange[0].startDate.toLocaleDateString()} End: ${dateRange[0].endDate.toLocaleDateString()}`}
            </span>{" "}
            <button className="px-2 border-light-subtle" onClick={handleCancel}>
              Cancel
            </button>{" "}
          </div>
        )}
      </div>

      <div className="d-flex gap-3 align-items-end">
        <div className="d-flex gap-3 justify-content-center align-items-center">
          <label className="form-label">Age:</label>
          <select
            className="form-select"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="15-25">15-25</option>
            <option value=">25">25+</option>
          </select>
        </div>

        <div className="d-flex gap-3 justify-content-center align-items-center">
          <label className="form-label">Gender:</label>
          <select
            className="form-select"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
