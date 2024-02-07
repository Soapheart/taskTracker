const formatDateTimeService = () => {
    const formatTime = (dateTimeRAW) => {
        let hours = Math.floor(dateTimeRAW / 3600);
        let minutes = Math.floor(dateTimeRAW / 60 ) - (hours * 60);
        let seconds = dateTimeRAW % 60;
        let formattedTime = hours.toString().padStart(2,'0') + ':' + minutes.toString().padStart(2,'0') + ':' + seconds.toString().padStart(2,'0');
        return formattedTime;
    }
    const formatDateTime = (dateTimeRAW) =>{
        const formatNum = (num) => {
            if(num<10){
                return `0${num}`;
            }else{
                return num;
            }
        }
        const dateObj = new Date(dateTimeRAW)
        let time = formatNum(dateObj.getHours()) + ':'+ formatNum(dateObj.getMinutes());
        let date = formatNum(dateObj.getDate()) + '.' + (formatNum(dateObj.getMonth()+1)) + '.' + dateObj.getUTCFullYear().toString();
        return `${time} ${date}`;
    }
    return{
        formatTime,
        formatDateTime,
    }
}
export default formatDateTimeService;