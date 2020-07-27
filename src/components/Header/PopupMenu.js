import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { useTranslation } from "react-i18next";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(1);

  const { t } = useTranslation("popup");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage(0);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}> */}
      <IconButton aria-label="show 4 new mails" color="inherit" variant="outlined" onClick={handleClickOpen}>
                <Badge badgeContent={message} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
      {/* </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("hi")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <p><h5>{t("news")}:</h5>
              * {t("col")}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Disagree
          </Button> */}
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}