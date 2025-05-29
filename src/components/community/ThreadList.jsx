// src/components/community/ThreadList.jsx
import React from 'react';
import ThreadCard from './ThreadCard';

const ThreadList = ({ threads }) => {
  if (!threads || threads.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-gray-500">Belum ada diskusi. Mulai diskusi pertama!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {threads.map(thread => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default ThreadList;
