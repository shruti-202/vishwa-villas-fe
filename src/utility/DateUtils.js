export const itemDateFormatter = (rawDate) => {

    const parseDateTime = new Date(rawDate);
    
    //currentDate
    const currentDate = new Date;

    //calculate difference in milliseconds
    const timeDifference = currentDate - parseDateTime;

    //convert milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    //Integer value of daysDifference
    const daysDiffInt = Math.floor(daysDifference);

    if (daysDiffInt < 1) {
        return 'TODAY';
    } else if (daysDiffInt === 1) {
        return 'YESTERDAY'
    } else if (daysDiffInt <= 7){
        return daysDiffInt + "DAYS AGO"
    } else {
      return parseDateTime.toLocaleDateString('en-US',{day:'numeric', month:'long'});
    }
};
