import {$valueIndex} from 'features/common/form/model/stores';

describe('$form', () => {
    test('should $form to equal {} after Gate.open', () => {
        expect($valueIndex.getState()).toEqual({});
    });
});
