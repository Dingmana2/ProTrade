import React, { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  LayoutGrid, Bot, Users, Send, BarChart3, Zap, Settings, Bell, Menu, X,
  Search, Filter as FilterIcon, MessageCircle, CheckCircle2, MapPin, Star,
  Globe, Phone, Mail, ChevronRight, SlidersHorizontal, Target, CalendarDays,
  TrendingUp, AlertTriangle, ExternalLink
} from 'lucide-react';

// ============ SHARED STYLES ============
const cardClass =
  'rounded-2xl border border-cyan-500/15 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,180,255,0.05)]';

// ============ SAMPLE DATA ============
const prospectsSeed = [
  {
    id: 1, name: "Mike's Electric", owner: 'Mike R.', trade: 'Electrician', city: 'Syracuse, NY',
    reviews: 7, rating: 3.9, website: 'Poor', status: 'Replied', contact: '(315) 555-0142',
    email: 'mike@example.com', score: 87, priority: 'High', bot: 'Filter Bot',
    issue: 'Outdated website with weak mobile layout',
    angle: 'Position ProTrade as a fast website + review capture system.',
    nextFollowUp: 'Today'
  },
  {
    id: 2, name: 'Northshore HVAC', owner: 'Unknown', trade: 'HVAC', city: 'Liverpool, NY',
    reviews: 4, rating: 4.1, website: 'None', status: 'Contacted', contact: '(315) 555-0287',
    email: 'info@example.com', score: 93, priority: 'Critical', bot: 'Research Bot',
    issue: 'No functioning website found',
    angle: 'Lead with missed jobs from people searching online.',
    nextFollowUp: 'Tomorrow'
  },
  {
    id: 3, name: 'Apex Plumbing Co', owner: 'Apex Team', trade: 'Plumbing', city: 'Liverpool, NY',
    reviews: 12, rating: 4.0, website: 'Basic', status: 'New', contact: '(315) 555-0334',
    email: 'office@example.com', score: 71, priority: 'Medium', bot: 'Research Bot',
    issue: 'Basic site, low conversion signals',
    angle: 'Offer a conversion upgrade and review automation.',
    nextFollowUp: 'Not scheduled'
  },
  {
    id: 4, name: 'Bright Spark Electric', owner: 'Unknown', trade: 'Electrician', city: 'Syracuse, NY',
    reviews: 3, rating: 3.7, website: 'None', status: 'Meeting Booked', contact: '(315) 555-0419',
    email: 'hello@example.com', score: 96, priority: 'Critical', bot: 'Outreach Bot',
    issue: 'No website and very low review count',
    angle: 'Push all-in-one website, reviews, missed-call text-back.',
    nextFollowUp: 'Demo booked'
  },
  {
    id: 5, name: 'ClimateCare HVAC', owner: 'Manager', trade: 'HVAC', city: 'Cicero, NY',
    reviews: 8, rating: 4.2, website: 'Basic', status: 'Contacted', contact: '(315) 555-0512',
    email: 'service@example.com', score: 82, priority: 'High', bot: 'Filter Bot',
    issue: 'Low review count, basic web presence',
    angle: 'Lead with review growth and automated follow-up.',
    nextFollowUp: 'Today'
  },
  {
    id: 6, name: 'Volt Electric Services', owner: 'Unknown', trade: 'Electrician', city: 'Liverpool, NY',
    reviews: 2, rating: 3.8, website: 'None', status: 'New', contact: '(315) 555-0683',
    email: 'contact@example.com', score: 91, priority: 'Critical', bot: 'Research Bot',
    issue: 'No site, almost no Google reviews',
    angle: 'Pitch instant credibility system.',
    nextFollowUp: 'Not scheduled'
  },
  {
    id: 7, name: 'FlowMaster Plumbing', owner: 'FlowMaster Team', trade: 'Plumbing', city: 'Syracuse, NY',
    reviews: 6, rating: 4.4, website: 'Poor', status: 'Replied', contact: '(315) 555-0791',
    email: 'flow@example.com', score: 84, priority: 'High', bot: 'Outreach Bot',
    issue: 'Poor site, low local trust',
    angle: 'Mention losing emergency plumbing searches.',
    nextFollowUp: 'Today'
  },
  {
    id: 8, name: 'PrimeTime HVAC', owner: 'Unknown', trade: 'HVAC', city: 'Liverpool, NY',
    reviews: 1, rating: 3.5, website: 'None', status: 'New', contact: '(315) 555-0828',
    email: 'support@example.com', score: 98, priority: 'Critical', bot: 'Filter Bot',
    issue: 'No website and almost no social proof',
    angle: 'Best fit for full GHL SaaS package.',
    nextFollowUp: 'Not scheduled'
  }
];

