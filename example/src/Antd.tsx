import React from "react";
import { Form, Input, Button } from "antd";
import ReactSliderVerify from "react-slider-verify";

export default function AntdDemo() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("onFinish:");
    console.log(JSON.stringify(values, null, 4));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("onFinishFailed:");
    console.log(JSON.stringify(errorInfo, null, 4));
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div style={{ margin: "30px auto" }}>
      <h5>Antd Form：</h5>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
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
          rules={[
            {
              required: true,
              message: "Please complete the slide verification!",
            },
          ]}
        >
          <ReactSliderVerify width={268} height={32} barWidth={60} />
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            style={{ marginLeft: 15 }}
            htmlType="button"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
