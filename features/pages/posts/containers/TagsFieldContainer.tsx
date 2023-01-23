import {POST_TAGS} from 'constants/business';
import {onChange} from 'features/pages/posts/model/events';
import React from 'react';
import {Autocomplete} from 'ui/atoms';
import {TextField} from 'ui/atoms/TextField';

export const TagsFieldContainer = React.memo(() => {
    const handleChange = React.useCallback((_, value) => onChange(value), []);

    return (
        <Autocomplete
            multiple
            onChange={handleChange}
            options={POST_TAGS}
            renderInput={params => <TextField {...params} label="tags" name="tags" variant="outlined" />}
        />
    );
});
