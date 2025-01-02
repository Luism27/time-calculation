import moment, { Moment } from 'moment';
import { useEffect, useRef, useState } from 'react';

type ResultTime = {
  hours: number;
  minutes: number;
  seconds: number;
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
    } else {
      setIs12hours(is12hours);
    }
  }, []);
  const onMilitaryChange = (e: any) => {
    if(e.target.checked){
      setIs12hours(false);
      saveToLocalStorage('is12hours', false);
    } else {
      setIs12hours(true);
      saveToLocalStorage('is12hours', true);
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
    getFromLocalStorage
  }
};
