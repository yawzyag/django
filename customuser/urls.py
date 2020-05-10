from rest_framework import routers
from .api import UserViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register('api/users', UserViewSet, 'users')

urlpatterns = router.urls