const debounce = <T extends Function>(callback: T,timeout: number) => {
    let h = 0;
    const callable = (...args: any) => {
        clearTimeout(h);
        h = setTimeout(() => callback(...args), timeout);
    };
    return <T>(<any>callable);
}


export default debounce
