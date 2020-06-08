from views import UserView, ContactView, LoginView, AccountView, OfferView

# list with each access point in dict format
urls = [
    {
        'resource': UserView,
        'path': '/mi_perfil',
        'endpoint': 'mi_perfil',
    },
    {
        'resource': AccountView,
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
    },

    {
        'resource': OfferView,
        'path': '/offer/<int:offer_id>',
        'endpoint': 'offer',
    }
]
