import { Link } from 'react-router-dom';
import {
  Zap,
  DollarSign,
  Target,
  Brain,
  Globe,
  Eye,
  Clock,
  TrendingUp,
  Cloud,
  Shield,
  BarChart3,
  Building2,
  Scale,
  Stethoscope,
  Briefcase,
  Home,
  Users,
  GraduationCap,
  Factory,
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react';

/**
 * WhyUsePrecisionAgents - Comprehensive section showcasing the value proposition
 * of Precision AI Agents with data-driven comparisons and capabilities
 */
const WhyUsePrecisionAgents = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto">

        {/* ========== HEADER ========== */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Why Use <span className="gradient-text">Precision AI Agents</span>?
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-4">
            Superhuman capabilities. Human oversight. Enterprise reliability.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* ========== PRIMARY VALUE PROPOSITIONS ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">

          {/* Card 1: 500x Faster */}
          <ValueCard
            icon={<Zap className="w-8 h-8 text-blue-600" />}
            iconBgColor="bg-blue-100"
            title="⚡ 500x Faster Processing"
            metric="10,000+ tasks per hour"
            metricColor="text-primary-600"
            description="Process in minutes what takes humans weeks. Available 24/7/365 with zero downtime or breaks."
          />

          {/* Card 2: 97% Cost Reduction */}
          <ValueCard
            icon={<DollarSign className="w-8 h-8 text-green-600" />}
            iconBgColor="bg-green-100"
            title="💰 97% Cost Reduction"
            metric="$7K vs $318K annually"
            metricColor="text-green-600"
            description="Eliminate salaries, benefits, office space, and equipment. Pay only for what you use, scale instantly."
            featured
          />

          {/* Card 3: Zero Bias */}
          <ValueCard
            icon={<Target className="w-8 h-8 text-purple-600" />}
            iconBgColor="bg-purple-100"
            title="🎯 Zero Bias, Perfect Consistency"
            metric="0% human error"
            metricColor="text-purple-600"
            description="No bad days, no fatigue, no unconscious bias. Same high quality from task #1 to task #1,000,000."
          />
        </div>

        {/* ========== DETAILED CAPABILITIES GRID ========== */}
        <div className="mb-24">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 font-heading">
            Superhuman Capabilities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <CapabilityCard
              icon={<Brain className="w-6 h-6" />}
              iconColor="text-blue-600"
              iconBg="bg-blue-100"
              title="Superhuman Scale"
              features={[
                "Process millions of records humans couldn't handle",
                "Analyze 10,000+ documents in minutes",
                "Handle massive datasets with perfect accuracy",
                "Never forget context or historical data"
              ]}
            />

            <CapabilityCard
              icon={<Globe className="w-6 h-6" />}
              iconColor="text-green-600"
              iconBg="bg-green-100"
              title="Master of All Languages"
              features={[
                "Fluent in 100+ languages simultaneously",
                "Knows every programming language (Python, Java, C++, JavaScript, Go, Rust, etc.)",
                "Understand technical jargon across all industries",
                "Process multilingual data without translation delays"
              ]}
            />

            <CapabilityCard
              icon={<Eye className="w-6 h-6" />}
              iconColor="text-purple-600"
              iconBg="bg-purple-100"
              title="Pixel-Perfect Vision Analysis"
              features={[
                "Examine every pixel, every inch, every detail",
                "Detect micro-defects invisible to human eye",
                "OCR with 99%+ accuracy on any document",
                "Real-time object detection and facial recognition"
              ]}
            />

            <CapabilityCard
              icon={<Clock className="w-6 h-6" />}
              iconColor="text-orange-600"
              iconBg="bg-orange-100"
              title="24/7 Availability"
              features={[
                "No sick days, vacation, or time off",
                "Work nights, weekends, holidays at same cost",
                "Instant response to triggers and events",
                "Global operations across all time zones"
              ]}
            />

            <CapabilityCard
              icon={<TrendingUp className="w-6 h-6" />}
              iconColor="text-indigo-600"
              iconBg="bg-indigo-100"
              title="Instant Scalability"
              features={[
                "Go from 10 to 10,000 tasks without hiring",
                "Handle demand spikes without stress",
                "Deploy to 50 countries simultaneously",
                "Scale up in seconds, down just as fast"
              ]}
            />

            <CapabilityCard
              icon={<Cloud className="w-6 h-6" />}
              iconColor="text-cyan-600"
              iconBg="bg-cyan-100"
              title="Zero Physical Footprint"
              features={[
                "No office space, desks, or equipment needed",
                "100% cloud-based, work from anywhere",
                "No parking, commute, or infrastructure costs",
                "Environmentally friendly with zero carbon footprint"
              ]}
            />

            <CapabilityCard
              icon={<Shield className="w-6 h-6" />}
              iconColor="text-red-600"
              iconBg="bg-red-100"
              title="Human Oversight Control"
              features={[
                "Choose from 5 HITL modes (fully automated to fully manual)",
                "Transparent decisions with explainable AI",
                "Full audit trails for compliance",
                "Override capability at any time"
              ]}
            />

            <CapabilityCard
              icon={<BarChart3 className="w-6 h-6" />}
              iconColor="text-pink-600"
              iconBg="bg-pink-100"
              title="Continuous Improvement"
              features={[
                "Performance improves with every execution",
                "Deploy updates to all agents instantly",
                "Never stops learning from data",
                "Knowledge never walks out the door"
              ]}
            />
          </div>
        </div>

        {/* ========== COMPARISON TABLE ========== */}
        <div className="mb-24">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 font-heading">
            Human vs Precision AI Agent
          </h3>

          <div className="glass-card rounded-3xl p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary-500 to-purple-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold">Factor</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Human Worker</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Precision AI Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <ComparisonRow
                    factor="Availability"
                    human="8 hrs/day, 5 days/week"
                    ai="24/7/365"
                    aiAdvantage
                  />
                  <ComparisonRow
                    factor="Cost"
                    human="$50K-$150K/year + benefits"
                    ai="Fraction of the cost"
                    aiAdvantage
                  />
                  <ComparisonRow
                    factor="Onboarding"
                    human="Weeks to months"
                    ai="Minutes"
                    aiAdvantage
                  />
                  <ComparisonRow
                    factor="Consistency"
                    human="Varies by mood, energy"
                    ai="Perfect every time"
                    aiAdvantage
                  />
                  <ComparisonRow
                    factor="Scalability"
                    human="Linear (1 person = 1 capacity)"
                    ai="Exponential (instant)"
                    aiAdvantage
                  />
                  <ComparisonRow
                    factor="Bias"
                    human="Unconscious bias exists"
                    ai="Zero bias"
                    aiAdvantage
                  />
                  <ComparisonRow
                    factor="Processing Speed"
                    human="10-20 tasks/hour"
                    ai="10,000+ tasks/hour"
                    aiAdvantage
                  />
                  <ComparisonRow
                    factor="Error Rate"
                    human="2-5% (human error)"
                    ai="<0.1%"
                    aiAdvantage
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ========== ROI CALCULATOR PREVIEW ========== */}
        <div className="mb-24">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 font-heading">
            Real Cost Savings Example
          </h3>

          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">

              {/* Traditional Approach */}
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-2" />
                  Traditional Approach
                </h4>
                <div className="space-y-3">
                  <InfoRow label="3 Full-Time Employees" value="" />
                  <InfoRow label="Annual Cost" value="$318,000/year" valueColor="text-red-600" />
                  <InfoRow label="Capacity" value="~6,000 tasks/year" />
                  <InfoRow label="Cost per Task" value="$53" valueColor="text-red-600 font-bold" />
                </div>
              </div>

              {/* Precision AI Approach */}
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
                  Precision AI Agent Approach
                </h4>
                <div className="space-y-3">
                  <InfoRow label="Pro Plan Subscription" value="" />
                  <InfoRow label="Annual Cost" value="$7,388/year" valueColor="text-green-600" />
                  <InfoRow label="Capacity" value="~100,000 tasks/year" />
                  <InfoRow label="Cost per Task" value="$0.07" valueColor="text-green-600 font-bold" />
                </div>
              </div>
            </div>

            {/* Savings Highlight */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
                <div>
                  <p className="text-3xl font-bold text-green-700 mb-1">💰 Save $310,612 annually</p>
                  <p className="text-green-700">(97.7% reduction)</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-700 mb-1">📈 16.7x more capacity</p>
                  <p className="text-green-700">Handle exponentially more work</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 text-center">
              <Link
                to="/pricing"
                className="inline-flex items-center glass-btn-primary rounded-full px-10 py-4 text-lg glow"
              >
                Calculate Your ROI
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* ========== INDUSTRY-SPECIFIC USE CASES ========== */}
        <div className="mb-24">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 font-heading">
            Trusted Across Industries
          </h3>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            From healthcare to finance, Precision AI Agents deliver results where it matters most
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <IndustryCard
              icon={<Stethoscope className="w-8 h-8" />}
              title="Healthcare"
              useCases={[
                "Medical record processing",
                "Claims validation",
                "Patient triage"
              ]}
              color="blue"
            />

            <IndustryCard
              icon={<Scale className="w-8 h-8" />}
              title="Legal"
              useCases={[
                "Document discovery",
                "Contract review",
                "Compliance monitoring"
              ]}
              color="purple"
            />

            <IndustryCard
              icon={<Building2 className="w-8 h-8" />}
              title="Finance"
              useCases={[
                "Fraud detection",
                "Credit analysis",
                "Regulatory reporting"
              ]}
              color="green"
            />

            <IndustryCard
              icon={<Users className="w-8 h-8" />}
              title="HR"
              useCases={[
                "Resume screening",
                "Interview scheduling",
                "Background checks"
              ]}
              color="orange"
            />

            <IndustryCard
              icon={<Home className="w-8 h-8" />}
              title="Real Estate"
              useCases={[
                "Property valuation",
                "Lease processing",
                "Market analysis"
              ]}
              color="indigo"
            />

            <IndustryCard
              icon={<Briefcase className="w-8 h-8" />}
              title="Customer Service"
              useCases={[
                "Ticket triage",
                "Multi-language support",
                "Quality monitoring"
              ]}
              color="pink"
            />

            <IndustryCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="Education"
              useCases={[
                "Essay grading",
                "Plagiarism detection",
                "Personalized feedback"
              ]}
              color="cyan"
            />

            <IndustryCard
              icon={<Factory className="w-8 h-8" />}
              title="Manufacturing"
              useCases={[
                "Quality control",
                "Defect detection",
                "Inventory management"
              ]}
              color="red"
            />
          </div>
        </div>

        {/* ========== CALL-TO-ACTION SECTION ========== */}
        <div className="glass-card rounded-3xl p-12 text-center bg-gradient-to-br from-primary-50 via-purple-50 to-blue-50">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            Ready to 10x Your Productivity?
          </h3>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Build your first Precision AI Agent in minutes. No coding required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/register"
              className="glass-btn-primary rounded-full px-10 py-4 text-lg glow inline-flex items-center justify-center"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="https://calendly.com/aasim-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn-secondary rounded-full px-10 py-4 text-lg inline-flex items-center justify-center border-2 border-primary-500 hover:bg-primary-50"
            >
              Schedule Demo
            </a>
          </div>

          <p className="text-sm text-gray-600">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>

      </div>
    </section>
  );
};