// ============ BOT AVATAR ============
const BotAvatar = ({ type, size = 'md' }) => {
  const sizes = {
    sm: 'w-12 h-14',
    md: 'w-20 h-24 sm:w-24 sm:h-28',
    lg: 'w-28 h-32 sm:w-32 sm:h-36'
  };

  return (
    <div className={`${sizes[size]} relative flex-shrink-0`}
         style={{ filter: 'drop-shadow(0 0 16px rgba(0, 200, 255, 0.4))' }}>
      <svg viewBox="0 0 120 140" className="w-full h-full animate-float">
        <line x1="40" y1="20" x2="40" y2="10" stroke="#00B4FF" strokeWidth="2" />
        <line x1="80" y1="20" x2="80" y2="10" stroke="#00B4FF" strokeWidth="2" />
        <circle cx="40" cy="8" r="3" fill="#00B4FF" />
        <circle cx="80" cy="8" r="3" fill="#00B4FF" />
        <rect x="25" y="20" width="70" height="55" rx="20" fill="#E8F4FF" stroke="#00B4FF" strokeWidth="2" />
        <ellipse cx="48" cy="45" rx="6" ry="8" fill="#00B4FF" />
        <ellipse cx="72" cy="45" rx="6" ry="8" fill="#00B4FF" />
        <ellipse cx="48" cy="43" rx="2" ry="3" fill="white" />
        <ellipse cx="72" cy="43" rx="2" ry="3" fill="white" />
        <path d="M 50 60 Q 60 67 70 60" stroke="#00B4FF" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="30" y="75" width="60" height="45" rx="10" fill="#E8F4FF" stroke="#00B4FF" strokeWidth="2" />
        <circle cx="60" cy="95" r="6" fill="#00B4FF" opacity="0.8" />
        <rect x="15" y="80" width="15" height="35" rx="7" fill="#E8F4FF" stroke="#00B4FF" strokeWidth="2" />
        <rect x="90" y="80" width="15" height="35" rx="7" fill="#E8F4FF" stroke="#00B4FF" strokeWidth="2" />

        {type === 'research' && (
          <>
            <circle cx="100" cy="115" r="10" fill="none" stroke="#00B4FF" strokeWidth="3" />
            <line x1="107" y1="122" x2="115" y2="130" stroke="#00B4FF" strokeWidth="3" />
          </>
        )}
        {type === 'filter' && (
          <>
            <path d="M 88 105 L 108 105 L 102 118 L 94 118 Z" fill="none" stroke="#00B4FF" strokeWidth="2" />
            <line x1="98" y1="118" x2="98" y2="130" stroke="#00B4FF" strokeWidth="2" />
          </>
        )}
        {type === 'outreach' && (
          <path d="M 95 95 L 115 100 L 100 110 L 100 105 L 90 110 Z" fill="#00B4FF" opacity="0.8" />
        )}
      </svg>
    </div>
  );
};

