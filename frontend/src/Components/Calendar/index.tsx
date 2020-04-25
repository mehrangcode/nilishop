import React, {useState} from 'react';
import DatePicker from "./Georgian/DatePicker/DatePicker"
import NDate from '@nepo/ndate';
import MaskedInput from "react-text-mask";


export interface IDateObject {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}
type IProps = {
    setTime?: boolean
    calendar?: true;
    headerImage?: string;
    placeholder?: string;
    position?: "bottom" | "right";
    name?: string;
    id?:string;
    onChange?: (value: string) => void;
    max?: string;
    min?: string;
}
const Calendar: React.FC<IProps> = (props: IProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [calendarModal, showCalendar] = useState<boolean>(false);
    
    const dateHandler = (data: IDateObject ) => {
        const newDate = new NDate(new Date(data.year, data.month, data.day, data.hour, data.minute, 0, 0));
        console.log(newDate.date)
        if(props.setTime){
            // setInputValue(newDate.format("YYYY/MM/DD HH:mm"))
             datepickerHandler({ year: newDate.year, month: newDate.month, day: newDate.day, hour: data.hour, minute: data.minute });
        } else {
            // setInputValue(newDate.format("YYYY/MM/DD"))
             datepickerHandler({ year: newDate.year, month: newDate.month, day: newDate.day, hour: data.hour, minute: data.minute });
        }
        showCalendar(false)
    }

    // const onChangeHandler = (e: any) => {
    //     e.preventDefault();
    //     let txt: string = e.target.value;
    //     setInputValue(txt)
    //     if(props.onChange){
    //         props.onChange(txt)
    //     }

    // }
    const onChangeHandler = (event: any) => {
        const e = event.target.value;
        let stripedval = e.replace(/_/g, "");
        if ((!props.setTime && stripedval.length === 10) || (props.setTime && stripedval.length === 16)) {
            const y = event.target.value.substr(0, 4);
            const m = event.target.value.substr(5, 2);
            const d = event.target.value.substr(8, 2);
            const h = event.target.value.substr(11, 2);
            const mm = event.target.value.substr(14, 2);

            if (props.max && new NDate(props.max).date < new NDate([+y, +m, +d]).date) {
                const newDate = new NDate(props.max);
                datepickerHandler({ year: newDate.year, month: newDate.month, day: newDate.day, hour: +h, minute: +mm });
            } else {
                datepickerHandler({ year: +y, month: +m, day: +d, hour: +h, minute: +mm });
            }

            if (props.min && new NDate([+y, +m, +d]).date < new NDate(props.min).date) {
                const newDate = new NDate(props.min)
                datepickerHandler({ year: newDate.year, month: newDate.month, day: newDate.day, hour: +h, minute: +mm });
            } else {
                datepickerHandler({ year: +y, month: +m, day: +d, hour: +h, minute: +mm });
            }
        }
    };

    const datepickerHandler = (value: any) => {
        const year = value.year;
        const month = value.month;
        const day = value.day;
        const hour = value.hour ? value.hour : 0;
        const minute = value.minute ? value.minute : 0;
        const convertDate = new NDate([year, month, day, hour, minute]);
        const selectedDate = `${year}/${month > 9 ? month : "0" + month}/${day > 9 ? day : "0" + day}`;
        const selectedDateTime = `${year}/${month > 9 ? month : "0" + month}/${day > 9 ? day : "0" + day} ${
            hour > 9 ? hour : "0" + hour
        }:${minute > 9 ? minute : "0" + minute}`;
        showCalendar(false)
        setInputValue(props.setTime ? selectedDate : selectedDateTime)
        // setState({
        //     selectedDate: selectedDate,
        //     year: year,
        //     month: month,
        //     day: day,
        //     hour: hour,
        //     minute: minute,
        //     selectedDateTime: selectedDateTime,
        // });
        const selectedConvertDate = `${convertDate.year}-${
            convertDate.month + 1 > 9 ? convertDate.month + 1 : "0" + (convertDate.month + 1)
        }-${convertDate.day > 9 ? convertDate.day : "0" + convertDate.day}`;
        const selectedConvertDateTime = `${convertDate.year}-${
            convertDate.month + 1 > 9 ? convertDate.month + 1 : "0" + (convertDate.month + 1)
        }-${convertDate.day > 9 ? convertDate.day : "0" + convertDate.day} ${hour > 9 ? hour : "0" + hour}:${
            minute > 9 ? minute : "0" + minute
        }`;
        if(props.onChange){
            props.onChange(props.setTime ? selectedConvertDateTime : selectedConvertDate);
        }
    };

    const createAutoCorrectedDatePipe = (dateFormat:any) => (conformedValue:any) => {
        const indexesOfPipedChars: any[] = [];
        const dateFormatArray = dateFormat.split(/[^dmyHMS]+/);
        const maxValue: any = { dd: 31, mm: 12, yy: 99, yyyy: 9999, HH: 23, MM: 59, SS: 59 };
        const minValue: any = { dd: 1, mm: 1, yy: 0, yyyy: 1, HH: 0, MM: 0, SS: 0 };
        const conformedValueArr = conformedValue.split("");
        dateFormatArray.forEach((format: any) => {
            const position = dateFormat.indexOf(format);
            const maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);

            if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
                conformedValueArr[position + 1] = conformedValueArr[position];
                conformedValueArr[position] = 0;
                indexesOfPipedChars.push(position);
            }
        });

        const isInvalid = dateFormatArray.some((format: any) => {
            const position = dateFormat.indexOf(format);
            const length = format.length;
            const textValue = conformedValue.substr(position, length).replace(/\D/g, "");
            const value = parseInt(textValue, 10);
            return value > maxValue[format] || (textValue.length === length && value < minValue[format]);
        });

        if (isInvalid) {
            return false;
        }

        return {
            indexesOfPipedChars,
            value: conformedValueArr.join(""),
        };
    };
    const autoCorrectedDatePipe = props.setTime
            ? createAutoCorrectedDatePipe("yyyy/mm/dd HH:MM")
            : createAutoCorrectedDatePipe("yyyy/mm/dd");

    return (
        <div className="Main">

           {calendarModal && (
               <React.Fragment>
                   <div className="datePickerCloser" onClick={() => showCalendar(false)}></div>
                   <DatePicker 
                   position={props.position}
               setTime={props.setTime}
               theDate= {new Date()} headerImage={props.headerImage} 
               sendDate={(newDate) => dateHandler(newDate)} />
               </React.Fragment>
           )}
                      
                      <MaskedInput
                    className={"txtInput"}
                    id={props.id}
                    onClick={() => showCalendar(true)}
                    name={props.name}
                    value={inputValue}
                    keepCharPositions={true}
                    guide={true}
                    pipe={autoCorrectedDatePipe}
                    onChange={onChangeHandler}
                    placeholder={props.placeholder}
                    mask={props.setTime ? [
                                  /\d/,
                                  /\d/,
                                  /\d/,
                                  /\d/,
                                  "/",
                                  /\d/,
                                  /\d/,
                                  "/",
                                  /\d/,
                                  /\d/,
                                  " ",
                                  /\d/,
                                  /\d/,
                                  ":",
                                  /\d/,
                                  /\d/,
                              ]
                            : [/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/]
                    }
                />
        </div>
        )
}

export default Calendar