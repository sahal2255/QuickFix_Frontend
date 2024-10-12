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
      <Button type="primary" onClick={handleClear}>Clear</Button>
      <Button type="primary" onClick={() => onSubmit(dates)}>Submit</Button>
      <Button type="default" onClick={() => onDownload(dates)}>Download</Button>
    </div>
  );
};

export default DateRangePicker;