// ============ SIDEBAR ============
const Sidebar = ({ open, onClose, active, setActive }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'leads', label: 'Lead Center', icon: Users },
    { id: 'bots', label: 'Bots', icon: Bot },
    { id: 'campaigns', label: 'Campaigns', icon: Send },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {open && <div onClick={onClose} className="fixed inset-0 bg-black/60 z-40 lg:hidden" />}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-64
        bg-slate-950/95 border-r border-cyan-500/10 backdrop-blur-xl
        transform transition-transform duration-300 flex flex-col
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-5 sm:p-6 flex items-center justify-between border-b border-cyan-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg, #0066FF, #00DCFF)', boxShadow: '0 0 20px rgba(0, 180, 255, 0.4)' }}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-white leading-tight">ProTrade</div>
              <div className="text-[10px] tracking-widest text-cyan-400">AUTOMATION</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/10 text-white border-l-2 border-cyan-400'
                    : 'text-slate-400 hover:bg-slate-800/30 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-cyan-500/10 space-y-4">
          <div>
            <div className="text-[10px] tracking-widest text-slate-500 mb-2">SYSTEM STATUS</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
              <span className="text-xs text-white">All Systems Operational</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-widest text-slate-500 mb-2">API HEALTH</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-[99.9%] rounded-full"
                     style={{ background: 'linear-gradient(90deg, #4ade80, #00B4FF)', boxShadow: '0 0 8px rgba(74, 222, 128, 0.5)' }} />
              </div>
              <span className="text-xs font-bold text-green-400">99.9%</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-widest text-slate-500 mb-1">DAILY PROSPECTS</div>
            <div className="text-3xl font-bold text-white">248</div>
            <div className="text-xs text-green-400">+23%</div>
          </div>
        </div>
      </aside>
    </>
  );
};

// ============ HEADER ============
const Header = ({ onMenu, active }) => {
  const titles = {
    dashboard: { title: 'Automation Command Center', sub: '3 Bots. 1 Mission. More Qualified Prospects.' },
    leads: { title: 'Lead Center', sub: 'Manage and convert your qualified prospects.' },
    bots: { title: 'Bot Management', sub: 'Monitor and configure your automation bots.' },
    campaigns: { title: 'Campaigns', sub: 'Active outreach sequences and templates.' },
    reports: { title: 'Reports', sub: 'Performance analytics and insights.' },
    integrations: { title: 'Integrations', sub: 'Connect your tools and data sources.' },
    settings: { title: 'Settings', sub: 'Account and system configuration.' }
  };
  const t = titles[active] || titles.dashboard;

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/10 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onMenu} className="lg:hidden text-slate-300 p-1 flex-shrink-0">
            <Menu className="w-6 h-6" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white truncate"
                style={{ textShadow: '0 0 20px rgba(0, 200, 255, 0.4)' }}>
              {t.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">{t.sub}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-green-400">Active</span>
          </div>
          <button className="relative p-2 rounded-lg hover:bg-slate-800/50">
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-blue-500 text-[10px] font-bold flex items-center justify-center">3</span>
          </button>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, #0066FF, #00DCFF)' }}>PT</div>
        </div>
      </div>
    </header>
  );
};

// ============ BOT CARD ============
const BotCard = ({ type, title, icon: Icon, description, progress, progressLabel, stats, children }) => (
  <div className={`${cardClass} p-4 sm:p-5 md:p-6`}>
    <div className="flex items-start justify-between mb-4 gap-3">
      <BotAvatar type={type} size="md" />
      <div className="text-right flex-1 min-w-0">
        <div className="flex items-center justify-end gap-2 mb-1.5">
          <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <h3 className="text-cyan-300 font-bold tracking-wider text-xs sm:text-sm">{title}</h3>
        </div>
        <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
        <div className="flex items-center justify-end gap-2 mt-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-green-400">Active</span>
        </div>
      </div>
    </div>

    <div className="mb-4 pt-4 border-t border-cyan-500/10">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs sm:text-sm text-slate-300">{progressLabel}</span>
        <span className="text-xs sm:text-sm font-bold text-cyan-400">{progress}%</span>
      </div>
      <div className="h-2 bg-slate-800/60 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
             style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #00B4FF, #00DCFF)', boxShadow: '0 0 10px rgba(0, 200, 255, 0.5)' }} />
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-cyan-500/10">
      {stats.map((s, i) => (
        <div key={i}>
          <div className="text-[10px] sm:text-xs text-slate-400 mb-1">{s.label}</div>
          <div className="text-base sm:text-lg md:text-2xl font-bold text-white">{s.value}</div>
        </div>
      ))}
    </div>

    {children}
  </div>
);

const ProgressRow = ({ label, value }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs text-slate-400 w-20 sm:w-24 flex-shrink-0">{label}</span>
    <div className="flex-1 h-1.5 bg-slate-800/60 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, background: 'linear-gradient(90deg, #00B4FF, #00DCFF)' }} />
    </div>
    <span className="text-xs text-cyan-400 font-medium w-10 text-right">{value}%</span>
  </div>
);

