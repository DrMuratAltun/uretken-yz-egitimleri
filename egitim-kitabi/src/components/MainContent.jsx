import React from 'react';
import ReactMarkdown from 'react-markdown';
import { PlayCircle, Database } from 'lucide-react';

const MainContent = ({ activeWeekData, activeTopicData }) => {
  if (!activeWeekData) {
    return (
      <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Lütfen sol menüden bir konu seçiniz.</p>
      </div>
    );
  }

  // If no specific topic selected, show the entire week overview
  const showOverview = !activeTopicData;

  return (
    <div className="main-content">
      <div className="content-wrapper">
        {showOverview && (
          <>
            <h1 className="week-title">{activeWeekData.title}</h1>
            <p className="week-module">{activeWeekData.module} ({activeWeekData.hours})</p>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              Lütfen yan menüden bir konu başlığı seçerek teorik içeriği, uygulamaları ve verileri inceleyin.
            </p>

            {activeWeekData.notebooks?.length > 0 && (
              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  Haftalık Notebook (Uygulama) Dosyaları
                </h3>
                {activeWeekData.notebooks.map(nb => (
                  <a href={nb.githubUrl} target="_blank" rel="noopener noreferrer" className="notebook-link" key={nb.id}>
                    <div className="notebook-icon">
                      <PlayCircle size={32} />
                    </div>
                    <div className="notebook-info">
                      <h4>{nb.title}</h4>
                      <p>{nb.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}

        {!showOverview && activeTopicData && (
          <div className="topic-section">
            <ReactMarkdown className="markdown-body">
              {activeTopicData.content}
            </ReactMarkdown>

            {/* Optionally display notebooks bound to a specific topic here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
