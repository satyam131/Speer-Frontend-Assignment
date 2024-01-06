import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/activitydetail.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ActivityDetail = () => {
  const [callDetails, setCallDetails] = useState(null);
  const { callId } = useParams();

  useEffect(() => {
    const fetchCallDetails = async () => {
      try {
        const response = await axios.get(`https://cerulean-marlin-wig.cyclic.app/activities/${callId}`);
        setCallDetails(response.data);
      } catch (error) {
        console.error('Error fetching call details:', error);
      }
    };

    fetchCallDetails();
  }, [callId]);

  return (
    <div className='outerDiv'>
      <h2>Call Details</h2>
      <Link to="/" style={{ margin: "2px" }}>
        <button>Back</button>
      </Link>
      {callDetails ? (
        <div>
          <div>
            <strong>Direction:</strong> {callDetails.direction}
          </div>
          <div>
            <strong>From:</strong> {callDetails.from}
          </div>
          <div>
            <strong>To:</strong> {callDetails.to}
          </div>
          <div>
            <strong>Via:</strong> {callDetails.via}
          </div>
          <div>
            <strong>Call Type:</strong> {callDetails.call_type}
          </div>
          <div>
            <strong>Duration:</strong> {callDetails.duration} seconds
          </div>
          <div>
            <strong>Time:</strong> {callDetails.created_at.slice(11, 16)}
          </div>
          <div>
            <strong>Archived:</strong> {callDetails.is_archived ? 'Yes' : 'No'}
          </div>
        </div>
      ) : (
        <p>Loading call details...</p>
      )}
    </div>
  );
};

export default ActivityDetail;
