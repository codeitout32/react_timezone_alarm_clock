import { useEffect, useState } from "react";
import MyClock from "./components/MyClock";
import TimeZoneSelector from "./components/TimeZoneSelector";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import AddAlarm from "./components/AddAlarm";
import CurrentAlarms from "./components/CurrentAlarms";
import { Alert, Box, Button, Snackbar } from "@mui/material";

const indianTimezone = {
  value: "India Standard Time",
  abbr: "IST",
  offset: 5.5,
  isdst: false,
  text: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
  utc: ["Asia/Kolkata", "Asia/Calcutta"],
};

function App() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [time, setTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState(indianTimezone);
  const [alarms, setAlarms] = useState([]);
  const [enableAlarm, setEnableAlarm] = useState({
    enabled: true,
    time: "",
    date: "",
    dateTime: new Date(),
  });

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  const addAlarm = (alarm) => {
    const newAlarms = [...alarms, alarm];
    setAlarms(newAlarms);
  };

  const handleSnooze = () => {
    setEnableAlarm((state) => ({ ...state, enabled: false }));
    setTimeout(() => {
      setEnableAlarm((state) => ({ ...state, enabled: true }));
    }, 10 * 60 * 1000);
    dayjs(enableAlarm.dateTime);
  };

  useEffect(() => {
    console.log("tz change", timeZone);
    dayjs.tz.setDefault(timeZone.utc[0]);
  }, [timeZone]);

  useEffect(() => {
    const alarm = alarms.find((o) => {
      // console.log("date", dayjs(time), "issame", dayjs(o.dateTime));
      // console.log("check", dayjs(time).isSame(dayjs(o.dateTime), "minute"));
      if (o.repeat)
        return (
          dayjs(time).tz().format("HH:mm:ss") ==
          dayjs(o.dateTime).tz().format("HH:mm:ss")
        );
      else return dayjs(time).tz().isSame(dayjs(o.dateTime).tz(), "second");
    });
    if (alarm) {
      console.log("found alarm", JSON.stringify(alarm));
      setEnableAlarm({
        enabled: true,
        time: alarm.time,
        date: alarm.date,
        dateTime: alarm.dateTime,
      });
    }
  }, [time]);

  return (
    <div className="App">
      <Box sx={{ width: 800, margin: "auto", marginTop: 20 }}>
        <MyClock time={time} />
        <TimeZoneSelector setTimeZone={(o) => setTimeZone(o)} />
        <Box my={2}>Local Time: {time.toString()}</Box>
        <AddAlarm setAlarm={addAlarm} />
        <CurrentAlarms alarms={alarms} />
        <Snackbar
          open={enableAlarm.enabled}
          autoHideDuration={6000}
          onClose={() =>
            setEnableAlarm((state) => ({ ...state, enabled: false }))
          }
        >
          <Alert
            action={
              <>
                <Button color="inherit" size="small" onClick={handleSnooze}>
                  SNOOZE 10 Mins
                </Button>
                <Button
                  color="inherit"
                  size="small"
                  onClick={() =>
                    setEnableAlarm((state) => ({ ...state, enabled: false }))
                  }
                >
                  DISMISS
                </Button>
              </>
            }
          >
            Alarm {dayjs().format("hh:mm a")}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}

export default App;
