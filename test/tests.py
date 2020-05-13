from django.test import TestCase
from courses.models import Course
from customuser.models import User
from test.models import Test
from curricular_subject.models import curricular_subject

# Create your tests here.
class CurricularTestCase(TestCase):
    def setUp(self):
        user =  User.objects.create(name = "user", email="user@gmail.com", password="pass")
        instance = Course.objects.create(title = "curso 1")

        instance.students.set([user.id])

        curricular = curricular_subject.objects.create(title = "Lenguaje", teacher= user)
        curricular.course.set([instance.id])

        testing = Test.objects.create(title = "examen 1", note = 3, detail= "detail test", curricular_subject=curricular, tested=user)
        
        # curricular.teacher.set(user.id)
        """ 	"title": "Lenguaje",
	"course": [3],
	"teacher": 31 """

    def test_user(self):
        """testing my user"""
        examen = Test.objects.get(title="examen 1")
        test = Course.objects.get(title="curso 1")
        user = User.objects.get(name="user")
        curricular = curricular_subject.objects.get(title="Lenguaje")
        self.assertEqual(examen.title, 'examen 1')
        self.assertEqual(user.name, 'user')
        self.assertEqual(curricular.title, 'Lenguaje')
        self.assertEqual(test.title, 'curso 1')

""" title = models.CharField(max_length=100)
    note = models.IntegerField(blank=True, null=True,validators=[MinValueValidator(0),
                                       MaxValueValidator(5)])
    detail = models.CharField(max_length=500, blank=True)
    curricular_subject = models.ForeignKey(curricular_subject, on_delete=models.CASCADE)
    tested = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
 """
