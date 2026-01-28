import Link from 'next/link';
import Image from 'next/image';
import { WPPost, formatDate, truncate } from '@/lib/wordpress';

interface PostCardProps {
    post: WPPost;
}

export default function PostCard({ post }: PostCardProps) {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
    const author = post._embedded?.author?.[0];

    return (
        <article className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden motion-safe:hover:shadow-xl motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1">
            <Link href={`/posts/${post.slug}`}>
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {featuredImage ? (
                        <Image
                            src={featuredImage.source_url}
                            alt={featuredImage.alt_text || post.title.rendered}
                            fill
                            className="object-cover motion-safe:group-hover:scale-105 motion-safe:transition-transform motion-safe:duration-500"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                    {author && (
                        <>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                                {author.name.charAt(0)}
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-gray-900">{author.name}</p>
                                <p className="text-gray-500">{formatDate(post.date)}</p>
                            </div>
                        </>
                    )}
                </div>

                <Link href={`/posts/${post.slug}`}>
                    <h2
                        className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                </Link>

                <p className="text-gray-600 text-sm line-clamp-3">
                    {truncate(post.excerpt.rendered, 120)}
                </p>

                <Link
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                    Read more
                    <svg className="w-4 h-4 motion-safe:group-hover:translate-x-1 motion-safe:transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </article>
    );
}
