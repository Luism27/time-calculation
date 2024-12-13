import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import "antd/dist/reset.css";
import './App.css';
import { Col, DatePicker, Row } from "antd";
import moment, { Moment } from 'moment';
import dayjs from 'dayjs';

type ResultTime = {
  hours: number;
  minutes: number;
  seconds: number;
}
function App() {
  const [count, setCount] = useState(0);
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
  return (
    <div className="App">
      <div>
        <h1>Time Calculation</h1>
      </div>
      <div className="card">
        <Row justify="center">
          <Col lg={6}>
            <fieldset>
              <legend>Start Date</legend>
              <DatePicker
                format="YYYY-MM-DDTHH:mm:ss"
                onChange={(_, dateString) => {
                  if(dateString){
                    setStartDate(moment(dateString));
                  } else {
                    setStartDate(null);
                  }
                }}
                showTime={{ use12Hours: true }}
              />
            </fieldset>
          </Col>
          <Col lg={6} >
            <fieldset>
              <legend>End Date</legend>
              <DatePicker
                format="YYYY-MM-DDTHH:mm:ss"
                minDate={startDate ? dayjs(startDate.format()):undefined}
                onChange={(_, dateString) => {
                  if(dateString){
                    setEndDate(moment(dateString));
                  } else {
                    setEndDate(null);
                  }
                }}
                showTime={{ use12Hours: true }}
              />
            </fieldset>
          </Col>
        </Row>
      </div>
      {
        result &&
          <h2>
            The result is {result?.hours} hours {result?.minutes} minutes {result?.seconds} seconds
          </h2>
      }
    </div>
  )
}

export default App
