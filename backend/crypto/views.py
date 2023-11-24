from django.shortcuts import render, redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import Http404, HttpResponseForbidden, JsonResponse, HttpResponse
from .models import Crypto, Post, Comment
from rest_framework.exceptions import APIException
from .serializers import CryptoSerializer, PostSerializer, CommentSerializer, UserSerializer
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

@api_view(['GET','POST'])
def api_user(request):
    if request.method == 'POST':
        username = request.data['username']
        email = request.data['email']
        password = request.data['password']

        user = User.objects.create_user(username, email, password)
        user.save()
        return Response(status=204)
    users = User.objects.all()
    serialized_user = UserSerializer(users, many = True)
    return Response(serialized_user.data)


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def api_user_info(request):
    if request.method == 'POST':
        return Response(status=204)
    
    user_info = User.objects.get(username=request.user)
    serialized_user = UserSerializer(user_info)
    print(serialized_user.data)
    return Response(serialized_user.data)
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def api_crypto(request, uuid):
    try:
        crypto = Crypto.objects.get(key=uuid, user=request.user)
        print(crypto)
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
                key=new_crypto_data['key'],
                user = request.user
            )
            new_crypto.save()
        else:
            crypto.delete()
            return HttpResponse(status=204)

        return Response({"message": "Crypto saved successfully"}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_watchlist(request):
        try:
            watchlist = Crypto.objects.filter(user=request.user)
        except Crypto.DoesNotExist:
            raise Http404()
        serialized_crypto = CryptoSerializer(watchlist, many = True)
        return Response(serialized_crypto.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def api_post_all(request):
    if request.method == 'POST':
        new_post_data = request.data
        new_post = Post(content = new_post_data['content'], user = request.user)
        new_post.save()

    post_all = Post.objects.all()
    serialized_post = PostSerializer(post_all, many = True)
    return Response(serialized_post.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_post_user(request):
    post_user = Post.objects.filter(user=request.user)
    serialized_post = PostSerializer(post_user, many = True)
    return Response(serialized_post.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def api_comments(request,id):
    post = Post.objects.get(id = id)
    if request.method == 'POST':
        new_comment_data = request.data
        new_comment = Comment(content = new_comment_data['content'], user = request.user, post = post)
        new_comment.save()

    post_comments = Comment.objects.filter(post = post)
    serialized_comments = CommentSerializer(post_comments, many = True)
    serialized_post = PostSerializer(post)
    return Response([serialized_comments.data, serialized_post.data])
    


   

