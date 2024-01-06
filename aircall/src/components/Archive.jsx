import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CallItem from './CallItem';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import  UnarchiveAllButton  from './UnarchiveAllButton';


const Archive = ({ onUnarchive }) => {
  const [archivedCalls, setArchivedCalls] = useState([]);
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchArchivedCalls = async () => {
      try {
        const response = await axios.get(
          'https://cerulean-marlin-wig.cyclic.app/activities?is_archived=true'
        );
        setArchivedCalls(response.data);
      } catch (error) {
        console.error('Error fetching archived calls:', error);
      }
    };

    fetchArchivedCalls();
  }, []);

  const handleUnarchive = async (callId) => {
    try {
      await axios.patch(`https://cerulean-marlin-wig.cyclic.app/activities/${callId}`, {
        is_archived: false,
      });
      setArchivedCalls((prevCalls) =>
        prevCalls.filter((call) => call.id !== callId)
      );
      onUnarchive();
    } catch (error) {
      console.error('Error unarchiving call:', error);
    }
  };


  const handleCallClick = (callId) => {
    navigate(`/activityDetail/${callId}`);
  };

  const handleArchiveAll = async () => {
    try {
      await axios.patch('https://cerulean-marlin-wig.cyclic.app/reset');
      navigate(`/`);
    } catch (error) {
      console.error('Error archiving all calls:', error);
    }
  };

  return (
    <div>
      <h2>Archived Calls</h2>
      <Link to="/" style={{ margin: "2px" }}>
        <button>Back</button>
      </Link>
      <UnarchiveAllButton onClick={handleArchiveAll} />
      <ul>
        {archivedCalls.map((call) => (
          call.is_archived === true && (
            <CallItem
              key={call.id}
              call={call}
              onArchive={handleUnarchive}
              onClick={handleCallClick}
            />
          )
        ))}
      </ul>
    </div>
  );
};

export default Archive;
