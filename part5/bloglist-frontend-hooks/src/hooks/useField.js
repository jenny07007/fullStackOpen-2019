import { useState } from "react";

export const useField = type => {
  const [value, setValue] = useState("");
  const handleChange = e => setValue(e.target.value);
  const reset = () => setValue("");

  return { type, handleChange, value, reset };
};
