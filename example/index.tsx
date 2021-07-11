import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import "@alifd/next/dist/next.css";
import "antd/dist/antd.css";

import Fusion from "./Fusion";
import Antd from "./Antd";

import "./index.css";
import ReactSliderVerify from "../src";

function App() {
  const ref = useRef({} as any);
  const ref2 = useRef({} as any);
  const ref3 = useRef({} as any);
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);

  return (
    <div className="App">
      <div style={{ padding: "20px", width: "500px", margin: "auto" }}>
        <h1>React Slider Verify</h1>
        <div style={{ marginBottom: 30 }}>
          Github：
          <a
            href="https://github.com/ShenBao/react-slider-verify"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/ShenBao/react-slider-verify
          </a>
        </div>
        <div>
          <ReactSliderVerify
            ref={ref}
            tips={"将滑块拖动到最右边"}
            onSuccess={() => setState(true)}
          />
          <div>当前状态：{`${state}`}</div>
          <button
            onClick={() => {
              ref.current.reset();
              setState(false);
            }}
          >
            重置
          </button>
        </div>
        <div style={{ marginTop: 20 }}>
          <ReactSliderVerify
            width={440}
            height={38}
            barWidth={80}
            onSuccess={() => setState2(true)}
            ref={ref2}
            successShowBar={false}
          />
          <div>当前状态：{`${state2}`}</div>
          <button
            onClick={() => {
              ref2.current.reset();
              setState2(false);
            }}
          >
            重置
          </button>
        </div>

        <div style={{ marginTop: 20 }}>
          <ReactSliderVerify
            width={450}
            height={42}
            bgColor="#dee2de"
            tips={"使劲儿按住滑块，拖动到最右边"}
            barWidth={50}
            bar={<span>-&gt;</span>}
            successBgColor={"#ff6a00"}
            successTips={"验证成功"}
            successBar={
              <span style={{ color: "#ff6a00", fontWeight: "bolder" }}>√</span>
            }
            ref={ref3}
          />
          <div>当前状态：{`${state3}`}</div>
          <button
            onClick={() => {
              ref3.current.reset();
              setState3(false);
            }}
          >
            重置
          </button>
        </div>
        <h2 style={{ marginTop: "40px" }}>在 UI 组件库中使用：</h2>
        <Antd />
        <Fusion />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
