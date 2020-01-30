import * as types from "./constants";
const initialState = {
  image: null,
  pieces: [],
  zIndex: 1,
  topic: "",
  level: 2,
  piecesAtTable: [],
  panresponder: true,
  scrollEnabled: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PICK_IMAGE: {
      const newImage = action.payload.image;
      return {
        ...state,
        image: newImage
      };
    }
    case types.CROP_IMAGE: {
      const pieces = action.payload.pieces;
      return {
        ...state,
        pieces: pieces
      };
    }
    case types.IS_CORRECT: {
      const piecesAtTable = action.payload.pieces;
      return {
        ...state,
        piecesAtTable: piecesAtTable
      };
    }
    case types.ZINDEX: {
      return {
        ...state,
        zIndex: state.zIndex + 1
      };
    }
    case types.TOPIC: {
      const topic = action.payload.topic;
      return {
        ...state,
        topic: topic
      };
    }
    case types.LEVEL: {
      const level = action.payload.level;
      return {
        ...state,
        level: level
      };
    }
    case types.REMOVE_A_PIECE: {
      const index = action.payload.index;
      const obj = {
        piece: state.pieces[index],
        x0: action.payload.x0,
        y0: action.payload.y0
      };
      return {
        ...state,
        piecesAtTable: [...state.piecesAtTable, obj],
        pieces: [
          ...state.pieces.slice(0, index),
          ...state.pieces.slice(index + 1)
        ]
      };
    }
    case types.ON_PANRESPONDER_SHOULD_MOVE: {
      return {
        ...state,
        panresponder: !state.panresponder
      };
    }
    case types.SCROLL_ENABLED :{
      return {
        ...state,
        scrollEnabled : !state.scrollEnabled
      }
    }
    default: {
      return state;
    }
  }
}
