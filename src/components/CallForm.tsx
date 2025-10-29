import { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Spinner } from './Spinner';

export const CallForm = () => {
  const [phone_number, setphone_number] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const validatePhone = (phone_number: string): boolean => {
    const digitsOnly = phone_number.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phone_number)) {
      toast.error('Please enter a valid phone number (minimum 10 digits)');
      return;
    }

    setIsLoading(true);

    try {
const response = await fetch("/api/call/singleCall", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
  body: JSON.stringify({ phone_number: `+91${phone_number}` }),
});




      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Call initiated successfully!');
        console.log('Call initiated successfully:', data); 
        setphone_number('');
      } else {
        toast.error(data.error || 'Failed to initiate call. Please try again.');
        console.error('API error response:', data); 
      }
    } catch (error) {
      toast.error('Server error — try again');
      console.error('Call API error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border border-white/[0.08] rounded-2xl bg-background/40 shadow-sm space-y-6 max-w-md mx-auto text-center"
    >
      {/* 🌈 Gradient Heading */}
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
        Place a Call
      </h2>

      <div className="text-left">
        <Label htmlFor="phone" className="text-base font-semibold mb-3 block">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            value={phone_number}
            onChange={(e) => setphone_number(e.target.value)}
            className="pl-12 h-14 bg-background/50 border-white/[0.08] focus:border-primary/50 focus:ring-2 focus:ring-primary/30 text-base rounded-xl"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 rounded-xl"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Connecting...
          </>
        ) : (
          <>
            <Phone className="mr-2 h-5 w-5" />
            Start Call
          </>
        )}
      </Button>
    </form>
  );
};
