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
    type : types.ZINDEX,

  }
};
export const chooseTopic = topic => {
  return {
    type : types.TOPIC,
    payload:{
      topic : topic
    }
  }
}
