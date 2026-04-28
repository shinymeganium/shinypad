export const shinyReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "SET_CURRENT_HUNT":
      return {
        ...state,
        current: action.payload
      };
    case "INCREMENT_ENCOUNTERS":
      return {
        ...state,
        current: {
          ...state.current,
          encounters: state.current.encounters + 1
        }
      }
    case "DECRTEMENT_ENCOUNTERS":
      return {
        ...state,
        current: {
          ...state.current,
          encounters: Math.max(0, state.current.encounters - 1)
        }
      }
    case "ADD_TO_TARGETS":
      return {
        ...state,
        targets: [
          ...state.targets,
          action.payload
        ]
      };
    case "FINISH_HUNT":
      return {
        ...state,
        caught: [
          ...state.caught,
          state.current
        ],
        targets: state.targets.filter(
          p => p.id !== state.current.id),
        current: null
      }
    case "LOADING":
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};