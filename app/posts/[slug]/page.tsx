import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts, getPostBySlug, formatDate } from '@/lib/wordpress';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    try {
        const posts = await getPosts(100);
        return posts.map((post) => ({
            slug: post.slug,
        }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: post.title.rendered.replace(/<[^>]*>/g, ''),
        description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
    };
}

export default async function PostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
    const author = post._embedded?.author?.[0];

    return (
        <article className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/posts"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blog
                </Link>

                <header className="mb-8">
                    <h1
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    <div className="flex items-center gap-4">
                        {author && (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                                    {author.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{author.name}</p>
                                    <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {featuredImage && (
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
                        <Image
                            src={featuredImage.source_url}
                            alt={featuredImage.alt_text || post.title.rendered}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <Link
                        href="/posts"
                        className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to all posts
                    </Link>
                </div>
            </div>
        </article>
    );
}
