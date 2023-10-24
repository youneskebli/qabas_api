export const config = {
    db: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'e_book',
        username: 'postgres',
        password: 'esi37021108',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
    },
    nodeMailerOptions: {
        transport: {
            service:'gmail',
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth: {
                user:'youneskebli9@gmail.com',
                pass:'jotj qtav vkcn echl'
            },
            tls: {
                rejectUnauthorized: true
            }
        }
    },

    frontEndKeys: {
        url: 'localhost',
        port: 4200,
        endpoints: ['auth/reset-password', 'auth/verify-email'],
    },
};
