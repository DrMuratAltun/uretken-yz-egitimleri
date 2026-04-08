import React, { useState } from 'react';
import { BookOpen, Moon, Sun, CaretDown, CaretRight, BookBookmark } from 'lucide-react';
import { courseData } from '../data/courseData';

const Sidebar = ({ activeWeek, setActiveWeek, activeTopic, setActiveTopic }) => {
  const [theme, setTheme] = useState('light');
  const [expanded, setExpanded] = useState({ [activeWeek]: true });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleWeek = (weekId) => {
    setExpanded(prev => ({
      ...prev,
      [weekId]: !prev[weekId]
    }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen color="var(--primary)" size={28} />
          <span className="sidebar-title">Eğitim Kitabı</span>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      <div className="nav-links">
        {courseData.map((week) => (
          <div key={week.weekId} className="nav-item">
            <button 
              className={\`nav-week-header \${activeWeek === week.weekId ? 'active' : ''}\`}
              onClick={() => {
                toggleWeek(week.weekId);
                setActiveWeek(week.weekId);
                // Also optionally reset topic
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookBookmark size={18} />
                {week.title.split(':')[0]} {/* e.g. "Hafta 1" */}
              </div>
              {expanded[week.weekId] ? <CaretDown size={16} /> : <CaretRight size={16} />}
            </button>

            {expanded[week.weekId] && (
              <ul className="topic-list">
                {week.topics?.map(topic => (
                  <li key={topic.id}>
                    <button
                      className={\`topic-btn \${activeTopic === topic.id ? 'active' : ''}\`}
                      onClick={() => {
                        setActiveWeek(week.weekId);
                        setActiveTopic(topic.id);
                      }}
                    >
                      <span style={{ fontSize: '10px' }}>●</span>
                      {topic.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
