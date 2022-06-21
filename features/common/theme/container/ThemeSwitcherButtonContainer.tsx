import {Brightness4, Brightness7} from '@mui/icons-material';
import {setTheme} from 'features/common/theme/model/events';
import {getTheme} from 'features/common/theme/utils/getTheme';
import {useTheme} from 'next-themes';
import React from 'react';
import {IconButton} from 'ui/atoms/IconButton';

export const ThemeSwitcherButtonContainer = React.memo(() => {
    const {theme, setTheme: switchTheme} = useTheme();

    const handleClick = React.useCallback(() => {
        const value = theme === 'light' ? 'dark' : 'light';

        switchTheme(value);
        setTheme(getTheme(value));
    }, [switchTheme, theme]);

    return <IconButton onClick={handleClick}>{theme === 'dark' ? <Brightness7 /> : <Brightness4 />}</IconButton>;
});
