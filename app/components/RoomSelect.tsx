"use client"

import React, { useState, ChangeEvent } from 'react';

interface Room {
    id: string;
    name: string;
}

interface RoomSelectProps {
    rooms: Room[];
    onRoomSelect: (roomId: string) => void;
}

const RoomSelect: React.FC<RoomSelectProps> = ({ rooms, onRoomSelect }) => {
    const [selectedRoom, setSelectedRoom] = useState('');

    const handleRoomSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedRoom(e.target.value);
        onRoomSelect(e.target.value);
    };

    return (
        <div className="field">
            <label className="label">Select a Room</label>
            <div className="control">
                <div className="select">
                    <select value={selectedRoom} onChange={handleRoomSelect}>
                        <option value="">Choose a room</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default RoomSelect;
