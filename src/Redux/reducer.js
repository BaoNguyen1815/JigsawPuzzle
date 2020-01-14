import * as types from "./constants";
const initialState = {
  image: null,
  pieces: [],
  zIndex: 0,
  topic: "",
  level: 4
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
      const pieces = action.payload.pieces;
      return {
        ...state,
        pieces: pieces
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
    default: {
      return state;
    }
  }
}
