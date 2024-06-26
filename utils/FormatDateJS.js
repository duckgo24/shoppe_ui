function FormatDateJS(dateString) {
    let dateParts = dateString.split('/');
    let dateObject = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
    let formattedDate = dateObject.toISOString().split('T')[0];
    return formattedDate;
}
