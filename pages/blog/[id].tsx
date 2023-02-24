import Link from 'next/link';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import { getGlobalData } from '../../utils/global-data';
import SEO from '../../components/SEO';

import { parsePost, parseProperties, Post } from '../../api/parse-properties';
import { queryDatabase, queryPost } from '../../api/query-database';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { post } from 'cypress/types/jquery';

export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking',
    };
}

export async function getStaticProps(context) {
    const page = await queryPost(context.params.id);
    const post = parsePost(page);
    const globalData = getGlobalData();
    return { props: { post, globalData } };
}

export default function PostPage({ post, globalData }: { post: Post; globalData: any }) {
    const router = useRouter();

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    return (
        <Layout>
            <SEO title={globalData.name} description={globalData.blogTitle} />
            <Header name={globalData.name} />
            <main className="w-full">
                <h1 className="text-3xl lg:text-5xl text-center mb-12">
                    {globalData.blogTitle}
                </h1>
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
                                {post.body && (
                                    <p className="mt-3 text-lg opacity-60">
                                        {post.body}
                                    </p>
                                )}
                            </a>
                        </Link>
                    </li>
                </ul>
            </main>
            <Footer copyrightText={globalData.footerText} />
            <GradientBackground
                variant="large"
                className="fixed top-20 opacity-40 dark:opacity-60"
            />
            <GradientBackground
                variant="small"
                className="absolute bottom-0 opacity-20 dark:opacity-10"
            />
        </Layout>
    )
}