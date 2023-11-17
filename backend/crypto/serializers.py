from rest_framework import serializers
from .models import Crypto, Post
from django.contrib.auth.models import User


class CryptoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crypto
        fields = ['name', 'symbol', 'price', 'volume', 'marketCap','change', 'iconUrl','rank','key']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Post
        fields = ['content', 'user']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Post
        fields = ['content', 'user']
