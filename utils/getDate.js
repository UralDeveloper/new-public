function renderNumber(value, length) {
    let result = value.toString();

    for (; length > result.length; length -= 1) result = '0' + result;

    return result;
}
export default () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const date =
        renderNumber(day, 2)
        + '.' +
        renderNumber(month, 2)
        + '.' +
        renderNumber(year, 4);
    return date
}