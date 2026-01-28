import { Metadata } from 'next';
import PostCard from '@/components/post-card';
import { getPosts, WPPost } from '@/lib/wordpress';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read our latest articles and updates',
};

async function getAllPosts(): Promise<WPPost[]> {
    try {
        return await getPosts(20);
    } catch {
        return [];
    }
}

export default async function PostsPage() {
    const posts = await getAllPosts();

    return (
        <div className="py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Explore our latest articles, tutorials, and updates.
                    </p>
                </div>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h2>
                        <p className="text-gray-600">
                            Connect your WordPress site to display posts here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
