import { useLayoutEffect, useMemo, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

const useThemeColor = () => {
  const [colorTheme, setColorTheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useLayoutEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      setColorTheme(colorScheme);
    });
  }, []);

  return useMemo(() => colorTheme, [colorTheme]);
};

export default useThemeColor;
