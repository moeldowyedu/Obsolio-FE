import { useState } from 'react';
import HITLApprovalQueue from '../../components/hitl/HITLApprovalQueue';
import TaskReviewModal from '../../components/hitl/TaskReviewModal';

const ApprovalQueuePage = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="p-6">
      <HITLApprovalQueue onTaskSelect={handleTaskSelect} />
      {selectedTask && (
        <TaskReviewModal task={selectedTask} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ApprovalQueuePage;
