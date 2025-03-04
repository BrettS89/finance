import * as React from "react";
import { Input, Typography } from "@mui/joy";

interface Props {
  onChange(val: string): void;
}

export const DateInput: React.FC<Props> = ({ onChange }) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  // Check if a year is a leap year
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  // Validate date format and logic
  const validateDate = (dateStr: string) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/;
    if (!regex.test(dateStr)) return "Invalid format: MM/DD/YYYY";

    const [month, day, year] = dateStr.split("/").map(Number);
    if (year < 1900 || year > 2100) return "Year must be between 1900 and 2100";

    const monthDays = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day > monthDays[month - 1]) return `Invalid day for ${month}/${year}`;

    return "";
  };

  // Format input with auto-inserting slashes *before* the next part
  const formatInput = (rawValue: string) => {
    let inputValue = rawValue.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedValue = "";

    if (inputValue.length > 0) {
      formattedValue = inputValue.slice(0, 2); // MM
    }
    if (inputValue.length > 1) {
      formattedValue += "/";
    }
    if (inputValue.length > 2) {
      formattedValue += inputValue.slice(2, 4); // /DD
    }
    if (inputValue.length > 3) {
      formattedValue += "/";
    }
    if (inputValue.length > 4) {
      formattedValue += inputValue.slice(4, 8); // /YYYY
    }

    return formattedValue;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = formatInput(event.target.value);
    setValue(newValue);
    onChange(newValue);

    if (newValue.length === 10) {
      setError(validateDate(newValue));
    } else {
      setError("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && value.length > 0) {
      event.preventDefault(); // Prevent default backspace behavior
      setValue((prev) => {
        let newVal = prev.slice(0, -1);
        if (newVal.endsWith("/")) {
          newVal = newVal.slice(0, -1); // Remove trailing slash if needed
        }
        return newVal;
      });
    }
  };

  return (
    <div>
      <Input
        placeholder="MM/DD/YYYY"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Fixes delete issue
        error={!!error}
      />
      {error && (
        <Typography color="danger" fontSize="sm" mt={1}>
          {error}
        </Typography>
      )}
    </div>
  );
}
