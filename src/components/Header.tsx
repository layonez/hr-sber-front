import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    fontWeight: 900,
    color: 'mediumblue',
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  bellContainer: {
    padding: theme.spacing(2),
    '> .MuiBadge-badge': {
      margin: theme.spacing(2),
    },
  },
}));

export default function Header(props: { sections: any; title: any }) {
  const classes = useStyles();
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component='h2'
          variant='h5'
          color='inherit'
          align='left'
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <div className={classes.bellContainer}>
          <Badge badgeContent={100} color='secondary'>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
          </Badge>
        </div>

        <Button variant='outlined' size='small'>
          Артем
        </Button>
      </Toolbar>
      {sections && (
        <Toolbar
          component='nav'
          variant='dense'
          className={classes.toolbarSecondary}
        >
          {sections.map((section: { title: string; url: string }) => (
            <Link
              color='inherit'
              noWrap
              key={section.title}
              variant='body2'
              href={section.url}
              className={classes.toolbarLink}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      )}
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
