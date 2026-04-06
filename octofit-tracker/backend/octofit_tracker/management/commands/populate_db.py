from datetime import date

from django.core.management.base import BaseCommand

from ...models import Activity, Leaderboard, Team, User, Workout


def get_or_create_by_name(model, lookup, defaults=None):
    defaults = defaults or {}
    try:
        return model.objects.get(**lookup)
    except model.DoesNotExist:
        return model.objects.create(**{**lookup, **defaults})


class Command(BaseCommand):
    help = "Populate the octofit_db database with test data"

    def handle(self, *args, **options):
        teams = [
            get_or_create_by_name(
                Team,
                {'name': 'Aqua Squids'},
                {'description': 'A fast and friendly swim team.'},
            ),
            get_or_create_by_name(
                Team,
                {'name': 'Solar Striders'},
                {'description': 'Outdoor runners chasing the sun.'},
            ),
            get_or_create_by_name(
                Team,
                {'name': 'Power Pods'},
                {'description': 'Strength training and team workouts.'},
            ),
        ]

        users = [
            get_or_create_by_name(
                User,
                {'email': 'ava.reed@example.com'},
                {'name': 'Ava Reed', 'team': teams[0], 'is_active': True},
            ),
            get_or_create_by_name(
                User,
                {'email': 'noah.patel@example.com'},
                {'name': 'Noah Patel', 'team': teams[1], 'is_active': True},
            ),
            get_or_create_by_name(
                User,
                {'email': 'mia.chen@example.com'},
                {'name': 'Mia Chen', 'team': teams[2], 'is_active': True},
            ),
        ]

        activity_data = [
            (users[0], 'Swimming', 45, date(2026, 4, 1)),
            (users[1], 'Running', 30, date(2026, 4, 2)),
            (users[2], 'Weight Training', 55, date(2026, 4, 3)),
            (users[0], 'Stretching', 20, date(2026, 4, 4)),
        ]
        for user, activity_type, duration, activity_date in activity_data:
            get_or_create_by_name(
                Activity,
                {
                    'user': user,
                    'activity_type': activity_type,
                    'date': activity_date,
                },
                {'duration': duration},
            )

        workouts = [
            get_or_create_by_name(
                Workout,
                {'name': 'Morning HIIT'},
                {'description': 'Quick high-intensity interval workout.'},
            ),
            get_or_create_by_name(
                Workout,
                {'name': 'Evening Yoga'},
                {'description': 'Relaxing mobility and flexibility flow.'},
            ),
        ]
        workouts[0].suggested_for.set([teams[0], teams[1]])
        workouts[1].suggested_for.set([teams[1], teams[2]])

        get_or_create_by_name(Leaderboard, {'team': teams[0]}, {'total_points': 210})
        get_or_create_by_name(Leaderboard, {'team': teams[1]}, {'total_points': 170})
        get_or_create_by_name(Leaderboard, {'team': teams[2]}, {'total_points': 190})

        self.stdout.write(self.style.SUCCESS('Successfully populated octofit_db with test data'))
