import { useRouter } from 'next/router';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const mainListItems = [
  { text: 'Dashboard', icon: <AnalyticsRoundedIcon />, path: '/Dashboard' },
  { text: 'Schadenerfassung', icon: <AssignmentRoundedIcon />, path: '/DamageManagement' },
  { text: 'Benutzerverwaltung', icon: <PeopleRoundedIcon />, path: '/clients' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, path: '/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, path: '/feedback' },
];



  export default function MenuContent() {
    const router = useRouter();
    // Initialize selected from current path or default to 'Home'
    const [selected, setSelected] = React.useState<string>(mainListItems[0].text);
  
    // Optional: sync selected with route change (if needed)
    React.useEffect(() => {
      const found = mainListItems.find((item) => item.path === router.pathname);
      if (found) setSelected(found.text);
    }, [router.pathname]);
  
    return (
      <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
        <List dense>
          {mainListItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={item.text === selected}
                onClick={() => {
                  setSelected(item.text);
                  router.push(item.path);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* similarly for secondaryListItems */}
      </Stack>
    );
  }