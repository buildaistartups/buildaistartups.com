import React from 'react';

export default function StartupsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build, Scale, and Profit from AI
          </h1>
          <h2 className="text-2xl text-gray-700 mb-8">
            Everything You Need to Launch Your AI Business in One Platform
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto">
            From idea to IPO - BuildAIStartups provides the complete toolkit for AI entrepreneurs. 
            Join 2,847 builders who've already launched profitable AI businesses.
          </p>
          
          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600">2,847</div>
              <div className="text-gray-600">AI Businesses Built</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600">94%</div>
              <div className="text-gray-600">Reach Revenue</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600">$147K</div>
              <div className="text-gray-600">Avg. First Year Revenue</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600">12 Days</div>
              <div className="text-gray-600">Average Time to Launch</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Building Now
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Complete Startup Toolkit */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            The Complete AI Startup Toolkit
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Build */}
            <div className="text-center p-8 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold mb-4">Build</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li>✅ AI-Powered Code Generation</li>
                <li>✅ Pre-Built Templates & Components</li>
                <li>✅ No-Code/Low-Code Builder</li>
                <li>✅ API Integration Wizard</li>
                <li>✅ Database Schema Generator</li>
                <li>✅ Authentication & Security</li>
              </ul>
            </div>

            {/* Scale */}
            <div className="text-center p-8 rounded-lg border-2 border-gray-200 hover:border-green-500 transition-colors">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-4">Scale</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li>✅ Auto-Scaling Infrastructure</li>
                <li>✅ Performance Monitoring</li>
                <li>✅ Load Balancing</li>
                <li>✅ CDN Integration</li>
                <li>✅ Database Optimization</li>
                <li>✅ Multi-Region Deployment</li>
              </ul>
            </div>

            {/* Profit */}
            <div className="text-center p-8 rounded-lg border-2 border-gray-200 hover:border-purple-500 transition-colors">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-4">Profit</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li>✅ Built-in Payment Processing</li>
                <li>✅ Subscription Management</li>
                <li>✅ Revenue Analytics</li>
                <li>✅ Customer Acquisition Tools</li>
                <li>✅ Conversion Optimization</li>
                <li>✅ Automated Billing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Journey */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Your AI Startup Journey
          </h2>
          
          <div className="space-y-12">
            {/* Week 1-2: Foundation */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
                  1-2
                </div>
                <h3 className="text-2xl font-bold mb-2">Foundation</h3>
                <p className="text-gray-600">Week 1-2</p>
              </div>
              <div className="md:w-2/3">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold mb-4">Build Your MVP</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>🎯 Define your AI business concept</li>
                    <li>🏗️ Use our templates to build your MVP</li>
                    <li>🔧 Configure core features and functionality</li>
                    <li>🎨 Customize branding and design</li>
                    <li>🚀 Deploy to staging environment</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Week 3-4: Validation */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/3">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
                  3-4
                </div>
                <h3 className="text-2xl font-bold mb-2">Validation</h3>
                <p className="text-gray-600">Week 3-4</p>
              </div>
              <div className="md:w-2/3">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold mb-4">Test & Iterate</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>👥 Get matched with beta testers</li>
                    <li>📊 Analyze user behavior and feedback</li>
                    <li>🔄 Iterate based on data insights</li>
                    <li>💡 Connect with AI mentors</li>
                    <li>📈 Optimize conversion funnels</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Week 5-8: Launch */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
                  5-8
                </div>
                <h3 className="text-2xl font-bold mb-2">Launch</h3>
                <p className="text-gray-600">Week 5-8</p>
              </div>
              <div className="md:w-2/3">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold mb-4">Go to Market</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>🚀 Launch to production</li>
                    <li>💳 Activate payment processing</li>
                    <li>📢 Execute marketing campaigns</li>
                    <li>🤝 Connect with potential partners</li>
                    <li>💰 Generate first revenue</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Week 9+: Scale */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/3">
                <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
                  9+
                </div>
                <h3 className="text-2xl font-bold mb-2">Scale</h3>
                <p className="text-gray-600">Week 9+</p>
              </div>
              <div className="md:w-2/3">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold mb-4">Growth & Expansion</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>📈 Scale infrastructure automatically</li>
                    <li>🎯 Optimize for growth metrics</li>
                    <li>💼 Connect with investors</li>
                    <li>🌍 Expand to new markets</li>
                    <li>🏆 Achieve profitability milestones</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Mentorship Network */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Get Matched with Perfect AI Mentors
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">2,847 Verified Mentors Ready to Help</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <span className="text-blue-600 font-bold">847</span>
                  </div>
                  <div>
                    <div className="font-semibold">Serial Entrepreneurs</div>
                    <div className="text-gray-600">Who've built and exited AI companies</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <span className="text-green-600 font-bold">423</span>
                  </div>
                  <div>
                    <div className="font-semibold">Growth Experts</div>
                    <div className="text-gray-600">Specialists in scaling AI businesses</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <span className="text-purple-600 font-bold">892</span>
                  </div>
                  <div>
                    <div className="font-semibold">Technical CTOs</div>
                    <div className="text-gray-600">AI/ML architecture and implementation</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 rounded-full p-3">
                    <span className="text-orange-600 font-bold">485</span>
                  </div>
                  <div>
                    <div className="font-semibold">Fundraising Veterans</div>
                    <div className="text-gray-600">Who've raised $500M+ for AI startups</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h4 className="text-xl font-bold mb-4">AI Matching Criteria</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Industry Alignment</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Stage Compatibility</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Skill Gaps Analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Timezone Optimization</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Communication Style</span>
                </li>
              </ul>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-blue-700 transition-colors">
                Get Matched with Mentors
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Success Stories from Our Ecosystem
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AIChat Pro</h3>
              <p className="text-gray-600 mb-4">Customer service automation platform</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Time to Launch:</span>
                  <span className="font-semibold">8 days</span>
                </div>
                <div className="flex justify-between">
                  <span>First Revenue:</span>
                  <span className="font-semibold">Day 12</span>
                </div>
                <div className="flex justify-between">
                  <span>Current ARR:</span>
                  <span className="font-semibold text-green-600">$2.4M</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">DataInsight AI</h3>
              <p className="text-gray-600 mb-4">Business intelligence and analytics</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Time to Launch:</span>
                  <span className="font-semibold">15 days</span>
                </div>
                <div className="flex justify-between">
                  <span>First Revenue:</span>
                  <span className="font-semibold">Day 18</span>
                </div>
                <div className="flex justify-between">
                  <span>Current ARR:</span>
                  <span className="font-semibold text-green-600">$1.8M</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">SmartLead Gen</h3>
              <p className="text-gray-600 mb-4">AI-powered lead generation tool</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Time to Launch:</span>
                  <span className="font-semibold">6 days</span>
                </div>
                <div className="flex justify-between">
                  <span>First Revenue:</span>
                  <span className="font-semibold">Day 9</span>
                </div>
                <div className="flex justify-between">
                  <span>Current ARR:</span>
                  <span className="font-semibold text-green-600">$3.1M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Startup-Friendly Pricing
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="border-2 border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <div className="text-4xl font-bold mb-6">$0</div>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>
              <ul className="space-y-2 text-left mb-8">
                <li>✅ Basic AI Builder</li>
                <li>✅ 3 Projects</li>
                <li>✅ Community Support</li>
                <li>✅ Basic Templates</li>
                <li>❌ Advanced Features</li>
                <li>❌ Priority Support</li>
              </ul>
              <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Start Free
              </button>
            </div>

            {/* Startup */}
            <div className="border-2 border-blue-600 rounded-lg p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Startup</h3>
              <div className="text-4xl font-bold mb-6">$49<span className="text-lg">/mo</span></div>
              <p className="text-gray-600 mb-6">After first revenue</p>
              <ul className="space-y-2 text-left mb-8">
                <li>✅ Full AI Builder</li>
                <li>✅ Unlimited Projects</li>
                <li>✅ Priority Support</li>
                <li>✅ All Templates</li>
                <li>✅ Mentor Matching</li>
                <li>✅ Analytics Dashboard</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Building
              </button>
            </div>

            {/* Scale */}
            <div className="border-2 border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Scale</h3>
              <div className="text-4xl font-bold mb-6">$249<span className="text-lg">/mo</span></div>
              <p className="text-gray-600 mb-6">For growing businesses</p>
              <ul className="space-y-2 text-left mb-8">
                <li>✅ Everything in Startup</li>
                <li>✅ Advanced AI Features</li>
                <li>✅ White-label Options</li>
                <li>✅ API Access</li>
                <li>✅ Custom Integrations</li>
                <li>✅ Dedicated Support</li>
              </ul>
              <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Scale Up
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your AI Empire?
          </h2>
          <p className="text-xl mb-12">
            Join 2,847 entrepreneurs who've already launched profitable AI businesses. 
            Your success story starts today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Building Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
