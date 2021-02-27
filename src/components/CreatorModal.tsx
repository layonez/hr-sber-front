import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useMst } from '../models/Root';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  })
);

export default function CreatorModal() {
  const classes = useStyles();
  const { feed } = useMst();

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSave = () => {
    feed.addPost({
      id: 1,
      type: 'статья',
      title: title,
      content: content,
      cutContent: content,
      date: new Date(),
      image: 'https://source.unsplash.com/random',
      tags: [{ name: 'some' }, { name: 'stuff' }],
    });
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Создать новый пост
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card>
            <CardContent>
              <TextField
                id='standard-full-width'
                style={{ margin: 8 }}
                placeholder='Заголовок статьи'
                fullWidth
                margin='normal'
                value={title}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleTitleChange}
              />
              <TextField
                id='outlined-multiline-static'
                label='Что расскажем?'
                fullWidth
                multiline
                rows={30}
                variant='outlined'
                value={content}
                onChange={handleContentChange}
              />
            </CardContent>
            <CardActions>
              <Button size='small' color='primary' onClick={handleSave}>
                Сохранить
              </Button>
              <Button size='small' color='primary' onClick={handleClose}>
                Отменить
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}
