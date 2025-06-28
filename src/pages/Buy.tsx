import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Bitcoin, Circle, Search, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  network: string;
  type: "cryptocurrency" | "token";
  standard?: string;
  icon: any;
  color: string;
  price: number;
  change24h: number;
}

const Buy = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<"all" | "cryptocurrency" | "token">("all");

  const assets: Asset[] = [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      network: "Bitcoin Network",
      type: "cryptocurrency",
      icon: Bitcoin,
      color: "text-orange-500",
      price: 42350.00,
      change24h: 2.5
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      network: "Ethereum Chain",
      type: "cryptocurrency",
      icon: Circle,
      color: "text-blue-600",
      price: 2650.00,
      change24h: -1.2
    },
    {
      id: "bnb",
      name: "Binance Coin",
      symbol: "BNB",
      network: "BSC Chain",
      type: "cryptocurrency",
      icon: Circle,
      color: "text-yellow-500",
      price: 315.00,
      change24h: 3.8
    },
    {
      id: "trx",
      name: "Tron",
      symbol: "TRX",
      network: "Tron Network",
      type: "cryptocurrency",
      icon: Circle,
      color: "text-red-500",
      price: 0.105,
      change24h: 5.2
    },
    {
      id: "usdt-erc20",
      name: "Tether USD",
      symbol: "USDT",
      network: "Ethereum Chain",
      type: "token",
      standard: "ERC-20",
      icon: Circle,
      color: "text-green-500",
      price: 1.00,
      change24h: 0.1
    },
    {
      id: "usdc-erc20",
      name: "USD Coin",
      symbol: "USDC",
      network: "Ethereum Chain",
      type: "token",
      standard: "ERC-20",
      icon: Circle,
      color: "text-blue-500",
      price: 1.00,
      change24h: 0.0
    },
    {
      id: "usdt-trc20",
      name: "Tether USD",
      symbol: "USDT",
      network: "Tron Network",
      type: "token",
      standard: "TRC-20",
      icon: Circle,
      color: "text-green-500",
      price: 1.00,
      change24h: 0.1
    },
    {
      id: "busd-bep20",
      name: "Binance USD",
      symbol: "BUSD",
      network: "BSC Chain",
      type: "token",
      standard: "BEP-20",
      icon: Circle,
      color: "text-yellow-600",
      price: 1.00,
      change24h: 0.0
    }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || asset.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAssetSelection = (assetId: string, checked: boolean) => {
    if (checked) {
      setSelectedAssets(prev => [...prev, assetId]);
    } else {
      setSelectedAssets(prev => prev.filter(id => id !== assetId));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2
    }).format(price);
  };

  const handleContinueToPurchase = () => {
    const selectedAssetsParam = encodeURIComponent(JSON.stringify(selectedAssets));
    navigate(`/purchase?assets=${selectedAssetsParam}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <Bitcoin className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900">Crypto Oasis</h1>
            </Link>
          </div>
          <div className="space-x-4">
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Buy Cryptocurrency</h2>
          <p className="text-lg text-gray-600">Choose from our selection of cryptocurrencies and tokens</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
                size="sm"
              >
                All Assets
              </Button>
              <Button
                variant={filterType === "cryptocurrency" ? "default" : "outline"}
                onClick={() => setFilterType("cryptocurrency")}
                size="sm"
              >
                Cryptocurrencies
              </Button>
              <Button
                variant={filterType === "token" ? "default" : "outline"}
                onClick={() => setFilterType("token")}
                size="sm"
              >
                Tokens
              </Button>
            </div>
          </div>
        </div>

        {/* Asset Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredAssets.map((asset) => {
            const IconComponent = asset.icon;
            const isSelected = selectedAssets.includes(asset.id);
            
            return (
              <Card key={asset.id} className={`hover:shadow-lg transition-all cursor-pointer ${
                isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:border-blue-200'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`h-10 w-10 ${asset.color}`} />
                      <div>
                        <CardTitle className="text-lg">{asset.name}</CardTitle>
                        <CardDescription className="text-sm">{asset.symbol}</CardDescription>
                      </div>
                    </div>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleAssetSelection(asset.id, checked as boolean)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Price</span>
                      <span className="font-semibold">{formatPrice(asset.price)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">24h Change</span>
                      <span className={`font-semibold ${
                        asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Network</span>
                      <Badge variant="outline" className="text-xs">
                        {asset.network}
                      </Badge>
                    </div>
                    {asset.standard && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Standard</span>
                        <Badge variant="secondary" className="text-xs">
                          {asset.standard}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Selection Summary */}
        {selectedAssets.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border p-4 min-w-72">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">
                  {selectedAssets.length} asset{selectedAssets.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setSelectedAssets([])}>
                  Clear
                </Button>
                <Button onClick={handleContinueToPurchase}>
                  Continue to Purchase
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No assets found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buy;
