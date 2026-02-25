from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Deleting existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating users...')
        users = [
            User(username='ironman', email='ironman@avengers.com', password='password123'),
            User(username='captainamerica', email='captainamerica@avengers.com', password='password123'),
            User(username='thor', email='thor@avengers.com', password='password123'),
            User(username='blackwidow', email='blackwidow@avengers.com', password='password123'),
            User(username='hulk', email='hulk@avengers.com', password='password123'),
            User(username='superman', email='superman@dcjustice.com', password='password123'),
            User(username='batman', email='batman@dcjustice.com', password='password123'),
            User(username='wonderwoman', email='wonderwoman@dcjustice.com', password='password123'),
            User(username='theflash', email='theflash@dcjustice.com', password='password123'),
            User(username='aquaman', email='aquaman@dcjustice.com', password='password123'),
        ]
        for user in users:
            user.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(users)} users'))

        self.stdout.write('Creating teams...')
        marvel_members = [u.username for u in users[:5]]
        dc_members = [u.username for u in users[5:]]
        teams = [
            Team(name='Team Marvel', members=marvel_members),
            Team(name='Team DC', members=dc_members),
        ]
        for team in teams:
            team.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(teams)} teams'))

        self.stdout.write('Creating activities...')
        activities = [
            Activity(username='ironman', activity_type='Running', duration=30.0, date=date(2024, 1, 10)),
            Activity(username='captainamerica', activity_type='Cycling', duration=45.0, date=date(2024, 1, 11)),
            Activity(username='thor', activity_type='Weightlifting', duration=60.0, date=date(2024, 1, 12)),
            Activity(username='blackwidow', activity_type='Yoga', duration=50.0, date=date(2024, 1, 13)),
            Activity(username='hulk', activity_type='Swimming', duration=40.0, date=date(2024, 1, 14)),
            Activity(username='superman', activity_type='Flying', duration=20.0, date=date(2024, 1, 10)),
            Activity(username='batman', activity_type='Martial Arts', duration=55.0, date=date(2024, 1, 11)),
            Activity(username='wonderwoman', activity_type='Sparring', duration=45.0, date=date(2024, 1, 12)),
            Activity(username='theflash', activity_type='Sprinting', duration=15.0, date=date(2024, 1, 13)),
            Activity(username='aquaman', activity_type='Swimming', duration=60.0, date=date(2024, 1, 14)),
        ]
        for activity in activities:
            activity.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(activities)} activities'))

        self.stdout.write('Creating leaderboard...')
        leaderboard_entries = [
            Leaderboard(username='ironman', score=320.0),
            Leaderboard(username='captainamerica', score=410.0),
            Leaderboard(username='thor', score=500.0),
            Leaderboard(username='blackwidow', score=390.0),
            Leaderboard(username='hulk', score=450.0),
            Leaderboard(username='superman', score=480.0),
            Leaderboard(username='batman', score=360.0),
            Leaderboard(username='wonderwoman', score=420.0),
            Leaderboard(username='theflash', score=530.0),
            Leaderboard(username='aquaman', score=370.0),
        ]
        for entry in leaderboard_entries:
            entry.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard_entries)} leaderboard entries'))

        self.stdout.write('Creating workouts...')
        workouts = [
            Workout(name='Iron Man Cardio Blast', description='High intensity cardio inspired by Iron Man suit training', duration=30),
            Workout(name='Captain America Endurance Run', description='Long distance running to build super soldier stamina', duration=45),
            Workout(name='Thor Power Lifting', description='Heavy compound lifts to build godlike strength', duration=60),
            Workout(name='Black Widow Flexibility', description='Full body stretching and flexibility for ninja agility', duration=40),
            Workout(name='Hulk Strength Circuit', description='Intense strength circuit for maximum muscle growth', duration=50),
            Workout(name='Superman Flight Training', description='Plyometric exercises to simulate flight training', duration=35),
            Workout(name='Batman Combat Training', description='Mixed martial arts and combat readiness drills', duration=60),
            Workout(name='Wonder Woman Warrior Training', description='Ancient Greek warrior conditioning program', duration=50),
            Workout(name='Flash Speed Intervals', description='Ultra-fast sprint intervals to boost speed and agility', duration=25),
            Workout(name='Aquaman Aquatic Training', description='Water resistance exercises for full body conditioning', duration=55),
        ]
        for workout in workouts:
            workout.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workouts'))

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
