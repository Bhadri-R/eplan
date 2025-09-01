import { combineReducers } from "redux";
import LayoutReducer from "./layouts/reducer";
import LoginReducer from "./auth/login/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    ForgetPassword: ForgetPasswordReducer,

});

export default rootReducer;