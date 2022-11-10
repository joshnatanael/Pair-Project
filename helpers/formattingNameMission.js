function capitalizeWords(arr) {
    arr = arr.split(' ')
    return arr.map(element => {
    return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
    }).join(' ');
}

module.exports = capitalizeWords