export const shinyReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "SET_CURRENT_HUNT":
      return {
        ...state,
        currentHunt: action.payload
      };
    case "INCREMENT_ENCOUNTERS":
      return {
        ...state,
        currentHunt: {
          ...state.currentHunt,
          encounters: state.currentHunt.encounters + 1
        }
      }
    case "DECRTEMENT_ENCOUNTERS":
      return {
        ...state,
        currentHunt: {
          ...state.currentHunt,
          encounters: Math.max(0, state.currentHunt.encounters - 1)
        }
      }
    case "ADD_TO_TARGETS":
      return {
        ...state,
        targets: [
          ...state.targets,
          state.currentHunt
        ]
      };
    case "FINISH_HUNT":
      return {
        ...state,
        caught: [
          ...state.caught,
          state.currentHunt
        ],
        targets: [
          state.targets.filter(p => p.id !== state.currentHunt.id)
        ],
        currentHunt: null
      }
    case "LOADING":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};