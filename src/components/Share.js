import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Close from '@material-ui/icons/Close';
import Email from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Code from '@material-ui/icons/Code';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import log from 'loglevel';
import { green } from '@material-ui/core/colors';
import TwitterIcon from '@material-ui/icons/Twitter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomShareIcon from './common/CustomShareIcon';

const useStyles = makeStyles((theme) => ({
  DialogTitle: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
    },
  },
  closeIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    backgroundColor: theme.palette.secondary.lightGreen,
  },
  box1: {
    padding: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  code: {
    minWidth: 400,
    margin: 10,
  },
  linkText: {
    fontWeight: 'bold',
  },
  inputField: {
    width: '100%',
    height: '30px',
    border: 'none',
    borderRadius: '4px',
    padding: '8px',
    marginTop: '8px',
    backgroundColor: '#F5F5F5',
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
          <ShareIcon style={{ color: green[500] }} />
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
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={8} className={classes.DialogTitle}>
              Share this token
            </Grid>
            <Grid item>
              <IconButton className={classes.closeIcon} onClick={handleClose}>
                <Close style={{ color: green[500] }} />
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

          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={8} className={classes.linkText}>
              Or this link
            </Grid>
            <Grid item xs={12}>
              <input type="text" className={classes.inputField} value={link} />
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
      <Dialog open={isEmbedOpen} onClose={handleEmbedClose}>
        <DialogTitle>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={8}>
              Embed Greenstand
            </Grid>
            <Grid item>
              <IconButton onClick={handleEmbedClose}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <TextField
          id="EmbedCode"
          multiline
          variant="outlined"
          value={embedCode}
          rowsMax={4}
          onChange={handleChange}
          className={classes.code}
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
            <IconButton color="primary" onClick={handleMessageClose}>
              <Close />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default Share;
