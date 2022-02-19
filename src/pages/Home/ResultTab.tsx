import { VFC } from "react";
import { Box, Button, makeStyles, Theme, Typography } from "@material-ui/core";
import { CheckboxField } from "components/CheckboxField/CheckboxField";
import { DateField } from "components/DateField/DateField";
import { RadioField } from "components/RadioField/RadioField";
import { ITextFieldType, TextField } from "components/TextField/TextField";
import { ETypeField, IFormSchema } from "./Home.interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: `calc(100% - ${theme.spacing(4)}px)`,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing(2),
    width: "100%",
    justifyContent: "flex-end",
  },
  noData: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface IProps {
  dir?: string;
  index: number;
  selectedTab: number;
  schema?: IFormSchema;
}

export const ResultTab: VFC<IProps> = ({ selectedTab, index, schema, ...other }) => {
  const classes = useStyles();
  return (
    <Box role="tabpanel" hidden={selectedTab !== index} className={classes.wrapper} {...other}>
      {!schema?.title && !schema?.buttons?.length && !schema?.items.length && (
        <Box className={classes.noData}>
          <Typography>No data in result</Typography>
        </Box>
      )}
      {!!schema?.title && <Typography variant="h4">{schema.title}</Typography>}
      {schema?.items.map((item) => {
        switch (item.type) {
          case ETypeField.NUMBER:
            return (
              <TextField
                key={item.type + item.label}
                type={ITextFieldType.NUMBER}
                label={item.label}
                defaultValue={item.default}
              />
            );
          case ETypeField.TEXT:
            return <TextField key={item.type + item.label} label={item.label} defaultValue={item.default} />;
          case ETypeField.TEXTAREA:
            return (
              <TextField
                key={item.type + item.label}
                type={ITextFieldType.TEXTAREA}
                label={item.label}
                defaultValue={item.default}
              />
            );
          case ETypeField.DATE:
            return <DateField key={item.type + item.label} defaultValue={item.default} label={item.label} />;
          case ETypeField.CHECKBOX:
            return (
              <CheckboxField
                key={item.type + item.label}
                defaultValues={item.default}
                label={item.label}
                values={item.values}
              />
            );
          case ETypeField.RADIO:
            return (
              <RadioField
                key={item.type + item.label}
                defaultValue={item.default}
                label={item.label}
                values={item.values}
              />
            );
          default:
            return null;
        }
      })}
      {schema?.buttons && (
        <Box className={classes.buttons}>
          {schema.buttons.map((item) => (
            <Button variant="contained" color="primary" size="small" key={item}>
              {item}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};
