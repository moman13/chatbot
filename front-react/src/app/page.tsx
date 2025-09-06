import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden alia-hero">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-20 sm:pb-24">
          <div className="text-center">
            {/* Top banner */}
            <div className="reveal-up inline-flex items-center gap-2 rounded-full bg-slate-800 border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Powered by OpenAI 
            </div>

            {/* Main headline */}
            <h1 className="reveal-up anim-delay-1 font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              The next generation of <br/> 
              <span className="alia-highlight">chatbot</span>
            </h1>

            {/* Subheadline */}
            <p className="reveal-up anim-delay-2 mt-6 text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Achieve 15%+ conversion rates with a smarter chatbot, designed perfectly for your brand — built specifically for modern websites.
            </p>

            {/* CTA buttons */}
            <div className="reveal-up anim-delay-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="btn-primary rounded-2xl px-8 py-4 text-lg font-bold shadow-soft transform hover:scale-105 transition-all">
                🚀 Get Your Bot Now - FREE!
              </Link>
              <a href="#features" className="px-8 py-4 rounded-2xl border border-slate-600 text-white hover:bg-slate-800 transition-all">View Features</a>
            </div>
          </div>

          {/* Hero Chat Preview */}
          <div className="reveal-up anim-delay-4 mt-16 flex justify-center">
            <div className="relative max-w-4xl w-full float-alia">
              {/* Glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent blur-3xl rounded-3xl"></div>
              
              {/* Chat container */}
              <div className="relative rounded-3xl border border-slate-700 bg-slate-800 shadow-soft overflow-hidden">
                {/* Browser bar */}
                <div className="bg-slate-700 border-b border-slate-600 px-6 py-4 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <div className="ml-4 text-sm text-slate-300">your-website.com — Live Chat</div>
                </div>
                
                {/* Chat interface */}
                <div className="grid md:grid-cols-2 gap-6 p-8">
                  {/* Left: Widget preview */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white">Widget Preview</h3>
                    <div className="rounded-2xl border border-slate-600 bg-slate-700 overflow-hidden">
                      {/* Chat header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl" style={{background: 'linear-gradient(135deg, #e5ff66, #d9ff2e)'}}></div>
                        <div>
                          <div className="font-semibold">AqlBot</div>
                          <div className="text-xs text-white/80">Ask anything about our products</div>
                        </div>
                      </div>
                      {/* Messages */}
                      <div className="p-4 space-y-3 bg-slate-600">
                        <div className="flex gap-3 items-start">
                          <div className="w-7 h-7 rounded-full bg-slate-400"></div>
                          <div className="bg-slate-500 text-white rounded-2xl p-3 text-sm max-w-[80%]">Hi! I can help you find pricing, features, or setup steps. What would you like to know?</div>
                        </div>
                        <div className="flex gap-3 items-start justify-end">
                          <div className="bg-primary rounded-2xl p-3 text-sm text-slate-900 max-w-[80%]">How do I integrate this with my website?</div>
                          <div className="w-7 h-7 rounded-full bg-primary"></div>
                        </div>
                        <div className="flex gap-3 items-start">
                          <div className="w-7 h-7 rounded-full bg-slate-400"></div>
                          <div className="bg-slate-500 text-white rounded-2xl p-3 text-sm max-w-[80%]">It&apos;s super easy! Just copy our embed code and paste it into your site. Takes less than 30 seconds.</div>
                        </div>
                      </div>
                      {/* Input */}
                      <div className="border-t border-slate-600 p-3 bg-slate-700">
                        <div className="flex items-center gap-2">
                          <input className="flex-1 rounded-xl border border-slate-500 bg-slate-600 text-white px-3 py-2 text-sm placeholder:text-slate-300" placeholder="Type your message..." />
                          <button className="btn-primary px-4 py-2 rounded-xl text-sm font-medium">Send</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Code snippet */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white">One-line Integration</h3>
                    <div className="rounded-2xl border border-slate-600 bg-slate-700 p-6">
                      <div className="text-xs text-slate-400 mb-3">Copy and paste this code:</div>
                      <pre className="text-sm bg-slate-900 text-green-400 p-4 rounded-xl overflow-x-auto"><code>{`<script src="https://cdn.aqlbot.com/widget.js" 
        data-token="YOUR_API_KEY">
</script>`}</code></pre>
                      <div className="mt-4 text-xs text-slate-300">That&apos;s it! Your chatbot will appear on your site instantly.</div>
                    </div>
                    
                    {/* Stats preview */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">15%+</div>
                        <div className="text-xs text-slate-400">Conversion Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">&lt; 1s</div>
                        <div className="text-xs text-slate-400">Response Time</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-slate-800">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-bold text-slate-400 uppercase tracking-wide">Our Impact Speaks for Itself</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="stat-number">15%+</div>
              <div className="text-lg font-semibold text-white mt-2">Average Conversion Rate</div>
              <div className="text-slate-300 mt-1">&quot;The numbers speak for themselves — AqlBot is directly driving more revenue.&quot;</div>
              <div className="text-sm text-slate-400 mt-2">Sarah Chen, Head of Growth at TechFlow</div>
            </div>
            <div className="text-center">
              <div className="stat-number">85%</div>
              <div className="text-lg font-semibold text-white mt-2">Customer Satisfaction</div>
              <div className="text-slate-300 mt-1">&quot;Our support tickets dropped by half after implementing AqlBot.&quot;</div>
              <div className="text-sm text-slate-400 mt-2">Mike Rodriguez, CTO at StartupBase</div>
            </div>
            <div className="text-center">
              <div className="stat-number">&lt; 30s</div>
              <div className="text-lg font-semibold text-white mt-2">Setup Time</div>
              <div className="text-slate-300 mt-1">&quot;We were live in under a minute. The fastest integration we&apos;ve ever done.&quot;</div>
              <div className="text-sm text-slate-400 mt-2">Lisa Park, Product Manager at GrowthCo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">What makes our chatbots convert so well</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature cards */}
            <div className="alia-card">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-lime-400 mb-6 flex items-center justify-center">
                <span className="text-slate-900 text-xl font-bold">AI</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Automated Smart Training</h3>
              <p className="text-slate-300 leading-relaxed">Train on your docs, FAQs, and website content. Our AI continuously learns and improves responses based on user interactions.</p>
            </div>

            <div className="alia-card">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 mb-6 flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Triggering</h3>
              <p className="text-slate-300 leading-relaxed">Show the chatbot at the optimal moment using our model that learns when users are most likely to convert.</p>
            </div>

            <div className="alia-card">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6 flex items-center justify-center">
                <span className="text-white text-xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Beautiful Customization</h3>
              <p className="text-slate-300 leading-relaxed">Use our editor to build a pixel-perfect chatbot for your brand, or choose from dozens of production-ready templates.</p>
            </div>

            <div className="alia-card">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-6 flex items-center justify-center">
                <span className="text-white text-xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Customer Education that Converts</h3>
              <p className="text-slate-300 leading-relaxed">Tell your brand story, show off what makes your products different, and engage customers in ways they&apos;ve never experienced before.</p>
            </div>

            <div className="alia-card">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-6 flex items-center justify-center">
                <span className="text-white text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Built for Modern Websites</h3>
              <p className="text-slate-300 leading-relaxed">Our lightweight embed takes one click to set up and guarantees a fast experience for both you and your visitors.</p>
            </div>

            <div className="alia-card">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 mb-6 flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">In-depth Analytics</h3>
              <p className="text-slate-300 leading-relaxed">Make informed decisions using data on conversion rates, user satisfaction, response accuracy, and much more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-slate-800">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Ready to get started?</h2>
            <p className="mt-4 text-xl text-slate-300">Start your 14-day free trial or book a personalized demo right now</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pricing cards */}
            <div className="alia-card">
              <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
              <div className="text-4xl font-bold text-white mb-1">$0</div>
              <div className="text-slate-400 mb-6">Perfect for trying out</div>
              <ul className="space-y-3 text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                  1 chatbot
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                  100 messages/month
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                  Basic customization
                </li>
              </ul>
              <Link href="/register" className="block w-full text-center rounded-2xl border border-slate-600 py-3 font-medium text-white hover:bg-slate-700 transition-all">🎁 Start Free</Link>
            </div>

            <div className="alia-card border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-slate-900 px-4 py-1 rounded-full text-sm font-medium">Most Popular</div>
              <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white mb-1">$49</div>
              <div className="text-slate-400 mb-6">For growing businesses</div>
              <ul className="space-y-3 text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                  5 chatbots
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                  10,000 messages/month
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                  Advanced customization
                </li>
              </ul>
              <Link href="/register" className="block w-full text-center btn-primary rounded-2xl py-3 font-medium hover:scale-105 transition-transform">⭐ Choose Pro</Link>
            </div>

            <div className="alia-card">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-1">Custom</div>
              <div className="text-slate-400 mb-6">For large organizations</div>
              <ul className="space-y-3 text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                  Unlimited chatbots
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                  Unlimited messages
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                  White-label solution
                </li>
              </ul>
              <a href="/contact" className="block w-full text-center rounded-2xl border border-slate-600 py-3 font-medium text-white hover:bg-slate-700 transition-all">💼 Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </>
  );
}


