import styled from '@emotion/styled';
import Check from '@mui/icons-material/Check';
import { default as LogoutIcon } from '@mui/icons-material/Logout';
import { default as SettingsIcon } from '@mui/icons-material/Settings';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { User } from 'firebase/auth';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { environment } from '../../environments/environment';
import { ReactComponent as LogoSVG } from '../icons/logo.svg';

export type HeaderProps = AppBarProps & {
  onLogoutClick: () => void;
  user: User;
};

const Header = (props: HeaderProps) => {
  const {
    position = 'fixed',
    onLogoutClick = () => {},
    user,
    ...other
  } = props;
  const { t } = useTranslation();

  return (
    <AppBar position={position} {...other} className="app-header">
      <Toolbar>
        <Box display="flex" flex={1} justifyContent="space-between">
          <Link
            component={RouterLink}
            to={'/'}
            variant="h6"
            color="inherit"
            underline="none"
          >
            <Box display="flex" alignItems="center" p={1}>
              <LogoSVG width={32} height={32} />
              <Typography variant="h6" pl={1}>
                {t('main')}
              </Typography>
            </Box>
          </Link>
        </Box>
        <Box>
          <LanguageMenu />
          <UserMenu
            userAvatar={user?.photoURL ?? ''}
            userName={user?.displayName ?? ''}
            userEmail={user?.email ?? ''}
            onLogoutClick={() => {
              onLogoutClick();
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

type LogOutUserMenuProps = {
  onLogoutClick: () => void;
  userAvatar: string;
  userName: string | null;
  userEmail: string | null;
};

// TODO: theme.palette...
const EventsPaper = styled(Paper)(() => ({
  background: 'linear-gradient(to top, #212121, #212121 75%, #333 75%)',
}));

const UserMenu = (props: LogOutUserMenuProps) => {
  const { onLogoutClick = () => {}, userAvatar, userName, userEmail } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    handleClose();
    setTimeout(() => {
      navigate('/settings');
    });
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar src={userAvatar} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        sx={{
          '* > ul': {
            padding: 0,
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <EventsPaper elevation={0}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box mt={5} display="flex" justifyContent="center">
              <Avatar
                src={userAvatar}
                sx={{ width: 56, height: 56, margin: 0 }}
              />
            </Box>
            <CardContent>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                pl={4}
                pr={4}
              >
                <Typography variant="subtitle1" color="textPrimary">
                  {userName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {userEmail}
                </Typography>
              </Box>
            </CardContent>
            <Divider variant="middle" />
            <Box pl={2} pr={2} pb={2}>
              <IconButton
                onClick={handleSettingsClick}
                color="inherit"
                sx={{
                  width: '100%',
                  borderRadius: '0',
                  justifyContent: 'flex-start',
                }}
              >
                <SettingsIcon />
                <Typography pl={2}>{t('settings')}</Typography>
              </IconButton>
              <Divider />
              <IconButton
                onClick={onLogoutClick}
                color="inherit"
                sx={{
                  width: '100%',
                  borderRadius: '0',
                  justifyContent: 'flex-start',
                }}
              >
                <LogoutIcon />
                <Typography pl={2}>{t('signOut')}</Typography>
              </IconButton>
              <Divider />
              <Typography
                variant="caption"
                component="p"
                textAlign="center"
                pt={1}
                color="grey.500"
              >
                {t('appVersion') + ': '}
                <Link
                  href={`https://github.com/badgers-ua/pet-documents/blob/main/CHANGELOG.md#v${environment.appVersion
                    .split('.')
                    .join('')}`}
                  target="_blank"
                >
                  {environment.appVersion}
                </Link>
              </Typography>
            </Box>
          </Box>
        </EventsPaper>
      </Menu>
    </>
  );
};

const LanguageMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const { i18n, t } = useTranslation();

  const availableLanguages: string[] = Object.keys(i18n.store.data);

  return (
    <>
      <Button onClick={handleMenu} color="inherit">
        {t(i18n.language)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        sx={{
          '* > ul': {
            padding: 0,
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <Paper>
          <MenuList>
            {availableLanguages.map((l: string) => {
              return (
                <MenuItem
                  onClick={() => {
                    i18n.changeLanguage(l);
                    handleClose();
                  }}
                  key={l}
                  sx={{
                    justifyContent:
                      l === i18n.language ? 'space-between' : 'flex-end',
                  }}
                >
                  {l === i18n.language && (
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                  )}
                  {t(l)}
                </MenuItem>
              );
            })}
          </MenuList>
        </Paper>
      </Menu>
    </>
  );
};

export default Header;
