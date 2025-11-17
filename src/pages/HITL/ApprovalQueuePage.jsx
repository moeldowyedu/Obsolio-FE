import { useState } from 'react';
import HITLApprovalQueue from '../../components/hitl/HITLApprovalQueue';
import TaskReviewModal from '../../components/hitl/TaskReviewModal';
import MainLayout from '../../components/layout/MainLayout';

const ApprovalQueuePage = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <MainLayout>
      <div className="p-6">
        <HITLApprovalQueue onTaskSelect={handleTaskSelect} />
        {selectedTask && (
          <TaskReviewModal task={selectedTask} onClose={handleCloseModal} />
        )}
      </div>
    </MainLayout>
  );
};

export default ApprovalQueuePage;
