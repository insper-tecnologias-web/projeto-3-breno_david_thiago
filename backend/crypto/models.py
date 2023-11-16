from django.db import models
from django.contrib.auth.models import User

class Crypto(models.Model):
    name = models.CharField(max_length=30, default = "")
    symbol = models.CharField(max_length = 10, default = "")
    price = models.FloatField(default = 0.0)
    volume = models.FloatField(default = 0.0)
    marketCap = models.FloatField(default = 0.0)
    rank = models.SmallIntegerField(default=0)
    change = models.FloatField(default = 0.0)
    iconUrl = models.CharField(max_length = 200, default = "")
    key = models.CharField(max_length = 20, primary_key=True, default = "Qwsogvtv82FCd" )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        string = "{0}.{1}.{2}".format(self.key,self.name, self.symbol,self.user)
        return string
    


