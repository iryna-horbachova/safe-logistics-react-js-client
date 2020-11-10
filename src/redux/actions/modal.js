import { SHOW_ADD_MODAL, SHOW_EDIT_MODAL } from '../types';

export const addModal = payload => dispatch => {
    dispatch({
        type: SHOW_ADD_MODAL,
        payload
    });
}

export const editModal = payload => dispatch => {
    dispatch({
        type: SHOW_EDIT_MODAL,
        payload
    });
}