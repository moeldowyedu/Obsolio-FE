import { useNavigate } from 'react-router-dom';
import { Card } from '../common';
import { useTheme } from '../../contexts/ThemeContext';

const QuickActions = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const actions = [

    {
      id: 'browse-engines',
      title: 'Browse Engines',
      description: 'Explore Precision AI Engines',
      icon: '⚙️',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      path: '/engines',
    },
    {
      id: 'marketplace',
      title: 'AgentX Hub',
      description: 'Discover & deploy agents',
      icon: '🏪',
      color: 'bg-gradient-to-br from-secondary-500 to-secondary-600',
      path: '/agentx/marketplace',
    },
    {
      id: 'orchestrate',
      title: 'Orchestrate',
      description: 'Create multi-agent workflows',
      icon: '🎼',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      path: '/orchestration/builder',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Card
          key={action.id}
          padding="md"
          hover
          onClick={() => navigate(action.path)}
          className="cursor-pointer transform transition-transform hover:scale-105"
        >
          <div className="text-center">
            <div
              className={`${action.color} w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl shadow-lg`}
            >
              {action.icon}
            </div>
            <h3 className={`font-heading font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {action.title}
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>{action.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default QuickActions;
