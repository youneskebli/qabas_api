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
    }
};
