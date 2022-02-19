import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { useState, VFC } from "react";

interface IProps {
  label: string;
  defaultValue?: string;
  values: string[];
}

export const RadioField: VFC<IProps> = ({ label, defaultValue, values }) => {
  const [value, setValue] = useState<string>(defaultValue || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        {values.map((item) => (
          <FormControlLabel key={item} value={item} control={<Radio />} label={value} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
