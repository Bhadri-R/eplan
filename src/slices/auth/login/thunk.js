import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';
 

export const logoutUser = () => async (dispatch) => {
    try {
        sessionStorage.removeItem("authUser");
        dispatch(logoutUserSuccess());
    } catch (error) {
        dispatch(apiError(error));
    }
};

export const resetLoginFlag = () => async (dispatch) => {
    dispatch(reset_login_flag());
};
