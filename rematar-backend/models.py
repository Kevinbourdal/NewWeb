from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from marshmallow import fields
from flask_marshmallow import Marshmallow

from utils import response

db = SQLAlchemy()
ma = Marshmallow()

MAX_INTEGER_MYSQL = 2147483647


def parse_sql_errors(error):
    # decode mysql errors
    pass


class ModelBase:

    def commit(self):
        try:
            db.session.commit()
            return self
        except:
            return False

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except exc.IntegrityError as ex:
            return response(409, f'Confict in Database: {ex.args[0].split(".")[4]}')
        except Exception as ex:
            return response(500, f'Data base error\n{ex}')


class Permission(ModelBase, db.Model):
    __tablename__ = 'permission'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)

    def __init__(self, **kwargs):
        for key in kwargs:
            if hasattr(self, key):
                setattr(self, key, kwargs[key])

    def __repr__(self):
        return f'permission {self.id}'


class RoleSchema(ma.Schema):
    id = fields.Integer()
    # permission_id = fields.Integer()
    role_name = fields.Integer()


class RoleModel(ModelBase, db.Model):
    __tablename__ = 'role'

    PERMISION = {'admin': 1,
                 'fullview': 2,
                 'commonuser': 3,
                 }

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    # permission_id = db.Column('permission_id', db.ForeignKey('permission.id', ondelete='CASCADE'), nullable=False)
    role_name = db.Column('role_name', db.String(25), default='Unauthorized')

    def __init__(self, role_name):
        if role_name == 'admin':
            self.role_name = role_name
        elif role_name == 'fullview':
            self.role_name = role_name
        elif role_name == 'commonuser':
            self.role_name = role_name
        self.permission_id = self.PERMISION[self.role_name]

    def __repr__(self):
        return f'{self.role_name} role'


class AccountSchema(ma.Schema):
    id = fields.Integer()
    role_id = fields.Integer()
    email = fields.String()
    password = fields.String(required=True)


class AccountModel(ModelBase, db.Model):
    __tablename__ = 'account'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    role_id = db.Column('role_id', db.ForeignKey('role.id', ondelete='CASCADE'), nullable=True)
    email = db.Column('email', db.String(255), unique=True)
    password = db.Column('password', db.String(255), nullable=False)
    # last_update = db.Column('last_update', db.DateTime,server_default=db.func.current_timestamp(), nullable=True)

    def __init__(self, password, email):
        super(AccountModel, self).__init__()
        self.password = password
        self.email = email

    def __repr__(self):
        return f'Account {self.id}: {self.email}'


class UserSchema(ma.Schema):
    id = fields.Integer()
    account_id = fields.Integer()
    username = fields.String()
    firstname = fields.String()
    lastname = fields.String()
    sex = fields.String()
    dni_type = fields.String()
    dni = fields.String()
    civil_status = fields.String()
    province = fields.String()
    city = fields.String()
    address = fields.String()


class UserModel(ModelBase, db.Model):
    __tablename__ = 'user'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    account_id = db.Column('account_id', db.ForeignKey('account.id', ondelete='CASCADE'), nullable=False)
    username = db.Column('username', db.String(255), unique=True)
    firstname = db.Column('first', db.String(255), unique=False)
    lastname = db.Column('lastname', db.String(255), unique=False)
    sex = db.Column('sex', db.String(255), unique=False)
    dni_type = db.Column('dni_type', db.String(25), unique=False)
    dni = db.Column('dni', db.String(25), unique=True)
    civil_status = db.Column('civil_status', db.String(25), unique=False)
    province = db.Column('province', db.String(255), unique=False)
    city = db.Column('city', db.String(255), unique=False)
    address = db.Column('address', db.String(255), unique=False)
    # last_update = db.Column('last_update', db.DateTime,server_default=db.func.current_timestamp(), nullable=True)

    def __init__(self, username, firstname, lastname, sex, dni_type, dni, civil_status, province, city, address):
        super(UserModel, self).__init__()
        self.username = username
        self.firstname = firstname
        self.lastname = lastname
        self.sex = sex
        self.dni_type = dni_type
        self.dni = dni
        self.civil_status = civil_status
        self.province = province
        self.city = city
        self.address = address

    def __repr__(self):
        return f'user: {self.firstname} {self.lastname}'