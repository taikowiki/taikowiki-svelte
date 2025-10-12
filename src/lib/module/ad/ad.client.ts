export namespace Ad{
    let res_: () => void = () => {};
    export const adScriptLoaded = {
        res: res_,
        promise: new Promise<void>((res) => res_ = res)
    };
    adScriptLoaded.res = res_;
}