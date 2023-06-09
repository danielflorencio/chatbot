export const formatDate = (unformattedStringDate: string): string => {
    const unformattedDate = new Date(unformattedStringDate);
    const newFormattedDate: string = unformattedDate.getMonth() + '/' + unformattedDate.getDate() + '/' + unformattedDate.getFullYear() + ' ' + unformattedDate.getHours() + ':' + unformattedDate.getMinutes();
    return newFormattedDate;
}