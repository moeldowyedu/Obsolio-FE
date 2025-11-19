import { useState } from 'react';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';

const RubricEditor = ({ rubric, onSave, onCancel }) => {
  const [criteria, setCriteria] = useState(rubric?.criteria || []);
  const [name, setName] = useState(rubric?.name || '');

  const addCriterion = () => {
    setCriteria([
      ...criteria,
      {
        id: Date.now(),
        name: '',
        weight: 1,
        description: '',
        scoreRange: { min: 0, max: 10 }
      }
    ]);
  };

  const updateCriterion = (id, field, value) => {
    setCriteria(
      criteria.map(c =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };

  const removeCriterion = (id) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const handleSave = () => {
    onSave({ name, criteria });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Rubric Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter rubric name"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-secondary-900">Criteria</h3>
          <Button onClick={addCriterion} size="sm">
            Add Criterion
          </Button>
        </div>

        <div className="space-y-4">
          {criteria.map((criterion) => (
            <Card key={criterion.id} padding="md">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={criterion.name}
                      onChange={(e) => updateCriterion(criterion.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Criterion name"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      value={criterion.weight}
                      onChange={(e) => updateCriterion(criterion.id, 'weight', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Weight"
                      step="0.1"
                    />
                  </div>
                  <button
                    onClick={() => removeCriterion(criterion.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <textarea
                  value={criterion.description}
                  onChange={(e) => updateCriterion(criterion.id, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Criterion description"
                  rows="2"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t">
        <Button onClick={handleSave}>
          Save Rubric
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default RubricEditor;
