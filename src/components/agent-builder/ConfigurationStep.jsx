import { Card, Input, Textarea, Select } from '../common';
import { Plus, Trash2 } from 'lucide-react';

const ConfigurationStep = ({ data, onChange }) => {
  const inputSchema = data.inputSchema || [
    { name: '', type: 'string', required: true, description: '' },
  ];

  const outputSchema = data.outputSchema || [
    { name: '', type: 'string', description: '' },
  ];

  const handleInputChange = (index, field, value) => {
    const newSchema = [...inputSchema];
    newSchema[index][field] = value;
    onChange({ ...data, inputSchema: newSchema });
  };

  const handleOutputChange = (index, field, value) => {
    const newSchema = [...outputSchema];
    newSchema[index][field] = value;
    onChange({ ...data, outputSchema: newSchema });
  };

  const addInputField = () => {
    onChange({
      ...data,
      inputSchema: [
        ...inputSchema,
        { name: '', type: 'string', required: false, description: '' },
      ],
    });
  };

  const removeInputField = (index) => {
    if (inputSchema.length > 1) {
      const newSchema = inputSchema.filter((_, i) => i !== index);
      onChange({ ...data, inputSchema: newSchema });
    }
  };

  const addOutputField = () => {
    onChange({
      ...data,
      outputSchema: [
        ...outputSchema,
        { name: '', type: 'string', description: '' },
      ],
    });
  };

  const removeOutputField = (index) => {
    if (outputSchema.length > 1) {
      const newSchema = outputSchema.filter((_, i) => i !== index);
      onChange({ ...data, outputSchema: newSchema });
    }
  };

  const dataTypes = ['string', 'number', 'boolean', 'array', 'object', 'file', 'image'];

  return (
    <div className="space-y-6">
      {/* Input Configuration */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-heading font-bold text-gray-900">
              Input Configuration
            </h2>
            <p className="text-gray-600">
              Define what data your agent will accept as input
            </p>
          </div>
          <button
            onClick={addInputField}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Field
          </button>
        </div>

        <div className="space-y-4">
          {inputSchema.map((field, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Field Name"
                    placeholder="e.g., invoice_file"
                    value={field.name}
                    onChange={(e) =>
                      handleInputChange(index, 'name', e.target.value)
                    }
                    required
                  />

                  <Select
                    label="Data Type"
                    value={field.type}
                    onChange={(e) =>
                      handleInputChange(index, 'type', e.target.value)
                    }
                  >
                    {dataTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>

                  <div className="md:col-span-2">
                    <Textarea
                      label="Description"
                      placeholder="Describe this input field..."
                      value={field.description}
                      onChange={(e) =>
                        handleInputChange(index, 'description', e.target.value)
                      }
                      rows={2}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`required-${index}`}
                      checked={field.required}
                      onChange={(e) =>
                        handleInputChange(index, 'required', e.target.checked)
                      }
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <label
                      htmlFor={`required-${index}`}
                      className="text-sm text-gray-700"
                    >
                      Required field
                    </label>
                  </div>
                </div>

                {inputSchema.length > 1 && (
                  <button
                    onClick={() => removeInputField(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Output Configuration */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-heading font-bold text-gray-900">
              Output Configuration
            </h2>
            <p className="text-gray-600">
              Define what data your agent will produce as output
            </p>
          </div>
          <button
            onClick={addOutputField}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Field
          </button>
        </div>

        <div className="space-y-4">
          {outputSchema.map((field, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Field Name"
                    placeholder="e.g., processed_data"
                    value={field.name}
                    onChange={(e) =>
                      handleOutputChange(index, 'name', e.target.value)
                    }
                    required
                  />

                  <Select
                    label="Data Type"
                    value={field.type}
                    onChange={(e) =>
                      handleOutputChange(index, 'type', e.target.value)
                    }
                  >
                    {dataTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>

                  <div className="md:col-span-2">
                    <Textarea
                      label="Description"
                      placeholder="Describe this output field..."
                      value={field.description}
                      onChange={(e) =>
                        handleOutputChange(index, 'description', e.target.value)
                      }
                      rows={2}
                    />
                  </div>
                </div>

                {outputSchema.length > 1 && (
                  <button
                    onClick={() => removeOutputField(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Additional Settings */}
      <Card padding="md">
        <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
          Additional Settings
        </h2>

        <div className="space-y-4">
          <Input
            label="Timeout (seconds)"
            type="number"
            placeholder="300"
            value={data.timeout || 300}
            onChange={(e) => onChange({ ...data, timeout: e.target.value })}
            helperText="Maximum time the agent can run before timing out"
          />

          <Select
            label="Error Handling"
            value={data.errorHandling || 'retry'}
            onChange={(e) =>
              onChange({ ...data, errorHandling: e.target.value })
            }
          >
            <option value="retry">Retry on failure</option>
            <option value="fail">Fail immediately</option>
            <option value="fallback">Use fallback value</option>
          </Select>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="enable-logging"
              checked={data.enableLogging || true}
              onChange={(e) =>
                onChange({ ...data, enableLogging: e.target.checked })
              }
              className="w-4 h-4 text-primary-600 rounded"
            />
            <label htmlFor="enable-logging" className="text-sm text-gray-700">
              Enable detailed logging
            </label>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConfigurationStep;
