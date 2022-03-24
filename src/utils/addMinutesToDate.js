module.exports=function addMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}
