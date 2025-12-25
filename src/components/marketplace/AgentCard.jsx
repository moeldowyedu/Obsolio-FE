import { useNavigate } from 'react-router-dom';
import { Star, Download, TrendingUp, BadgeCheck, MessageCircle } from 'lucide-react';
import Badge from '../common/Badge/Badge';
import Button from '../common/Button/Button';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuthStore } from '../../store/authStore';

const AgentCard = ({ agent }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuthStore();

  const handleInstall = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate(`/login?returnUrl=/agentx/hub/agent/${agent.id}`);
      return;
    }
    // Navigate to checkout or install flow
    navigate(`/agentx/hub/checkout/${agent.id}`);
  };

  return (
    <div
      onClick={() => navigate(`/agentx/hub/agent/${agent.id}`)}
      className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${theme === 'dark'
          ? 'bg-[#1e293b]/50 border-white/5 hover:border-primary-500/50 hover:bg-[#1e293b]'
          : 'bg-white border-slate-200 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10'
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20 flex-shrink-0 text-2xl text-white">
            {agent.icon_url ? <img src={agent.icon_url} alt={agent.name} className="w-8 h-8 object-contain" /> : (agent.icon || agent.name[0])}
          </div>

          <div>
            <h3 className={`font-bold text-lg mb-1 leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {agent.name}
            </h3>
            <div className="flex items-center gap-2">
              {/* Featured Badge */}
              {agent.is_featured && (
                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 px-1.5 py-0.5 text-[10px] uppercase font-bold">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                v{agent.version || '1.0.0'}
              </span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <div className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            ${agent.monthly_price || 0}
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
            /mo
          </div>
        </div>
      </div>

      {/* Description */}
      <p className={`text-sm mb-6 line-clamp-2 flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
        {agent.description}
      </p>

      {/* Stats */}
      <div className={`flex items-center gap-4 mb-6 pb-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{agent.rating}</span>
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>({agent.review_count})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Download className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{agent.total_installs > 1000 ? (agent.total_installs / 1000).toFixed(1) + 'k' : agent.total_installs}</span>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between gap-3 mt-auto">
        <Button
          onClick={handleInstall}
          className="flex-1 py-2 text-sm font-semibold shadow-lg shadow-primary-500/20"
        >
          Install Agent
        </Button>
        <button
          className={`p-2 rounded-lg border transition-colors ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-gray-400' : 'border-slate-200 hover:bg-slate-50 text-slate-500'}`}
          onClick={(e) => { e.stopPropagation(); /* Wishlist */ }}
        >
          <BadgeCheck className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

export default AgentCard;
