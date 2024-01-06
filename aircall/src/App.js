// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ActivityFeed from './components/ActivityFeed.jsx';
import Header from './Header.jsx';
import './css/body.css';
import './css/app.css';
import './css/header.css';
import Archive from './components/Archive.jsx';
import ActivityDetail from './components/ActivityDetail.jsx';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path="/" element={<ActivityFeed />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/activityDetail/:callId" element={<ActivityDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
