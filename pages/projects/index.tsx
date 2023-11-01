import Link from 'next/link';
import BoxComponent from '../../components/Box';
import { FormattedMessage } from 'react-intl';
import { GoogleDirectory } from '../../api/client';
import { admin_directory_v1 } from 'googleapis';
import Card from '../../components/Card';

// Get the paths to all the projects
export async function getStaticProps() {
    const projects = await GoogleDirectory.groups.list({
        domain: 'projects.jef.gal',
    }).then((res) => {
        return res.data.groups;
    });

    return {
        props: {
            projects,
        },
    };
}

export default function ProjectIndexPage({ projects }: { projects: admin_directory_v1.Schema$Group[] }) {
    // get all the projects (pages under /projects/*)
    // render a list of links to those pages

    return (
        <BoxComponent>
            <h1 className='text-3xl font-semibold'><FormattedMessage defaultMessage="Proxectos" /></h1>
            <p className='mt-4'><FormattedMessage defaultMessage="Aquí tes unha lista de todos os proxectos que temos en marcha. Se queres saber máis sobre algún deles, só tes que facer click no seu nome." /></p>
            <ul className='mt-8'>
                {projects.map((g) => (
                    <Card key={g.id}>
                        <Link href={'projects/' + g.email}>
                            {g.name}
                            <p className='text-gray-500 dark:text-gray-400 mt-1'>
                                {/* Format plural: 1 membro, 2 membros, 3 membros, etc. */}
                                <FormattedMessage defaultMessage="{count, plural, one {# membro} other {# membros}}" values={{ count: g.directMembersCount }} />
                            </p>
                        </Link>
                    </Card>
                ))}
            </ul>
        </BoxComponent>
    )
}