
import { Card, CardContent } from "@/components/ui/card";
import WhitelistForm from "@/components/WhitelistForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-folks-gradient py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <div className="mb-6">
            <div className="mx-auto w-24 h-24 bg-folks-purple/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-folks-purple animate-pulse-slow">F</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-folks-purple to-folks-cyan">
              Folks NFT
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-folks-light/80 max-w-2xl mx-auto">
            Join our exclusive whitelist for the upcoming Folks NFT collection.
            Connect with X, choose your preferred chain, and secure your spot!
          </p>
        </header>

        <Card className="border border-folks-purple/20 bg-black/30 backdrop-blur-sm shadow-lg shadow-folks-purple/5">
          <CardContent className="p-6 sm:p-8">
            <WhitelistForm />
          </CardContent>
        </Card>

        <footer className="mt-10 text-center text-sm text-folks-light/50">
          <p>© 2023 Folks NFT. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
