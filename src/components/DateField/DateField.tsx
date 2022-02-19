import { KeyboardDatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import { useState, VFC } from "react";

interface IProps {
  label: string;
  defaultValue?: string;
}

export const DateField: VFC<IProps> = ({ label, defaultValue }) => {
  const [value, setValue] = useState<Date | null>(defaultValue ? dayjs(defaultValue).toDate() : null);

  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      label={label}
      value={value}
      onChange={setValue}
      inputVariant="outlined"
      size="small"
    />
  );
};
