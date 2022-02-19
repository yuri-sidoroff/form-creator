import { FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup, Theme } from "@material-ui/core";
import { useState, VFC } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  radioGroup: {
    flexDirection: "row",
  },
}));

interface IProps {
  label: string;
  defaultValue?: string;
  values: string[];
}

export const RadioField: VFC<IProps> = ({ label, defaultValue, values }) => {
  const classes = useStyles();
  const [value, setValue] = useState<string>(defaultValue || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup value={value} onChange={handleChange} className={classes.radioGroup}>
        {values.map((item) => (
          <FormControlLabel
            key={item}
            value={item}
            control={<Radio checked={item === value} color="primary" />}
            label={item}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
