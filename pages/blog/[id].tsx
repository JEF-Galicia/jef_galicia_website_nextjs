import Link from 'next/link';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import { getGlobalData } from '../../utils/global-data';
import SEO from '../../components/SEO';

import { parsePost, parseProperties, Post } from '../../api/parse-properties';
import { queryDatabase, queryPost, retrieveBlockChildren } from '../../api/query-database';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { post } from 'cypress/types/jquery';
import { Render, withContentValidation } from '@9gustin/react-notion-render';
import '@9gustin/react-notion-render/dist/index.css';
import styles from './[id].module.css';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking',
    };
}

export async function getStaticProps(context) {
    const page = await queryPost(context.params.id);
    const blockChildren = await (await retrieveBlockChildren(context.params.id)).results as BlockObjectResponse[];

    const childBlocks = await Promise.all(
        blockChildren
            .filter((block) => block.has_children)
            .map(async (block) => {
                return {
                    id: block.id,
                    children: await (await retrieveBlockChildren(block.id)).results as BlockObjectResponse[],
                }
            })
    );
    const blocksWithChildren = blockChildren.map((block) => {
        // Add child blocks if the block should contain children but none exists
        if (block.has_children && !block[block.type].children) {
            block[block.type].children = childBlocks.find(
                (x) => x.id === block.id
            )?.children
        }
        return block
    });

    const post = parsePost(page);
    const globalData = getGlobalData();
    return { props: { post, blockChildren: blocksWithChildren, globalData } };
}

export default function PostPage({ post, blockChildren, globalData }: { post: Post; blockChildren: any; globalData: any }) {
    const router = useRouter();

    const blockComponentsMapper = {
        'image': withContentValidation((props) => {
            return <img src={(props as any).source} />
        }),
        'heading_1': withContentValidation((props) => {
            return (<h1 className="text-3xl md:text-5xl font-semibold mt-6">{props.children}
            </h1>)
        }),
        'heading_2': withContentValidation((props) => {
            return (<h2 className="text-2xl md:text-4xl font-semibold opacity-70 mt-4">{props.children}
            </h2>)
        }),
        'heading_3': withContentValidation((props) => {
            return (<h3 className="text-xl md:text-3xl font-semibold opacity-70 mt-4">{props.children}
            </h3>)
        }),
        /*'numbered_list_item': withContentValidation((props) => {
            return (<li className="list-decimal list-inside">{props.children}</li>)
        }),
        'bulleted_list_item': withContentValidation((props) => {
            console.log(props);
            return (
                <ul>
                    {(props.config.block.items as any[]).map((child) => {
                        console.log(child);
                        return <li className="list-disc list-inside">{blockComponentsMapper(withContentValidation(child))}</li>
                        return <li className="list-disc list-inside">{child.content.text[0].text.content}</li>
                    })
                    }
                </ul>
            );
            return (<li className="list-disc list-inside">{props.children} ABC</li>)
        }),*/
        'paragraph': withContentValidation((props) => {
            return (<p className="text-lg">{props.children}</p>)
        }),
        'quote': withContentValidation((props) => {
            return (<blockquote className="text-lg italic">{props.children}</blockquote>)
        }),
        'divider': withContentValidation((props) => {
            return (<hr className="my-6" />)
        }
        ),
        'code': withContentValidation((props) => {
            return (<pre className="bg-gray-800 text-white p-4 rounded-md my-6">{props.children}</pre>)
        }),
        'callout': withContentValidation((props) => {
            return (<div className="bg-primary-50 p-4 rounded-md">{props.children}</div>)
        }),
        'toggle': withContentValidation((props) => {
            return (<details className="bg-primary-50 p-4 rounded-md">
                <summary>{(props as any).title}</summary>
                {props.children}
            </details>)
        }
        ),
    };


    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <SEO title={globalData.name} description={globalData.blogTitle} />
            <main className="w-full">
                <h1 className="text-3xl lg:text-5xl text-center mb-12">
                    {globalData.blogTitle}
                </h1>
                <div className="w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b">
                    <div className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                        {post.date && (
                            <p className="uppercase mb-3 font-bold opacity-60">
                                {new Date(post.date).toLocaleDateString('es-ES')}
                            </p>
                        )}
                        <h2 className="text-3xl md:text-5xl font-semibold">{post.title}</h2>
                        {post.description && (
                            <p className="mt-3 opacity-60 mb-6 font-semibold text-2xl">
                                {post.description}
                            </p>
                        )}
                        <Render blocks={blockChildren} useStyles classNames blockComponentsMapper={blockComponentsMapper} />
                    </div>
                </div>
            </main>
        </>
    )
}