import os
import urllib


BASEDIR = os.path.abspath(os.path.dirname(__file__))
DEBUG = False
WTF_CSRF_ENABLED = True
PROD = False

DATABASE = {
    'driver': '{MySQL ODBC 8.0 Driver}',
    'server': 'db',
    'port': '5001',
    'database': 'subastasenweb',
    'username': 'api_account',
    'password': 'fernetconcoca2020!',
}

params = urllib.parse.quote_plus(f'DRIVER={DATABASE["driver"]};' +
                                 f'SERVER={DATABASE["server"]};' +
                                 f'DATABASE={DATABASE["database"]};' +
                                 f'UID={DATABASE["username"]};' +
                                 f'PWD={DATABASE["password"]}')

SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = f'mysql://{DATABASE["username"]}:{DATABASE["password"]}@{DATABASE["server"]}:{DATABASE["port"]}/{DATABASE["database"]}'

SQLALCHEMY_POOL_RECYCLE = 3600
