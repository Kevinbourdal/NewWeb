from views import UserView


# list with each access point in dict format
urls = [
    {
        'resource': UserView,
        'path': '/register',
        'endpoint': 'register',
    },
]
