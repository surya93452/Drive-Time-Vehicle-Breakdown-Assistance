from flask import Flask,render_template,request,jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy 
from models import User
from chat import get_response
app=Flask(__name__)
app.config['SECRET_KEY'] = 'cairocoders-ednalan'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:surya%4093452@127.0.0.1/mechanic_login'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
db = SQLAlchemy(app)
@app.post("/predict")
def predict():
    text=request.get_json().get("message")
    response=get_response(text)
    message={"answer":response}
    return jsonify(message)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    shop_name = db.Column(db.String(255), nullable=False)  
    mechanic_name = db.Column(db.String(255), nullable=False)  
    contact_number = db.Column(db.String(15), nullable=False) 
    address = db.Column(db.String(255), nullable=False) 
    geolocation = db.Column(db.String(255), nullable=False)  
    shop_description = db.Column(db.Text, nullable=False) 
    isCarMechanic = db.Column(db.String(10), nullable=False) 
    state = db.Column(db.String(50), nullable=False)
    district = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    district_id = db.Column(db.String(50), nullable=False)
    city_id = db.Column(db.String(50), nullable=False)
    rating=db.Column(db.Integer, nullable=False)
    submitCount=db.Column(db.Integer)

with app.app_context():
    db.create_all()
with app.app_context():
    db.create_all()

class State(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    state_id = db.Column(db.String(255), unique=True, nullable=False)
    state_name = db.Column(db.String(255))

class District(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    district_id = db.Column(db.String(255), unique=True, nullable=False)
    district_name = db.Column(db.String(255))
    state_id=db.Column(db.String(255))

class Cities(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    city_id = db.Column(db.String(255), nullable=False)
    city_name = db.Column(db.String(255))
    district_id=db.Column(db.String(255), nullable=False)



@app.route("/")
def hello_world():
    return "Hello, World!"
@app.route("/reset", methods=["POST"])
def reset():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    existing_user = User.query.filter_by(email=email).first()
    if existing_user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
    if existing_user:
        # Update the existing user's information
        existing_user.password = bcrypt.generate_password_hash(password).decode('utf-8')
        db.session.commit()
        return jsonify({"message": "User updated successfully"})
    
    # else:
    #     # Create a new user
    #     hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    #     new_user = User(email=email, password=hashed_password)
    #     db.session.add(new_user)
    #     db.session.commit()
    #     return jsonify({"message": "User created successfully"})

@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
    shop_name =request.json["shop_name"]
    mechanic_name =request.json["mechanic_name"]
    contact_number =request.json["contact_number"]
    address =request.json["address"]
    geolocation =request.json["geolocation"]
    shop_description =request.json["shop_description"]
    isCarMechanic=request.json["isCarMechanic"]
    state=request.json["state"]
    district=request.json["district"]
    city=request.json["city"]
    district_id=request.json["district_id"]
    city_id=request.json["city_id"]
    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password, shop_name=shop_name, mechanic_name=mechanic_name, contact_number=contact_number, address=address, geolocation=geolocation, shop_description=shop_description, isCarMechanic=isCarMechanic, state=state, district=district, city=city, district_id=district_id, city_id=city_id)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email,
        "shop_name": user.shop_name,
        "mechanic_name": user.mechanic_name,
        "contact_number": user.contact_number,
        "address": user.address,
        "geolocation": user.geolocation,
        "shop_description": user.shop_description,
        "isCarMechanic": user.isCarMechanic,
        "state": user.state,
        "district": user.district,
        "city": user.city,
        "district_id":user.district_id,
        "city_id":user.city_id


    })

