'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In production, this would send to an API
      console.log('Newsletter signup:', email);
      setSubscribed(true);
    }
  };

  if (subscribed) {
    return (
      <div className="bg-green-50 rounded-lg p-6 text-center">
        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p className="text-green-700 font-medium">Thanks for subscribing!</p>
        <p className="text-sm text-green-600">Keep an eye on your inbox for new adventures.</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-900 rounded-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-6 h-6 text-blue-300" />
        <h3 className="text-lg font-semibold text-white">
          Get New Adventures in Your Inbox
        </h3>
      </div>
      <p className="text-blue-100 mb-4">
        Subscribe to get notified about new places, video updates, and backroad tips.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
      <p className="text-xs text-blue-300 mt-3">
        No spam, ever. Unsubscribe anytime.
      </p>
    </div>
  );
}