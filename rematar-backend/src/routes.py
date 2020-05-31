from views import UserView,ContactView

# list with each access point in dict format
urls = [
    {
        'resource': UserView,
        'path': '/register',
        'endpoint': 'register',
    },
{
        'resource': ContactView,
        'path': '/contact',
        'endpoint': 'contact',
    },
]
