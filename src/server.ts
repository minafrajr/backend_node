import express from 'express';
import './database';
import { routes } from './routes/routes';

const app = express();

app.use(express.json());

app.use(routes);

/**
 * GET = buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Excluir
 * PATCH = alterar uma informação específica
 */

app.get('/', (req, res) => {
	// return res.send('Olá NLW 05');
	return res.json({ message: 'Olá NLW 05' });
});

app.post('/', (req, res) => {
	return res.json({
		message: 'Usuário salvo com sucesso',
	});
});

app.listen(3333, () => {
	console.log('Server is running on port 3333 http://localhost:3333');
});
