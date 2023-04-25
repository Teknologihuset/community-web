"use client"

import React, { useState } from 'react';
import RoomSelect from '#/app/components/RoomSelect';
import DateTimeSelect from '#/app/components/DateTimeSelect';

interface Room {
    id: string;
    name: string;
}

const rooms: Room[] = [
    { id: '1', name: 'Room 1' },
    { id: '2', name: 'Room 2' },
    { id: '3', name: 'Room 3' },
];

const CalendarPage: React.FC = () => {
    const [selectedRoom, setSelectedRoom] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');

    const handleRoomSelect = (roomId: string) => {
        setSelectedRoom(roomId);
    };

    const handleDateTimeSelect = (date: string, time: string) => {
        setSelectedDate(date);
        setSelectedTime(time);
    };

    return (
        <main className="container has-text-centered">
            <div className={`hero`}>
                <div className={`hero-body`}>
                    <div className="container">
                        <h1 className="title">Community Web</h1>
                        <h2 className="subtitle">Teknologihuset Calendar</h2>
                    </div>
                </div>
            </div>
            <div className="section">
                <RoomSelect rooms={rooms} onRoomSelect={handleRoomSelect} />
                <DateTimeSelect onDateTimeSelect={handleDateTimeSelect} />
            </div>
        </main>
    );
};

export default CalendarPage;
