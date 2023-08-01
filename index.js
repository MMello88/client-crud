const axios = require('axios');

const baseURL = 'http://localhost:3333'; // Substitua pelo endereço do seu servidor

// Cria uma instância do axios com a URL base da API
const api = axios.create({ baseURL });

async function run() {
  // Cria um novo usuário
  const result = await api.post('/api/users/signup', {
    firstName: 'Test',
    lastName: 'User',
    email: 'mat@gmail.com',
    password: 'password123'
  });

  console.log(`Criado usuário: ${result.data.user.firstName} ${result.data.user.lastName}`);
  

  // Autentica e recebe o token
  const auth = await api.post('/api/users/signin', {
    email: 'mat@gmail.com',
    password: 'password123'
  });

  console.log(`Autenticado com o token: ${auth.data.token}`);

  
  // Define o token de autorização para a instância do axios
  api.defaults.headers.common['Authorization'] = `Bearer ${auth.data.token}`;

  // Busca todos os usuários
  const users = await api.get('/api/users');
  console.log('Todos os usuários:', users.data);

  
  

  // Busca um usuário por ID
  const singleUser = await api.get(`/api/users/${users.data[0].id}`);
  console.log('Usuário buscado:', singleUser.data);

  // Atualiza um usuário
  const updatedUser = await api.put(`/api/users/${users.data[0].id}`, {
    firstName: 'Updated',
    lastName: 'User'
  });

  console.log('Usuário atualizado:', updatedUser.data);

  // Deleta um usuário
  await api.delete(`/api/users/${users.data[0].id}`);
  console.log('Usuário deletado');
  
  
}

run().catch(error => console.error(error));
