
const monthDays: number[] =[31,28,31,30,31,30,31,31,30,31,30,31]

type inputType ={
    day: number;
    month: number;
    year: number;
}

const ageCalculator = (bDate:inputType, today: inputType ): inputType =>{

    let years =today.year - bDate.year;
    let months = today.month - bDate.month;
    let days;

    if(bDate.month > today.month){
        years--;
        months= 12+months;
    }
    else if(today.month == bDate.month){ 
        if(today.day < bDate.day){
            years--;
            months=11;
        }
        else if(today.day > bDate.day){
            days = today.day- bDate.day;
        }
        else{
            days=0;
            months=0;
            years=today.year - bDate.year;
        }
    }
    
    
    if(bDate.month ==2 && bDate.year %4 ==0){
        days=29 - bDate.day
    }
    else{
        days = monthDays[bDate.month-1] - bDate.day;
    }
    days += today.day-1


    return {
        day:days,
        month:months,
        year:years};
}


export default ageCalculator;