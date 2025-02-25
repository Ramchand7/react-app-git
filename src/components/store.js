import { createStore } from 'redux';
import cookie from 'js-cookie';

const initialState = {
  task: cookie.get("taskList") ? JSON.parse(cookie.get("taskList")) : [],
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TASK":
            const updated_task = [action.data,...state.task ];
        cookie.set("taskList", JSON.stringify(updated_task));
        return {
          ...state,
          task: updated_task,
        };
        case "DELETE_TASK":
            const updatesCode = state.task.filter((_, index) =>  index !== action.data )
            cookie.set("taskList", JSON.stringify(updatesCode));
        return {
          ...state,
          task: updatesCode,
        };
      default:
        return state;
    }

};

export const store = createStore(taskReducer);

