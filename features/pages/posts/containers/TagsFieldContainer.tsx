import {Autocomplete} from '@mui/material';
import {POST_TAGS} from 'constants/business';
import {onChange} from 'features/pages/posts/model/events';
import React from 'react';
import {Input} from 'ui/atoms/Input';

export const TagsFieldContainer = React.memo(() => {
    const handleChange = React.useCallback((_, value) => onChange(value), []);

    return (
        <Autocomplete
            multiple
            onChange={handleChange}
            options={POST_TAGS}
            renderInput={params => <Input {...params} label="tags" name="tags" variant="outlined" />}
        />
    );
});
