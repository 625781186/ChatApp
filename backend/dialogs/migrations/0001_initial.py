# Generated by Django 2.2.3 on 2019-08-12 11:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dialog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'verbose_name': 'Dialog',
                'verbose_name_plural': 'Dialogs',
            },
        ),
        migrations.CreateModel(
            name='DialogMembership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dialog', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dialogs.Dialog')),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profiles.Profile')),
            ],
            options={
                'verbose_name': 'Membership in dialog',
                'verbose_name_plural': 'Memberships in dialogs',
                'unique_together': {('person', 'dialog')},
            },
        ),
        migrations.AddField(
            model_name='dialog',
            name='members',
            field=models.ManyToManyField(related_name='dialogs', through='dialogs.DialogMembership', to='profiles.Profile'),
        ),
    ]
