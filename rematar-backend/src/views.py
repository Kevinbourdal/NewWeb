import marshmallow
from flask import request
from flask_restful import Resource

from marshmallow.exceptions import ValidationError

from models import (
    AccountModel,
    RoleModel,
    UserModel,
    UserSchema,
    AccountSchema,
    ContactModel,
    ContactSchema,
    AuctionModel,
    AuctionSchema,
    ItemModel,
    ItemSchema,
    UrlImageModel,
    UrlImageSchema,
    CharacteristicKeyValueModel,
    CharacteristicKeyValueSchema,
    CharacteristicValueModel,
    CharacteristicValueSchema
)
from utils import (
    response,
    get_data,
    gen_token,
    decode_token,
    validate_token,
    validate_json_payload,
)


class BaseView(Resource):
    """
    Class base with methods common in other views
    """

    def __init__(self):
        super(BaseView, self).__init__()

    def get(self, **kwargs):
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


class NewAuctionView(BaseView):
    """
    Class to save/get new auction in data base
    """

    def __init__(self):
        super(NewAuctionView, self).__init__()
        self.auction_schema = AuctionSchema(unknown='EXCLUDE')
        self.auction_schemas = AuctionSchema(many=True, unknown='EXCLUDE')
        self.item_schema = ItemSchema(unknown='EXCLUDE')
        self.urlimage_schema = UrlImageSchema(many=True, unknown='EXCLUDE')
        self.keyvalue_schema = CharacteristicKeyValueSchema(many=True, unknown='EXCLUDE')
        self.value_schema = CharacteristicValueSchema(many=True, unknown='EXCLUDE')
        self.category_map = {
            'Vehiculo': 'automobile',
            'Inmueble': 'property',
            'Agricola': 'farm',
            'Otros': 'other'
        }

    def get(self):
        category = request.args.get('category', 'farm')
        if category is not None:
            auctions = AuctionModel.query.all()  #filter_by(category=category)
            auctions = self.auction_schemas.dump(auctions)
            return response(200, data={'auctions': auctions})
        return response(404)

    def post(self):
        """
        AuctionModel,
        ItemModel,
        UrlImageModel,
        CharacteristicKeyValueModel,
        CharacteristicValueModel,
        """
        json_data, error = get_data(request)
        if not error:
            # se puede validar que los campos requeridos estan vacios
            # if validate_json_payload(json_data,
            #                          [(c,True) for c in ['action']])>
            #     pass
            try:
                # Try to catch errors en requests, such as missing fields
                json_data['category'] = self.category_map[json_data['category']]
                auction = self.auction_schema.load(json_data)  # ['auction']
                item = self.item_schema.load(json_data)  # ['item']
                urls = []
                for url in json_data['url_images']:
                    urls.append(self.urlimage_schema.load(url))  # ['urls']
                # key_value = self.keyvalue_schema.load(json_data) # ['keyvalues']
                values = []
                for value in json_data['value']:
                    values.append(self.value_schema.load(value))  # ['values']
            except ValidationError as e:
                return response(400, str(e))
            except Exception as ex:
                return response(400, str(ex))

            new_auction = AuctionModel(**auction)
            error = new_auction.save()
            if not error:
                new_item = ItemModel(**item)
                new_item.auction_id = new_auction.id
                error = new_item.save()
                if not error:
                    for url in urls:
                        new_urls = UrlImageModel(**url)
                        new_urls.item_id = new_item.id
                        error = new_urls.save()
                        if error:
                            break
                    if not error:
                        # new_key_value = CharacteristicKeyValueModel(**key_value)
                        for value in values:
                            new_value = CharacteristicKeyValueModel(**value)
                            new_value.item_id = new_item.id
                            error = new_value.save()
                            if error:
                                break
                        if not error:
                            return response(200, data={'id': new_auction.id})

        return response(400, str(error))


class AuctionDetailView(BaseView):

    def __init__(self):
        super(AuctionDetailView, self).__init__()
        self.auction_schema = AuctionSchema(unknown='EXCLUDE')
        self.item_schema = ItemSchema(unknown='EXCLUDE')
        self.urlimage_schema = UrlImageSchema(many=True, unknown='EXCLUDE')
        self.keyvalue_schema = CharacteristicKeyValueSchema(many=True, unknown='EXCLUDE')
        self.value_schema = CharacteristicValueSchema(many=True, unknown='EXCLUDE')
        self.category_map = {
            'Vehiculo': 'automobile',
            'Inmueble': 'property',
            'Agricola': 'farm',
            'Otros': 'other'
        }

    def get(self, auction_id):
        auction = AuctionModel.query.filter_by(id=auction_id).first()
        if auction is not None:
            item = ItemModel.query.filter_by(auction_id=auction.id).first()
            if item is not None:
                auction = self.auction_schema.dump(auction)
                item = self.item_schema.dump(item)
                return response(200, data={'auction': auction,
                                           'item': item})
        return response(400)


