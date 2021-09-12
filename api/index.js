import db from './db.js';

import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json())

app.get('/matricula', async (req, resp) =>  {
    try {
        let resultados = await db.tb_matricula.findAll({order: [['id_matricula', 'desc']] });
        resp.send(resultados)
    } catch (e) {
        resp.send({ erro: console.error.toString() })
    }
})

app.post('/matricula', async (req, resp) => {
    try {
        let {nome, chamada, curso, turma} = req.body; 

        let existe = await db.tb_matricula.findOne({where: {nr_chamada: chamada, nm_turma: turma}})

        if(existe != null){
            resp.send({erro: "Aluno Já Existe"})
        } else {

        let u = await db.tb_matricula.create({ 
          
                nm_aluno: nome,
                nr_chamada: chamada,
                nm_curso: curso, 
                nm_turma: turma

             })
        resp.send(u);
     }
    }
      
    catch (e){
        return resp.send({ erro: 'Ocorreu um Erro' });

    }

})


app.put('/matricula/:id', async (req, resp) => {
    try {
        let { nome, chamada, curso, turma } = req.body;
        let { id } = req.params;


        let e = await db.tb_matricula.update(
            {
                nm_aluno: nome,
                nr_chamada: chamada,
                nm_curso: curso, 
                nm_turma: turma
            },
            {
                where: {id_matricula: id}
            }
        )

        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() });
    }
})


app.delete('/matricula/:id', async (req, resp) => {
    try {
        let del = await db.tb_matricula.destroy ({where: { id_matricula: req.params.id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() });
    }
})



app.listen(process.env.PORT, x => console.log(`Server up at port ${process.env.PORT}`))