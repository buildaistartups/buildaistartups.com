import React from 'react';

export default function EnterprisesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Launch Your Innovation Lab
          </h1>
          <h2 className="text-2xl text-gray-700 mb-8">
            White-Label Everything. Transform Your Organization into an AI Powerhouse
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto">
            Join 47 Fortune 500 companies using BuildAIStartups to create internal innovation labs, 
            spin off AI ventures, and generate new revenue streams.
          </p>
          
          {/* Enterprise Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600">47</div>
              <div className="text-gray-600">Enterprise Labs</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600">$47M</div>
              <div className="text-gray-600">New Revenue Streams</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600">89%</div>
              <div className="text-gray-600">Employee Satisfaction</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600">12</div>
              <div className="text-gray-600">Avg. Ventures/Lab</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Deploy Innovation Lab
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
              Calculate ROI
            </button>
          </div>
        </div>
      </section>

      {/* White-Label Platform */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Your Own AI Venture Studio. Completely White-Labeled.
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Complete Control Panel</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <span className="text-blue-600">🏢</span>
                  </div>
                  <div>
                    <div className="font-semibold">Your Brand, Your Domain</div>
                    <div className="text-gray-600">Fully customizable branding and URL</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <span className="text-green-600">📊</span>
                  </div>
                  <div>
                    <div className="font-semibold">Your Innovation Metrics</div>
                    <div className="text-gray-600">Custom KPIs and success tracking</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <span className="text-purple-600">🔧</span>
                  </div>
                  <div>
                    <div className="font-semibold">Your Integration Stack</div>
                    <div className="text-gray-600">Connect with existing enterprise tools</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 rounded-full p-3">
                    <span className="text-orange-600">🛡️</span>
                  </div>
                  <div>
                    <div className="font-semibold">Your Compliance Rules</div>
                    <div className="text-gray-600">SOC2, GDPR, HIPAA compliance built-in</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h4 className="text-xl font-bold mb-4">Fortune 500 Dashboard Example</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>AI Ventures Launched</span>
                    <span className="font-bold text-blue-600">12</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Acquired Back Into Core</span>
                    <span className="font-bold text-green-600">3</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>New Revenue Streams</span>
                    <span className="font-bold text-purple-600">$47M</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Employee Satisfaction</span>
                    <span className="font-bold text-orange-600">89%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Enterprise-Grade Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Complete White-Label Platform */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🏷️</div>
              <h3 className="text-xl font-bold mb-4">Complete White-Label Platform</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Custom branding and logos</li>
                <li>✅ Your domain and SSL</li>
                <li>✅ Branded email templates</li>
                <li>✅ Custom color schemes</li>
                <li>✅ White-label mobile apps</li>
              </ul>
            </div>

            {/* Custom Compliance Framework */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-4">Custom Compliance Framework</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ SOC2 Type II certified</li>
                <li>✅ GDPR compliance tools</li>
                <li>✅ HIPAA compliance options</li>
                <li>✅ Custom approval workflows</li>
                <li>✅ Audit trail and logging</li>
              </ul>
            </div>

            {/* Enterprise SSO + RBAC */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-4">Enterprise SSO + RBAC</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ SAML 2.0 integration</li>
                <li>✅ Active Directory sync</li>
                <li>✅ Role-based access control</li>
                <li>✅ Multi-factor authentication</li>
                <li>✅ Session management</li>
              </ul>
            </div>

            {/* Department Budget Controls */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-4">Department Budget Controls</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Department-level billing</li>
                <li>✅ Budget allocation tools</li>
                <li>✅ Spend tracking and alerts</li>
                <li>✅ Cost center reporting</li>
                <li>✅ Automated approvals</li>
              </ul>
            </div>

            {/* Legacy System Connectors */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🔌</div>
              <h3 className="text-xl font-bold mb-4">Legacy System Connectors</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ SAP integration</li>
                <li>✅ Oracle database sync</li>
                <li>✅ Salesforce connectors</li>
                <li>✅ Microsoft 365 integration</li>
                <li>✅ Custom API endpoints</li>
              </ul>
            </div>

            {/* Innovation KPI Dashboard */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-4">Innovation KPI Dashboard</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Real-time metrics</li>
                <li>✅ Custom reporting</li>
                <li>✅ Executive summaries</li>
                <li>✅ ROI calculations</li>
                <li>✅ Predictive analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Integration Hub */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Enterprise Integration Hub
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Your Old Stack + Our AI = Immediate Value</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded">
                      <span className="text-blue-600 font-bold">CRM</span>
                    </div>
                    <span>Salesforce CRM</span>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="text-green-600 font-semibold">AI Lead Scoring</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded">
                      <span className="text-green-600 font-bold">ERP</span>
                    </div>
                    <span>SAP Business Suite</span>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="text-green-600 font-semibold">AI Process Optimization</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-2 rounded">
                      <span className="text-purple-600 font-bold">HR</span>
                    </div>
                    <span>Workday HCM</span>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="text-green-600 font-semibold">AI Talent Matching</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 p-2 rounded">
                      <span className="text-orange-600 font-bold">BI</span>
                    </div>
                    <span>Tableau Analytics</span>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="text-green-600 font-semibold">AI Insights Engine</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h4 className="text-xl font-bold mb-4">One-Click Integrations</h4>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-3 rounded text-center text-sm font-semibold">Salesforce</div>
                <div className="bg-white p-3 rounded text-center text-sm font-semibold">SAP</div>
                <div className="bg-white p-3 rounded text-center text-sm font-semibold">Oracle</div>
                <div className="bg-white p-3 rounded text-center text-sm font-semibold">Microsoft</div>
                <div className="bg-white p-3 rounded text-center text-sm font-semibold">Workday</div>
                <div className="bg-white p-3 rounded text-center text-sm font-semibold">Tableau</div>
                <div className="bg-white p-3 rounded text-center text-sm font-semibold">Slack</div>
                <div className="bg-white p-3 rounded text-center text-sm font-semibold">Teams</div>
                <div className="bg-white p-3 rounded text-center text-sm font-semibold">Jira</div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View All Integrations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Lab ROI */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Innovation Lab ROI Calculator
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Your Investment</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Platform License (Annual)</span>
                  <span className="font-semibold">$300K</span>
                </div>
                <div className="flex justify-between">
                  <span>Implementation & Training</span>
                  <span className="font-semibold">$150K</span>
                </div>
                <div className="flex justify-between">
                  <span>Dedicated Support</span>
                  <span className="font-semibold">$100K</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Investment</span>
                    <span className="text-blue-600">$550K</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Your Returns (Year 1)</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>New Revenue Streams</span>
                  <span className="font-semibold text-green-600">$2.4M</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Savings (Efficiency)</span>
                  <span className="font-semibold text-green-600">$800K</span>
                </div>
                <div className="flex justify-between">
                  <span>Employee Retention Value</span>
                  <span className="font-semibold text-green-600">$400K</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Returns</span>
                    <span className="text-green-600">$3.6M</span>
                  </div>
                  <div className="flex justify-between text-lg mt-2">
                    <span>ROI</span>
                    <span className="text-green-600 font-bold">555%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Calculate Your Custom ROI
            </button>
          </div>
        </div>
      </section>

      {/* Enterprise Success Stories */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Enterprise Success Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">🏦</div>
              <h3 className="text-xl font-bold mb-2">Global Financial Services</h3>
              <p className="text-gray-600 mb-4">Fortune 100 bank with 50,000+ employees</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>AI Ventures Launched:</span>
                  <span className="font-semibold">15</span>
                </div>
                <div className="flex justify-between">
                  <span>New Revenue:</span>
                  <span className="font-semibold text-green-600">$67M</span>
                </div>
                <div className="flex justify-between">
                  <span>Time to Market:</span>
                  <span className="font-semibold">-60%</span>
                </div>
                <div className="flex justify-between">
                  <span>Employee Engagement:</span>
                  <span className="font-semibold text-blue-600">+45%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-xl font-bold mb-2">Manufacturing Giant</h3>
              <p className="text-gray-600 mb-4">Global manufacturer with 200+ facilities</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>AI Ventures Launched:</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Savings:</span>
                  <span className="font-semibold text-green-600">$34M</span>
                </div>
                <div className="flex justify-between">
                  <span>Process Efficiency:</span>
                  <span className="font-semibold">+35%</span>
                </div>
                <div className="flex justify-between">
                  <span>Innovation Speed:</span>
                  <span className="font-semibold text-blue-600">+80%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-2">Healthcare Network</h3>
              <p className="text-gray-600 mb-4">Multi-state healthcare provider</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>AI Ventures Launched:</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Patient Outcomes:</span>
                  <span className="font-semibold text-green-600">+28%</span>
                </div>
                <div className="flex justify-between">
                  <span>Operational Savings:</span>
                  <span className="font-semibold">$23M</span>
                </div>
                <div className="flex justify-between">
                  <span>Staff Satisfaction:</span>
                  <span className="font-semibold text-blue-600">+52%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Pricing */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Enterprise Pricing
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* White-Label */}
            <div className="bg-white border-2 border-blue-600 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">White-Label Platform</h3>
              <div className="text-4xl font-bold mb-6">$25K<span className="text-lg">/mo</span></div>
              <p className="text-gray-600 mb-6">Complete innovation lab solution</p>
              <ul className="space-y-2 text-left mb-8">
                <li>✅ Full white-label platform</li>
                <li>✅ Unlimited users and projects</li>
                <li>✅ Enterprise integrations</li>
                <li>✅ SOC2/GDPR compliance</li>
                <li>✅ 24/7 dedicated support</li>
                <li>✅ Custom training program</li>
                <li>✅ Success manager assigned</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Deploy Innovation Lab
              </button>
            </div>

            {/* Custom Enterprise */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Custom Enterprise</h3>
              <div className="text-4xl font-bold mb-6">Custom</div>
              <p className="text-gray-600 mb-6">Tailored to your specific needs</p>
              <ul className="space-y-2 text-left mb-8">
                <li>✅ Everything in White-Label</li>
                <li>✅ Custom feature development</li>
                <li>✅ Private cloud deployment</li>
                <li>✅ Advanced security features</li>
                <li>✅ Custom compliance requirements</li>
                <li>✅ Dedicated development team</li>
                <li>✅ SLA guarantees</li>
              </ul>
              <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl mb-12">
            Join 47 Fortune 500 companies already using BuildAIStartups to drive innovation 
            and create new revenue streams. Your innovation lab awaits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Deploy Innovation Lab
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Schedule Executive Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
