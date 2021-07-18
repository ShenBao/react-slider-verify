import React from "react";
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
declare const ReactSliderVerify: React.ForwardRefExoticComponent<IProps & React.RefAttributes<any>>;
export default ReactSliderVerify;
