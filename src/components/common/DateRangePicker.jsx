import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const DateRangePicker = ({ onDateRangeChange, onSubmit, onDownload }) => {
  const [dates, setDates] = useState([null, null]);

  // Handle date range change
  const handleRangeChange = (values) => {
    setDates(values);
    if (values) {
      onDateRangeChange({
        startDate: values[0] ? dayjs(values[0]).format('YYYY-MM-DD') : null,
        endDate: values[1] ? dayjs(values[1]).format('YYYY-MM-DD') : null,
      });
    }
  };

  // Handle clearing the dates
  const handleClear = () => {
    setDates([null, null]);
    onDateRangeChange({ startDate: null, endDate: null });
  };

  return (
    <div className="flex gap-4">
      <RangePicker
        value={dates}
        onChange={handleRangeChange}
        format="YYYY-MM-DD"
      />

      {/* Conditionally render Submit button if onSubmit function is passed */}
      {onSubmit && (
        <Button 
          type="primary" 
          onClick={() => onSubmit(dates)} 
          style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}  // Custom green color
        >
          Submit
        </Button>
      )}

      {/* Conditionally render Clear button if onDateRangeChange function is passed */}
      {onDateRangeChange && (
        <Button 
          type="default" 
          onClick={handleClear} 
          style={{ backgroundColor: '#f44336', borderColor: '#f44336', color: 'white' }}  // Custom red color
        >
          Clear
        </Button>
      )}

      {/* Conditionally render Download button if onDownload function is passed */}
      {onDownload && (
        <Button 
          type="default" 
          onClick={() => onDownload(dates)} 
          style={{ backgroundColor: '#2196F3', borderColor: '#2196F3', color: 'white' }}  // Custom blue color
        >
          Download
        </Button>
      )}
    </div>
  );
};

export default DateRangePicker;
