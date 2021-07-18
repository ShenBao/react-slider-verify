/// <reference types="react" />
interface IOptions {
    value?: boolean;
    onChange?: Function;
    onSuccess?: Function;
    innerRef?: any;
    width?: number;
    barWidth?: number;
}
export default function useSliderVerify(options: IOptions): {
    success: boolean;
    isMove: boolean;
    barLeft: number;
    modalWidth: number;
    refBar: import("react").MutableRefObject<any>;
};
export {};
