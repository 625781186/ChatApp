import pytest
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken
from channels.testing import WebsocketCommunicator


User = get_user_model()
pytestmark = [pytest.mark.asyncio]


async def test_auth_empty_data(com: WebsocketCommunicator):
    await com.send_json_to({'event': 'authenticate', 'data': {}})
    response = await com.receive_json_from()
    assert response["status"] == "error"
    assert response["data"] == {'detail': 'Access token must not be empty'}
    await com.disconnect()


async def test_auth_invalid_token(com: WebsocketCommunicator):
    token = "test"
    await com.send_json_to({'event': 'authenticate',
                           'data': {'access_token': token}})
    response = await com.receive_json_from()
    assert response["status"] == "error"
    assert response["data"] == {'detail': 'Token is not valid'}
    await com.disconnect()


@pytest.mark.django_db
async def test_auth_valid_token(com: WebsocketCommunicator):
    user = User.objects.create(username="test_user", password="test_password")
    access_token = AccessToken.for_user(user)
    await com.send_json_to({'event': 'authenticate',
                           'data': {'access_token': str(access_token)}})
    response = await com.receive_json_from()
    assert response["status"] == "ok"
    assert response["data"] == {'detail': 'Authorization successed'}
    await com.disconnect()


@pytest.mark.django_db
async def test_auth_expired_token(com: WebsocketCommunicator):
    user = User.objects.create(username="test_user", password="test_password")
    access_token = AccessToken.for_user(user)
    lst = list(str(access_token))
    lst[15] = lst[15].swapcase()
    access_token = ''.join(lst)
    await com.send_json_to({'event': 'authenticate',
                           'data': {'access_token': access_token}})
    response = await com.receive_json_from()
    assert response["status"] == "error"
    assert response["data"] == {'detail': 'Token is not valid'}
    await com.disconnect()