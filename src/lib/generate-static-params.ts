export const generateStaticParamsFactory = (length: number) => () => {
    return Array.from({ length }, (_, i) => i + 1).reduce((acc, cur) => {
        acc.push({ pathname: [cur.toString()] });
        return acc;
    }, [{ pathname: ["admin"] }])
}
