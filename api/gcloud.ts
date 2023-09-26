import { GoogleDirectory } from './client';

export const getGoogleUsers = async () => {
    return GoogleDirectory.users.list({
        domain: 'jef.gal',
    }).then((res) => {
        console.log(res);
    }
    ).catch((err) => {
        console.log(err);
    }
    );
}