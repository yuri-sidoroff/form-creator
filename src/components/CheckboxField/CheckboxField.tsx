import { useState, VFC, useEffect } from "react";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@material-ui/core";

interface IValues {
  [key: string]: boolean;
}

interface IProps {
  label: string;
  defaultValues?: string[];
  values: string[];
}

export const CheckboxField: VFC<IProps> = ({ label, defaultValues, values }) => {
  const [state, setState] = useState<IValues>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  useEffect(() => {
    setState(
      values.reduce((acc, item) => {
        acc[item] = !!defaultValues?.includes(item);
        return acc;
      }, {} as IValues)
    );
  }, [defaultValues, values]);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup aria-label="position" row>
        {values.map((item) => (
          <FormControlLabel
            key={item}
            value="end"
            control={<Checkbox name={item} checked={!!state?.[item]} onChange={handleChange} color="primary" />}
            label={item}
            labelPlacement="end"
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
