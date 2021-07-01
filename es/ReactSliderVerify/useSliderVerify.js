import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { useRef, useEffect } from "react";
export default function useSliderVerify(options) {
  var _options$width = options.width,
      width = _options$width === void 0 ? 320 : _options$width,
      _options$barWidth = options.barWidth,
      barWidth = _options$barWidth === void 0 ? 80 : _options$barWidth,
      onSuccess = options.onSuccess,
      innerRef = options.innerRef;
  var refBar = useRef({});
  var refTmpData = useRef({
    max: width - barWidth,
    offX: 0,
    diff: 0,
    isMove: false
  });

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      barLeft = _useState2[0],
      setBarLeft = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      modalWidth = _useState4[0],
      setModalWidth = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      success = _useState6[0],
      setSuccess = _useState6[1];

  var onMouseDown = function onMouseDown(e) {
    refTmpData.current.offX = e.pageX;
    document.addEventListener("mousemove", onMove);
  };

  var onMove = function onMove(e) {
    var diff = e.pageX - refTmpData.current.offX;
    var barLeft = diff;
    var modalWidth = diff;
    refTmpData.current.diff = diff;
    refTmpData.current.isMove = true; // 边界判断 最大值

    if (barLeft >= refTmpData.current.max) {
      barLeft = refTmpData.current.max; // 是最大 max 的值

      modalWidth = width; // 最大宽度 是 外面容器的宽度

      refTmpData.current.isMove = false;
      setSuccess(true);
      onSuccess && onSuccess(); // 移除事件

      document.removeEventListener("mousemove", onMove);
      refBar.current.removeEventListener("mousedown", onMouseDown);
    } // 边界判断 小于 0


    if (diff <= 0) {
      barLeft = 0;
      modalWidth = 0;
    }

    setBarLeft(barLeft);
    setModalWidth(modalWidth);
  };

  var onMouseUp = function onMouseUp() {
    // 回到最初位置
    if (refTmpData.current.diff < refTmpData.current.max) {
      refTmpData.current.isMove = false;
      setBarLeft(0);
      setModalWidth(0);
    }

    document.removeEventListener("mousemove", onMove);
  };

  useEffect(function () {
    refBar.current.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    return function () {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  var reset = function reset() {
    setSuccess(false);
    setBarLeft(0);
    setModalWidth(0);
    refBar.current.addEventListener("mousedown", onMouseDown);
    document.removeEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  useImperativeHandle(innerRef, function () {
    return {
      reset: reset
    };
  });
  return {
    success: success,
    isMove: refTmpData.current.isMove,
    barLeft: barLeft,
    modalWidth: modalWidth,
    refBar: refBar
  };
}