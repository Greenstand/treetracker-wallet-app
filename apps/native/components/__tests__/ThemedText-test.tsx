import * as React from "react";
import renderer from "react-test-renderer";

import { ThemedText } from "../ThemedText";

it(`renders correctly`, () => {
  const tree = renderer
    .create(<ThemedText>Snapshot test!</ThemedText>)
    .toJSON();
  // @ts-ignore
  expect(tree).toMatchSnapshot();
});
