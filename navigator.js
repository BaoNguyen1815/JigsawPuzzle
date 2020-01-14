import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Index from "./src/Components/Index";
import Game from "./src/Components/Game";
import ChooseImage from "./src/Components/ChooseImage";
import YourCamera from "./src/Components/YourCamera";
import CollectionImages from "./src/Components/CollectionImages";
import CollectionPage from './src/Components/CollectionPage'
const screens = {
  Home: {
    screen: Index,
    navigationOptions: () => ({
      title: "Jigsaww"
    })
  },
  ChooseImage: {
    screen: ChooseImage,
    navigationOptions: () => ({
      title: "Jigsaww"
    })
  },
  CollectionPage: {
    screen: CollectionPage,
    navigationOptions: () => ({
      title: "Jigsaww"
    })
  },
  Game: {
    screen: Game,
    navigationOptions: () => ({
      title: "Jigsaww",
      gesturesEnabled: false
    })
  }
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
