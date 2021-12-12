import React from 'react';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Close from '@mui/icons-material/Close';
import Email from '@mui/icons-material/Email';
import makeStyles from '@mui/styles/makeStyles';
import Tooltip from '@mui/material/Tooltip';
import Code from '@mui/icons-material/Code';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import log from 'loglevel';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomShareIcon from './common/CustomShareIcon';
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  DialogTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  closeIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    borderRadius: '4px',
    backgroundColor: theme.palette.secondary.main,
  },
  box1: {
    padding: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  inputField: {
    width: '100%',
    height: '30px',
    border: 'none',
    borderRadius: '4px',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],
  },
}));

function Share(props) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEmbedOpen, setEmbedOpen] = React.useState(false);
  const [embedCode, setEmbedCode] = React.useState('');
  const [isMessageOpen, setMessageOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?url=${props.shareUrl}&via=green_stand&related=Greestand,treetracker`,
    );
  }

  function handleFaceBook() {
    window.open(
      `https://www.facebook.com/dialog/share?app_id=87741124305&href=${props.shareUrl}&display=popup`,
    );
  }

  const mailString = `mailto:?subject=A tree from Greenstand&body=I want to share this tree from Greenstand with you, please click this link to check it! ${props.shareUrl}`;

  function handleEmbed() {
    setIsOpen(false);
    setEmbedOpen(true);
  }

  function handleEmbedClose() {
    setEmbedOpen(false);
  }

  function handleChange(e) {
    setEmbedCode(e.target.value);
  }

  React.useEffect(() => {
    setEmbedCode(
      `<iframe width="560" height="315" src="${props.shareUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    );
    setLink(`${props.shareUrl}`);
  }, []);

  function handleCopy() {
    log.log('copy...');
    var copyTextarea = document.getElementById('EmbedCode');
    copyTextarea.focus();
    copyTextarea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      log.log('Copying text command was ' + msg);
    } catch (err) {
      log.log('Oops, unable to copy');
    }
    showMessage('Code has been copied!');
  }

  function handleMessageClose() {
    setMessageOpen(false);
    setMessage('');
  }

  function showMessage(text) {
    setMessage(text);
    setMessageOpen(true);
  }

  return (
    <>
      <Tooltip title="share tree">
        <IconButton onClick={handleClick}>
          <ShareIcon sx={{ color: 'primary.main' }} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            margin: '8px',
          },
        }}
      >
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={8} className={classes.DialogTitle}>
              <Typography variant="h6">Share this token</Typography>
            </Grid>
            <Grid item>
              <IconButton
                className={classes.closeIcon}
                onClick={handleClose}
                size="large"
              >
                <Close color="primary" />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <Grid container justifyContent="center" className={classes.box1}>
          <CustomShareIcon handleOnClick={handleEmbed}>
            <Code />
          </CustomShareIcon>
          <CustomShareIcon handleOnClick={handleFaceBook}>
            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
          </CustomShareIcon>
          <CustomShareIcon handleOnClick={handleTwitter}>
            <TwitterIcon />
          </CustomShareIcon>
          <CustomShareIcon mailString={mailString}>
            <Email />
          </CustomShareIcon>

          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={8}>
              <Typography variant="subtitle2">Or this link</Typography>
            </Grid>
            <Grid item xs={12}>
              <input type="text" className={classes.inputField} value={link} />
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
      <Dialog open={isEmbedOpen} onClose={handleEmbedClose} fullWidth>
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={8}>
              <Typography variant="h5">Embed Greenstand</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleEmbedClose} size="large">
                <Close color="primary" />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <TextField
          id="EmbedCode"
          multiline
          variant="outlined"
          value={embedCode}
          maxRows={4}
          onChange={handleChange}
          sx={{ m: 1 }}
        />
        <DialogActions>
          <Button onClick={handleEmbedClose}>Cancel</Button>
          <Button onClick={handleCopy}>Copy</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isMessageOpen}
        autoHideDuration={6000}
        onClose={handleMessageClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              color="primary"
              onClick={handleMessageClose}
              size="large"
            >
              <Close />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default Share;
