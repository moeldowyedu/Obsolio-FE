import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  List,
  Calendar as CalendarIcon,
  Clock,
  Bot,
} from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';

const JobCalendarPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month' or 'week'

  // Mock scheduled jobs
  const scheduledJobs = [
    {
      id: 1,
      name: 'Daily Invoice Processing',
      agent: 'Alex Morgan',
      time: '09:00',
      date: new Date(2025, 10, 18),
      status: 'scheduled',
      frequency: 'daily',
    },
    {
      id: 2,
      name: 'Weekly Report Generation',
      agent: 'Casey Johnson',
      time: '08:00',
      date: new Date(2025, 10, 18),
      status: 'scheduled',
      frequency: 'weekly',
    },
    {
      id: 3,
      name: 'Candidate Screening',
      agent: 'Sarah Chen',
      time: '10:00',
      date: new Date(2025, 10, 18),
      status: 'scheduled',
      frequency: 'daily',
    },
    {
      id: 4,
      name: 'Customer Support Triage',
      agent: 'Jordan Lee',
      time: '14:00',
      date: new Date(2025, 10, 17),
      status: 'completed',
      frequency: 'hourly',
    },
    {
      id: 5,
      name: 'Email Campaign Scheduler',
      agent: 'Morgan Davis',
      time: '10:00',
      date: new Date(2025, 10, 21),
      status: 'scheduled',
      frequency: 'weekly',
    },
  ];

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getJobsForDate = (day) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return scheduledJobs.filter((job) => {
      return (
        job.date.getDate() === checkDate.getDate() &&
        job.date.getMonth() === checkDate.getMonth() &&
        job.date.getFullYear() === checkDate.getFullYear()
      );
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-700',
      running: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700',
      failed: 'bg-red-100 text-red-700',
    };
    return colors[status] || colors.scheduled;
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderCalendar = () => {
    const days = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const calendarDays = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="min-h-32 bg-gray-50 border border-gray-200"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= days; day++) {
      const jobs = getJobsForDate(day);
      const todayClass = isToday(day) ? 'bg-blue-50 border-blue-500' : 'bg-white';

      calendarDays.push(
        <div
          key={day}
          className={`min-h-32 border border-gray-200 p-2 ${todayClass} hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-sm font-semibold ${
                isToday(day) ? 'text-blue-600' : 'text-gray-900'
              }`}
            >
              {day}
            </span>
            {jobs.length > 0 && (
              <Badge className="bg-primary-100 text-primary-700 text-xs">
                {jobs.length}
              </Badge>
            )}
          </div>
          <div className="space-y-1">
            {jobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className={`text-xs p-1 rounded cursor-pointer ${getStatusColor(
                  job.status
                )}`}
                onClick={() => navigate(`/job-flows/${job.id}`)}
              >
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span className="font-medium">{job.time}</span>
                </div>
                <div className="truncate mt-0.5">{job.name}</div>
              </div>
            ))}
            {jobs.length > 3 && (
              <div className="text-xs text-gray-600 text-center">
                +{jobs.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Calendar</h1>
          <p className="text-gray-600 mt-1">View scheduled job flows on calendar</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            leftIcon={<List className="w-5 h-5" />}
            onClick={() => navigate('/job-flows/all')}
          >
            List View
          </Button>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={previousMonth}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-2xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="ghost" size="sm" onClick={nextMonth}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentDate(new Date())
              }
            >
              Today
            </Button>
          </div>
        </div>
      </Card>

      {/* Calendar Grid */}
      <Card className="overflow-hidden">
        {/* Day Names */}
        <div className="grid grid-cols-7 bg-gray-50">
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-3 text-center font-semibold text-gray-700 border-b border-gray-200"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">{renderCalendar()}</div>
      </Card>

      {/* Legend */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span className="text-sm text-gray-700">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-sm text-gray-700">Running</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
            <span className="text-sm text-gray-700">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-sm text-gray-700">Failed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-50 border-2 border-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">Today</span>
          </div>
        </div>
      </Card>

      {/* Upcoming Jobs Sidebar */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-primary-500" />
          Upcoming Jobs (Next 24 Hours)
        </h3>
        <div className="space-y-3">
          {scheduledJobs
            .filter((job) => job.status === 'scheduled')
            .slice(0, 5)
            .map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate(`/job-flows/${job.id}`)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{job.name}</p>
                    <p className="text-sm text-gray-600">{job.agent}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {job.date.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {job.time}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default JobCalendarPage;
