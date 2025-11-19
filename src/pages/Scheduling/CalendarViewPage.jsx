import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

const CalendarViewPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const scheduledEvents = [
    { day: 15, title: 'Daily Report Generation', time: '09:00 AM', color: 'blue' },
    { day: 15, title: 'Data Sync', time: '02:00 PM', color: 'green' },
    { day: 16, title: 'Weekly Backup', time: '02:00 AM', color: 'purple' },
    { day: 19, title: 'Customer Survey', time: '05:00 PM', color: 'orange' },
    { day: 22, title: 'Monthly Report', time: '09:00 AM', color: 'red' }
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDay = (day) => {
    return scheduledEvents.filter(event => event.day === day);
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Calendar View</h1>
          <p className="text-secondary-600">
            View all scheduled jobs in calendar format
          </p>
        </div>

        <Card>
          <div className="p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-secondary-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevMonth}
                  icon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextMonth}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-semibold text-secondary-600 py-2">
                  {day}
                </div>
              ))}

              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="h-24 bg-gray-50 rounded-lg"></div>
              ))}

              {/* Calendar Days */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const events = getEventsForDay(day);
                const isToday =
                  day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={day}
                    className={`h-24 border rounded-lg p-2 ${
                      isToday ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-1 ${
                      isToday ? 'text-primary-700' : 'text-gray-900'
                    }`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {events.slice(0, 2).map((event, idx) => (
                        <div
                          key={idx}
                          className={`text-xs px-2 py-1 rounded bg-${event.color}-100 text-${event.color}-800 truncate`}
                          title={`${event.title} at ${event.time}`}
                        >
                          {event.time}
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-xs text-gray-500 px-2">
                          +{events.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CalendarViewPage;
