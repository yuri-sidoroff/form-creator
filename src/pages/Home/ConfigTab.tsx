import { Box, Button, makeStyles, TextField, Theme } from "@material-ui/core";
import { useState } from "react";
import { VFC } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    height: "100%",
  },
}));

interface IProps {
  dir?: string;
  index: number;
  selectedTab: number;
  defaultText?: string;
}

export const ConfigTab: VFC<IProps> = ({ selectedTab, index, defaultText, ...other }) => {
  const classes = useStyles();
  const [text, setText] = useState<string>("");

  return (
    <Box role="tabpanel" hidden={selectedTab !== index} {...other}>
      {selectedTab === index && (
        <Box className={classes.wrapper}>
          <TextField
            label="JSON"
            fullWidth
            multiline
            minRows={10}
            maxRows={10}
            variant="outlined"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <Button color="primary" variant="contained">Apply</Button>
        </Box>
      )}
    </Box>
  );
};
