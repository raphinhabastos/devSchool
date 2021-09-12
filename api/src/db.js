import initdb from './models/init-models.js'

import Sequelize from 'sequelize';
const sequelize = new Sequelize(

    'NOME_BD',
    'NOME_USU',
    'SENHA', {

     host: 'ENDERECO_SERVIDOR',
    dialect: 'mysql',
    logging: false
});

const db = initdb(sequelize);
export default db;