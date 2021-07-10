import React from "react";
import { Form, Input, Button } from "antd";
import { ReactSliderVerify } from '../src';

export default function AntdDemo() {
  const onFinish = (values: any) => {
    console.log("onFinish:");
    console.log(JSON.stringify(values, null, 4));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("onFinishFailed:");
    console.log(JSON.stringify(errorInfo, null, 4));
  };

  return (
    <div style={{ margin: "30px auto" }}>
      <h5>Antd Form：</h5>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Slider Verify"
          name="sliderVerify"
          rules={[{ required: true, message: "Please complete the slide verification!" }]}
        >
          <ReactSliderVerify
            width={268}
            height={32}
            barWidth={60}
          />
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
