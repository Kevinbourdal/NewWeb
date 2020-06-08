from views import UserView, ContactView, LoginView, NewAuctionView, AuctionDetailView

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
    },
    {
        'resource': AuctionDetailView,
        'path': '/detail/<int:auction_id>',
        'endpoint': 'auction_detail',
    }

]
