import * as types from "./constants";
const initialState = {
  image: null,
  pieces: []
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
      // console.log("Piece:",pieces)
      return {
        ...state,
        pieces: pieces
      };
    }
    case types.IS_CORRECT: {
      const pieces = action.payload.pieces;
      // console.log("Piece:",pieces)
      return {
        ...state,
        pieces: pieces
      };
    }
    default: {
      return state;
    }
  }
}
