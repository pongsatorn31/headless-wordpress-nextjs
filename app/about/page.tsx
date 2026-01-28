import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about this headless WordPress starter',
};

export default function AboutPage() {
    return (
        <div className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">About This Starter</h1>

                <div className="prose prose-lg max-w-none">
                    <p className="text-xl text-gray-600 mb-8">
                        WP Starter is a modern, production-ready template for building headless WordPress websites
                        with Next.js 14, TypeScript, and Tailwind CSS.
                    </p>

                    <h2>Why Headless WordPress?</h2>
                    <ul>
                        <li><strong>Performance</strong> - Static generation and ISR for blazing fast page loads</li>
                        <li><strong>Security</strong> - Frontend decoupled from WordPress admin</li>
                        <li><strong>Flexibility</strong> - Use any frontend framework or technology</li>
                        <li><strong>Scalability</strong> - Deploy to edge networks worldwide</li>
                        <li><strong>Developer Experience</strong> - Modern tooling with TypeScript and React</li>
                    </ul>

                    <h2>Tech Stack</h2>
                    <ul>
                        <li><strong>Next.js 14</strong> - React framework with App Router</li>
                        <li><strong>TypeScript</strong> - Type-safe development</li>
                        <li><strong>Tailwind CSS</strong> - Utility-first styling</li>
                        <li><strong>WordPress REST API</strong> - Content management</li>
                    </ul>

                    <h2>Getting Started</h2>
                    <ol>
                        <li>Clone the repository</li>
                        <li>Install dependencies with <code>npm install</code></li>
                        <li>Copy <code>.env.example</code> to <code>.env.local</code></li>
                        <li>Set your WordPress URL</li>
                        <li>Run <code>npm run dev</code></li>
                    </ol>

                    <h2>Features</h2>
                    <ul>
                        <li>Server-side rendering and static generation</li>
                        <li>Automatic revalidation with ISR</li>
                        <li>SEO optimization with metadata API</li>
                        <li>Responsive design</li>
                        <li>Dark mode ready</li>
                        <li>Typed WordPress API client</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
