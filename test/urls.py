from rest_framework import routers
from .api import TestViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register('api/tests', TestViewSet, 'tests')

urlpatterns = router.urls