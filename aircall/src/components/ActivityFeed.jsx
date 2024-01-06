import React, { useState, useEffect } from 'react';
import CallItem from './CallItem';
import { Link } from 'react-router-dom';
import UnarchiveAllButton from './UnarchiveAllButton';
import axios from 'axios';
import '../css/activefeed.css';
import { useNavigate } from 'react-router-dom';


const ActivityFeed = () => {
  const [calls, setCalls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await axios.get('https://cerulean-marlin-wig.cyclic.app/activities');
        setCalls(response.data);
      } catch (error) {
        console.error('Error fetching calls:', error);
      }
    };

    fetchCalls();
  }, []);


  const handleArchive = async (callId) => {
    try {
      await axios.patch(`https://cerulean-marlin-wig.cyclic.app/activities/${callId}`, { is_archived: true });
      setCalls((prevCalls) =>
        prevCalls.map((call) =>
          call.id === callId ? { ...call, is_archived: true } : call
        )
      );
    } catch (error) {
      console.error('Error archiving call:', error);
    }
  };


  const handleCallClick = (callId) => {
    console.log("clicked");
    navigate(`/activityDetail/${callId}`);
  };

  const handleArchiveAll = async () => {
    try {
      await axios.patch('https://cerulean-marlin-wig.cyclic.app/reset');
      const response = await axios.get('https://cerulean-marlin-wig.cyclic.app/activities');
      setCalls(response.data);
    } catch (error) {
      console.error('Error archiving all calls:', error);
    }
  };


  return (
    <div>
      <h2>Activity Feed</h2>
      <UnarchiveAllButton onClick={handleArchiveAll} />
      <Link to="/archive" style={{ margin: "2px" }}>
        <button>View Archived Calls</button>
      </Link>
      <ul>
        {calls.map((call) => (
          call.is_archived === false && <CallItem key={call.id} call={call} onArchive={handleArchive} onClick={handleCallClick} />
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
