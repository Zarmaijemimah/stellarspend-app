import type { Metadata } from 'next';
import Hero from '@/components/hero/Hero';

export const metadata: Metadata = {
  title: 'StellarSpend — Track your Stellar transactions',
  description:
    'StellarSpend is a financial management platform for the unbanked and underbanked, built on the Stellar blockchain. Track spending, set budgets, and reach your savings goals.',
  openGraph: {
    title: 'StellarSpend',
    description: 'Blockchain-powered budgeting for everyone.',
    url: 'https://stellarspend.app',
    siteName: 'StellarSpend',
  },
};

export default function HomePage() {
  return (
    <main id="main-content">
   

      <Hero />

      {/* Placeholder for features / signup sections */}
      <section id="features" aria-label="Features overview">
        {/* coming soon */}
      </section>
    </main>
  );
}