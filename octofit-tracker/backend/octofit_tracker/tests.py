from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='testuser',
            email='testuser@example.com',
            password='password123',
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'testuser@example.com')

    def test_user_str(self):
        self.assertEqual(str(self.user), 'testuser')


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name='Alpha Team',
            members=['testuser'],
        )

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Alpha Team')

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Alpha Team')


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            username='testuser',
            activity_type='Running',
            duration=30.0,
            date='2026-02-25',
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, 'Running')

    def test_activity_str(self):
        self.assertIn('testuser', str(self.activity))


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.entry = Leaderboard.objects.create(
            username='testuser',
            score=100.0,
        )

    def test_leaderboard_creation(self):
        self.assertEqual(self.entry.score, 100.0)

    def test_leaderboard_str(self):
        self.assertIn('testuser', str(self.entry))


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Morning Run',
            description='A brisk morning run',
            duration=45,
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Morning Run')

    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Morning Run')


class APIRootTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UserAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            username='apiuser',
            email='apiuser@example.com',
            password='pass123',
        )

    def test_list_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {'username': 'newuser', 'email': 'new@example.com', 'password': 'pw'}
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TeamAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(name='Beta Team', members=[])

    def test_list_teams(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_team(self):
        data = {'name': 'Gamma Team', 'members': []}
        response = self.client.post('/api/teams/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ActivityAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_activities(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_activity(self):
        data = {'username': 'tester', 'activity_type': 'Cycling', 'duration': 60.0, 'date': '2026-02-25'}
        response = self.client.post('/api/activities/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LeaderboardAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_leaderboard_entry(self):
        data = {'username': 'scorer', 'score': 200.0}
        response = self.client.post('/api/leaderboard/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class WorkoutAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_workout(self):
        data = {'name': 'Evening Yoga', 'description': 'Relaxing yoga session', 'duration': 30}
        response = self.client.post('/api/workouts/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
