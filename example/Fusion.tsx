import React, { useRef } from "react";
import { Form, Input, Field } from "@alifd/next";

import ReactSliderVerify from "../src";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

export default function FusionDemo() {
  const refSliderVerify = useRef<any>();
  const field = Field.useField();
  const { init } = field;

  const handleSubmit = () => {
    const values = field.getValues();
    const errors = field.getErrors();
    console.log("values:");
    console.log(JSON.stringify(values, null, 4));
    console.log("errors:");
    console.log(JSON.stringify(errors, null, 4));
  };

  return (
    <div style={{ margin: "30px auto" }}>
      <h5>Fusion Form：</h5>
      <Form style={{ width: "520px" }} {...formItemLayout} field={field} colon>
        <FormItem label="Username">
          <Input
            name="username"
            {...init("username", {
              rules: [
                {
                  required: true,
                  message: "Please input your username!",
                },
              ],
            })}
          />
        </FormItem>
        <FormItem label="Password">
          <Input.Password
            name="Password"
            placeholder="Please Enter Password"
            {...init("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!",
                },
              ],
            })}
          />
        </FormItem>
        <FormItem label="Slider Verify">
          <ReactSliderVerify
            {...init("sliderVerify", {
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (!value) {
                      return callback(
                        "Please complete the slide verification!"
                      );
                    } else {
                      return callback();
                    }
                  },
                },
              ],
            })}
            width={260}
            height={28}
            barWidth={50}
            ref={refSliderVerify}
          />
        </FormItem>
        <FormItem label=" " colon={false}>
          <Form.Submit
            type="primary"
            validate
            onClick={handleSubmit}
            style={{ marginRight: 8 }}
            size="large"
          >
            Submit
          </Form.Submit>
        </FormItem>
      </Form>
    </div>
  );
}
