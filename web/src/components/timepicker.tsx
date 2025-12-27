import * as React from "react";
import { Input, Typography } from "@mui/joy";

interface Props {
  onChange(val: string): void;
}

export const TimeInput: React.FC<Props> = ({ onChange }) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  // Function to format input correctly
  const formatInput = (rawValue: string) => {
    let inputValue = rawValue.replace(/[^0-9APMapm]/g, ""); // Allow only numbers & AM/PM
    let formattedValue = "";

    let hours = inputValue.slice(0, 2);
    let minutes = inputValue.slice(2, 4);
    let ampm = inputValue.slice(4).toUpperCase();

    if (hours) formattedValue += hours;
    if (inputValue.length >= 2) formattedValue += ":"; // Auto-add colon after hours
    if (minutes) formattedValue += minutes;
    if (inputValue.length >= 4) formattedValue += " "; // Auto-add space before AM/PM
    if (ampm) formattedValue += ampm.replace(/[^APM]/g, "").slice(0, 2); // Ensure AM/PM is correct

    return formattedValue;
  };

  // Function to validate the time format
  const validateTime = (timeStr: string) => {
    const regex = /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;
    const isValidFormat = regex.test(timeStr);

    if (!isValidFormat) {
      return "Invalid time.";
    }

    return "";
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = formatInput(event.target.value);
    setValue(newValue);
    onChange(newValue);

    if (newValue.length >= 8) {
      const validationError = validateTime(newValue);
      setError(validationError);
    } else {
      setError(""); // Clear error if the value is not yet long enough
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && value.length > 0) {
      event.preventDefault();
      setValue((prev) => {
        let newVal = prev.slice(0, -1);
        if (newVal.endsWith(":") || newVal.endsWith(" ")) newVal = newVal.slice(0, -1); // Remove `:` or space when needed
        return newVal;
      });
    }
  };

  return (
    <div>
      <Input
        style={{ marginTop: 5 }}
        placeholder="HH:MM AM/PM"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {error && (
        <Typography color="danger" fontSize="sm" mt={1}>
          {error}
        </Typography>
      )}
    </div>
  );
}
