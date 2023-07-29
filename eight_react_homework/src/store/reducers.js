import {
    ADD_TODO,
    TOGGLE_TODO,
    DELETE_TODO,
    FETCH_TODOS_SUCCESS,
  } from "./actions";
  
  const initialState = {
    todos: [],
  };
  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TODO:
        return {
          ...state,
          todos: [...state.todos, action.payload],
        };
      case TOGGLE_TODO:
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        };
      case DELETE_TODO:
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };
      case FETCH_TODOS_SUCCESS:
        return {
          ...state,
          todos: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default todoReducer;