import { ReactNode } from "react";

interface AuthRightSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const AuthRightSection = ({
  title,
  subtitle,
  children,
}: AuthRightSectionProps) => {
  
  return (
    <div className="flex-1 flex items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-md">
        <div className="lg:hidden mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent mb-2">
        CallFlow
      </h1>
      <p className="text-sm text-white-400">Powered By Xcentic</p>

        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-primary/5 transition-shadow">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-3">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground text-lg">{subtitle}</p>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