const CriteriaRow = ({ label }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-slate-400">{label}</span>
    <span className="text-xs font-medium flex items-center gap-1"
          style={{ color: '#4ade80', textShadow: '0 0 8px #4ade80' }}>
      <CheckCircle2 className="w-3 h-3" /> Enabled
    </span>
  </div>
);

// ============ STATS ROW ============
const StatsRow = () => {
  const stats = [
    { label: 'Total Prospects', value: '2,847', change: '+18%', icon: Users },
    { label: 'Reply Rate', value: '23.4%', change: '+4.2%', icon: MessageCircle },
    { label: 'Meetings Booked', value: '47', change: '+12', icon: CheckCircle2 },
    { label: 'Active Campaigns', value: '8', change: '3 new', icon: Send }
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={i} className={`${cardClass} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <Icon className="w-5 h-5 text-cyan-400" />
              <span className="text-xs text-green-400 font-medium">{s.change}</span>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-400 mt-1">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
};

// ============ PIPELINE ============
const Pipeline = () => {
  const data = [
    { name: 'New Leads', value: 156, color: '#00B4FF' },
    { name: 'Contacted', value: 98, color: '#00DCFF' },
    { name: 'Replied', value: 23, color: '#4ade80' },
    { name: 'Meetings Booked', value: 7, color: '#FFB800' }
  ];
  const total = 284;
  const circumference = 2 * Math.PI * 60;
  let offset = 0;
  const segments = data.map(d => {
    const pct = d.value / total;
    const length = pct * circumference;
    const seg = { ...d, length, offset };
    offset += length;
    return seg;
  });

  const weekData = [
    { day: 'Mon', value: 30 }, { day: 'Tue', value: 35 }, { day: 'Wed', value: 32 },
    { day: 'Thu', value: 50 }, { day: 'Fri', value: 60 }, { day: 'Sat', value: 75 }, { day: 'Sun', value: 85 }
  ];

  return (
    <div className={`${cardClass} p-4 sm:p-5 md:p-6`}>
      <h3 className="text-lg font-bold text-white mb-5">Pipeline Overview</h3>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative flex-shrink-0">
          <svg viewBox="0 0 160 160" className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 -rotate-90">
            <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(0, 30, 60, 0.5)" strokeWidth="18" />
            {segments.map((s, i) => (
              <circle key={i} cx="80" cy="80" r="60" fill="none" stroke={s.color} strokeWidth="18"
                      strokeDasharray={`${s.length} ${circumference}`}
                      strokeDashoffset={-s.offset} strokeLinecap="round" />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">{total}</div>
            <div className="text-xs text-slate-400">Total Leads</div>
          </div>
        </div>

        <div className="flex-1 w-full space-y-3">
          {data.map((d, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                <span className="text-sm text-slate-300">{d.name}</span>
              </div>
              <span className="font-bold text-white">{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-cyan-500/10">
        <ResponsiveContainer width="100%" height={80}>
          <AreaChart data={weekData}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00B4FF" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#00B4FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="#475569" fontSize={10} />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #0891b2', borderRadius: 8, fontSize: 12 }} />
            <Area type="monotone" dataKey="value" stroke="#00B4FF" strokeWidth={2} fill="url(#areaGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ============ ACTIVITY FEED ============
const ActivityFeed = () => {
  const items = [
    { icon: Search, bot: 'Research Bot', action: 'found 24 new prospects in Miami, FL', time: '2 min ago' },
    { icon: FilterIcon, bot: 'Filter Bot', action: 'qualified 15 new prospects', time: '5 min ago' },
    { icon: Send, bot: 'Outreach Bot', action: 'booked a meeting with ABC Plumbing', time: '12 min ago' },
    { icon: MessageCircle, bot: 'Outreach Bot', action: 'sent 18 personalized messages', time: '15 min ago' },
    { icon: CheckCircle2, bot: 'Filter Bot', action: 'qualified 8 electricians in Syracuse', time: '22 min ago' }
  ];
  return (
    <div className={`${cardClass} p-4 sm:p-5 md:p-6`}>
      <div className="flex items-center gap-2 mb-5">
        <Zap className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                   style={{ background: 'rgba(0, 180, 255, 0.1)', border: '1px solid rgba(0, 180, 255, 0.2)' }}>
                <Icon className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white"><span className="font-medium">{item.bot}</span> {item.action}</p>
                <p className="text-xs text-slate-500 mt-1">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============ PRIORITY BADGE ============
const PriorityBadge = ({ priority }) => {
  const styles = {
    Critical: 'bg-red-500/15 text-red-400 border-red-500/30',
    High: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    Medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    Low: 'bg-slate-500/15 text-slate-400 border-slate-500/30'
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs border font-medium ${styles[priority] || styles.Low}`}>
      {priority}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    'Meeting Booked': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Replied': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'Contacted': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'New': 'bg-slate-700/40 text-slate-300 border-slate-600'
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs border font-medium whitespace-nowrap ${styles[status] || styles.New}`}>
      {status}
    </span>
  );
};

// ============ FILTERS ============
const FilterBar = ({ filters, setFilters }) => {
  const trades = ['All', 'Electrician', 'HVAC', 'Plumbing'];
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <SlidersHorizontal className="w-4 h-4" />
        <span className="hidden sm:inline">Filter:</span>
      </div>
      {trades.map(t => (
        <button key={t}
          onClick={() => setFilters({ ...filters, trade: t })}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            filters.trade === t
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
              : 'bg-slate-800/40 text-slate-400 border border-slate-700 hover:border-cyan-500/30'
          }`}>
          {t}
        </button>
      ))}
      <div className="flex-1 min-w-[180px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="text" placeholder="Search prospects..."
            value={filters.search}
            onChange={e => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-1.5 rounded-full bg-slate-800/40 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50" />
        </div>
      </div>
    </div>
  );
};

