
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bitcoin, Coins, CreditCard, Banknote, Shield, Zap, Circle } from "lucide-react";

const Index = () => {
  const supportedCryptos = [
    { 
      name: "Bitcoin", 
      symbol: "BTC", 
      network: "Bitcoin Network",
      icon: Bitcoin,
      color: "text-orange-500"
    },
    { 
      name: "Ethereum", 
      symbol: "ETH", 
      network: "Ethereum Chain",
      icon: Circle,
      color: "text-blue-600"
    },
    { 
      name: "Binance Coin", 
      symbol: "BNB", 
      network: "BSC Chain",
      icon: Circle,
      color: "text-yellow-500"
    },
    { 
      name: "Tron", 
      symbol: "TRX", 
      network: "Tron Network",
      icon: Circle,
      color: "text-red-500"
    },
  ];

  const tokenStandards = [
    { name: "ERC-20", description: "Ethereum tokens", color: "text-blue-600" },
    { name: "TRC-20", description: "Tron tokens", color: "text-red-500" },
    { name: "BEP-20", description: "BSC tokens", color: "text-yellow-500" }
  ];
  
  const paymentMethods = [
    { name: "Cryptocurrency", icon: Bitcoin, description: "Direct crypto payments" },
    { name: "CashApp", icon: CreditCard, description: "Quick mobile payments" },
    { name: "Venmo", icon: CreditCard, description: "Social payments" },
    { name: "Bank Transfer", icon: Banknote, description: "ACH & Wire transfers" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Multi-signature wallets and cold storage protection"
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Quick confirmation and delivery to your wallet"
    },
    {
      icon: Coins,
      title: "Multiple Tokens",
      description: "Support for major cryptocurrencies and token standards"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bitcoin className="h-8 w-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-900">Crypto Oasis</h1>
          </div>
          <div className="space-x-4">
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Buy Crypto with <span className="text-blue-600">Confidence</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Purchase Bitcoin, Ethereum, BNB, Tron, and popular tokens using crypto or traditional payment methods like CashApp, Venmo, and bank transfers.
        </p>
        <div className="space-x-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Buying Crypto
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      {/* Supported Cryptocurrencies */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Supported Cryptocurrencies
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {supportedCryptos.map((crypto) => {
            const IconComponent = crypto.icon;
            return (
              <Card key={crypto.symbol} className="text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-3">
                    <IconComponent className={`h-12 w-12 ${crypto.color}`} />
                  </div>
                  <CardTitle className="text-lg">{crypto.name}</CardTitle>
                  <CardDescription className="text-sm">{crypto.network}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="text-lg font-semibold px-3 py-1">
                    {crypto.symbol}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-900 mb-6">Supported Token Standards</h4>
          <div className="flex justify-center flex-wrap gap-4">
            {tokenStandards.map((standard) => (
              <div key={standard.name} className="flex flex-col items-center">
                <Badge variant="outline" className={`text-base font-semibold px-4 py-2 ${standard.color} border-2`}>
                  {standard.name}
                </Badge>
                <span className="text-sm text-gray-500 mt-1">{standard.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Multiple Payment Options
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <Card key={method.name} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <IconComponent className="h-12 w-12 mx-auto text-blue-600 mb-2" />
                    <CardTitle className="text-lg">{method.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{method.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Crypto Oasis?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.title} className="text-center">
                <IconComponent className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Crypto Journey?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Crypto Oasis for their cryptocurrency purchases. 
            Secure, fast, and reliable.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            Create Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bitcoin className="h-6 w-6 text-orange-500" />
                <span className="text-lg font-semibold">Crypto Oasis</span>
              </div>
              <p className="text-gray-400">
                Your trusted platform for cryptocurrency purchases.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Products</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Buy Bitcoin</li>
                <li>Buy Ethereum</li>
                <li>Buy BNB</li>
                <li>Buy Tron</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Security</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Terms of Service</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Crypto Oasis Payments. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
