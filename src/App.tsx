import reactLogo from './assets/react.svg';
import "antd/dist/reset.css";
import './App.css';
import { Checkbox, Col, DatePicker, Row } from "antd";
import moment, { Moment } from 'moment';
import dayjs from 'dayjs';
import { Analytics } from "@vercel/analytics/react"
import { useCalculation } from './hooks/useCalculation';

function App() {
  const {
    is12hours,
    result,
    startDate,
    setStartDate,
    setEndDate,
    onMilitaryChange
  } = useCalculation('time-calculation');
  return (
    <div className="App">
      <div>
        <h1>Time Calculation</h1>
      </div>
      <div className="card">
        <Row justify="center" style={{marginBottom: 20}}>
          <Col>
            <Checkbox checked={!is12hours} onChange={onMilitaryChange} className='root'><span className='checkboxtext'>Military?</span></Checkbox>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24} md={12} style={{marginBottom: 20}}>
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
                showTime={{ use12Hours: is12hours }}
              />
            </fieldset>
          </Col>
          <Col xs={24} md={12} >
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
                showTime={{ use12Hours: is12hours }}
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
      <Analytics />
    </div>
  )
}

export default App
