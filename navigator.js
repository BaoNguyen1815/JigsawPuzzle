import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Index from "./src/Components/Index";
import Game from "./src/Components/Game";
const screens = {
  Home: {
    screen: Index,
    navigationOptions: () => ({
      title: "Jigsaww"
    })
  },
  Game: {
    screen: Game,
    navigationOptions: () => ({
      title: "Jigsaww"
    })
  }
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
