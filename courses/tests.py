from django.test import TestCase
from .models import Course
from customuser.models import User

from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient

client = APIClient()
client.get('/api/courses')

# Using the standard RequestFactory API to create a form POST request
factory = APIRequestFactory()
request = factory.get('/api/courses')
print(request)
# Create your tests here.
class CourseTestCase(TestCase):
    def setUp(self):
        user =  User.objects.create(name = "custom", email="custom@gmail.com", password="pass")
        instance = Course.objects.create(title = "curso 1")

        instance.students.set([user.id])
        """         {
        "title": "curso 1",
        "students": [1, 5]
         } """

    def test_user(self):
        """testing my user"""
        test = Course.objects.get(title="curso 1")
        user = User.objects.get(name="custom")
        self.assertEqual(user.name, 'custom')
        self.assertEqual(test.title, 'curso 1')

