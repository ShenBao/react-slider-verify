import { useState, useEffect, useRef, useImperativeHandle } from "react";

interface IOptions {
  onChange?: Function;
  onSuccess?: Function;
  innerRef?: any;
  width?: number;
  barWidth?: number;
}

interface ITmpData {
  offX: number;
  max: number;
  diff: number;
  isMove: boolean;
}

export default function useSliderVerify(options: IOptions) {
  const { onChange, onSuccess, innerRef, width = 320, barWidth = 80 } = options;

  const refBar = useRef<any>();
  const refTmpData = useRef<ITmpData>({
    max: width - barWidth,
    offX: 0,
    diff: 0,
    isMove: false,
  });
  const [barLeft, setBarLeft] = useState(0);
  const [modalWidth, setModalWidth] = useState(0);
  const [success, setSuccess] = useState(false);

  const onMouseDown = (e: any) => {
    refTmpData.current.offX = e.pageX;
    document.addEventListener("mousemove", onMove);
  };

  const onMove = (e: any) => {
    const diff = e.pageX - refTmpData.current.offX;
    let barLeft = diff;
    let modalWidth = diff;
    refTmpData.current.diff = diff;
    refTmpData.current.isMove = true;

    // 边界判断 最大值
    if (barLeft >= refTmpData.current.max) {
      barLeft = refTmpData.current.max; // 是最大 max 的值
      modalWidth = width; // 最大宽度 是 外面容器的宽度
      refTmpData.current.isMove = false;

      setSuccess(true);
      onChange && onChange(true);
      onSuccess && onSuccess();

      // 移除事件
      document.removeEventListener("mousemove", onMove);
      refBar.current.removeEventListener("mousedown", onMouseDown);
    }
    // 边界判断 小于 0
    if (diff <= 0) {
      barLeft = 0;
      modalWidth = 0;
    }

    setBarLeft(barLeft);
    setModalWidth(modalWidth);
  };

  const onMouseUp = () => {
    // 回到最初位置
    if (refTmpData.current.diff < refTmpData.current.max) {
      refTmpData.current.isMove = false;
      setBarLeft(0);
      setModalWidth(0);
    }
    document.removeEventListener("mousemove", onMove);
  };

  useEffect(() => {
    refBar.current.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const reset = () => {
    setSuccess(false);
    setBarLeft(0);
    setModalWidth(0);
    refBar.current.addEventListener("mousedown", onMouseDown);
    document.removeEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  useImperativeHandle(innerRef, () => ({
    reset,
  }));

  return {
    success,
    isMove: refTmpData.current.isMove,
    barLeft,
    modalWidth,
    refBar,
  };
}
