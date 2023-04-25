"use client"

import React, { useState, ChangeEvent } from 'react';

interface DateTimeSelectProps {
    onDateTimeSelect: (date: string, time: string) => void;
}

const DateTimeSelect: React.FC<DateTimeSelectProps> = ({ onDateTimeSelect }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
        onDateTimeSelect(e.target.value, selectedTime);
    };

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(e.target.value);
        onDateTimeSelect(selectedDate, e.target.value);
    };

    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Date & Time</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="time"
                            value={selectedTime}
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateTimeSelect;
