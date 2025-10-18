import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Wallet = (props: SvgProps) => (
  <Svg
    //@ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={101}
    height={101}
    fill="none"
    {...props}>
    <Path
      fill="#61892F"
      d="M83.031 31.105 68.72 10.51l-5.875 4.062L74.03 30.636"
    />
    <Path
      fill="#61892F"
      d="M74.031 30.636 62.844 14.573 58.78 8.667 27.156 30.636"
    />
    <Path
      fill="#86C232"
      d="M64.156 30.636H47.844c.218-4.344 3.75-7.719 8.156-7.719 4.406 0 7.938 3.375 8.156 7.719Z"
    />
    <Path
      fill="#86C232"
      d="M89.125 40.105v38.968a9.603 9.603 0 0 1-9.656 9.657H21.53a9.603 9.603 0 0 1-9.656-9.657V40.105a9.642 9.642 0 0 1 9.656-9.657h57.907c1.03 0 2 .157 2.843.469 3.906 1.188 6.813 4.875 6.813 9.188h.031Z"
    />
    <Path
      fill="#61892F"
      d="M67 48.48h22.125v22.218H67c-6.125 0-11.094-4.968-11.094-11.093S60.875 48.51 67 48.51v-.032Z"
    />
    <Path
      stroke="#231F20"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M83.469 30.448 69.156 9.823l-5.875 4.094L74.47 29.948M40.938 20.698l-13.344 9.25"
    />
    <Path
      stroke="#231F20"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M74.469 29.948 63.28 13.917 59.22 8.011 48.25 15.605"
    />
    <Path
      stroke="#231F20"
      strokeMiterlimit={10}
      strokeWidth={0.5}
      d="M64.594 29.948H48.28c.219-4.343 3.75-7.718 8.157-7.718 4.406 0 7.937 3.375 8.156 7.718Z"
    />
    <Path
      stroke="#231F20"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M64.594 88.73H22.063a9.603 9.603 0 0 1-9.657-9.657V40.105a9.643 9.643 0 0 1 9.656-9.657H79.97c1.031 0 2 .157 2.844.469 3.906 1.188 6.812 4.875 6.812 9.188v38.968a9.603 9.603 0 0 1-9.656 9.657h-6.031"
    />
    <Path
      stroke="#231F20"
      strokeMiterlimit={10}
      d="M67.531 48.48h22.125v22.218H67.531c-6.125 0-11.094-4.968-11.094-11.093s4.97-11.094 11.094-11.094v-.032Z"
    />
  </Svg>
);
export default Wallet;
