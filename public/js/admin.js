const socket = io();
let connectionsUsers = [];
socket.on('admin_list_all_users', (connections) => {
	connectionsUsers = connections;
	document.getElementById('list_users').innerHTML = '';
	let template = document.getElementById('template').innerHTML;

	connections.forEach((connection) => {
		const rendered = Mustache.render(template, {
			email: connection.user.email,
			id: connection.socket_id,
		});
		document.getElementById('list_users').innerHTML += rendered;
	});
});

function call(id) {
	const connection = connectionsUsers.find(
		(connection) => connection.socket_id === id
	);
	const template = document.getElementById('admin_template').innerHTML;

	const rendered = Mustache.render(template, {
		email: connection.user.email,
		id: connection.user_id,
	});

	document.getElementById('supports').innerHTML += rendered;

	const params = {
		user_id: connection.user_id,
	};

	socket.emit('admin_list_messages_by_user', params, (messages) => {
		const divMessages = document.getElementById(
			`allMessages${connection.user_id}`
		);

		messages.forEach((message) => {
			const createDiv = document.createElement('div');

			if (message.admin_id === null) {
				createDiv.className = 'admin_message_client';

				createDiv.innerHTML = `<span class="admin_user_email">${connection.user.email}</span>`;
				createDiv.innerHTML += `<span class="admin_date">${dayjs(
					message.created_at
				).format('DD/MM/YYYY HH:mm:ss')}`;
				createDiv.innerHTML += `<span>${message.text}</span>`;
			} else {
				createDiv.className = 'admin_message_admin';

				createDiv.innerHTML = `Atendente`;
				createDiv.innerHTML += `<span class = "admin_date">${dayjs(
					message.created_at
				).format('DD/MM/YYY HH:mm:ss')}`;
				createDiv.innerHTML += `<span>${message.text}</span>`;
			}
			divMessages.appendChild(createDiv);
		});
		scrollToEnd(`allMessages${connection.user_id}`);
	});
}

function sendMessage(id) {
	const text = document.getElementById(`send_message_${id}`);

	const params = {
		text: text.value,
		user_id: id,
	};

	socket.emit('admin_send_message', params);

	const divMessages = document.getElementById(`allMessages${id}`);

	const createDiv = document.createElement('div');

	createDiv.className = 'admin_message_admin';

	createDiv.innerHTML = `Atendente`;
	createDiv.innerHTML += `<span class = "admin_date">${dayjs().format(
		'DD/MM/YYY HH:mm:ss'
	)}`;
	createDiv.innerHTML += `<span>${params.text}</span>`;

	divMessages.appendChild(createDiv);

	text.value = '';

	scrollToEnd(`allMessages${id}`);
}

socket.on('admin_receive_message', (data) => {
	const connection = connectionsUsers.find(
		(connections) => connections.socket_id === data.socket_id
	);
	console.log(connection);
	const divMessages = document.getElementById(
		`allMessages${connection.user.id}`
	);
	const createDiv = document.createElement('div');

	createDiv.className = 'admin_message_client';

	createDiv.innerHTML = `<span class="admin_user_email">${connection.user.email}</span>`;
	createDiv.innerHTML += `<span class="admin_date">${dayjs(
		data.message.created_at
	).format('DD/MM/YYYY HH:mm:ss')}`;
	createDiv.innerHTML += `<span>${data.message.text}</span>`;

	divMessages.appendChild(createDiv);

	scrollToEnd(`allMessages${connection.user.id}`);
});

function scrollToEnd(id) {
	const inputText = document.getElementById(id);
	inputText.scrollTop = inputText.scrollHeight;
}