// ============ PROSPECT ROW (Desktop Table) ============
const ProspectRow = ({ p, onSelect, selected }) => (
  <tr onClick={() => onSelect(p)}
      className={`border-b border-cyan-500/5 cursor-pointer transition-colors ${
        selected ? 'bg-cyan-500/10' : 'hover:bg-cyan-500/5'
      }`}>
    <td className="px-6 py-3">
      <div className="font-medium text-white">{p.name}</div>
      <div className="text-xs text-slate-500">{p.owner}</div>
    </td>
    <td className="px-6 py-3">
      <PriorityBadge priority={p.priority} />
    </td>
    <td className="px-6 py-3">
      <div className="flex items-center gap-2">
        <div className="text-sm font-bold text-cyan-400">{p.score}</div>
        <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: 'linear-gradient(90deg, #00B4FF, #00DCFF)' }} />
        </div>
      </div>
    </td>
    <td className="px-6 py-3 text-slate-300 text-sm">{p.trade}</td>
    <td className="px-6 py-3 text-slate-400 text-sm">
      <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.city}</div>
    </td>
    <td className="px-6 py-3">
      <div className="flex items-center gap-1 text-slate-300 text-sm">
        <Star className="w-3 h-3 text-yellow-400" />{p.reviews}
        <span className="text-slate-500 ml-1">({p.rating})</span>
      </div>
    </td>
    <td className="px-6 py-3 text-sm">
      <span className={p.website === 'None' ? 'text-red-400' : p.website === 'Poor' ? 'text-orange-400' : 'text-yellow-400'}>
        {p.website}
      </span>
    </td>
    <td className="px-6 py-3"><StatusBadge status={p.status} /></td>
  </tr>
);

