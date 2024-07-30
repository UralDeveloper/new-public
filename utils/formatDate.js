export default (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const tempMonth = date.toLocaleString('ru', { month: 'long' });
    const year = date.getFullYear();

    let month = '';

    if (tempMonth === 'март' || tempMonth === 'август') {
        month = tempMonth + 'а';
    }
    else {
        month = tempMonth.slice(0, -1) + 'я';
    }

    return `${day} ${month} ${year}`;
}