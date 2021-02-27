import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TextEditor from './TextEditor';

const useStyles = makeStyles({
  root: {
    margin: '8px',
  },
  title: {
    margin: '32px',
  },
});

export default function CreateArticle() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h2">
          Create your article
        </Typography>
        <TextField label="Article headline" variant="outlined" fullWidth />
        <TextEditor />
      </CardContent>
    </Card>
  );
}
