import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Podcast.css';

const Podcast = () => {
  const [data, setData] = useState({ Body: [], Timeline: [] });
  const [error, setError] = useState(null);
  const [activeAudioIndex, setActiveAudioIndex] = useState(null);

  useEffect(() => {
    axios.get('https://arthurfrost.qflo.co.za/php/getTimeline.php')
      .then(response => {
        console.log('Response data:', response.data); 
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error); 
        setError(error.message);
      });
  }, []);

  const handleAudioClick = (index) => {
    if (activeAudioIndex === index) {
      setActiveAudioIndex(null); 
    } else {
      setActiveAudioIndex(index);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="timeline-container">
      <div className="body-section">
        <h1>Podcast</h1>
        {data.Body.map((item, index) => (
          <div key={index} className="body-item">
            <img className="body-background" src={`https://arthurfrost.qflo.co.za/${item.Background}`} alt="Background" />
            <div dangerouslySetInnerHTML={{ __html: item.About }} />
            <script>{item.JS}</script>
          </div>
        ))}
      </div>
      <div className="timeline-section">
        {data.Timeline.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-media">
              <img className="timeline-icon" src={`https://arthurfrost.qflo.co.za/${item.Icon}`} alt={`${item.Title} Icon`} />
              <img className="timeline-image" src={`https://arthurfrost.qflo.co.za/${item.Image}`} alt={item.Title} />
            </div>
            <div className="timeline-content">
              <h2>Title: {item.Title}</h2>
              <p>{item.Description}</p>
              <p>Category: {item.Category}</p>
              <p>MediaName: {item.MediaName}</p>
              <p>CreateDate: {item.CreateDate}</p>
              {item.Audio ? (
                <>
                  <button onClick={() => handleAudioClick(index)}>
                    {activeAudioIndex === index ? 'Hide Audio' : 'Play Audio'}
                  </button>
                  {activeAudioIndex === index && (
                    <audio controls autoPlay onError={(e) => console.error('Audio error:', e)}>
                      <source src={`https://arthurfrost.qflo.co.za/${item.Audio}`} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </>
              ) : (
                <p>No audio available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcast;
