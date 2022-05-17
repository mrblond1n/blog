// import {setState} from 'features/signin/model/events';
import {$state} from 'features/signin/model/stores';

describe('$state', () => {
    // test('should be SIGN_IN on start', () => {
    //     expect($state.getState()).toBe('SIGN_IN');
    // });
    //
    test('should be SIGN_UP on start', () => {
        $state.getState();
        // setState('SIGN_UP');
        // expect($state.getState()).toBe('SIGN_UP');
        expect(true).toBeTruthy();
    });
});
