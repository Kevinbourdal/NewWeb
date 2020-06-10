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
    CharacteristicValueSchema,
    OfferSchema,
    OfferModel,
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


class AccountView (BaseView):

    def __init__(self):
        super(AccountView, self).__init__()
        self.account_schema = AccountSchema()
        self.accounts_schema = AccountSchema(many=True)

    def post(self):
        json_data, error = get_data(request)
        if not error:
            try:
                account_data = self.account_schema.load({'email': json_data['email'],
                                                         'username': json_data['username'],
                                                         'password': json_data['password']})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            new_account = AccountModel(**account_data)
            error = new_account.save()
            if not error:
                return response(200, data={'id': new_account.id})

        return response(400, msg="Error en backend")


class UserView(BaseView):
    """
    Class user which allow register, login and logout an user
    """

    def __init__(self):
        super(UserView, self).__init__()
        self.user_schema = UserSchema()
        self.users_schema = UserSchema(many=True)

    def get(self):
        a = request
        username = request.args.get('username', None)
        if username is not None:
            account = AccountModel.query.filter_by(username=username).first()
            user = UserModel.query.filter_by(account_id=account.id).first()
            if user is not None:
                return response(200, data={'user': {'firstname': user.firstname,
                                                    'lastname': user.lastname,
                                                    'sex': user.sex,
                                                    'dni_type': user.dni_type,
                                                    'dni': user.dni,
                                                    'bdate': user.bdate,
                                                    'province': user.province,
                                                    'city': user.city,
                                                    'address': user.address,
                                                    'phone': user.phone,
                                                    'mStatus': user.mStatus,
                                                    'email': account.email}})
        return response(400)

    def post(self):
        json_data, error = get_data(request)
        if not error:
            try:
                user_data = self.user_schema.load({'firstname': json_data['fname'],
                                                   'lastname': json_data['lname'],
                                                   'sex': json_data['sex'],
                                                   'dni_type': json_data['dni_type'],
                                                   'dni': json_data['dni'],
                                                   'bdate': json_data['bdate'],
                                                   'province': json_data['province'],
                                                   'city': json_data['city'],
                                                   'address': json_data['address'],
                                                   'phone': json_data['phone'],
                                                   'mStatus': json_data['mStatus']})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))
            new_user = UserModel(**user_data)
            account = AccountModel.query.filter_by(username=json_data['username']).first()
            new_user.account_id = account.id
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
                contact_data = self.contact_schema.load({'fullname': json_data['name'],
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
                                       'username': account.username})

                    return response(200, data={'token': token,
                                               'username': account.username,
                                               'has_user': user is not None})  # send false if not has user already

        return error


class OfferView(BaseView):
    """
    Class Auctions to see the auction table
    """

    def __init__(self):
        super(OfferView, self).__init__()
        self.auction_schema = OfferSchema()
        self.actions_schema = OfferSchema(many=True)

    def get(self, offer_id):
        offer = OfferModel.query.filter_by(id=offer_id).first()
        if offer is not None:
            offer = OfferModel.query.filter_by().first()
            user = UserModel.query.filter_by(id=offer.user_id).first()
            if user is not None:
                return response(200, data={'offer': {'firstname': user.firstname,
                                                     'lastname': user.lastname,
                                                     'amount': offer.amount,
                                                     'hour': offer.hour,
                                                     'diff': offer.diff,
                                                     'date': offer.date}})
        return response(400)

    def post(self):
        json_data, error = get_data(request)

        if not error:
            try:
                offer_data = self.auction_schema.load({'amount': json_data['amount'],
                                                       'hour': json_data['hour'],
                                                       'diff': json_data['diff'],
                                                       'username': json_data['username'],
                                                       'date': json_data['date']})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))
            new_auction = OfferSchema(**offer_data)
            error = new_auction.save().get_contacts()
            if not error:
                return response(200, data={'id': new_auction.id})

        return response(400, msg="Error en backend")


class NewAuctionView(BaseView):
    """
    Class to save/get new auction in data base
    """

    def __init__(self):
        super(NewAuctionView, self).__init__()
        self.auction_schema = AuctionSchema(unknown='EXCLUDE')
        self.auction_schemas = AuctionSchema(many=True, unknown='EXCLUDE')
        self.item_schema = ItemSchema(unknown='EXCLUDE')
        self.urlimage_schema = UrlImageSchema(unknown='EXCLUDE')
        self.keyvalue_schema = CharacteristicKeyValueSchema(unknown='EXCLUDE')
        self.value_schema = CharacteristicValueSchema(unknown='EXCLUDE')
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

            for auction in auctions:
                item = ItemModel.query.filter_by(auction_id=auction['id']).first()
                url = UrlImageModel.query.filter_by(item_id=item.id).first()
                auction['url_image'] = url.url if url is not None else None

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
                key_values = []
                values = []
                for key, value in json_data['key_value']:
                    key_values.append(self.keyvalue_schema.load({'key': key, 'value': value}))
                for value in json_data['value']:
                    values.append(self.value_schema.load({'value': value}))
                for url in json_data['url_images']:
                    urls.append(self.urlimage_schema.load({'url': url}))

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
                        for key_value in key_values:
                            new_value = CharacteristicKeyValueModel(**key_value)
                            new_value.item_id = new_item.id
                            error = new_value.save()
                            if error:
                                break
                        for value in values:
                            new_value = CharacteristicValueModel(**value)
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
                key_values = CharacteristicKeyValueModel.query.filter_by(item_id=item.id).all()
                key_values = self.keyvalue_schema.dump(key_values)
                urls = UrlImageModel.query.filter_by(item_id=item.id).all()
                urls = self.urlimage_schema.dump(urls)
                auction = self.auction_schema.dump(auction)
                item = self.item_schema.dump(item)
                return response(200, data={'auction': auction,
                                           'item': item,
                                           'key_values': key_values,
                                           'url_images': urls})
        return response(400)



#token = request.header['token']
#username, error = validate_token(token)
#if not error:
