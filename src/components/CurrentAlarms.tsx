import { Avatar, ListItemAvatar } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import dayjs from "dayjs";

const CurrentAlarms = ({ alarms }: { alarms: [] }) => {
  return (
    <List>
      {alarms.map((o) => (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessAlarmIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${dayjs(o.dateTime).tz().format("DD/MM/YYYY hh:mm a")} `}
            secondary={`Repeat: ${o.repeat ? "Yes" : "No"}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default CurrentAlarms;
