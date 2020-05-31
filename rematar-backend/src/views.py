import marshmallow
from flask import request
from flask_restful import Resource

from models import (
    AccountModel,
    RoleModel,
    UserModel,
    UserSchema,
    AccountSchema,
    ContactModel,
    ContactSchema
)
from utils import (
    response,
    get_data,
    gen_token,
    decode_token,
    validate_token
)


class BaseView(Resource):
    """
    Class base with methods common in other views
    """

    def __init__(self):
        super(BaseView, self).__init__()

    def get(self):
        return response(401)

    def post(self):
        return response(401)

    def put(self):
        return response(401)

    def delete(self):
        return response(401)


class RoleView(BaseView):

    def __init__(self):
        super(RoleView, self).__init__()
        # self.role_schema = RoleSchema()
        # self.roles_schema = RoleSchema(many=True)


class AccountView:

    def __init__(self):
        super(AccountView, self).__init__()
        self.account_schema = AccountSchema()
        self.accounts_schema = AccountSchema(many=True)


class UserView(BaseView, AccountView):
    """
    Class user which allow register, login and logout an user
    """

    def __init__(self):
        super(UserView, self).__init__()
        self.user_schema = UserSchema()
        self.users_schema = UserSchema(many=True)

    def get(self):
        response(200)

    def post(self):
        json_data, error = get_data(request)
        if not error:
            try:
                account_data = self.account_schema.load({'email': json_data['email'],
                                                         'password': json_data['password']})
                user_data = self.user_schema.load({'username': '',
                                                   'firstname': json_data['fname'],
                                                   'lastname': json_data['lname'],
                                                   'sex': json_data['sex'],
                                                   'dni_type': 'DNI',
                                                   'dni': json_data['dni'],
                                                   'civil_status': 'Single',
                                                   'province': json_data['province'],
                                                   'city': json_data['city'],
                                                   'address': '?'})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            new_account = AccountModel(**account_data)
            new_user = UserModel(**user_data)
            error = new_account.save()
            if not error:
                new_user.account_id = new_account.id
                error = new_user.save()
                if not error:
                    return response(200, data={'id': new_user.id})

        return response(400, msg="Error en backend")


class ContactView(BaseView):
    """
    Class user which allow register, login and logout an user
    """

    def __init__(self):
        super(ContactView, self).__init__()
        self.contact_schema = ContactSchema()
        self.contacts_schema = ContactSchema(many=True)

    def get(self):
        response(200)

    def post(self):
        json_data, error = get_data(request)
        if not error:
            try:

                contact_data = self.contact_schema.load({
                                                   'fullname': json_data['name'],
                                                   'cel_phone': json_data['phone'],
                                                   'body': json_data['body'],
                                                   'email': json_data['email']})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            new_contact = ContactModel(**contact_data)
            error = new_contact.save()
            if not error:
                return response(200, data={'id': new_contact.id})

        return response(400, msg="Error en backend")


class LoginView(BaseView):
    def post(self):
        json_data, error = get_data(request)
        if not error:
            account = AccountModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                if account.password == json_data['password']:
                    user = UserModel.query.filter_by(account_id=account.id).first()  # deberia existir

                    token = gen_token({'email': account.email,
                                       'username': user.username})

                    return response(200, data={'token': token, 'username': user.username})

        return response(400, msg='error')
