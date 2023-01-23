import {POST_TAGS} from 'constants/business';
import {onChange} from 'features/pages/posts/model/events';
import React from 'react';
import {MultipleAutocomplete} from 'ui/atoms/MultipleAutocomplete';

const fieldProps = {
    label: 'tags',
    name: 'tags',
    variant: 'outlined',
} as const;

export const TagsFieldContainer = React.memo(() => {
    const handleChange = (value: string[]) => onChange(value);

    return <MultipleAutocomplete fieldProps={fieldProps} onChange={handleChange} options={POST_TAGS} />;
});
