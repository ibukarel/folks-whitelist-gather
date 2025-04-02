
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TwitterLoginButtonProps {
  onSuccess: (userData: { id: string; name: string; username: string }) => void;
}

const TwitterLoginButton = ({ onSuccess }: TwitterLoginButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTwitterLogin = () => {
    setIsLoading(true);
    
    // This is a mock implementation - in a real app, you would integrate with Twitter OAuth
    setTimeout(() => {
      // Simulate successful login
      const mockUserData = {
        id: "123456789",
        name: "Demo User",
        username: "demouser",
      };
      
      onSuccess(mockUserData);
      setIsLoading(false);
      
      toast({
        title: "Logged in successfully!",
        description: `Welcome, @${mockUserData.username}`,
      });
    }, 1500);
  };

  return (
    <Button
      onClick={handleTwitterLogin}
      disabled={isLoading}
      className="w-full md:w-auto bg-[#1DA1F2] hover:bg-[#1a94e1] text-white"
    >
      <Twitter className="mr-2 h-4 w-4" />
      {isLoading ? "Connecting..." : "Sign in with X (Twitter)"}
    </Button>
  );
};

export default TwitterLoginButton;
