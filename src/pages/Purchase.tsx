
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bitcoin, ArrowLeft, CreditCard, Wallet } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

interface SelectedAsset {
  id: string;
  name: string;
  symbol: string;
  network: string;
  price: number;
  quantity: number;
  total: number;
}

const Purchase = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Mock data - in real app, this would come from the previous page or API
  useEffect(() => {
    const assetsParam = searchParams.get('assets');
    if (assetsParam) {
      try {
        const assetIds = JSON.parse(assetsParam);
        // Mock selected assets data
        const mockAssets: SelectedAsset[] = assetIds.map((id: string) => ({
          id,
          name: getAssetName(id),
          symbol: getAssetSymbol(id),
          network: getAssetNetwork(id),
          price: getAssetPrice(id),
          quantity: 1,
          total: getAssetPrice(id)
        }));
        setSelectedAssets(mockAssets);
        setTotalAmount(mockAssets.reduce((sum, asset) => sum + asset.total, 0));
      } catch (error) {
        console.error('Error parsing assets:', error);
        navigate('/buy');
      }
    } else {
      navigate('/buy');
    }
  }, [searchParams, navigate]);

  const getAssetName = (id: string): string => {
    const names: { [key: string]: string } = {
      'btc': 'Bitcoin',
      'eth': 'Ethereum',
      'bnb': 'Binance Coin',
      'trx': 'Tron',
      'usdt-erc20': 'Tether USD',
      'usdc-erc20': 'USD Coin',
      'usdt-trc20': 'Tether USD',
      'busd-bep20': 'Binance USD'
    };
    return names[id] || 'Unknown Asset';
  };

  const getAssetSymbol = (id: string): string => {
    const symbols: { [key: string]: string } = {
      'btc': 'BTC',
      'eth': 'ETH',
      'bnb': 'BNB',
      'trx': 'TRX',
      'usdt-erc20': 'USDT',
      'usdc-erc20': 'USDC',
      'usdt-trc20': 'USDT',
      'busd-bep20': 'BUSD'
    };
    return symbols[id] || 'UNK';
  };

  const getAssetNetwork = (id: string): string => {
    const networks: { [key: string]: string } = {
      'btc': 'Bitcoin Network',
      'eth': 'Ethereum Chain',
      'bnb': 'BSC Chain',
      'trx': 'Tron Network',
      'usdt-erc20': 'Ethereum Chain',
      'usdc-erc20': 'Ethereum Chain',
      'usdt-trc20': 'Tron Network',
      'busd-bep20': 'BSC Chain'
    };
    return networks[id] || 'Unknown Network';
  };

  const getAssetPrice = (id: string): number => {
    const prices: { [key: string]: number } = {
      'btc': 42350.00,
      'eth': 2650.00,
      'bnb': 315.00,
      'trx': 0.105,
      'usdt-erc20': 1.00,
      'usdc-erc20': 1.00,
      'usdt-trc20': 1.00,
      'busd-bep20': 1.00
    };
    return prices[id] || 0;
  };

  const updateQuantity = (assetId: string, newQuantity: number) => {
    if (newQuantity < 0.001) return;
    
    setSelectedAssets(prev => 
      prev.map(asset => 
        asset.id === assetId 
          ? { ...asset, quantity: newQuantity, total: asset.price * newQuantity }
          : asset
      )
    );
    
    const updatedAssets = selectedAssets.map(asset => 
      asset.id === assetId 
        ? { ...asset, quantity: newQuantity, total: asset.price * newQuantity }
        : asset
    );
    setTotalAmount(updatedAssets.reduce((sum, asset) => sum + asset.total, 0));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2
    }).format(price);
  };

  const handleProceedToPayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    // In a real app, this would integrate with payment processing
    console.log('Proceeding to payment with:', {
      assets: selectedAssets,
      paymentMethod,
      totalAmount
    });
    
    alert(`Payment processing would begin here.\nTotal: ${formatPrice(totalAmount)}\nMethod: ${paymentMethod}`);
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
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/buy">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Asset Selection</span>
            </Button>
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Purchase Summary</h2>
          <p className="text-lg text-gray-600">Review your selected assets and payment details</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Selected Assets */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5" />
                  <span>Selected Assets</span>
                </CardTitle>
                <CardDescription>
                  Review and adjust quantities for your purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedAssets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div>
                          <h4 className="font-semibold">{asset.name}</h4>
                          <p className="text-sm text-gray-500">{asset.symbol} • {asset.network}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div>
                          <Label htmlFor={`quantity-${asset.id}`} className="text-sm">Quantity</Label>
                          <Input
                            id={`quantity-${asset.id}`}
                            type="number"
                            min="0.001"
                            step="0.001"
                            value={asset.quantity}
                            onChange={(e) => updateQuantity(asset.id, parseFloat(e.target.value) || 0)}
                            className="w-24 mt-1"
                          />
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="font-semibold">{formatPrice(asset.price)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="font-semibold text-blue-600">{formatPrice(asset.total)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Payment Method</Label>
                  <div className="space-y-2">
                    {['Cryptocurrency', 'CashApp', 'Venmo', 'Bank Transfer'].map((method) => (
                      <div key={method} className="flex items-center">
                        <input
                          type="radio"
                          id={method}
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-2"
                        />
                        <Label htmlFor={method} className="cursor-pointer">{method}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Processing Fee</span>
                    <span>{formatPrice(totalAmount * 0.02)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">{formatPrice(totalAmount * 1.02)}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleProceedToPayment}
                  className="w-full"
                  size="lg"
                  disabled={!paymentMethod || selectedAssets.length === 0}
                >
                  Proceed to Payment
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Secure payment processing. Your information is protected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