// ========== SUB-COMPONENTS ==========

/**
 * ValueCard - Primary value proposition card with icon, metric, and description
 */
const ValueCard = ({ icon, iconBgColor, title, metric, metricColor, description, featured }) => (
  <div className={`glass-card rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
    featured ? 'border-2 border-primary-400 glow' : ''
  }`}>
    <div className="flex items-start gap-4 mb-6">
      <div className={`w-14 h-14 rounded-xl ${iconBgColor} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mt-2">{title}</h3>
    </div>
    <p className={`text-3xl md:text-4xl font-bold ${metricColor} mb-4`}>
      {metric}
    </p>
    <p className="text-gray-700 leading-relaxed">
      {description}
    </p>
  </div>
);

/**
 * CapabilityCard - Detailed capability card with icon and feature list
 */
const CapabilityCard = ({ icon, iconColor, iconBg, title, features }) => (
  <div className="glass-card rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
    <div className="flex items-center gap-4 mb-4">
      <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center ${iconColor} flex-shrink-0`}>
        {icon}
      </div>
      <h4 className="text-xl font-bold text-gray-900">{title}</h4>
    </div>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start text-gray-700">
          <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * ComparisonRow - Table row for human vs AI comparison
 */
const ComparisonRow = ({ factor, human, ai, aiAdvantage }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{factor}</td>
    <td className="px-6 py-4 text-sm text-gray-700 bg-yellow-50">
      <div className="flex items-center">
        {aiAdvantage && <XCircle className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" />}
        {human}
      </div>
    </td>
    <td className="px-6 py-4 text-sm text-gray-900 bg-green-50 font-semibold">
      <div className="flex items-center">
        {aiAdvantage && <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />}
        {ai}
      </div>
    </td>
  </tr>
);

/**
 * InfoRow - Simple label-value row for ROI calculator
 */
const InfoRow = ({ label, value, valueColor = "text-gray-900" }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200">
    <span className="text-gray-700">{label}</span>
    {value && <span className={`font-semibold ${valueColor}`}>{value}</span>}
  </div>
);

/**
 * IndustryCard - Industry-specific use case card
 */
const IndustryCard = ({ icon, title, useCases, color }) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100 border-blue-200',
    purple: 'text-purple-600 bg-purple-100 border-purple-200',
    green: 'text-green-600 bg-green-100 border-green-200',
    orange: 'text-orange-600 bg-orange-100 border-orange-200',
    indigo: 'text-indigo-600 bg-indigo-100 border-indigo-200',
    pink: 'text-pink-600 bg-pink-100 border-pink-200',
    cyan: 'text-cyan-600 bg-cyan-100 border-cyan-200',
    red: 'text-red-600 bg-red-100 border-red-200',
  };

  const [textColor, bgColor, borderColor] = colorClasses[color].split(' ');

  return (
    <div className="glass-card rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
      <div className={`w-14 h-14 rounded-xl ${bgColor} flex items-center justify-center ${textColor} mb-4`}>
        {icon}
      </div>
      <h4 className="text-lg font-bold text-gray-900 mb-3">{title}</h4>
      <ul className="space-y-2">
        {useCases.map((useCase, index) => (
          <li key={index} className="text-sm text-gray-700 flex items-start">
            <span className="text-gray-400 mr-2">•</span>
            <span>{useCase}</span>
          </li>
        ))}
      </ul>
      <Link
        to={`/use-cases/${title.toLowerCase()}`}
        className={`inline-flex items-center text-sm font-semibold ${textColor} mt-4 hover:underline`}
      >
        Learn More
        <ArrowRight className="w-3 h-3 ml-1" />
      </Link>
    </div>
  );
};

export default WhyUsePrecisionAgents;
