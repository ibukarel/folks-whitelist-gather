
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Chain {
  id: string;
  name: string;
  logo: string;
}

interface ChainSelectorProps {
  onSelect: (chainId: string) => void;
  selectedChain: string | null;
}

const chains: Chain[] = [
  {
    id: "avalanche",
    name: "Avalanche",
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
  },
  {
    id: "base",
    name: "Base",
    logo: "https://cryptologos.cc/logos/base-logo.png",
  },
  {
    id: "algorand",
    name: "Algorand",
    logo: "https://cryptologos.cc/logos/algorand-algo-logo.png",
  },
  {
    id: "polygon",
    name: "Polygon",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  },
  {
    id: "bnb",
    name: "BNB Chain",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
];

const ChainSelector = ({ onSelect, selectedChain }: ChainSelectorProps) => {
  const handleSelect = (chainId: string) => {
    onSelect(chainId);
  };

  const renderFallbackLogo = (chainName: string) => {
    return (
      <div className="w-6 h-6 bg-folks-purple/20 rounded-full flex items-center justify-center text-xs font-bold">
        {chainName.charAt(0)}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {chains.map((chain) => (
        <button
          key={chain.id}
          className={cn("chain-button", {
            selected: selectedChain === chain.id,
          })}
          onClick={() => handleSelect(chain.id)}
          type="button"
        >
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2">
              {chain.logo ? (
                <img
                  src={chain.logo}
                  alt={chain.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.appendChild(
                      document.createTextNode(chain.name.charAt(0))
                    );
                  }}
                  className="w-full h-full object-contain"
                />
              ) : (
                renderFallbackLogo(chain.name)
              )}
            </div>
            <span>{chain.name}</span>
          </div>
          {selectedChain === chain.id && (
            <div className="absolute right-3">
              <Check className="w-4 h-4 text-folks-purple" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ChainSelector;
