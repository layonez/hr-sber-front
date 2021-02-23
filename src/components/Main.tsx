import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Main(props: { posts: string[]; title: string }) {
  const classes = useStyles();
  const { posts, title } = props;

  const [postsData, setPostData] = useState<string[]>([]);

  // useEffect with an empty dependency array (`[]`) runs only once
  useEffect(() => {
    posts.forEach((post) => {
      fetch(post)
        .then((response) => response.text())
        .then((text) => {
          setPostData((old) => [...old, text]);
        });
    });
  }, []);

  return (
    <Grid item xs={12} md={8}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Divider />
      {postsData.map((post: string) => (
        <Markdown className={classes.markdown} key={post.substring(0, 40)}>
          {post}
        </Markdown>
      ))}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
