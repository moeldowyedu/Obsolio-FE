import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import toast from 'react-hot-toast'

const AgentSchedulerPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('week') // week or month
  const [scheduledAgents, setScheduledAgents] = useState([
    {
      id: 1,
      agentId: 'code-judge',
      agentName: 'Precision Code Analyzer',
      icon: 'code',
      color: 'blue',
      day: 1, // Monday
      startTime: '09:00',
      endTime: '17:00',
      recurring: 'weekly',
      status: 'active'
    },
    {
      id: 2,
      agentId: 'legal-judge',
      agentName: 'Legal Document Reviewer',
      icon: 'gavel',
      color: 'purple',
      day: 3, // Wednesday
      startTime: '10:00',
      endTime: '14:00',
      recurring: 'weekly',
      status: 'active'
    },
  ])

  const [selectedSchedule, setSelectedSchedule] = useState(null)

  const availableAgents = [
    { id: 'code-judge', name: 'Precision Code Analyzer', icon: 'code', color: 'blue' },
    { id: 'essay-judge', name: 'Precision Writing Analyzer', icon: 'edit', color: 'green' },
    { id: 'legal-judge', name: 'Legal Reviewer', icon: 'gavel', color: 'purple' },
    { id: 'video-judge', name: 'Precision Video Analyzer', icon: 'videocam', color: 'red' },
    { id: 'design-judge', name: 'Precision Design Analyzer', icon: 'palette', color: 'pink' },
  ]

  const frequencies = [
    { value: 'once', label: 'One Time', icon: 'schedule' },
    { value: 'hourly', label: 'Hourly', icon: 'schedule' },
    { value: 'daily', label: 'Daily', icon: 'today' },
    { value: 'weekly', label: 'Weekly', icon: 'date_range' },
    { value: 'monthly', label: 'Monthly', icon: 'calendar_month' },
    { value: 'yearly', label: 'Yearly', icon: 'event' },
  ]

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)

  const handleAgentDrop = (day, agent) => {
    const newSchedule = {
      id: Date.now(),
      agentId: agent.id,
      agentName: agent.name,
      icon: agent.icon,
      color: agent.color,
      day,
      startTime: '09:00',
      endTime: '17:00',
      recurring: 'weekly',
      status: 'active'
    }
    setScheduledAgents([...scheduledAgents, newSchedule])
    toast.success(`${agent.name} scheduled for ${weekDays[day]}`)
  }

  const handleDeleteSchedule = (scheduleId) => {
    setScheduledAgents(scheduledAgents.filter(s => s.id !== scheduleId))
    setSelectedSchedule(null)
    toast.success('Schedule removed')
  }

  const handleUpdateSchedule = (scheduleId, updates) => {
    setScheduledAgents(scheduledAgents.map(s =>
      s.id === scheduleId ? { ...s, ...updates } : s
    ))
    toast.success('Schedule updated')
  }

  const getSchedulesForDay = (day) => {
    return scheduledAgents.filter(s => s.day === day)
  }

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 font-heading">Agent Scheduler</h1>
            <p className="text-xl text-gray-600">Schedule and automate your AI agents with drag & drop</p>
          </div>
          <div className="flex space-x-3">
            <button className="glass-btn-secondary rounded-xl px-6 py-3 font-semibold inline-flex items-center">
              <span className="material-icons mr-2">today</span>
              Today
            </button>
            <button className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center">
              <span className="material-icons mr-2">add</span>
              New Schedule
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-3">
            {/* View Selector */}
            <div className="glass-card rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    viewMode === 'week' ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Week View
                </button>
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    viewMode === 'month' ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Month View
                </button>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
            </div>

            {/* Weekly Calendar Grid */}
            <div className="glass-card rounded-3xl p-6">
              <div className="grid grid-cols-7 gap-4 mb-4">
                {weekDays.map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="font-bold text-gray-900 mb-2">{day}</div>
                    <div className="text-sm text-gray-600 mb-4">
                      {new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1).toLocaleDateString('en-US', { day: 'numeric' })}
                    </div>

                    {/* Drop Zone */}
                    <div
                      className="min-h-[300px] glass-card rounded-2xl p-3 border-2 border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50/50 transition-all"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault()
                        const agentData = e.dataTransfer.getData('agent')
                        if (agentData) {
                          const agent = JSON.parse(agentData)
                          handleAgentDrop(index, agent)
                        }
                      }}
                    >
                      {getSchedulesForDay(index).length === 0 ? (
                        <div className="text-center py-12">
                          <span className="material-icons text-3xl text-gray-300 mb-2">add_circle</span>
                          <p className="text-xs text-gray-500">Drop agent here</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {getSchedulesForDay(index).map((schedule) => (
                            <div
                              key={schedule.id}
                              onClick={() => setSelectedSchedule(schedule)}
                              className={`glass-card rounded-xl p-3 cursor-pointer hover:shadow-lg transition-all bg-${schedule.color}-50 border border-${schedule.color}-200`}
                            >
                              <div className="flex items-center mb-2">
                                <span className={`material-icons text-${schedule.color}-600 text-sm mr-1`}>
                                  {schedule.icon}
                                </span>
                                <span className="text-xs font-semibold text-gray-900 truncate">
                                  {schedule.agentName}
                                </span>
                              </div>
                              <div className="text-xs text-gray-600">
                                {schedule.startTime} - {schedule.endTime}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {frequencies.find(f => f.value === schedule.recurring)?.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <div className="flex items-center">
                  <span className="material-icons text-blue-600 mr-2">info</span>
                  <p className="text-sm text-gray-700">
                    <strong>Tip:</strong> Drag agents from the sidebar onto any day. Click a scheduled agent to edit its timing and recurrence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Available Agents */}
            <div className="glass-card rounded-3xl p-6 mb-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Available Agents</h2>
              <p className="text-sm text-gray-600 mb-4">Drag agents to schedule</p>
              <div className="space-y-3">
                {availableAgents.map((agent) => (
                  <div
                    key={agent.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('agent', JSON.stringify(agent))
                    }}
                    className="glass-card rounded-xl p-3 cursor-move hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg bg-${agent.color}-100 flex items-center justify-center mr-3`}>
                        <span className={`material-icons text-${agent.color}-600 text-sm`}>{agent.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{agent.name}</h4>
                      </div>
                      <span className="material-icons text-gray-400 text-sm">drag_indicator</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Editor */}
            {selectedSchedule && (
              <div className="glass-card rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Edit Schedule</h2>
                  <button
                    onClick={() => setSelectedSchedule(null)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <span className="material-icons text-sm">close</span>
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-${selectedSchedule.color}-100 flex items-center justify-center mr-3`}>
                      <span className={`material-icons text-${selectedSchedule.color}-600`}>{selectedSchedule.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedSchedule.agentName}</h3>
                      <p className="text-sm text-gray-600">{weekDays[selectedSchedule.day]}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Start Time</label>
                    <select
                      value={selectedSchedule.startTime}
                      onChange={(e) => handleUpdateSchedule(selectedSchedule.id, { startTime: e.target.value })}
                      className="glass-input w-full text-sm"
                    >
                      {hours.map(hour => (
                        <option key={hour} value={hour}>{hour}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">End Time</label>
                    <select
                      value={selectedSchedule.endTime}
                      onChange={(e) => handleUpdateSchedule(selectedSchedule.id, { endTime: e.target.value })}
                      className="glass-input w-full text-sm"
                    >
                      {hours.map(hour => (
                        <option key={hour} value={hour}>{hour}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Frequency</label>
                    <select
                      value={selectedSchedule.recurring}
                      onChange={(e) => handleUpdateSchedule(selectedSchedule.id, { recurring: e.target.value })}
                      className="glass-input w-full text-sm"
                    >
                      {frequencies.map(freq => (
                        <option key={freq.value} value={freq.value}>{freq.label}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => handleDeleteSchedule(selectedSchedule.id)}
                    className="w-full glass-btn-secondary rounded-xl py-2 text-red-600 font-semibold hover:bg-red-50"
                  >
                    <span className="material-icons text-sm mr-1">delete</span>
                    Remove Schedule
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AgentSchedulerPage
