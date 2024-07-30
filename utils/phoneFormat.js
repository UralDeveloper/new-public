export default (number) => {
    var x = typeof(number) !== 'undefined' ? number.replace(/\D/g, '').match(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/) : null;
    if (x) {
        number = `+${x[1]} ${x[2]} ${x[3]} ${x[4]} ${x[5]}`;
    }
    return number;
}