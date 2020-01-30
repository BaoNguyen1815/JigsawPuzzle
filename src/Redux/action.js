import * as types from "./constants";

export const pickImage = image => {
  return {
    type: types.PICK_IMAGE,
    payload: {
      image: image
    }
  };
};

export const cropImage = pieces => {
  return {
    type: types.CROP_IMAGE,
    payload: {
      pieces: pieces
    }
  };
};

export const isCorrect = pieces => {
  return {
    type: types.IS_CORRECT,
    payload: {
      pieces: pieces
    }
  };
};

export const ZIndexIncrease = () => {
  return {
    type: types.ZINDEX
  };
};
export const chooseTopic = topic => {
  return {
    type: types.TOPIC,
    payload: {
      topic: topic
    }
  };
};
export const chooseLevel = level => {
  return {
    type: types.LEVEL,
    payload: {
      level: level
    }
  };
};
export const removeImage = (index, x0, y0) => {
  return {
    type: types.REMOVE_A_PIECE,
    payload: {
      index: index,
      x0: x0,
      y0: y0
    }
  };
};
export const panResponder = () => {
  return {
    type: types.ON_PANRESPONDER_SHOULD_MOVE
  };
};
export const scrollEnabled = () => {
  return {
    type: types.SCROLL_ENABLED
  };
};
