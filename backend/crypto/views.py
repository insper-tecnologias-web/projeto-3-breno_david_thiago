from django.shortcuts import render, redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import Http404, HttpResponseForbidden, JsonResponse
from .models import Crypto
from rest_framework.exceptions import APIException
from .serializers import CryptoSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

@api_view(['POST'])
def api_get_token(request):
    try:
        if request.method == 'POST':
            username = request.data['username']
            password = request.data['password']
            user = authenticate(username=username, password=password)

            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                return JsonResponse({"token":token.key})
            else:
                return HttpResponseForbidden()
    except:
        return HttpResponseForbidden()

@api_view(['POST'])
def api_user(request):
    if request.method == 'POST':
        username = request.data['username']
        email = request.data['email']
        password = request.data['password']

        user = User.objects.create_user(username, email, password)
        user.save()
        return Response(status=204)
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def api_crypto(request, uuid):
    try:
        crypto = Crypto.objects.get(key=uuid)
    except Crypto.DoesNotExist:
        crypto = None  # Set crypto to None if it doesn't exist

    if request.method == "POST":
        if crypto is None:
            new_crypto_data = request.data
            new_crypto = Crypto(
                name=new_crypto_data['name'],
                symbol=new_crypto_data['symbol'],
                price=new_crypto_data['price'],
                rank = new_crypto_data['rank'],
                volume=new_crypto_data['volume'],
                marketCap=new_crypto_data['marketCap'],
                change=new_crypto_data['change'],
                iconUrl=new_crypto_data['iconUrl'],
                key=new_crypto_data['key']
            )
            new_crypto.save()
        else:
            crypto.delete()
        return Response({"message": "Crypto saved successfully"}, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def api_watchlist(request):
        try:
            watchlist = Crypto.objects.all()
        except Crypto.DoesNotExist:
            raise Http404()
        if request.method == "DELETE":
            watchlist.delete()
        serialized_crypto = CryptoSerializer(watchlist, many = True)
        return Response(serialized_crypto.data, status=status.HTTP_200_OK)
    
    


   

