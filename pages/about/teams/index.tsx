import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { admin_directory_v1 } from 'googleapis';
import { GoogleDirectory } from '../../../api/client';
import BoxComponent from '../../../components/Box';
import Card from '../../../components/Card';

// Get the paths to all the projects
export async function getStaticProps() {
    const teams = await GoogleDirectory.groups.list({
        domain: 'teams.jef.gal',
    }).then((res) => {
        return res.data.groups;
    });

    const memberships = await Promise.all(teams.map(async (g) => ({
        [g.id]: await GoogleDirectory.members.list({
            groupKey: g.email,
            includeDerivedMembership: true,
        }).then((res) => res.data).catch((e) => {
            console.error(`Error getting members of ${g.email}: ${e}`);
            return ({
                members: []
            });
        })
    }))).then((res) => {
        return res.reduce((acc, membership) => {
            return { ...acc, ...membership }; // Merge all the objects into one
        }
            , {});
    }
    );

    console.log(teams);
    console.log(memberships);

    return {
        props: {
            teams,
            memberships,
        },
        revalidate: 3600, // revalidate every hour
    };
}

export default function ProjectIndexPage({ teams, memberships }: { teams: admin_directory_v1.Schema$Group[], memberships: { [x: string]: admin_directory_v1.Schema$Members } }) {
    // get all the projects (pages under /projects/*)
    // render a list of links to those pages

    return (
        <BoxComponent>
            <h1 className='text-3xl font-semibold'><FormattedMessage defaultMessage="Equipos" /></h1>
            <p className='mt-4'><FormattedMessage defaultMessage="Aquí tes unha lista de todos os equipos de traballo de JEF Galicia. Se queres saber máis sobre algún deles ou consultar os seus integrantes, só tes que facer click no seu nome." /></p>
            <ul className='mt-8'>
                {teams.map((g) => (
                    <Card key={g.id} href={'teams/' + g.email}>
                        <h2>
                            {g.name}
                        </h2>
                        {/* Show the number of members in each team */}
                        <p className='text-gray-500 dark:text-gray-400 mt-1'>
                            {/* Format plural: 1 membro, 2 membros, 3 membros, etc. */}
                            <FormattedMessage defaultMessage="{count, plural, one {# membro} other {# membros}}" values={{ count: memberships[g.id]?.members?.length ?? 0 }} />
                        </p>
                    </Card>
                ))}
            </ul>
        </BoxComponent>
    )
}