// ============ PROSPECT TABLE ============
const ProspectTable = ({ filters, selected, onSelect }) => {
  const filtered = useMemo(() => prospectsSeed.filter(p => {
    if (filters.trade !== 'All' && p.trade !== filters.trade) return false;
    if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  }), [filters]);

  return (
    <div className={`${cardClass} overflow-hidden`}>
      <div className="p-4 sm:p-5 md:p-6 pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Prospects</h3>
          <span className="text-xs text-slate-400">{filtered.length} of {prospectsSeed.length}</span>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-y border-cyan-500/10">
              <th className="px-6 py-3 font-medium">Business</th>
              <th className="px-6 py-3 font-medium">Priority</th>
              <th className="px-6 py-3 font-medium">Score</th>
              <th className="px-6 py-3 font-medium">Trade</th>
              <th className="px-6 py-3 font-medium">Location</th>
              <th className="px-6 py-3 font-medium">Reviews</th>
              <th className="px-6 py-3 font-medium">Website</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => <ProspectRow key={p.id} p={p} onSelect={onSelect} selected={selected?.id === p.id} />)}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-cyan-500/5">
        {filtered.map(p => (
          <div key={p.id} onClick={() => onSelect(p)}
               className={`p-4 cursor-pointer ${selected?.id === p.id ? 'bg-cyan-500/10' : ''}`}>
            <div className="flex justify-between items-start mb-2 gap-2">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white truncate">{p.name}</div>
                <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 flex-shrink-0" /> {p.city} • {p.trade}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <PriorityBadge priority={p.priority} />
                <StatusBadge status={p.status} />
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 flex-wrap">
              <span className="flex items-center gap-1"><Target className="w-3 h-3 text-cyan-400" />{p.score}</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" />{p.reviews}</span>
              <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{p.website}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ LEAD DETAIL PANEL ============
const LeadDetail = ({ lead, onClose }) => {
  if (!lead) return null;
  return (
    <div className={`${cardClass} p-4 sm:p-5 md:p-6 sticky top-24`}>
      <div className="flex items-start justify-between mb-4 gap-2">
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-white truncate">{lead.name}</h3>
          <p className="text-xs text-slate-400 mt-1">{lead.owner} • {lead.trade}</p>
        </div>
        <button onClick={onClose} className="lg:hidden text-slate-400 p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <PriorityBadge priority={lead.priority} />
        <StatusBadge status={lead.status} />
        <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs border bg-cyan-500/10 text-cyan-300 border-cyan-500/30">
          via {lead.bot}
        </span>
      </div>

      {/* Score */}
      <div className="mb-4 pb-4 border-b border-cyan-500/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-slate-400 uppercase tracking-wide">Lead Score</span>
          <span className="text-xl font-bold text-cyan-400">{lead.score}/100</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full rounded-full"
               style={{ width: `${lead.score}%`, background: 'linear-gradient(90deg, #00B4FF, #00DCFF)', boxShadow: '0 0 8px rgba(0, 180, 255, 0.5)' }} />
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-2 mb-4 pb-4 border-b border-cyan-500/10">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <a href={`tel:${lead.contact}`} className="hover:text-cyan-400 truncate">{lead.contact}</a>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <a href={`mailto:${lead.email}`} className="hover:text-cyan-400 truncate">{lead.email}</a>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span>{lead.city}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
          <span>{lead.reviews} reviews • {lead.rating}/5</span>
        </div>
      </div>

      {/* Issue */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-2">
          <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-xs text-slate-400 uppercase tracking-wide">Identified Issue</span>
        </div>
        <p className="text-sm text-white">{lead.issue}</p>
      </div>

      {/* Angle */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Target className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs text-slate-400 uppercase tracking-wide">Pitch Angle</span>
        </div>
        <p className="text-sm text-white">{lead.angle}</p>
      </div>

      {/* Follow-up */}
      <div className="mb-5 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
        <div className="flex items-center gap-1.5 mb-1">
          <CalendarDays className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs text-slate-400 uppercase tracking-wide">Next Follow-up</span>
        </div>
        <p className="text-sm font-medium text-white">{lead.nextFollowUp}</p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button className="px-3 py-2 rounded-lg text-xs font-medium text-white flex items-center justify-center gap-1.5"
                style={{ background: 'linear-gradient(135deg, #0066FF, #00DCFF)' }}>
          <Phone className="w-3.5 h-3.5" /> Call
        </button>
        <button className="px-3 py-2 rounded-lg text-xs font-medium text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/10 flex items-center justify-center gap-1.5">
          <Mail className="w-3.5 h-3.5" /> Email
        </button>
      </div>
    </div>
  );
};

// ============ MAIN ============
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [filters, setFilters] = useState({ trade: 'All', search: '' });
  const [selectedLead, setSelectedLead] = useState(null);

  return (
    <div className="min-h-screen text-white"
         style={{ background: 'radial-gradient(ellipse at top, #0a1628 0%, #050a14 50%, #02060c 100%)' }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>

      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} active={activeNav} setActive={setActiveNav} />

        <div className="flex-1 min-w-0">
          <Header onMenu={() => setSidebarOpen(true)} active={activeNav} />

          <main className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {activeNav === 'dashboard' && (
              <>
                <StatsRow />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  <BotCard type="research" title="RESEARCH BOT" icon={Search}
                    description="Scanning the web for businesses without websites and low Google reviews."
                    progress={76} progressLabel="Research Progress"
                    stats={[{ label: 'Scanned Today', value: '1,248' }, { label: 'Found', value: '312' }, { label: 'New Leads', value: '156' }]}>
                    <div>
                      <div className="text-sm font-semibold text-slate-300 mb-3">Top Sources</div>
                      <div className="space-y-2.5">
                        <ProgressRow label="Google Maps" value={42} />
                        <ProgressRow label="Yelp" value={28} />
                        <ProgressRow label="Yellow Pages" value={18} />
                        <ProgressRow label="Facebook" value={12} />
                      </div>
                    </div>
                  </BotCard>

                  <BotCard type="filter" title="FILTER BOT" icon={FilterIcon}
                    description="Filtering by website status, Google reviews, business type, and city."
                    progress={64} progressLabel="Filtering Progress"
                    stats={[{ label: 'Evaluated', value: '312' }, { label: 'Qualified', value: '128' }, { label: 'Rejected', value: '184' }]}>
                    <div>
                      <div className="text-sm font-semibold text-slate-300 mb-3">Filter Criteria</div>
                      <div className="space-y-2.5">
                        <CriteriaRow label="No Website" />
                        <CriteriaRow label="Google Reviews < 10" />
                        <CriteriaRow label="Local Business Type" />
                        <CriteriaRow label="In Target City" />
                      </div>
                    </div>
                  </BotCard>

                  <BotCard type="outreach" title="OUTREACH BOT" icon={Send}
                    description="Sending personalized messages, tracking replies, booking demos."
                    progress={58} progressLabel="Outreach Progress"
                    stats={[{ label: 'Messages Sent', value: '98' }, { label: 'Replies', value: '23' }, { label: 'Demos Booked', value: '7' }]}>
                    <div>
                      <div className="text-sm font-semibold text-slate-300 mb-3">Campaign Performance</div>
                      <div className="space-y-2.5">
                        <ProgressRow label="Open Rate" value={68} />
                        <ProgressRow label="Reply Rate" value={23} />
                        <ProgressRow label="Demo Rate" value={7} />
                        <ProgressRow label="Conversion" value={7} />
                      </div>
                    </div>
                  </BotCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="lg:col-span-2"><Pipeline /></div>
                  <ActivityFeed />
                </div>

                <div>
                  <FilterBar filters={filters} setFilters={setFilters} />
                  <ProspectTable filters={filters} selected={selectedLead} onSelect={setSelectedLead} />
                </div>
              </>
            )}

            {activeNav === 'leads' && (
              <>
                <FilterBar filters={filters} setFilters={setFilters} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className={selectedLead ? 'lg:col-span-2' : 'lg:col-span-3'}>
                    <ProspectTable filters={filters} selected={selectedLead} onSelect={setSelectedLead} />
                  </div>
                  {selectedLead && (
                    <div className="lg:col-span-1">
                      <LeadDetail lead={selectedLead} onClose={() => setSelectedLead(null)} />
                    </div>
                  )}
                </div>
              </>
            )}

            {!['dashboard', 'leads'].includes(activeNav) && (
              <div className={`${cardClass} p-8 text-center`}>
                <Bot className="w-12 h-12 mx-auto text-cyan-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Coming Soon</h3>
                <p className="text-sm text-slate-400">This section is under construction.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile lead detail modal */}
      {selectedLead && activeNav === 'dashboard' && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/70 flex items-end" onClick={() => setSelectedLead(null)}>
          <div className="w-full max-h-[85vh] overflow-y-auto rounded-t-2xl bg-slate-950 border-t border-cyan-500/20 p-1"
               onClick={e => e.stopPropagation()}>
            <LeadDetail lead={selectedLead} onClose={() => setSelectedLead(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
