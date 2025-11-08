import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import toast from 'react-hot-toast'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../translations'

const AgentSchedulerPage = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('month') // week or month
  const [scheduledAgents, setScheduledAgents] = useState([
    {
      id: 1,
      agentId: 'code-judge',
      agentName: 'Precision Code Analyzer',
      icon: 'code',
      color: 'blue',
      date: new Date(2025, 10, 10), // November 10, 2025
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
      date: new Date(2025, 10, 12), // November 12, 2025
      startTime: '10:00',
      endTime: '14:00',
      recurring: 'weekly',
      status: 'active'
    },
  ])

  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [draggedSchedule, setDraggedSchedule] = useState(null)

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

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)

  // Helper functions for month view
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const generateMonthDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
    }

    return days
  }

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
  }

  const getSchedulesForDate = (date) => {
    if (!date) return []
    return scheduledAgents.filter(s => isSameDay(s.date, date))
  }

  const handleAgentDrop = (date, agent) => {
    if (!date) return

    const newSchedule = {
      id: Date.now(),
      agentId: agent.id,
      agentName: agent.name,
      icon: agent.icon,
      color: agent.color,
      date: new Date(date),
      startTime: '09:00',
      endTime: '17:00',
      recurring: 'once',
      status: 'active'
    }
    setScheduledAgents([...scheduledAgents, newSchedule])
    toast.success(`${agent.name} scheduled for ${date.toLocaleDateString()}`)
  }

  const handleScheduleDrop = (date, scheduleId) => {
    if (!date) return

    setScheduledAgents(scheduledAgents.map(s =>
      s.id === scheduleId ? { ...s, date: new Date(date) } : s
    ))
    toast.success('Schedule moved')
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

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return isSameDay(date, today)
  }

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 font-heading">{t.agentSchedulerTitle}</h1>
            <p className="text-xl text-gray-600">{t.agentSchedulerDesc}</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={goToToday}
              className="glass-btn-secondary rounded-xl px-6 py-3 font-semibold inline-flex items-center"
            >
              <span className="material-icons mr-2">today</span>
              {t.todayButton}
            </button>
            <button className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center">
              <span className="material-icons mr-2">add</span>
              {t.newScheduleButton}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-3">
            {/* View Selector & Navigation */}
            <div className="glass-card rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    viewMode === 'week' ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t.weekViewOption}
                </button>
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    viewMode === 'month' ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t.monthViewOption}
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <span className="material-icons">chevron_left</span>
                </button>
                <div className="text-xl font-bold text-gray-900 min-w-[200px] text-center">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <span className="material-icons">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Month View */}
            {viewMode === 'month' && (
              <div className="glass-card rounded-3xl p-6">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center font-bold text-gray-700 py-2">
                      {day.substring(0, 3)}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {generateMonthDays().map((date, index) => (
                    <div
                      key={index}
                      className={`min-h-[120px] rounded-xl p-2 border-2 transition-all ${
                        date
                          ? isToday(date)
                            ? 'border-primary-500 bg-primary-50/50'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50/30'
                          : 'border-transparent bg-gray-50/50'
                      }`}
                      onDragOver={(e) => {
                        if (date) e.preventDefault()
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        if (!date) return

                        // Check if dropping a new agent
                        const agentData = e.dataTransfer.getData('agent')
                        if (agentData) {
                          const agent = JSON.parse(agentData)
                          handleAgentDrop(date, agent)
                          return
                        }

                        // Check if moving an existing schedule
                        const scheduleId = e.dataTransfer.getData('scheduleId')
                        if (scheduleId) {
                          handleScheduleDrop(date, parseInt(scheduleId))
                        }
                      }}
                    >
                      {date && (
                        <>
                          {/* Date Number */}
                          <div className={`text-sm font-semibold mb-1 ${
                            isToday(date) ? 'text-primary-600' : 'text-gray-700'
                          }`}>
                            {date.getDate()}
                          </div>

                          {/* Scheduled Agents */}
                          <div className="space-y-1">
                            {getSchedulesForDate(date).map((schedule) => (
                              <div
                                key={schedule.id}
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData('scheduleId', schedule.id.toString())
                                  setDraggedSchedule(schedule.id)
                                }}
                                onDragEnd={() => {
                                  setDraggedSchedule(null)
                                }}
                                onClick={() => setSelectedSchedule(schedule)}
                                className={`rounded-lg p-1.5 cursor-move hover:shadow-md transition-all ${
                                  draggedSchedule === schedule.id ? 'opacity-50' : 'opacity-100'
                                } bg-${schedule.color}-100 border border-${schedule.color}-300`}
                              >
                                <div className="flex items-center">
                                  <span className={`material-icons text-${schedule.color}-600 text-xs mr-1`}>
                                    {schedule.icon}
                                  </span>
                                  <span className="text-xs font-semibold text-gray-900 truncate flex-1">
                                    {schedule.agentName.split(' ')[0]}
                                  </span>
                                  <span className="material-icons text-gray-400" style={{ fontSize: '12px' }}>
                                    drag_indicator
                                  </span>
                                </div>
                                <div className="text-xs text-gray-600 mt-0.5">
                                  {schedule.startTime}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Empty state */}
                          {getSchedulesForDate(date).length === 0 && (
                            <div className="flex items-center justify-center h-16 opacity-0 hover:opacity-100 transition-opacity">
                              <span className="material-icons text-gray-300 text-lg">add_circle</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <div className="flex items-center">
                    <span className="material-icons text-blue-600 mr-2">info</span>
                    <p className="text-sm text-gray-700">
                      {t.dragDropTip} You can also drag scheduled agents to different dates to reschedule them.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Week View */}
            {viewMode === 'week' && (
              <div className="glass-card rounded-3xl p-6">
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {weekDays.map((day, index) => {
                    const weekStart = new Date(currentDate)
                    weekStart.setDate(currentDate.getDate() - currentDate.getDay() + index)

                    return (
                      <div key={day} className="text-center">
                        <div className="font-bold text-gray-900 mb-2">{day.substring(0, 3)}</div>
                        <div className="text-sm text-gray-600 mb-4">
                          {weekStart.getDate()}
                        </div>

                        {/* Drop Zone */}
                        <div
                          className={`min-h-[300px] glass-card rounded-2xl p-3 border-2 border-dashed transition-all ${
                            isToday(weekStart)
                              ? 'border-primary-500 bg-primary-50/50'
                              : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50/50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault()

                            // Check if dropping a new agent
                            const agentData = e.dataTransfer.getData('agent')
                            if (agentData) {
                              const agent = JSON.parse(agentData)
                              handleAgentDrop(weekStart, agent)
                              return
                            }

                            // Check if moving an existing schedule
                            const scheduleId = e.dataTransfer.getData('scheduleId')
                            if (scheduleId) {
                              handleScheduleDrop(weekStart, parseInt(scheduleId))
                            }
                          }}
                        >
                          {getSchedulesForDate(weekStart).length === 0 ? (
                            <div className="text-center py-12">
                              <span className="material-icons text-3xl text-gray-300 mb-2">add_circle</span>
                              <p className="text-xs text-gray-500">{t.dropAgentHint}</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {getSchedulesForDate(weekStart).map((schedule) => (
                                <div
                                  key={schedule.id}
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData('scheduleId', schedule.id.toString())
                                    setDraggedSchedule(schedule.id)
                                  }}
                                  onDragEnd={() => {
                                    setDraggedSchedule(null)
                                  }}
                                  onClick={() => setSelectedSchedule(schedule)}
                                  className={`glass-card rounded-xl p-3 cursor-move hover:shadow-lg transition-all ${
                                    draggedSchedule === schedule.id ? 'opacity-50' : 'opacity-100'
                                  } bg-${schedule.color}-50 border border-${schedule.color}-200`}
                                >
                                  <div className="flex items-center mb-2">
                                    <span className={`material-icons text-${schedule.color}-600 text-sm mr-1`}>
                                      {schedule.icon}
                                    </span>
                                    <span className="text-xs font-semibold text-gray-900 truncate flex-1">
                                      {schedule.agentName}
                                    </span>
                                    <span className="material-icons text-gray-400 text-xs">
                                      drag_indicator
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
                    )
                  })}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <div className="flex items-center">
                    <span className="material-icons text-blue-600 mr-2">info</span>
                    <p className="text-sm text-gray-700">
                      {t.dragDropTip} You can also drag scheduled agents to different days to reschedule them.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Available Agents */}
            <div className="glass-card rounded-3xl p-6 mb-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t.availableAgentsTitle}</h2>
              <p className="text-sm text-gray-600 mb-4">{t.dragToScheduleHint}</p>
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
                  <h2 className="text-xl font-bold text-gray-900">{t.editScheduleTitle}</h2>
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
                      <p className="text-sm text-gray-600">
                        {selectedSchedule.date.toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">{t.startTimeLabel}</label>
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
                    <label className="block text-sm font-semibold text-gray-800 mb-2">{t.endTimeLabel}</label>
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
                    <label className="block text-sm font-semibold text-gray-800 mb-2">{t.frequencyLabel2}</label>
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
                    {t.removeScheduleButton}
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
