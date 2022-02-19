import { ChangeEvent, useCallback, useState, VFC } from "react";
import { Box, Button, makeStyles, TextField, Theme, IconButton } from "@material-ui/core";
import { checkJSON } from "utils/checkJSON";
import { Code } from "@material-ui/icons";
import { instanceOfSchema } from "utils/instanceOfSchema";
import { IFormSchema } from "./Home.interfaces";

const config = `{
  "title": "Title form",
  "items": [
    { "type": "numberfield", "label": "Number", "default": "12" },
    { "type": "textfield", "label": "Text", "default": "Text" },
    { "type": "textarea", "label": "Textarea", "default": "Textarea" },
    { "type": "datefield", "label": "Date", "default": "2022-12-10" },
    {
      "type": "checkbox",
      "label": "Checkbox",
      "default": ["checkbox2", "checkbox3"],
      "values": ["checkbox1", "checkbox2", "checkbox3"]
    },
    {
      "type": "radiobuttons",
      "label": "Radio",
      "default": "radio1",
      "values": ["radio1", "radio2", "radio3"]
    }
  ],
  "buttons": ["Ok", "Cancel", "Apply"]
}`;

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    height: `calc(100% - ${theme.spacing(4)}px)`,
  },
  inputJson: {
    textDecorationStyle: "wavy",
    textDecorationColor: theme.palette.error.main,
    textDecorationLine: "underline",
  },
  textFieldWrapper: {
    position: "relative",
  },
  exampleButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(2),
  },
}));

interface IProps {
  dir?: string;
  index: number;
  selectedTab: number;
  defaultText?: string;
  setSchema: (schema: IFormSchema) => void;
  clearSchema: () => void;
}

export const ConfigTab: VFC<IProps> = ({ selectedTab, index, defaultText, setSchema, clearSchema, ...other }) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChangeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsValid(() => {
      const isChecked = checkJSON(event.target.value);
      const parsedJSON = isChecked ? JSON.parse(event.target.value) : {};
      return (
        isChecked && Array.isArray(parsedJSON.items) && parsedJSON.items.every((item: any) => instanceOfSchema(item))
      );
    });
    setText(event.target.value);
  }, []);

  return (
    <Box role="tabpanel" hidden={selectedTab !== index} className={classes.wrapper} {...other}>
      <Box className={classes.textFieldWrapper}>
        <TextField
          label="JSON"
          fullWidth
          multiline
          minRows={16}
          maxRows={16}
          variant="outlined"
          value={text}
          inputProps={{
            className: classes.inputJson,
            style: { textDecorationLine: isValid ? "none" : "underline" },
          }}
          InputProps={{ spellCheck: false }}
          onChange={handleChangeText}
        />
        <IconButton
          size="small"
          className={classes.exampleButton}
          onClick={() => {
            setText(config);
            setIsValid(true);
          }}
        >
          <Code />
        </IconButton>
      </Box>
      <Box className={classes.buttons}>
        <Button
          color="primary"
          variant="contained"
          disabled={!text}
          onClick={() => {
            setText("");
            setIsValid(false);
            clearSchema();
          }}
          fullWidth
        >
          Clear
        </Button>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          disabled={!isValid}
          onClick={() => setSchema(isValid ? JSON.parse(text) : [])}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};
