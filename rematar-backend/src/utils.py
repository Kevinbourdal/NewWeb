import jwt
from datetime import datetime as dt


STATUS = {200: 'Success',
          201: 'Created',
          204: 'No Content',
          301: 'Moved Permanently',
          400: 'Bad Requests',
          402: 'No user found',
          401: 'Unauthorized',
          404: 'Not found',
          409: 'Conflict',
          413: 'Payload Too Large',
          500: 'Internal error'
          }

JWT_SECRET_KEY = 'subastasenweb.key'
JWT_ALGORITHM = 'HS256'
JWT_NOISE = b'salt'


def response(status_code, msg='', data=None):
    res = {'code': status_code, 'status_code': STATUS[status_code]}
    if msg:
        res.update({'error': msg})
        print(msg)
    if data is not None:
        res.update({'data': data})

    return res, status_code


def get_data(request):
    try:
        json_data = request.get_json(force=True)
    except:
        json_data = None
    if not json_data:
        return None, response(400, 'No input data provided')
    return json_data, None


def gen_token(data):
    encoded_content = jwt.encode(data, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    token = str(encoded_content).split("'")[1]
    return token


def decode_token(token):
    try:
        data = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])

    except Exception as e:
        print(e)
        data = None
    return data


def validate_dates(first_date, last_date=None, date_format='%Y-%m-%d'):
    if last_date is None:
        last_date = dt.now()
    if isinstance(first_date, str):
        first_date = dt.strptime(first_date, date_format)
    return first_date < last_date


def validate_json_payload(json_data, fileds):
    field = None
    try:
        for (field, required) in fileds:
            if not (json_data[field] or required):
                json_data[field] = None
            elif (not json_data[field]) and required:
                return json_data, response(400, f'Missing value for "{field}" field in payload')
        return json_data, None
    except KeyError:
        return json_data, response(400, f'Missing "{field}" field in payload')


def validate_token(token):
    token_data = token.decode_token().query.filter_by().first()
    if 'username' in token_data.keys():
        return token_data['username'], None

    return None, response(400, 'Wrong token')
