from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from .models import Crypto
from rest_framework.exceptions import APIException
from .serializers import CryptoSerializer
from rest_framework import status

@api_view(['GET', 'POST'])
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


@api_view(['GET', 'POST'])
def api_watchlist(request):
        try:
            watchlist = Crypto.objects.all()
        except Crypto.DoesNotExist:
            raise Http404()
        serialized_crypto = CryptoSerializer(watchlist, many = True)
        return Response(serialized_crypto.data, status=status.HTTP_200_OK)
    
    


   

