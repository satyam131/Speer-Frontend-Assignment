import React from 'react';
import { IoMdCall } from "react-icons/io";
import '../css/callitem.css';


const CallItem = ({ call, onArchive, onClick }) => {
  const handleArchiveClick = () => {
    onArchive(call.id);
  };


  return (
    <li>
      <div>
        <IoMdCall className="icon" />
      </div>
      <div>
        <strong>From:</strong> {call.from}
      </div>
      <div>
        <strong>To:</strong> {call.to}
      </div>
      <div>
        <strong>Call Type:</strong> {call.call_type}
      </div>
      <div>
        <strong>Duration:</strong> {call.duration} seconds
      </div>
      <div>
        <strong>Time:</strong> {call.created_at.slice(11, 16)}
      </div>
     
      <button onClick={handleArchiveClick} style={{ margin: "2px" }}>{call.is_archived ? 'Unarchive' : 'Archive'}</button>
      
      <button onClick={() => onClick(call.id)} style={{ margin: "2px" }}>Details</button>
    </li>
  );
};

export default CallItem;
