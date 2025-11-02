import { useNavigate } from 'react-router-dom';
import {
  Phone,
  Users,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  RefreshCcw,
} from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { StatsGrid } from '@/components/StatsGrid';
import { Button } from '@/components/ui/button';
import dashboardHero from '@/assets/dashboard-hero.png';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <DashboardHeader />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 space-y-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Manage Your{' '}
                <span className="bg-gradient-to-r from-purple-400 via-purple-400 to-purple-400 bg-clip-text text-transparent">
                  Calls Efficiently
                </span>{' '}
                & Seamlessly
              </h1>

              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Initiate single or bulk calls, monitor call activity, and manage
                all your communication from one secure dashboard.
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 rounded-full border border-zinc-800">
                <ShieldCheck className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-zinc-300">
                  Secure & Reliable
                </span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 rounded-full border border-zinc-800">
                <PhoneCall className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-zinc-300">
                  Bulk Calling Automation
                </span>
              </div>
            </div>
            <div className="pt-2">
              <Button
                onClick={() => navigate('/prompts')}
                size="lg"
                className="h-14 px-8 text-base font-semibold bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all group"
              >
                <Phone className="mr-2 h-5 w-5" />
                Start Calling Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl rounded-full"></div>
            <img
              src={dashboardHero}
              alt="Call Management Dashboard"
              className="relative w-full md:w-[90%] lg:w-full max-w-[700px] rounded-lg h-auto object-contain object-center"
            />
          </div>
        </div>

        <StatsGrid />


        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold">Why Choose CallFlow?</h3>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
              Smart, secure, and scalable calling platform for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Phone,
                title: 'One-Click Calling',
                desc: 'Initiate instant calls directly from your dashboard with just one click. No manual dialing required.',
              },
              {
                icon: Users,
                title: 'Bulk Calling Automation',
                desc: 'Upload Excel files to trigger multiple calls automatically — perfect for campaigns and surveys.',
              },
              {
                icon: RefreshCcw,
                title: 'Smart Follow-ups',
                desc: 'Automatically send reminders and follow-up calls to improve response rates and customer satisfaction.',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="group p-8 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-purple-500/50 transition-all text-center md:text-left"
                >
                  <div className="w-14 h-14 mx-auto md:mx-0 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-all">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                  <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
