export const USER_LOGIN = "APP/USER/USER_LOGIN";
export const USER_LOGOUT = "APP/USER/USER_LOGOUT";
export const OBSERVER_LOGIN = "APP/OBSERVER/OBSERVER_LOGIN"; 
export const OBSERVER_LOGOUT = "APP/OBSERVER/OBSERVER_LOGOUT";

const currUser = JSON.parse(localStorage.getItem("currentUser"));
const currObserver = JSON.parse(localStorage.getItem("observer"));
export const initialState = {
  user: currUser,
  observer: currObserver,
};

export const userLogin = (user) => ({
  type: USER_LOGIN,
  user,
});

export const observerLogin = (observer) => ({
  type: OBSERVER_LOGIN,
  observer,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const observerLogout = () => ({
  type: OBSERVER_LOGOUT,
});

export const userReducer = (state = initialState, action) => {
  if (action.type === USER_LOGIN) {
    localStorage.setItem("currentUser", JSON.stringify(action.user));
    return {
      ...state,
      user: action.user,
    };
  }
  else if (action.type === USER_LOGOUT) {
    localStorage.removeItem("currentUser");
    return {
      ...state,
      user: "",
    };
  }
  else if (action.type === OBSERVER_LOGIN){
    localStorage.setItem("observer", JSON.stringify(action.observer));
    return {
      ...state,
      observer: action.observer,
    };
  }
  else if (action.type === OBSERVER_LOGOUT) {
    localStorage.removeItem("observer");
    return {
      ...state,
      observer: "",
    };
  }
};

