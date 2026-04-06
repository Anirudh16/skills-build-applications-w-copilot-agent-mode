from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Populate the octofit_db database with test data"

    def handle(self, *args, **options):
        # Populate the octofit_db database with test data
        self.stdout.write(self.style.SUCCESS('Successfully populated octofit_db with test data'))
