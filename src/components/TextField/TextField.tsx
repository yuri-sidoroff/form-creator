import { TextField as InputText } from "@material-ui/core";
import { useState, VFC } from "react";

export enum ITextFieldType {
  TEXT = "text",
  TEXTAREA = "textarea",
  NUMBER = "number",
}

interface IProps {
  label: string;
  defaultValue?: string;
  type?: ITextFieldType;
}

export const TextField: VFC<IProps> = ({ label, defaultValue, type = ITextFieldType.TEXT }) => {
  const [value, setValue] = useState<string>(defaultValue || "");

  return (
    <InputText
      multiline={type === ITextFieldType.TEXTAREA}
      maxRows={6}
      minRows={6}
      type={type === ITextFieldType.NUMBER ? "number" : "text"}
      label={label}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      variant="outlined"
      size="small"
    />
  );
};
