import { useAuth } from '@/contexts/AuthContext';
import { ProfileMenu } from './ProfileMenu';

export const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CallFlow
          </h1>
          <p className="text-xs text-muted-foreground">Powered By Xcentic</p>
        </div>
        <ProfileMenu user={user} />
      </div>
    </header>
  );
};
