import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">WP</span>
                            </div>
                            <span className="font-bold text-xl text-white">Starter</span>
                        </Link>
                        <p className="text-sm">
                            A modern headless WordPress starter built with Next.js 14, TypeScript, and Tailwind CSS.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/posts" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="https://nextjs.org/docs" target="_blank" rel="noopener" className="hover:text-white transition-colors">Next.js Docs</a></li>
                            <li><a href="https://developer.wordpress.org/rest-api/" target="_blank" rel="noopener" className="hover:text-white transition-colors">WordPress REST API</a></li>
                            <li><a href="https://github.com" target="_blank" rel="noopener" className="hover:text-white transition-colors">GitHub</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
                    <p>Built with Next.js and WordPress REST API</p>
                </div>
            </div>
        </footer>
    );
}
