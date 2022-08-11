import styled from '@emotion/native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import LogoIcon from '../icons/logo.svg';
import IconButton from './buttons/IconButton';
import Subtitle from './typography/SubTitle';

type HeaderProps = {
  title: string;
  onNavigateBack?: () => void;
} & BackButtonProps &
  ViewProps;

type BackButtonProps = {
  buttonColor?: string;
};

const Header = ({
  title,
  buttonColor,
  onNavigateBack,
  ...other
}: HeaderProps) => {
  return (
    <Root {...other}>
      <BackButton onPress={onNavigateBack} disabled={!onNavigateBack}>
        {onNavigateBack ? (
          <ArrowBackIcon
            buttonColor={buttonColor}
            name="arrow-left"
            size={24}
          />
        ) : null}
        <BackButtonTitle buttonColor={buttonColor}>{title}</BackButtonTitle>
      </BackButton>
      <IconButton>
        <LogoIcon width={36} height={36} />
      </IconButton>
    </Root>
  );
};

export default Header;

const Root = styled(View)(() => {
  const theme = useTheme();

  return {
    backgroundColor: theme.colors.background,
    height: 86,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 50,
    paddingLeft: 24,
    paddingRight: 24,
    zIndex: 99999,
  };
});

const BackButton = styled(TouchableOpacity)(() => {
  return {
    flexDirection: 'row',
    alignItems: 'center',
  };
});

const ArrowBackIcon = styled(SimpleLineIcons)((props: BackButtonProps) => {
  const theme = useTheme();
  const { buttonColor = theme.colors.text } = props;

  return {
    color: buttonColor,
    paddingRight: 6,
  };
});

const BackButtonTitle = styled(Subtitle)((props: BackButtonProps) => {
  const theme = useTheme();
  const { buttonColor = theme.colors.text } = props;

  return {
    color: buttonColor,
  };
});
