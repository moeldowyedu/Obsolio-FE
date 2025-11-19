import { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  RepeatIcon,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import Input from '../common/Input/Input';
import Select from '../common/Input/Select';
import Toggle from '../common/Toggle/Toggle';
import Button from '../common/Button/Button';
import { useAgentDeploymentStore } from '../../store/agentDeploymentStore';

const SetScheduleStep = ({ onNext, onBack }) => {
  const { schedule, updateSchedule, jobDetails } = useAgentDeploymentStore();
  const [nextRuns, setNextRuns] = useState([]);

  const frequencyOptions = [
    { value: 'one-time', label: 'One-Time (Run Once Now)' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'half-yearly', label: 'Half-Yearly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'custom', label: 'Custom (Cron Expression)' },
  ];

  const daysOfWeek = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
  ];

  const quarters = [
    { value: 'Q1', label: 'Q1 (Jan-Mar)' },
    { value: 'Q2', label: 'Q2 (Apr-Jun)' },
    { value: 'Q3', label: 'Q3 (Jul-Sep)' },
    { value: 'Q4', label: 'Q4 (Oct-Dec)' },
  ];

  const halves = [
    { value: 'H1', label: 'H1 (Jan-Jun)' },
    { value: 'H2', label: 'H2 (Jul-Dec)' },
  ];

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)' },
    { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  ];

  // Calculate next 5 scheduled runs based on frequency
  useEffect(() => {
    calculateNextRuns();
  }, [schedule.frequency, schedule.time, schedule.dayOfWeek, schedule.dayOfMonth]);

  const calculateNextRuns = () => {
    // Simplified calculation - in production this would use a proper cron library
    const runs = [];
    const now = new Date();

    if (schedule.frequency === 'one-time') {
      runs.push(now);
    } else if (schedule.frequency === 'hourly') {
      for (let i = 0; i < 5; i++) {
        const nextRun = new Date(now);
        nextRun.setHours(now.getHours() + i + 1);
        runs.push(nextRun);
      }
    } else if (schedule.frequency === 'daily') {
      for (let i = 0; i < 5; i++) {
        const nextRun = new Date(now);
        nextRun.setDate(now.getDate() + i + 1);
        const [hours, minutes] = schedule.time.split(':');
        nextRun.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        runs.push(nextRun);
      }
    } else if (schedule.frequency === 'weekly' && schedule.dayOfWeek !== null) {
      let daysAhead = (schedule.dayOfWeek - now.getDay() + 7) % 7 || 7;
      for (let i = 0; i < 5; i++) {
        const nextRun = new Date(now);
        nextRun.setDate(now.getDate() + daysAhead + (i * 7));
        const [hours, minutes] = schedule.time.split(':');
        nextRun.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        runs.push(nextRun);
      }
    }

    setNextRuns(runs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const handleChange = (field, value) => {
    updateSchedule({ [field]: value });
  };

  // Show appropriate fields based on frequency
  const showTimeField = ['hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'half-yearly', 'yearly'].includes(schedule.frequency);
  const showDayOfWeek = schedule.frequency === 'weekly';
  const showDayOfMonth = ['monthly', 'quarterly', 'half-yearly', 'yearly'].includes(schedule.frequency);
  const showQuarter = schedule.frequency === 'quarterly';
  const showHalf = schedule.frequency === 'half-yearly';
  const showMonth = schedule.frequency === 'yearly';
  const showCron = schedule.frequency === 'custom';

  // Check if on-demand type
  const isOnDemand = jobDetails.employmentType === 'on-demand';

  if (isOnDemand) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-2">Schedule Configuration</h2>
          <p className="text-secondary-600">Configure when and how this agent runs</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">On-Demand Agent</h3>
          <p className="text-secondary-600 mb-4">
            This agent is set to run on-demand only. It will not run on a schedule and must be manually triggered by authorized users.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button variant="primary" onClick={onNext}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Set Schedule</h2>
        <p className="text-secondary-600">
          Configure when and how frequently this agent runs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Frequency Selection */}
        <Select
          label="Frequency"
          value={schedule.frequency}
          onChange={(e) => handleChange('frequency', e.target.value)}
          options={frequencyOptions}
          leftIcon={<RepeatIcon className="w-5 h-5" />}
          required
          fullWidth
        />

        {/* Time Selection */}
        {showTimeField && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Time"
              type="time"
              value={schedule.time}
              onChange={(e) => handleChange('time', e.target.value)}
              leftIcon={<Clock className="w-5 h-5" />}
              required
              fullWidth
            />

            <Select
              label="Timezone"
              value={schedule.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              options={timezones}
              required
              fullWidth
            />
          </div>
        )}

        {/* Day of Week (for weekly) */}
        {showDayOfWeek && (
          <Select
            label="Day of Week"
            value={schedule.dayOfWeek ?? ''}
            onChange={(e) => handleChange('dayOfWeek', parseInt(e.target.value))}
            options={[
              { value: '', label: 'Select a day' },
              ...daysOfWeek,
            ]}
            required
            fullWidth
          />
        )}

        {/* Day of Month */}
        {showDayOfMonth && (
          <Select
            label="Day of Month"
            value={schedule.dayOfMonth ?? ''}
            onChange={(e) => handleChange('dayOfMonth', parseInt(e.target.value))}
            options={[
              { value: '', label: 'Select a day' },
              ...Array.from({ length: 31 }, (_, i) => ({
                value: i + 1,
                label: `${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'}`,
              })),
            ]}
            required
            fullWidth
          />
        )}

        {/* Quarter (for quarterly) */}
        {showQuarter && (
          <Select
            label="Quarter"
            value={schedule.quarter || ''}
            onChange={(e) => handleChange('quarter', e.target.value)}
            options={[
              { value: '', label: 'Select a quarter' },
              ...quarters,
            ]}
            required
            fullWidth
          />
        )}

        {/* Half (for half-yearly) */}
        {showHalf && (
          <Select
            label="Half"
            value={schedule.half || ''}
            onChange={(e) => handleChange('half', e.target.value)}
            options={[
              { value: '', label: 'Select a half' },
              ...halves,
            ]}
            required
            fullWidth
          />
        )}

        {/* Month (for yearly) */}
        {showMonth && (
          <Select
            label="Month"
            value={schedule.month ?? ''}
            onChange={(e) => handleChange('month', parseInt(e.target.value))}
            options={[
              { value: '', label: 'Select a month' },
              ...months,
            ]}
            required
            fullWidth
          />
        )}

        {/* Cron Expression (for custom) */}
        {showCron && (
          <Input
            label="Cron Expression"
            type="text"
            value={schedule.cronExpression}
            onChange={(e) => handleChange('cronExpression', e.target.value)}
            placeholder="0 9 * * 1"
            helperText="Enter a valid cron expression (e.g., 0 9 * * 1 for every Monday at 9 AM)"
            required
            fullWidth
          />
        )}

        {/* Advanced Options */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Advanced Options</h3>

          <div className="space-y-4">
            {/* Skip Holidays */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-secondary-900">Skip Holidays</h4>
                <p className="text-sm text-secondary-600">Don't run on recognized holidays</p>
              </div>
              <Toggle
                checked={schedule.skipHolidays}
                onChange={(checked) => handleChange('skipHolidays', checked)}
              />
            </div>

            {/* Retry on Failure */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-secondary-900">Retry on Failure</h4>
                <p className="text-sm text-secondary-600">Automatically retry if execution fails</p>
              </div>
              <Toggle
                checked={schedule.retryOnFailure}
                onChange={(checked) => handleChange('retryOnFailure', checked)}
              />
            </div>

            {schedule.retryOnFailure && (
              <div className="grid grid-cols-2 gap-4 ml-4">
                <Input
                  label="Retry Attempts"
                  type="number"
                  min="1"
                  max="10"
                  value={schedule.retryAttempts}
                  onChange={(e) => handleChange('retryAttempts', parseInt(e.target.value))}
                  fullWidth
                />
                <Input
                  label="Retry Delay (seconds)"
                  type="number"
                  min="30"
                  max="3600"
                  value={schedule.retryDelay}
                  onChange={(e) => handleChange('retryDelay', parseInt(e.target.value))}
                  fullWidth
                />
              </div>
            )}

            {/* Timeout */}
            <Input
              label="Timeout (seconds)"
              type="number"
              min="60"
              max="86400"
              value={schedule.timeout}
              onChange={(e) => handleChange('timeout', parseInt(e.target.value))}
              helperText="Maximum execution time before auto-termination"
              fullWidth
            />

            {/* Notify on Completion */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-secondary-900">Notify on Completion</h4>
                <p className="text-sm text-secondary-600">Send notification when agent completes</p>
              </div>
              <Toggle
                checked={schedule.notifyOnCompletion}
                onChange={(checked) => handleChange('notifyOnCompletion', checked)}
              />
            </div>
          </div>
        </div>

        {/* Next Scheduled Runs Preview */}
        {nextRuns.length > 0 && schedule.frequency !== 'one-time' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Next 5 Scheduled Runs
            </h4>
            <div className="space-y-1">
              {nextRuns.map((run, idx) => (
                <div key={idx} className="text-sm text-blue-700 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {run.toLocaleString()}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" variant="primary" size="lg" className="min-w-[200px]">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SetScheduleStep;
