import React from "react";
import {
  Drawer,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface ChooseActionProps {
  open: boolean;
  onClose: () => void;
}

const ChooseAction: React.FC<ChooseActionProps> = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}>
      <Box sx={{ p: 2 }}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar sx={{ bgcolor: "white" }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Choose action
            </Typography>
            <IconButton edge="end" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="/search?action=send"
              data-test="choose-action-send">
              <ListItemText primary="Send" />
              <NavigateNextIcon htmlColor="grey" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="/search?action=request"
              data-test="choose-action-request">
              <ListItemText primary="Request" />
              <NavigateNextIcon htmlColor="grey" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default ChooseAction;
