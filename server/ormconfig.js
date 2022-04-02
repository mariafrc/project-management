module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nestjs_project_management',
    entities: ['dist/**/*.entity{.js, .ts}'],
    synchronize: true,
    autoLoadEntities: true
}