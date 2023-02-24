import Link from 'next/link';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import { getGlobalData } from '../../utils/global-data';
import SEO from '../../components/SEO';

import { parseProperties, Post } from '../../api/parse-properties';
import { queryDatabase, queryPost } from '../../api/query-database';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type PostProps = {
    globalData: any;
};

export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: true,
    };
}

export async function getStaticProps(context: any) {
    const database = await queryPost(context.params.id);
    const post = parseProperties(database)[0];
    const globalData = getGlobalData();
    return { props: { globalData } };
}

export default async function PostPage({ globalData }: PostProps) {
    const [post, setPost] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        queryPost('Bienvenida').then((database) => {
            const post = parseProperties(database)[0];
            setPost(post);
            setLoading(false);
        });
    }, [])

    if (isLoading) return <p>Cargando...</p>
    if (!post) return <p>Non se atopou o artigo.</p>

    return (
        <Layout>
            <main className="w-full">
                <ul className="w-full">
                    <li
                        key={post.id}
                        className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
                    >
                        <Link
                            as={`/posts/${post.id.replace(/\.mdx?$/, '')}`}
                            href={`/posts/[slug]`}
                        >
                            <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                                {post.date && (
                                    <p className="uppercase mb-3 font-bold opacity-60">
                                        {new Date(post.date).toLocaleDateString('es-ES')}
                                    </p>
                                )}
                                <h2 className="text-2xl md:text-3xl">{post.title}</h2>
                                {post.description && (
                                    <p className="mt-3 text-lg opacity-60">
                                        {post.description}
                                    </p>
                                )}
                            </a>
                        </Link>
                    </li>
                </ul>
            </main>
            <GradientBackground
                variant="large"
                className="fixed top-20 opacity-40 dark:opacity-60"
            />
            <GradientBackground
                variant="small"
                className="absolute bottom-0 opacity-20 dark:opacity-10"
            />
        </Layout>
    );
}
