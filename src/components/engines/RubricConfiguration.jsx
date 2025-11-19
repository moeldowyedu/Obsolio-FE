import { useState } from 'react';
import Card from '../common/Card/Card';
import Button from '../common/Button/Button';
import Badge from '../common/Badge/Badge';
import Modal from '../common/Modal/Modal';
import RubricEditor from './RubricEditor';

const RubricConfiguration = ({ engineId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRubric, setSelectedRubric] = useState(null);

  // Mock rubrics data
  const rubrics = [
    {
      id: 1,
      name: 'Standard Quality Assessment',
      criteria: 5,
      isActive: true,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
    },
    {
      id: 2,
      name: 'Compliance Check',
      criteria: 8,
      isActive: true,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
    },
    {
      id: 3,
      name: 'Advanced Evaluation',
      criteria: 12,
      isActive: false,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
    },
  ];

  const handleEditRubric = (rubric) => {
    setSelectedRubric(rubric);
    setIsModalOpen(true);
  };

  const handleCreateRubric = () => {
    setSelectedRubric(null);
    setIsModalOpen(true);
  };

  const handleSaveRubric = (rubricData) => {
    console.log('Saving rubric:', rubricData);
    setIsModalOpen(false);
  };

  return (
    <>
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold font-heading text-secondary-900">
              Rubric Configuration
            </h2>
            <p className="text-sm text-secondary-600 mt-1">
              Manage evaluation criteria and rubrics for this engine
            </p>
          </div>
          <Button onClick={handleCreateRubric}>
            Create New Rubric
          </Button>
        </div>

        <div className="space-y-3">
          {rubrics.map((rubric) => (
            <div
              key={rubric.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-secondary-900">{rubric.name}</h3>
                    {rubric.isActive && (
                      <Badge variant="success" size="sm">Active</Badge>
                    )}
                  </div>
                  <p className="text-sm text-secondary-600">
                    {rubric.criteria} criteria • Last modified {rubric.lastModified.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditRubric(rubric)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  Duplicate
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Rubric Editor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRubric ? 'Edit Rubric' : 'Create New Rubric'}
        size="lg"
      >
        <RubricEditor
          rubric={selectedRubric}
          onSave={handleSaveRubric}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default RubricConfiguration;
