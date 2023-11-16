from rest_framework import serializers
from .models import Crypto


class CryptoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crypto
        fields = ['name', 'symbol', 'price', 'volume', 'marketCap','change', 'iconUrl','rank','key']