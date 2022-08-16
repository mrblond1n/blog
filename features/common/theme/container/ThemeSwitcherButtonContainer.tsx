import {INTL} from 'constants/intl';
import {setTheme} from 'features/common/theme/model/events';
import {getTheme} from 'features/common/theme/utils/getTheme';
import {Icons} from 'icons';
import {useTheme} from 'next-themes';
import React from 'react';
import {IconButton} from 'ui/atoms/IconButton';
import {intl} from 'utils/intl';

export const ThemeSwitcherButtonContainer = React.memo(() => {
    const {theme, setTheme: switchTheme} = useTheme();

    const handleClick = React.useCallback(() => {
        const value = theme === 'light' ? 'dark' : 'light';

        switchTheme(value);
        setTheme(getTheme(value));
    }, [switchTheme, theme]);

    return (
        <IconButton aria-label={intl(INTL.APP.HEADER.THEME_BUTTON)} onClick={handleClick}>
            {theme === 'dark' ? <Icons.Brightness7 /> : <Icons.Brightness4 />}
        </IconButton>
    );
});
