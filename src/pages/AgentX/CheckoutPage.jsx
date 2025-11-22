import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  CreditCard,
  Smartphone,
  Building2,
  Calendar,
  CheckCircle,
  Shield,
  Lock,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const [agent, setAgent] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const [mobileWallet, setMobileWallet] = useState({
    provider: 'vodafone',
    phoneNumber: ''
  });

  const [fawryData, setFawryData] = useState({
    phoneNumber: '',
    email: ''
  });

  const [installmentData, setInstallmentData] = useState({
    provider: 'valu',
    phoneNumber: '',
    nationalId: '',
    months: '6'
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit / Debit Card',
      description: 'Pay with Visa, Mastercard, or Meeza',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'blue'
    },
    {
      id: 'mobile-wallet',
      name: 'Mobile Wallets',
      description: 'Vodafone Cash, Orange Cash, Etisalat Cash',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'green'
    },
    {
      id: 'fawry',
      name: 'Fawry',
      description: 'Pay at any Fawry outlet or online',
      icon: <Building2 className="w-6 h-6" />,
      color: 'orange'
    },
    {
      id: 'installments',
      name: 'Installments',
      description: 'ValU, Souhoola, Shahry, Sympl',
      icon: <Calendar className="w-6 h-6" />,
      color: 'purple'
    }
  ];

  const mobileWalletProviders = [
    { id: 'vodafone', name: 'Vodafone Cash', logo: '📱' },
    { id: 'orange', name: 'Orange Cash', logo: '🍊' },
    { id: 'etisalat', name: 'Etisalat Cash', logo: '📞' },
    { id: 'we', name: 'WE Pay', logo: '💳' }
  ];

  const installmentProviders = [
    { id: 'valu', name: 'ValU', months: [3, 6, 9, 12, 18, 24] },
    { id: 'souhoola', name: 'Souhoola', months: [3, 6, 9, 12] },
    { id: 'shahry', name: 'Shahry', months: [3, 6, 9, 12] },
    { id: 'sympl', name: 'Sympl', months: [3, 6] }
  ];

  useEffect(() => {
    // Mock agent data
    const mockAgent = {
      id: agentId,
      name: 'Customer Support Pro',
      icon: '💬',
      pricing: 99,
      pricingLabel: '$99/mo',
      owner: 'Aasim AI'
    };
    setAgent(mockAgent);

    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [agentId, isAuthenticated]);

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;

    if (field === 'number') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Max 16 digits + 3 spaces
    } else if (field === 'expiry') {
      // Format expiry as MM/YY
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }

    setCardData({ ...cardData, [field]: formattedValue });
  };

  const calculateInstallment = () => {
    if (!agent) return 0;
    const months = parseInt(installmentData.months);
    return (agent.pricing / months).toFixed(2);
  };

  const handlePayment = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Basic validation
    if (paymentMethod === 'card') {
      if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
        toast.error('Please fill in all card details');
        return;
      }
    } else if (paymentMethod === 'mobile-wallet') {
      if (!mobileWallet.phoneNumber) {
        toast.error('Please enter your phone number');
        return;
      }
    } else if (paymentMethod === 'fawry') {
      if (!fawryData.phoneNumber || !fawryData.email) {
        toast.error('Please enter your phone number and email');
        return;
      }
    } else if (paymentMethod === 'installments') {
      if (!installmentData.phoneNumber || !installmentData.nationalId) {
        toast.error('Please fill in all required fields');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Payment successful! Your agent is being deployed...');
      navigate('/agents/my-agents');
    }, 2000);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={cardData.number}
                onChange={(e) => handleCardInputChange('number', e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardData.name}
                onChange={(e) => handleCardInputChange('name', e.target.value)}
                placeholder="JOHN DOE"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardData.cvv}
                  onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary-600 bg-blue-50 p-3 rounded-lg">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Your payment is secured with 256-bit SSL encryption</span>
            </div>
          </div>
        );

      case 'mobile-wallet':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Select Wallet Provider
              </label>
              <div className="grid grid-cols-2 gap-3">
                {mobileWalletProviders.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setMobileWallet({ ...mobileWallet, provider: provider.id })}
                    className={`p-4 border-2 rounded-xl flex items-center gap-3 transition-all ${
                      mobileWallet.provider === provider.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-green-300'
                    }`}
                  >
                    <span className="text-2xl">{provider.logo}</span>
                    <span className="font-semibold text-secondary-900">{provider.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={mobileWallet.phoneNumber}
                onChange={(e) => setMobileWallet({ ...mobileWallet, phoneNumber: e.target.value })}
                placeholder="01X XXXX XXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-secondary-700">
                You'll receive a payment request on your mobile wallet. Approve it to complete the transaction.
              </p>
            </div>
          </div>
        );

      case 'fawry':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={fawryData.phoneNumber}
                onChange={(e) => setFawryData({ ...fawryData, phoneNumber: e.target.value })}
                placeholder="01X XXXX XXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={fawryData.email}
                onChange={(e) => setFawryData({ ...fawryData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="bg-orange-50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold text-secondary-900">Payment Instructions:</p>
              <ol className="text-sm text-secondary-700 space-y-1 list-decimal list-inside">
                <li>You'll receive a Fawry reference code via SMS and email</li>
                <li>Visit any Fawry outlet or use the Fawry app</li>
                <li>Enter the reference code and complete payment</li>
                <li>Your agent will be activated once payment is confirmed</li>
              </ol>
            </div>
          </div>
        );

      case 'installments':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Select Provider
              </label>
              <div className="grid grid-cols-2 gap-3">
                {installmentProviders.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setInstallmentData({ ...installmentData, provider: provider.id })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      installmentData.provider === provider.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-300'
                    }`}
                  >
                    <span className="font-semibold text-secondary-900">{provider.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Number of Months
              </label>
              <select
                value={installmentData.months}
                onChange={(e) => setInstallmentData({ ...installmentData, months: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {installmentProviders
                  .find((p) => p.id === installmentData.provider)
                  ?.months.map((month) => (
                    <option key={month} value={month}>
                      {month} months - ${calculateInstallment()}/month
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={installmentData.phoneNumber}
                onChange={(e) => setInstallmentData({ ...installmentData, phoneNumber: e.target.value })}
                placeholder="01X XXXX XXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                National ID
              </label>
              <input
                type="text"
                value={installmentData.nationalId}
                onChange={(e) => setInstallmentData({ ...installmentData, nationalId: e.target.value })}
                placeholder="Enter your 14-digit National ID"
                maxLength={14}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-secondary-900 mb-2">Installment Summary:</p>
              <div className="text-sm text-secondary-700 space-y-1">
                <div className="flex justify-between">
                  <span>Monthly Payment:</span>
                  <span className="font-semibold">${calculateInstallment()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">{installmentData.months} months</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-purple-200">
                  <span>Total Amount:</span>
                  <span className="font-semibold">${agent?.pricing}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-secondary-900">Checkout</h1>
                <p className="text-sm text-secondary-600">Complete your purchase</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary-600">
              <Lock className="w-4 h-4 text-green-600" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Modal Overlay */}
      {showAuthModal && !isAuthenticated && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Sign in Required</h2>
              <p className="text-secondary-600">
                You need to sign in or create an account to continue with your purchase.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/login', { state: { returnUrl: window.location.pathname } })}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register', { state: { returnUrl: window.location.pathname } })}
                className="w-full py-3 border-2 border-gray-300 rounded-xl font-semibold text-secondary-700 hover:bg-gray-50 transition-colors"
              >
                Create Account
              </button>
              <button
                onClick={() => navigate(-1)}
                className="w-full py-2 text-secondary-600 hover:text-secondary-900"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Select Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 border-2 rounded-xl flex items-start gap-4 transition-all text-left ${
                      paymentMethod === method.id
                        ? `border-${method.color}-500 bg-${method.color}-50`
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className={`text-${method.color}-600`}>{method.icon}</div>
                    <div>
                      <div className="font-semibold text-secondary-900">{method.name}</div>
                      <div className="text-sm text-secondary-600">{method.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Payment Details</h2>
              {renderPaymentForm()}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Order Summary</h2>

              {/* Agent Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                  {agent.icon}
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900">{agent.name}</h3>
                  <p className="text-sm text-secondary-600">by {agent.owner}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-secondary-700">
                  <span>Subscription</span>
                  <span className="font-semibold">{agent.pricingLabel}</span>
                </div>
                <div className="flex justify-between text-secondary-700">
                  <span>Billing Period</span>
                  <span className="font-semibold">Monthly</span>
                </div>
                {paymentMethod === 'installments' && (
                  <div className="flex justify-between text-secondary-700">
                    <span>Payment Plan</span>
                    <span className="font-semibold">{installmentData.months} months</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-secondary-900">
                      {paymentMethod === 'installments' ? 'First Payment' : 'Total'}
                    </span>
                    <span className="font-bold text-secondary-900">
                      {paymentMethod === 'installments' ? `$${calculateInstallment()}` : agent.pricingLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">Secure Payment</span>
                </div>
                <p className="text-sm text-green-600">
                  Your payment information is encrypted and secure. We never store your full card details.
                </p>
              </div>

              {/* Complete Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing || !isAuthenticated}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Complete Payment
                  </>
                )}
              </button>

              <p className="text-xs text-center text-secondary-600 mt-4">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
