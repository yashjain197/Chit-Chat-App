"""
ASGI config for ChitChatBackend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
import chat.routing
from channels.layers import get_channel_layer

from channels.routing import ProtocolTypeRouter, URLRouter
from chennels.security.websocket import AllowedHostOriginValidator
from django_channels_jwt_auth_middleware.auth import JWTAuthMiddlewareStack

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ChitChatBackend.settings")

django_asgi_app = get_asgi_application()
application = ProtocolTypeRouter({
    'http' : django_asgi_app,
    'websocket': AllowedHostOriginValidator(
        JWTAuthMiddlewareStack(
            URLRouter(chat.routing.websocket_urlpatterns)
        )
    )   
})
