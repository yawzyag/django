from django.test import TestCase
from .models import User

class CustomUserTestCase(TestCase):
    def setUp(self):
        User.objects.create(name = "test", email="estudiante2@gmail.com", password="pass")

    def test_user(self):
        """testing my user"""
        user = User.objects.get(name="test")
        self.assertEqual(user.name, 'test')