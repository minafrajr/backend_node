import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

class UsersService {
	private usersRepository: Repository<User>;

	constructor() {
		this.usersRepository = getCustomRepository(UsersRepository);
	}
	async create(email: string) {
		const userExists = await this.usersRepository.findOne({ email });

		//verifica se já existe o user no banco e retorna esse usuário existente
		if (userExists) {
			return userExists;
		}

		//cria o usuário pois não exist
		const user = this.usersRepository.create({
			email,
		});

		await this.usersRepository.save(user);
		//irá retornar o usuário criado pois ele não existe no banco
		return user;
	}
}

export { UsersService };
