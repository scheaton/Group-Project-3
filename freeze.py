from flask_frozen import Freezer
from app import app
from config import base_url

if __name__ == '__main__':
    app.config["FREEZER_BASE_URL"] = base_url
    freezer = Freezer(app)
    freezer.freeze()

# app.config['FREEZER_RELATIVE_URLS'] = True

# freezer = Freezer(app)

# if __name__ == '__main__':
#     freezer.freeze()