from rest_framework import routers
from .api import CurricularSubjectViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register('api/curricular', CurricularSubjectViewSet, 'curricular')

urlpatterns = router.urls
