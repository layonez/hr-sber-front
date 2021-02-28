import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Masonry from 'react-responsive-masonry';
import { useMst } from '../models/Root';
import { observer } from 'mobx-react-lite';
import CssBaseline from '@material-ui/core/CssBaseline';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ListIcon from '@material-ui/icons/List';
import AnnouncementIcon from '@material-ui/icons/Announcement';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import RateReviewIcon from '@material-ui/icons/RateReview';

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
      width: '100%',
    },
    postsBlock: {
      display: 'flex',
      maxWidth: 1200,
      width: '100%',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(1, 1, 2),
    },
    cardContent: {
      padding: theme.spacing(1),
    },
    cardDetails: {
      flex: 1,
    },
    leftPanel: {
      background: '#f3f3f3',
      width: '260px',
      height: '100vh',
    },
    rightPanel: {
      background: '#f3f3f3',
      width: '260px',
      height: '100vh',
    },
    centerPanel: {
      flexGrow: 1,
    },
    tag: {
      margin: 1,
    },
    dense: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    cardMedia: {
      height: 60,
    },
  })
);

const tags = [
  'Информационная безопасность',
  'Программирование',
  'Javascript',
  'Музыка',
  'Новости',
  'Стартапы',
];

const stories = [
  { name: 'Рассказать о новых технологиях', icon: <DesktopWindowsIcon /> },
  { name: 'Создать опрос для сотрудников', icon: <ListIcon /> },
  { name: 'Добавить статью с другого ресурса', icon: <ImportExportIcon /> },
  { name: 'Разместить тест', icon: <PlaylistAddCheckIcon /> },
  { name: 'Новость о жизни компании', icon: <AnnouncementIcon /> },
];

interface Props {}

const Feed: React.FC<Props> = observer(() => {
  const classes = useStyles();
  const { feed } = useMst();

  const handleAddTag = () => {};

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* 
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
      </div> */}

      <div className={classes.feed}>
        <div className={classes.centerPanel}>
          <Masonry className={classes.postsBlock}>
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardContent}
                title='МОИ ТЕГИ'
              ></CardHeader>
              <CardContent className={classes.cardContent}>
                <Typography variant='subtitle1' paragraph>
                  {tags.map((tag) => (
                    <Chip
                      label={tag}
                      component='a'
                      href={`/#${tag}`}
                      clickable
                      variant='outlined'
                      className={classes.tag}
                    />
                  ))}
                  <Chip
                    icon={<AddIcon />}
                    clickable
                    component='a'
                    href={`/subscriptions`}
                    color='primary'
                    className={classes.tag}
                    label='Добавить'
                  />
                </Typography>
              </CardContent>
            </Card>
            {feed.posts.map((post) => (
              <Card className={classes.card}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <Typography component='h6' variant='h6'>
                      {post.title}
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                      {new Intl.DateTimeFormat().format(post.date)}
                    </Typography>
                    <Typography variant='subtitle1' paragraph>
                      {post.cutContent}
                    </Typography>
                    <Typography variant='subtitle1' color='primary' component={Link} to={`/article/${post.id}`}>
                      Продолжить чтение...
                    </Typography>
                    {/* <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        src={'https://source.unsplash.com/random'}
                        // title={post.imageTitle}
                      />
                    </Hidden> */}
                  </CardContent>
                </div>
              </Card>
            ))}
          </Masonry>
        </div>
        <div className={classes.rightPanel}>
          <Card raised={false} className={classes.card}>
            <CardHeader
              className={classes.cardContent}
              title='НОВАЯ ИСТОРИЯ?'
            ></CardHeader>
            <CardContent className={classes.cardContent}>
              <List dense disablePadding className={classes.root}>
                {stories.map((template) => {
                  const labelId = `checkbox-list-secondary-label-${template.name}`;
                  return (
                    <ListItem
                      key={template.name}
                      button
                      className={classes.dense}
                      component={Link}
                      to="article"
                    >
                      <ListItemIcon>{template.icon}</ListItemIcon>
                      <ListItemText id={labelId} primary={template.name} />
                    </ListItem>
                  );
                })}
                <ListItem key='allTemplates' button>
                  <ListItemText id='allTemplates' primary='Все шаблоны' />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Card raised={false} className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography component='h6' variant='subtitle1'>
                Вы недавно проходили обучение "Полное руководство по Python 3:
                от новичка до специалиста"
              </Typography>
              <Button
                variant='outlined'
                // color='secondary'
                // className={classes.button}
                startIcon={<RateReviewIcon />}
                component={Link}
                to="/share"
              >
                Поделиться впечатлениями о курсе
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

export default Feed;
