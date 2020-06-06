from views import UserView, ContactView, LoginView, NewAuctionView

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
    },
    {
        'resource': NewAuctionView,
        'path': '/newauction',
        'endpoint': 'newauction',
    }

]
