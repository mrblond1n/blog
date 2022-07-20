import {useGate, useList} from 'effector-react';
import {FormGate} from 'features/common/form/model';
import {onChange, submitForm} from 'features/common/form/model/events';
import {$inputs} from 'features/common/form/model/stores';

import React from 'react';
import {Input} from 'ui/atoms/Input';
import {Form} from 'ui/molecules/Form';

export const FormContainer = React.memo(({children}) => {
    const ref = React.useRef<HTMLFormElement>(null);

    useGate(FormGate, {form: ref});

    const handleSubmit = React.useCallback(e => submitForm(e), []);
    const handleChange = React.useCallback(e => onChange(e), []);

    const onKeyDown = React.useCallback(e => {
        if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
            ref.current && submitForm(ref.current as any);
        }
    }, []);

    return (
        <Form onSubmit={handleSubmit} refWrapper={ref}>
            {useList($inputs, input => (
                <Input onChange={handleChange} onKeyDown={onKeyDown} {...input} />
            ))}

            {children}
        </Form>
    );
});
