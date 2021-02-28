import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Masonry from 'react-responsive-masonry';
import { useMst } from '../models/Root';
import { observer } from 'mobx-react-lite';
import CreatorModal from './CreatorModal';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      width: '100%',
      flexDirection: 'column',
    },
    feed: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      width: '100%',
    },
    postsBlock: {
      display: 'flex',
      maxWidth: 1200,
      width: '100%',
    },
    card: {
      display: 'flex',
      padding: theme.spacing(1, 1, 1),
      margin: theme.spacing(1, 1, 2),
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
    },
  })
);

interface Props {}

const Feed: React.FC<Props> = observer(() => {
  const classes = useStyles();
  const { feed } = useMst();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <div className={classes.postsBlock}>
        <Typography variant='h5' color='textPrimary' align='left'>
          МОЯ ЛЕНТА
        </Typography>
        <Button
          component={Link}
          to="/article"
          color="primary"
          variant="contained"
        >
          Написать статью
        </Button>
        <CreatorModal />
      </div>

      <div className={classes.feed}>
        <Masonry className={classes.postsBlock}>
          {feed.posts.map((post) => (
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component='h2' variant='h5'>
                    {post.title}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {new Intl.DateTimeFormat().format(post.date)}
                  </Typography>
                  <Typography variant='subtitle1' paragraph>
                    {post.cutContent}
                  </Typography>
                  <Typography variant='subtitle1' color='primary' component={Link} to={`/article/${post.id}`}>
                    Continue reading...
                  </Typography>
                </CardContent>
              </div>
              {/* {post.image && (
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={post.image}
                // title={post.imageTitle}
              />
            </Hidden>
          )} */}
            </Card>
          ))}
        </Masonry>
      </div>
    </div>
  );
});

export default Feed;
