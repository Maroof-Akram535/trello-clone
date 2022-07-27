import { configureStore } from "@reduxjs/toolkit";
import throttle from "lodash.throttle";
import {saveState,loadState} from "../utils/localStorage";
const board = (state = { columns: [] }, action) => {
  switch (action.type) {
    case "ADD_COLUMN": {
      const { columnId } = action.payload;
      return { columns: [...state.columns, columnId] };
    }
    default:
      return state;
  }
};

const columnsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_COLUMN": {
      const { columnId, columnTitle } = action.payload;
      return {
        ...state,
        [columnId]: { _id: columnId, columnTitle: columnTitle, cards: [] },
      };
    }
 
    case "ADD_CARD": {
      const { columnId, cardId } = action.payload;
      return {
        ...state,
        [columnId]: { ...state[columnId], cards: [...state[columnId].cards, cardId] },
      };
    }
    case "MOVE_CARD": {
      const { oldCardIndex, newCardIndex, sourceListId, destListId } =
        action.payload;
       if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], cards: newCards },
        };
      }
      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        [destListId]: { ...state[destListId], cards: destinationCards },
      };
    }
 
    default:
      return state;
  }
};

const cardsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const { cardText, cardId } = action.payload;
      return { ...state, [cardId]: { text: cardText, _id: cardId } };
    }
    case "CHANGE_CARD_TEXT": {
      const { cardText, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], text: cardText } };
    }
    default:
      return state;
  }
};
const persistedState = loadState();
const store = configureStore({
  reducer: {
    board,
    columnsById,
    cardsById,
  },
  persistedState,
});

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

 
export default store;