@app.route('/retrievelocations', methods=['GET'])
def get_locations():
    states = State.query.all()
    districts = District.query.all()
    cities = Cities.query.all()
    
    state_list= []
    for result in states:
        temp_dict = result.__dict__
        temp_dict.pop('_sa_instance_state',None)
        state_list.append(temp_dict) 

    district_list= []
    for result in districts:
        temp_dict = result.__dict__
        temp_dict.pop('_sa_instance_state',None)
        district_list.append(temp_dict) 

    city_list= []
    for result in cities:
        temp_dict = result.__dict__
        temp_dict.pop('_sa_instance_state',None)
        city_list.append(temp_dict) 

    location_data = {
        'states': state_list,
        'districts': district_list,
        'cities': city_list,
    }

    return jsonify(location_data)

@app.route("/getCityListByDistrict", methods=["POST"])
def city():
    district_id = request.json["districtId"]
    


    cities = Cities.query.filter_by(district_id = district_id)
    db.session.commit()
    

    city_list= []
    for result in cities:
        temp_dict = result.__dict__
        temp_dict.pop('_sa_instance_state',None)
        city_list.append(temp_dict) 

    return jsonify({ 'cities': city_list    })


@app.route("/update_user", methods=["POST"])
def update_user():
    email = request.json.get("email")
    # if not email:
    #     return jsonify({"error": "Email not provided"}), 400

    user = User.query.filter_by(email=email).first()
    # if not user:
    #     return jsonify({"error": "User not found"}), 404

    # Update user fields based on the provided data

    user.shop_name = request.json.get("shop_name", user.shop_name)
    user.mechanic_name = request.json.get("mechanic_name", user.mechanic_name)
    user.contact_number = request.json.get("contact_number", user.contact_number)
    user.address = request.json.get("address", user.address)
    user.geolocation = request.json.get("geolocation", user.geolocation)
    user.shop_description = request.json.get("shop_description", user.shop_description)
    user.state = request.json.get("state", user.state)
    user.district = request.json.get("district", user.district)
    user.city = request.json.get("city", user.city)
    # user.district_id = request.json.get("district_id", user.district_id)
    user.district_id = request.json["district_id"]
    user.city_id = request.json.get("city_id", user.city_id)

    db.session.commit()

    return jsonify({
        "id": user.id,
        "shop_name": user.shop_name,
        "mechanic_name": user.mechanic_name,
        "contact_number": user.contact_number,
        "address": user.address,
        "geolocation": user.geolocation,
        "shop_description": user.shop_description,
        "isCarMechanic": user.isCarMechanic,
        "state": user.state,
        "district": user.district,
        "city": user.city,
        "district_id": user.district_id,
        "city_id": user.city_id
        
    })

@app.route("/get_users_by_city", methods=["POST"])
def get_users_by_city():
    city_id = request.json["city_id"]
    isCarMechanic = request.json.get("isCarMechanic")
    if not city_id:
        return jsonify({"error": "City ID not provided"}), 400

    # Query users based on city_id
    users = User.query.filter_by(city_id=city_id, isCarMechanic=isCarMechanic).all()

    # Prepare response
    users_info = [{
        
        "email": user.email,
        "shop_name": user.shop_name,
        "mechanic_name": user.mechanic_name,
        "contact_number": user.contact_number,
        "address": user.address,
        "geolocation": user.geolocation,
        "shop_description": user.shop_description,
        "rating": user.rating / user.submitCount if(user.rating > 0 and user.submitCount > 0) else 0
    } 
    for user in users]

    return jsonify({"users": users_info})

@app.route('/submit_review', methods=['POST'])
def submit_review():
    rating = request.json.get('rating')
    email = request.json.get("email")

    if not rating or not (1 <= rating <= 5):
        return jsonify({'error': 'Invalid rating. Please choose a rating between 1 and 5.'}), 400

    user = User.query.filter_by(email=email).first()

    user.rating += rating
    user.submitCount += 1

    db.session.commit()

    if user.submitCount > 0:
        average_rating = user.rating / user.submitCount
    else:
        average_rating = 0


    return jsonify({
        "rating": user.rating,
        'averageRating': average_rating

    })

    # return jsonify({
    #     "rating": user.rating
    # })

 
if __name__=="__main__":
    app.run(debug=True)