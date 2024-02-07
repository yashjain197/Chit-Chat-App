run-ios:
	cd ChitChatFrontend && npm start

run-android:
	cd ChitChatFrontend && npm start

server:
	source venv/bin/activate && cd ChitChatBackend && python3 manage.py runserver 0.0.0.0:8000