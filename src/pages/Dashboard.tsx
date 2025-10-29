import { useNavigate } from 'react-router-dom';
import {
  Phone,
  Users,
  Database,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  RefreshCcw,
} from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { InfoCard } from '@/components/InfoCard';
import { StatsGrid } from '@/components/StatsGrid';
import { Button } from '@/components/ui/button';
import dashboardHero from '@/assets/dashboard-hero.png';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12">
        {/* ================= HERO SECTION ================= */}
        <div className="grid lg:grid-cols-2 items-center rounded-3xl overflow-hidden">
          {/* Left Section */}
          <div className="p-8 md:p-12 lg:p-16 space-y-6">
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Manage Your{' '}
              <span className="bg-gradient-to-r from-primary via-emerald-500 to-secondary bg-clip-text text-transparent">
                Calls Efficiently
              </span>{' '}
              & Seamlessly
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Initiate single or bulk calls, monitor call activity, and manage
              all your communication from one secure dashboard.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border shadow-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Secure & Reliable</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border shadow-sm">
                <PhoneCall className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Bulk Calling Automation</span>

              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => navigate('/call')}
                size="lg"
                className="h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all group"
              >
                <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Start Calling Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Section (Image) */}
          <div className="relative flex justify-center items-center h-full">
            <img
              src={dashboardHero}
              alt="Call Management Dashboard"
              className="
                w-full
                md:w-[90%]
                lg:w-full
                max-w-[700px]
                rounded-lg
                h-auto
                object-contain
                object-center
                transition-all
                duration-500
                ease-in-out
                sm:scale-90
                md:scale-100
              "
            />
          </div>
        </div>

        {/* ================= STATS SECTION ================= */}
        <StatsGrid />

        {/* ================= ABOUT SECTION ================= */}
        <section className="text-center">
          <div className="mb-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-3">
              Why Choose CallFlow?
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground">
              Smart, secure, and scalable calling platform for your business.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <InfoCard
              title="One-Click Calling"
              description="Initiate instant calls directly from your dashboard with just one click. No manual dialing required."
              icon={<Phone className="h-6 w-6 text-primary mx-auto" />}
            />
            <InfoCard
              title="Bulk Calling Automation"
              description="Upload Excel files to trigger multiple calls automatically — perfect for campaigns and surveys."
              icon={<Users className="h-6 w-6 text-secondary mx-auto" />}
            />
            <InfoCard
              title="Smart Follow-ups"
              description="Automatically send reminders and follow-up calls to improve response rates and customer satisfaction."
              icon={<RefreshCcw className="h-6 w-6 text-blue-500 mx-auto" />}
            />

          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
