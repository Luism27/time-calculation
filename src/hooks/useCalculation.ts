import moment, { Moment } from 'moment';
import { useEffect, useRef, useState } from 'react';

type ResultTime = {
  hours: number;
  minutes: number;
  seconds: number;
}

const format = {
  n12Hours: "YYYY-MM-DDTHH:mm:ss",
  i12Hours: "YYYY-MM-DDThh:mm:ss A",
}

export const useCalculation = (key: string) => {
  const saveToLocalStorage = (lastKey: string, value: any) => {
    localStorage.setItem(`${key}_${lastKey}`, JSON.stringify(value));
  }
  const getFromLocalStorage = (lastKey: string) => {
    const value = localStorage.getItem(`${key}_${lastKey}`);
    if(value){
      return JSON.parse(value);
    }
    return null;
  }
  const [is12hours, setIs12hours] = useState(true);
  const [hourFormat, setHourFormat] = useState(format.n12Hours);
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [result, setResult] = useState<ResultTime | null>(null);

  useEffect(()=>{
    if(!startDate || !endDate){
      setResult(null);
    } else if(startDate && endDate){
      const diff = moment.duration(endDate.diff(startDate));
      const hour = parseInt(diff.asHours().toString());
      const minutes = parseInt(diff.asMinutes().toString()) % 60;
      const seconds = parseInt(diff.asSeconds().toString()) % 60;
      setResult({
        hours: hour,
        minutes: minutes,
        seconds: seconds
      })
    }
  }, [startDate, endDate]);

  useEffect(()=>{
    const is12hours = getFromLocalStorage('is12hours');
    if(is12hours === null){
      saveToLocalStorage('is12hours', true);
      setHourFormat(format.i12Hours);
    } else {
      setIs12hours(is12hours);
      if(is12hours){
        setHourFormat(format.i12Hours);
      } else {
        setHourFormat(format.n12Hours);
      }
    }
  }, []);
  const onMilitaryChange = (e: any) => {
    if(e.target.checked){
      setIs12hours(false);
      saveToLocalStorage('is12hours', false);
      setHourFormat(format.n12Hours);
    } else {
      setIs12hours(true);
      saveToLocalStorage('is12hours', true);
      setHourFormat(format.i12Hours);
    }
  };


  return {
    is12hours,
    result,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onMilitaryChange,
    saveToLocalStorage,
    getFromLocalStorage,
    hourFormat,
  }
};
