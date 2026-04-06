from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class UserModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Marvel', description='Marvel Team')
        self.user = User.objects.create(name='Tony Stark', email='tony@stark.com', team=self.team)

    def test_user_creation(self):
        self.assertEqual(self.user.name, 'Tony Stark')
        self.assertEqual(self.user.team.name, 'Marvel')

class ActivityModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='DC', description='DC Team')
        self.user = User.objects.create(name='Bruce Wayne', email='bruce@wayne.com', team=self.team)
        self.activity = Activity.objects.create(user=self.user, activity_type='Running', duration=30, date=timezone.now().date())

    def test_activity_creation(self):
        self.assertEqual(self.activity.user.name, 'Bruce Wayne')
        self.assertEqual(self.activity.activity_type, 'Running')

class WorkoutModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Avengers', description='Avengers Team')
        self.workout = Workout.objects.create(name='Pushups', description='Upper body workout')
        self.workout.suggested_for.add(self.team)

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Pushups')
        self.assertIn(self.team, self.workout.suggested_for.all())

class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Justice League', description='Justice League Team')
        self.leaderboard = Leaderboard.objects.create(team=self.team, total_points=100)

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.team.name, 'Justice League')
        self.assertEqual(self.leaderboard.total_points, 100)
