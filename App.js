import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Navigator from "./navigator";
import { Provider } from "react-redux";
import store from "./src/Redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigator></Navigator>
    </Provider>
  );
}
