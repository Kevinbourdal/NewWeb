import jwt


STATUS = {200: 'Success',
          201: 'Created',
          204: 'No Content',
          301: 'Moved Permanently',
          400: 'Bad Requests',
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


def validate_token(token_data, data):
    for key in data.keys():
        if key in token_data.keys():
            if token_data[key] != data[key]:
                return response(400, 'Wrong token')
    return None