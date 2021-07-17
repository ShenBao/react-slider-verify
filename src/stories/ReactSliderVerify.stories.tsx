import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import "@alifd/next/dist/next.css";
import "antd/dist/antd.css";

import ReactSliderVerify from "../ReactSliderVerify";
import ResetTemplate from "./ResetTemplate";
import FusionTemplate from "./FusionTemplate";
import AntdTemplate from "./AntdTemplate";

export default {
  title: "ReactSliderVerify",
  component: ReactSliderVerify,
// };
} as ComponentMeta<typeof ReactSliderVerify>;

const DefaultTemplate: ComponentStory<typeof ReactSliderVerify> = (args) => (
  <ReactSliderVerify {...args} />
);

export const Default = DefaultTemplate.bind({});

export const Reset = ResetTemplate.bind({});

export const Fusion = FusionTemplate.bind({});
export const Antd = AntdTemplate.bind({});
