import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

const AuthButton: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <User className="h-4 w-4" />
        <span>{user.email}</span>
      </div>
      <Button variant="outline" size="sm" onClick={handleSignOut}>
        <LogOut className="h-4 w-4 mr-1" />
        Sign Out
      </Button>
    </div>
  );
};

export default AuthButton;