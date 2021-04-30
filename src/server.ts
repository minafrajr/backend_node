import { http } from './http';
import './websocket/client';
import './websocket/admin';

http.listen(3333, () => {
	console.log(
		'Server is running on port 3333 \n use http://localhost:3333 \n http://localhost:3333/pages/client => para teste do chat'
	);
});

/**
 * GET = buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Excluir
 * PATCH = alterar uma informação específica
 */
// app.get('/', (req, res) => {
// 	// return res.send('Olá NLW 05');
// 	return res.json({ message: 'Olá NLW 05' });
// });

// app.post('/', (req, res) => {
// 	return res.json({
// 		message: 'Usuário salvo com sucesso',
// 	});
// });
