import React from 'react';

const UnarchiveAllButton = ({ onClick }) => {
  const handleArchiveAllClick = () => {
    onClick();
  };

  return (
    <button onClick={handleArchiveAllClick}  style={{ margin: "2px" }}>UnArchive All</button>
  );
};

export default UnarchiveAllButton;
