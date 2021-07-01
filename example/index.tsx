import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

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
      <div style={{ padding: 150 }}>
        <h1>React Slider Verify</h1>
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
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
