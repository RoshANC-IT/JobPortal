import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchJobQueryText } from "./redux/jobSlice";
import "./index.css"
const filterdata = [
  { 
    filterType: "Locations", 
    array: ["Delhi", "Mumbai", "Pune", "Noida", "Gurgaon", "Benguluru"] 
  },
  { 
    filterType: "Industry", 
    array: ["Frontend", "Backend", "Full Stack", "Java", "Python", "Blockchain"] 
  },
  { 
    filterType: "Salary", 
    array: ["0-40K", "42K-1lakh", "2lakh-10lakh", "11lakh-24lakh"] 
  }
];

function FilterCard() {
  const [selectedValues, setSelectedValues] = useState("");
  const dispatch = useDispatch();

  const handleRadioChange = (value) => {
    setSelectedValues(value);
  };

  useEffect(() => {
    dispatch(setSearchJobQueryText(selectedValues));
  }, [selectedValues, dispatch]);

  return (
    <div className="w-full  p-3 rounded-md">
      <h1 className="font-bold">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValues} onValueChange={handleRadioChange}>
        {filterdata.map((filter, index) => (
          <div key={index}>
            <h1 className="font-semibold text-lg">{filter.filterType}</h1>
            {filter.array.map((item) => {
              const itemId = `${filter.filterType}-${item}`;

              return (
                <div className="flex items-center space-x-2 my-2" key={itemId}>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
