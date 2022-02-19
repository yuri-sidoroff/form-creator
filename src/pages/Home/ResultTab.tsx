import { Box, makeStyles, Theme } from "@material-ui/core";
import { CheckboxField } from "components/CheckboxField/CheckboxField";
import { DateField } from "components/DateField/DateField";
import { RadioField } from "components/RadioField/RadioField";
import { ITextFieldType, TextField } from "components/TextField/TextField";
import { VFC } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
}));

export enum ETypeField {
  NUMBER = "numberfield",
  TEXT = "textfield",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  DATE = "datefield",
  RADIO = "radiobuttons",
}

export type TSchema = Array<
  { label: string } & (
    | { type: ETypeField.NUMBER; default?: number }
    | { type: ETypeField.TEXT; default?: string }
    | { type: ETypeField.TEXTAREA; default?: string }
    | { type: ETypeField.DATE; default?: string }
    | { type: ETypeField.CHECKBOX; default?: string[]; values: string[] }
    | { type: ETypeField.RADIO; default?: string; values: string[] }
  )
>;

interface IProps {
  dir?: string;
  index: number;
  selectedTab: number;
  schema?: TSchema;
}

export const ResultTab: VFC<IProps> = ({ selectedTab, index, schema, ...other }) => {
  const classes = useStyles();
  return (
    <Box role="tabpanel" hidden={selectedTab !== index} {...other}>
      {selectedTab === index && (
        <Box className={classes.wrapper}>
          {schema?.map((item) => {
            switch (item.type) {
              case ETypeField.NUMBER:
                return <TextField type={ITextFieldType.NUMBER} label={item.label} defaultValue={item.default} />;
              case ETypeField.TEXT:
                return <TextField label={item.label} defaultValue={item.default} />;
              case ETypeField.TEXTAREA:
                return <TextField type={ITextFieldType.TEXTAREA} label={item.label} defaultValue={item.default} />;
              case ETypeField.DATE:
                return <DateField defaultValue={item.default} label={item.label} />;
              case ETypeField.CHECKBOX:
                return <CheckboxField defaultValues={item.default} label={item.label} values={item.values} />;
              case ETypeField.RADIO:
                return <RadioField defaultValue={item.default} label={item.label} values={item.values} />;
              default:
                return null;
            }
          })}
        </Box>
      )}
    </Box>
  );
};
