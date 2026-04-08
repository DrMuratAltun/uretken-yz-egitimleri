import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { courseData } from './data/courseData';

function App() {
  const [activeWeek, setActiveWeek] = useState(courseData[0].weekId);
  const [activeTopic, setActiveTopic] = useState(null);

  const activeWeekData = courseData.find(w => w.weekId === activeWeek);
  const activeTopicData = activeWeekData?.topics?.find(t => t.id === activeTopic);

  return (
    <div className="app-container">
      <Sidebar 
        activeWeek={activeWeek}
        setActiveWeek={setActiveWeek}
        activeTopic={activeTopic}
        setActiveTopic={setActiveTopic}
      />
      <MainContent 
        activeWeekData={activeWeekData}
        activeTopicData={activeTopicData}
      />
    </div>
  );
}

export default App;
