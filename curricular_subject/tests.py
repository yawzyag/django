from django.test import TestCase
from courses.models import Course
from customuser.models import User
from curricular_subject.models import curricular_subject

# Create your tests here.
class CurricularTestCase(TestCase):
    def setUp(self):
        user =  User.objects.create(name = "user", email="user@gmail.com", password="pass")
        instance = Course.objects.create(title = "curso 1")

        instance.students.set([user.id])

        curricular = curricular_subject.objects.create(title = "Lenguaje", teacher= user)
        curricular.course.set([instance.id])
        # curricular.teacher.set(user.id)
        """ 	"title": "Lenguaje",
	"course": [3],
	"teacher": 31 """

    def test_user(self):
        """testing my user"""
        test = Course.objects.get(title="curso 1")
        user = User.objects.get(name="user")
        curricular = curricular_subject.objects.get(title="Lenguaje")
        self.assertEqual(user.name, 'user')
        self.assertEqual(curricular.title, 'Lenguaje')
        self.assertEqual(test.title, 'curso 1')