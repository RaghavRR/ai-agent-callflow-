import { Users, Phone, Clock, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Active Users', value: '12', icon: Users, color: 'text-primary' },
  { label: 'Calls Today', value: '4', icon: Phone, color: 'text-secondary' },
  { label: 'Avg Duration', value: '4:32', icon: Clock, color: 'text-primary' },
  { label: 'Growth', value: '+12.5%', icon: TrendingUp, color: 'text-secondary' },
];

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="group relative bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
