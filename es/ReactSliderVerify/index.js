import _extends from "@babel/runtime/helpers/extends";
import React, { forwardRef } from "react";
import useSliderVerify from "./useSliderVerify";
import "./index.css";
var defaultProps = {
  width: 400,
  height: 36,
  bgColor: "#F2F3F5",
  tips: "请按住滑块，拖动到最右边",
  barWidth: 80,
  bar: /*#__PURE__*/React.createElement("span", null, " >>"),
  successBar: "✅",
  successBgColor: "#06ad06",
  successTips: "验证已通过",
  successShowBar: true
};

function ReactSliderVerify(props) {
  var width = props.width,
      height = props.height,
      bgColor = props.bgColor,
      tips = props.tips,
      successBgColor = props.successBgColor,
      successTips = props.successTips,
      barWidth = props.barWidth,
      bar = props.bar,
      successBar = props.successBar,
      successShowBar = props.successShowBar,
      onSuccess = props.onSuccess,
      innerRef = props.innerRef;

  var _useSliderVerify = useSliderVerify({
    width: width,
    barWidth: barWidth,
    onSuccess: onSuccess,
    innerRef: innerRef
  }),
      success = _useSliderVerify.success,
      isMove = _useSliderVerify.isMove,
      barLeft = _useSliderVerify.barLeft,
      modalWidth = _useSliderVerify.modalWidth,
      refBar = _useSliderVerify.refBar;

  var sliderVerifyStyle = {
    backgroundColor: bgColor,
    width: "".concat(width, "px"),
    height: "".concat(height, "px"),
    lineHeight: "".concat(height, "px")
  };
  var barStyle = {
    width: "".concat(barWidth, "px"),
    // left: `${barLeft}px`,
    transitionDuration: !isMove ? ".4s" : "0s",
    transform: "translateX(".concat(success && !successShowBar ? modalWidth : barLeft, "px)")
  };
  var modalStyle = {
    backgroundColor: successBgColor,
    // width: `${modalWidth}px`,
    width: "".concat(width, "px"),
    left: "-".concat(width, "px"),
    transitionDuration: !isMove ? ".4s" : "0s",
    transform: "translateX(".concat(modalWidth, "px)")
  };
  var verifyTipsStyle = {
    transform: "translateX(".concat(success ? 0 : barWidth, "px)"),
    width: "".concat(success && !successShowBar ? width : width - barWidth, "px")
  };
  return /*#__PURE__*/React.createElement("div", {
    className: success ? "react-slider-verify react-slider-verify-success" : "react-slider-verify",
    style: sliderVerifyStyle
  }, /*#__PURE__*/React.createElement("span", {
    className: "slider-verify-tips",
    style: verifyTipsStyle
  }, success ? successTips : tips), /*#__PURE__*/React.createElement("div", {
    className: "slider-verify-bar",
    ref: refBar,
    style: barStyle
  }, success ? successBar : bar), /*#__PURE__*/React.createElement("div", {
    className: "slider-verify-modal",
    style: modalStyle
  }));
}

ReactSliderVerify.defaultProps = defaultProps;
export default /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(ReactSliderVerify, _extends({}, props, {
    innerRef: ref
  }));
});