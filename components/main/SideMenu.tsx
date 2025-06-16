import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SelectContent from "../dashboard/SelectContent";
import MenuContent from "../dashboard/MenuContent";
import CardAlert from "../dashboard/CardAlert";
import OptionsMenu from "../dashboard/OptionsMenu";
import { SvgIcon } from "@mui/material";
import { useMyUser } from "hooks/main/useMyUser";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const { user, isLoading, error } = useMyUser();
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <SvgIcon sx={{ width: "180px", height: "50px" }}>
          <svg
            width="240"
            height="80"
            viewBox="0 0 240 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="10"
              y="20"
              width="8"
              height="40"
              fill="#00B4D8"
              rx="3"
              ry="3"
            />
            <rect
              x="22"
              y="15"
              width="6"
              height="50"
              fill="#0D3B66"
              rx="3"
              ry="3"
            />
            <rect
              x="34"
              y="10"
              width="4"
              height="60"
              fill="#00B4D8"
              rx="3"
              ry="3"
            />
            <text
              x="60"
              y="55"
              font-family="Montserrat, sans-serif"
              font-weight="700"
              font-size="36"
              fill="#0D3B66"
            >
              Fleet
            </text>
            <text
              x="155"
              y="55"
              font-family="Montserrat, sans-serif"
              font-weight="400"
              font-size="36"
              fill="#00B4D8"
            >
              beam
            </text>
          </svg>
        </SvgIcon>
      </Box>
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            {`${user?.firstname} ${user?.lastname}`}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {user?.username}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
