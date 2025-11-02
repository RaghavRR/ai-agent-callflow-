import { Users, Phone, Clock, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Active Users', value: '12', icon: Users },
  { label: 'Calls Today', value: '4', icon: Phone },
  { label: 'Avg Duration', value: '4:32', icon: Clock },
  { label: 'Growth', value: '+12.5%', icon: TrendingUp },
];

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/40 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            {/* Subtle gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-zinc-800">
                  <Icon className="h-5 w-5 text-purple-400" />
                </div>
                <span className="text-3xl font-bold tracking-tight text-white">
                  {stat.value}
                </span>
              </div>

              <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
