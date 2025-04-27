//DB CREDENTIALS User: xxxxxxxx Password: xxxxxxxxxxx
import express from 'express' // importando biblioteca express
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const app = express() // instanciando express
app.use(express.json()) // middleware para converter o body da requisição em json
app.listen(3000)// escutando na porta 3000

//começa tratamento da API

app.post('/users', async (req, res) => { // definindo rota (POST) para criar usuário
   await prisma.user.create ({

    data: {
        email: req.body.email, // email do usuário
        name: req.body.name, // nome do usuário
        age: req.body.age, // idade do usuário
    }

   })
   res.status(201).json(req.body) // Resposta para a requisição

    }); //Fecha rota POST


app.get('/users', async (req, res) => { //definindo rota (GET) para listar usuários

 const users = await prisma.user.findMany()

res.status(200).send(users) // Resposta para a requisição

}); //Fecha rota GET


app.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: req.params.id, // Pode ser string normal
        },
        data: {
          email: req.body.email,
          name: req.body.name,
          age: req.body.age,
        }
      }); //Fecha rota PUT
  
      res.status(200).json(updatedUser); // Retorna o usuário atualizado
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    try {
      const deleteUser = await prisma.user.delete({
        where: {
          id: req.params.id, // Pode ser string normal
        },
       });
  
      res.status(200).json(deleteUser); // Retorna o usuário deletado
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({ error: 'Erro ao teletar usuário' });
    }
  }); //Fecha rota DELETE






