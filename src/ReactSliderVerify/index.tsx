import React, { forwardRef, Ref } from "react";
import useSliderVerify from "./useSliderVerify";
import "./index.scss";

interface IProps {
  value?: boolean;
  onChange?: Function;
  onSuccess?: Function;
  width?: number;
  height?: number;
  bgColor?: string;
  tips?: React.ReactChild;
  barWidth?: number;
  bar?: React.ReactChild;
  successBar?: React.ReactChild;
  successBgColor?: string;
  successTips?: React.ReactChild;
  successShowBar?: boolean;
}

interface IInnerProps extends IProps {
  innerRef?: any;
}

const defaultProps = {
  value: false,
  width: 400,
  height: 36,
  bgColor: "#F2F3F5",
  tips: "请按住滑块，拖动到最右边",
  barWidth: 80,
  bar: <span> &gt;&gt;</span>,
  successBar: "✅",
  successBgColor: "#06ad06",
  successTips: "验证已通过",
  successShowBar: true,
};

function SliderVerify(props: IInnerProps) {
  const {
    value,
    onChange,
    onSuccess,
    innerRef,
    width,
    height,
    bgColor,
    tips,
    successBgColor,
    successTips,
    barWidth,
    bar,
    successBar,
    successShowBar,
  } = props;

  const { success, isMove, barLeft, modalWidth, refBar } = useSliderVerify({
    value,
    onChange,
    onSuccess,
    innerRef,
    width,
    barWidth,
  });

  const sliderVerifyStyle = {
    backgroundColor: bgColor,
    width: `${width}px`,
    height: `${height}px`,
    lineHeight: `${height}px`,
  };

  const barStyle = {
    width: `${barWidth}px`,
    // left: `${barLeft}px`,
    transitionDuration: !isMove ? ".4s" : "0s",
    transform: `translateX(${
      success && !successShowBar ? modalWidth : barLeft
    }px)`,
  };

  const modalStyle = {
    backgroundColor: successBgColor,
    width: `${width}px`,
    left: `-${width}px`,
    transitionDuration: !isMove ? ".4s" : "0s",
    transform: `translateX(${modalWidth}px)`,
  };

  const verifyTipsStyle = {
    transform: `translateX(${success ? 0 : barWidth}px)`,
    width: `${
      success && !successShowBar
        ? width
        : (width as number) - (barWidth as number)
    }px`,
  };

  return (
    <div
      className={`react-slider-verify-wrapper ${
        success ? "react-slider-verify-success" : ""
      }`}
      style={sliderVerifyStyle}
    >
      <span className="slider-verify-tips" style={verifyTipsStyle}>
        {success ? successTips : tips}
      </span>
      <div className="slider-verify-bar" ref={refBar} style={barStyle}>
        {success ? successBar : bar}
      </div>
      <div className="slider-verify-modal" style={modalStyle} />
    </div>
  );
}

SliderVerify.defaultProps = defaultProps;

const ReactSliderVerify = forwardRef((props: IProps, ref: Ref<any>) => (
  <SliderVerify {...props} innerRef={ref} />
));

ReactSliderVerify.displayName = "ReactSliderVerify";

export default ReactSliderVerify;
