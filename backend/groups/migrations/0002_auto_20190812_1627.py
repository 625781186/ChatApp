# Generated by Django 2.2.3 on 2019-08-12 11:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
        ('groups', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Membership',
            new_name='GroupMembership',
        ),
        migrations.AlterModelOptions(
            name='groupmembership',
            options={'verbose_name': 'Membership in group', 'verbose_name_plural': 'Memberships in group'},
        ),
    ]