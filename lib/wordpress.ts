const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://your-wordpress-site.com';

interface FetchOptions {
    revalidate?: number;
    tags?: string[];
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { revalidate = 60, tags } = options;

    const res = await fetch(`${API_URL}/wp-json/wp/v2/${endpoint}`, {
        next: {
            revalidate,
            tags
        },
    });

    if (!res.ok) {
        throw new Error(`WordPress API error: ${res.status}`);
    }

    return res.json();
}

export interface WPPost {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    featured_media: number;
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
        }>;
        author?: Array<{
            name: string;
            avatar_urls: { [key: string]: string };
        }>;
    };
}

export interface WPPage {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
}

export interface WPCategory {
    id: number;
    name: string;
    slug: string;
    count: number;
}

export async function getPosts(perPage = 10): Promise<WPPost[]> {
    return fetchAPI<WPPost[]>(`posts?per_page=${perPage}&_embed`, {
        tags: ['posts'],
    });
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
    const posts = await fetchAPI<WPPost[]>(`posts?slug=${slug}&_embed`, {
        tags: ['posts', `post-${slug}`],
    });
    return posts[0] || null;
}

export async function getPages(): Promise<WPPage[]> {
    return fetchAPI<WPPage[]>('pages?per_page=100', {
        tags: ['pages'],
    });
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
    const pages = await fetchAPI<WPPage[]>(`pages?slug=${slug}`, {
        tags: ['pages', `page-${slug}`],
    });
    return pages[0] || null;
}

export async function getCategories(): Promise<WPCategory[]> {
    return fetchAPI<WPCategory[]>('categories?per_page=100', {
        tags: ['categories'],
    });
}

export async function getPostsByCategory(categoryId: number): Promise<WPPost[]> {
    return fetchAPI<WPPost[]>(`posts?categories=${categoryId}&_embed`, {
        tags: ['posts', `category-${categoryId}`],
    });
}

export async function searchPosts(query: string): Promise<WPPost[]> {
    return fetchAPI<WPPost[]>(`posts?search=${encodeURIComponent(query)}&_embed`, {
        revalidate: 0,
    });
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
}

export function truncate(str: string, length: number): string {
    const stripped = stripHtml(str);
    if (stripped.length <= length) return stripped;
    return stripped.slice(0, length) + '...';
}
