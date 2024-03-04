run-ios:
	cd ChitChatFrontend && npm start

run-android:
	cd ChitChatFrontend && npm start

server:
	 cd ChitChatBackend && source venv/bin/activate && python3 manage.py runserver 0.0.0.0:8001