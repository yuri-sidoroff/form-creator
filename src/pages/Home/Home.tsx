import { AppBar, Box, makeStyles, Paper, Tab, Tabs, Theme, useTheme } from "@material-ui/core";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { ConfigTab } from "./ConfigTab";
import { IFormSchema, ResultTab, TSchema } from "./ResultTab";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    minWidth: theme.spacing(60),
    minHeight: theme.spacing(60),
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
    },
  },
}));

export const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [schema, setSchema] = useState<IFormSchema>({ items: [] });

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <Box data-testid="home-page" className={classes.wrapper}>
      <Paper className={classes.paper}>
        <AppBar position="static" color="default">
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Config" />
            <Tab label="Result" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={selectedTab}
          onChangeIndex={handleChangeIndex}
        >
          <ConfigTab
            selectedTab={selectedTab}
            index={0}
            dir={theme.direction}
            setSchema={(data) => {
              setSchema(data);
              setSelectedTab(1);
            }}
          />
          <ResultTab selectedTab={selectedTab} index={1} dir={theme.direction} schema={schema} />
        </SwipeableViews>
      </Paper>
    </Box>
  );
};
