from views import UserView, ContactView, LoginView

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
    {
        'resource': LoginView,
        'path': '/login',
        'endpoint': 'login',
    }
]
