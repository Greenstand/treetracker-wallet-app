import { Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

export { WIDTH, HEIGHT, WINDOW_WIDTH, WINDOW_HEIGHT };
