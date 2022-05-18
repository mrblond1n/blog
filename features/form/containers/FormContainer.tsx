import {useGate, useList} from 'effector-react';
import {FormGate} from 'features/form/model';
import {onChange, onSubmit} from 'features/form/model/events';
import {$inputs} from 'features/form/model/stores';

import React from 'react';
import {Input} from 'ui/atoms/Input';
import {Form} from 'ui/molecules/Form';

export const FormContainer = React.memo(() => {
    const ref = React.useRef<HTMLFormElement>(null);

    useGate(FormGate, {form: ref});

    const handleSubmit = React.useCallback(e => onSubmit(e), []);
    const handleChange = React.useCallback(e => onChange(e), []);

    return (
        <Form onSubmit={handleSubmit} refWrapper={ref}>
            {useList($inputs, input => (
                <Input onChange={handleChange} {...input} />
            ))}

            <button type="submit">{'Отправить'}</button>
        </Form>
    );
});
