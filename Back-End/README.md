# WanderQuest Back-End structure

## Description
**WanderQuest** is a virtual trip planning website that helps the users to enjoy seamless booking and exciting trip experience.

## Prerequisites
To make sure that the Back-End works well and the server runs smoothly in your pc, you should write the following in your terminal:

```sh
npm install
```

To install all the necessary packages used in the Back-End structure
- *Make sure you are inside the path **(WanderQuest/Back-End/)***
- *You are free to browse the **package.json** file to view all the versions of the packages used*

## Usage
To run the Back-End server, use the following command in the terminal:

```sh
npm run dev
```

- *Make sure you are inside the path **(WanderQuest/Back-End/)***

## Contents

### Database Schemas (Models)
*All the schemas have 3 extra fields, **_id**, **"CreatedAt"** and **"UpdatedAt"** that specifies the time that a record was created and updated at*

#### Admin
Fields:
- *Username*
- *Password*

#### User
Fields:
- *Username*
- *email*
- *Password*
- *role*
- *accepted*
- *rejected*
- *isTermsAccepted*
- *requestToBeDeleted*
- *documents*
- *otp*

##### User Discriminators

###### *Tourist*
Extra Fields:
- *nationality*
- *mobileNumber*
- *dob*
- *job*
- *wallet*
- *preferredCurrency*
- *totalPoints*
- *availablePoints*
- *level*
- *wishlist*
- *savedEvents*
- *cart*

###### *TourGuide*
Extra Fields:
- *yearsOfExperience*
- *mobileNumber*
- *previousWork*

###### *Advertiser*
Extra Fields:
- *companyName*
- *companyDescription*
- *companyAddress*
- *websiteLink*
- *hotline*

###### *Seller*
Extra Fields:
- *sellerDescription*
- *sellerName*

#### Object

##### Object Discriminators
###### *rating*
Fields:
- touristId (ref tourist)
- rating

###### *Tags*
Fields:
- *type*

###### *PrefTag*
Fields:
- *type*

###### *rating*
Fields:
- touristId (ref tourist)
- rating

###### *Places*
Fields:
- *title*
- *description*
- *pictures*
- *location*
- *openingHours*
- *ticketPrices*
- *tags*
- *createdBy*

###### *Product*
Fields:
- *name*
- *picture*
- *price*
- *description*
- *seller*
- *ratings (array of ratings (ref rating))*
- *rating*
- *reviews*
- *availableAmount*

###### *ActivityCategory*
Fields:
- *category*

###### *Activity*
Fields:
- *title*
- *date*
- *time*
- *location*
- *price*
- *priceRange*
- *ratings (array of ratings (ref rating))*
- *rating*
- *category* (references ActivityCategory)
- *tags*
- *specialDiscounts*
- *bookingIsOpen*
- *createdBy*


###### *Itinerary*
Fields:
- *activities*
- *locations*
- *timeline*
- *duration*
- *language*
- *price*
- *ratings (array of ratings (ref rating))*
- *rating*
- *availableDates*
- *time*
- *accessibility*
- *pickUpLocation*
- *dropOffLocation*
- *tags*
- *BookingAlreadyMade*
- *createdBy*
- *bookingIsOpen*

###### *Complaint*
Fields:
- *title*
- *body*
- *status*(pending or resolved)
- *date*
- *reply*
- *createdBy* (ref tourist)


#### TourGovernor
Fields:
- *Username*
- *Password*

#### Booking
Fields:
- userId (ref: User)
- bookingType ('flight', 'hotel', 'transportation', 'activity' and 'itinerary')
- itineraryId (only when the booking is an itinerary)
- activityId (only when the booking is an activity)
- details (optional)
- paid
- status ('booked' and 'cancelled')
- startDate

#### transportation
Fields:
- company: (filled automatically)
- type
- price
- departure
- arrival
- date
- bookingAlreadyMade
- pickUpLocation
- dropOffLocation
- createdBy (ref: Advertiser)

#### Order
Fields:
- orderedBy: (ref: Tourist)
- products: An array of json objects {productId, quantity}
- totalPrice (pre calculated)
- date
- status ['pending', 'cancelled', 'sent to delivery', 'delivered']

### controllers
This folder is to control all the methods and functions that modifies in the schema.

### middleware
This folder is to handle all the middle functions that sits between the Front-End and the Back-End (like the authentication)

### routes
The main route that contains all the APIs is:
```
http://localhost:4000/
```
&nbsp;

After that, several links can be added depending on the method you are calling from the API:
&nbsp;

```
/admin
```
This is the admin route.
Contains all the API methods that are related to the admin functionalities
#### Admin methods
- Get all admins

**GET**: *http://localhost:4000/admin/*

- Get all users

**GET**: *http://localhost:4000/admin/users*

- Delete account off system

**DELETE**: *http://localhost:4000/admin/delete/:id*

- Add an admin

**POST**: *http://localhost:4000/admin/*

- Add tourism governor

**POST**: *http://localhost:4000/admin/governor*

- Get products

**GET**: *http://localhost:4000/admin/products*

- Get product by ID

**GET**: *http://localhost:4000/admin/product/:id*

- Get available products

**GET**: *http://localhost:4000/admin/availableProducts*

- Add product

**POST**: *http://localhost:4000/admin/addProduct/*

- Edit product

**PATCH**: *http://localhost:4000/admin/editProduct/:id*

- Add activity category

**POST**: *http://localhost:4000/admin/addCategory*

- Get categories

**GET**: *http://localhost:4000/admin/categories*

- Edit category

**PATCH**: *http://localhost:4000/admin/editCategory/:id*

- Delete category

**DELETE**: *http://localhost:4000/admin/deleteCategory/:id*

- Get tags

**GET**: *http://localhost:4000/admin/tags*

- Create tag

**POST**: *http://localhost:4000/admin/addTag*

- Update tag

**PATCH**: *http://localhost:4000/admin/editTag/:id*

- Delete tag

**DELETE**: *http://localhost:4000/admin/deleteTag/:id*

-Archive Product

**PATCH**: *http://localhost:4000/admin/products/archive/:id*

-Unarchive Products

**PATCH**: *http://localhost:4000/admin/products/unarchive/:id*

- Get complaints

**GET**: *http://localhost:4000/admin/complaints*

- Get specific complaint

**GET**: *http://localhost:4000/admin/complaints/:id*
*id is the complaint's id*

- Mark a complaint as pending or Resolved

**PATCH**: *http://localhost:4000/admin/markComplaint/:id*
*id is the complaint's id*

-view all product sales
**GET**: *http://localhost:4000/admin/sales*

- reply to complaint

**PATCH**: *http://localhost:4000/admin/reply/:id*
*id is the complaint's id*

-get product photo
**GET**: *http://localhost:4000/admin/productPhoto/:id*

- create a promocode
**POST**: *http://localhost:4000/admin/promo*

- get all promocodes
**GET**: *http://localhost:4000/admin/promocodes*

- delete a promocode
**DELETE**: *http://localhost:4000/admin/promocodes/:id*

- get user statstics
**GET**:*http://localhost:4000/admin/userStats*

- view sales report
**GET**: *http://localhost:4000/admin/salesReport*

- flag an activity
**PATCH**: *http://localhost:4000/admin/flagActivity/:id*

-  get my notifications
**GET**: *http://localhost:4000/admin/notifs*

-Mark all notifications as read

**PATCH**: *http://localhost:4000/admin/notifs*

- getAvailableProducts

**GET**: *http://localhost:4000/admin/availableProducts*

&nbsp;

```
/register
```
This is the **registration** route.
Contains all the API methods that are related to the registration functionalities
#### Registration methods
- Register a user

**POST**: *http://localhost:4000/register/*

&nbsp;

```
/advertiser
```
This is the **advertiser** route.
Contains all the API methods that are related to the advertiser functionalities
#### Advertiser methods
- Get profile

**GET**: *http://localhost:4000/advertiser/profile*

- Update profile

**PUT**: *http://localhost:4000/advertiser/profile*

-upload logo

**POST**: *http://localhost:4000/advertiser/uploadLogo*

- Get all advertisers

**GET**: *http://localhost:4000/advertiser/allAdvertisers*

- Get activities

**GET**: *http://localhost:4000/advertiser/activities*

- Get activity by ID

**GET**: *http://localhost:4000/advertiser/activity/:id*

- Create activity

**POST**: *http://localhost:4000/advertiser/activity*

- Update activity

**PUT**: *http://localhost:4000/advertiser/activity/:id*

- Delete activity

**DELETE**: *http://localhost:4000/advertiser/activity/:id*

- Get my created activities

**GET**: *http://localhost:4000/advertiser/myActivities*

- Create trasportation post

**POST**: *http://localhost:4000/advertiser/transportation/create*

**NOTE**: The input to that API is through request body, you need to provide type, price, departure (city), arrival (city), date, bookingAlreadyMade, pickUpLocation (bus terminal), dropOffLocation (bus terminal)

- Read all trasportations

**GET**: *http://localhost:4000/advertiser/transportations*

- Get Notifications
**GET**: *http://localhost:4000/advertiser/notifs*

- Mark all Notifications as read
**PATCH**: *http://localhost:4000/advertiser/notifs*

- view sales report
**GET**: *http://localhost:4000/advertiser/salesReport*

-view tourists report
**GET**:  *http://localhost:4000/advertiser/TouristReport*

-get categories
**GET**: *http://localhost:4000/advertiser/categories*

-Get all tags
**GET**:*http://localhost:4000/advertiser/tags*


&nbsp;

```
/seller
```
This is the **seller** route.
Contains all the API methods that are related to the seller functionalities
#### Seller methods
- Get profile

**GET**: *http://localhost:4000/seller/profile/:id*

- Update profile

**PUT**: *http://localhost:4000/seller/profile/:id*

- Get products

**GET**: *http://localhost:4000/seller/products*

- Get product by ID

**GET**: *http://localhost:4000/seller/products/:id*

- Add product

**POST**: *http://localhost:4000/seller/addProduct*

- Edit product

**PATCH**: *http://localhost:4000/seller/editProduct/:id*

- Get available products

**GET**: *http://localhost:4000/seller/availableProdcuts*

- Upload Logo

**POST**: *http://localhost:4000/seller/uploadLogo*

- Get Logo
**GET**: *http://localhost:4000/seller/logo*

- archive product

**PATCH**: *http://localhost:4000/seller/archiveProduct/:id*

- Unarchive product

**PATCH**: *http://localhost:4000/seller/unarchiveProduct/:id*

- View Product Sales
**GET**: *http://localhost:4000/seller/sales*

- Get Specific Product's Photo
**GET**: *http://localhost:4000/seller/productPhoto/:id*

- Get Sales Report
**GET**: *http://localhost:4000/seller/salesReport*

- Get Notifications
**GET**: *http://localhost:4000/seller/notifs*

- Mark all Notifications as Read
**PATCH**: *http://localhost:4000/seller/notifs*


&nbsp;

This is the tourist route.
```
/tourist
```
This is the **tourist** route.
Contains all the API methods that are related to the tourist functionalities
#### Tourist methods
- Get profile
**GET**: *http://localhost:4000/tourist/profile*

- Update profile
**PUT**: *http://localhost:4000/tourist/profile*

- Get available prodcuts
**GET**: *http://localhost:4000/tourist/availableProdcuts*

- Get upcoming activities
**GET**: *http://localhost:4000/tourist/upcomingActivities*

- Get activity by ID
**GET**: *http://localhost:4000/tourist/upcomingActivities/:id*

- Get upcoming itineraries
**GET**: *http://localhost:4000/tourist/upcomingItineraries*

- Get itinerary by ID
**GET**: *http://localhost:4000/tourist/upcomingItineraries/:id*

- Get all upcoming places
**GET**: *http://localhost:4000/tourist/upcomingPlaces*

- Get place by ID
**GET**: *http://localhost:4000/tourist/upcomingPlaces/:id*

-Rate a product
**POST**: *http://localhost:4000/tourist/rateProduct/:id*

-Review Product
**POST**: *http://localhost:4000/tourist/reviewProduct/:id*

- Redeem Points
**PATCH**: *http://localhost:4000/tourist/redeem*

- File a complaint
**POST**: *http://localhost:4000/tourist/fileComplaint*

- Get my Complaints
**GET**: *http://localhost:4000/tourist/myComplaints*
*id is the tourist's id who wants to see his complaints*

- Get tourist's level
**GET**: *http://localhost:4000/tourist/level*
*id is the tourist's id whose level is retrieved*

- Get tourist's availablePoints
**GET**: *http://localhost:4000/tourist/availablePoints*
*id is the tourist's id whose availablePoints is retrieved*

- Get tourist's level
**GET**: *http://localhost:4000/tourist/totalPoints*
*id is the tourist's id whose totalPoints is retrieved*

- Get all currencies
**GET**: *http://localhost:4000/tourist/currencies*

- Change Preferred Currency
**PATCH**: *http://localhost:4000/tourist/changePreferredCurrency*
**NOTE**: id is the tourist's id whose currency will be changed.
**NOTE**: The input to that API is through request body, you need to provide the preferredCurrency.

- View Wishlist
**GET**: *http://localhost:4000/tourist/wishlist*

- Add to Wishlist
**POST**: *http://localhost:4000/tourist/wishlist/add*

- Remove from Wishlist
**DELETE**: *http://localhost:4000/tourist/wishlist/remove*

- View Saved Events
**GET**: *http://localhost:4000/tourist/viewSavedEvents*

- Save event
**POST**: *http://localhost:4000/tourist/saveEvent*
**NOTE**: The input to that API is through request body, you need to provide the eventType (Activity or itinerary) and eventId

- Remove from Wishlist
**DELETE**: *http://localhost:4000/tourist/removeSavedEvents*
**NOTE**: The input to that API is through request body, you need to provide the eventId

- View orders
**GET**: *http://localhost:4000/tourist/orders*

- Issue an order
**POST**: *http://localhost:4000/tourist/orders/issue*
**NOTE**: The input to that API is through request body, you need to provide the products array (array of json objects containing the productId along with the quantity of this product)

- Cancel an order
**PATCH**: *http://localhost:4000/tourist/orders/cancel/:id*
**NOTE**: The input to that API is through request params, you need to provide the orderId

- Get Notifications
**GET**: *http://localhost:4000/tourist/notifs*

- Mark all Notifications as read
**PATCH**: *http://localhost:4000/tourist/notifs*

- Delete all Notifications
**DELETE**: *http://localhost:4000/tourist/notifications*

- Delete specific Notifications
**DELETE**: *http://localhost:4000/tourist/notification:id*

- Request to be notified about one of your saved events being available for booking
**PATCH**: *http://localhost:4000/tourist/beNotified/:id*
**NOTE**: id is for the saved event's ID (savedEvent.eventId)

- Be notified for when a saved event is Open for Bookings
**POST**: *http://localhost:4000/tourist/savedReminder

- Be reminded of your Booked Events getting Within 4 days of check
**POST**: *http://localhost:4000/tourist/bookingReminder*

- Recieve a promocode on your birthday "will be available in your notifications"
**POST**: *http://localhost:4000/tourist/birthday*

- Redeem a Promocode
**PATCH**: *http://localhost:4000/tourist/redeemCode*
**NOTE**: the promocode's code field should be given in the req.body

- Get available Promocodes
**GET**:*http://localhost:4000/tourist/codes*

- View Cart
**GET** : *http://localhost:4000/tourist/cart*

- Add to Cart
**POST** : *http://localhost:4000/tourist/cart/add*
**NOTE**: The input to this request is through request body, you need to supply productId and quantity

- Remove to Cart
**DELETE** : *http://localhost:4000/tourist/cart/remove*
**NOTE**: The input to this request is through request body, you need to supply productId

- Change Amount in Cart
**PATCH** : *http://localhost:4000/tourist/cart/change*
**NOTE**: The input to this request is through request body, you need to supply productId and quantity

- Checkout an order from Cart
**POST** : *http://localhost:4000/tourist/cart/checkout*
**NOTE** : The input to this request is through request body, you need to supply the cart object [{productId, quantity}]

- Get all orders
**GET** : *http://localhost:4000/tourist/orders

&nbsp;
```
/tourGuide
```
This is the tour guide route.
Contains all the API methods that are related to the tour guide functionalities
#### Tour Guide methods
- Get profile
**GET**: *http://localhost:4000/tourGuide/profile*

- Update profile
**PUT**: *http://localhost:4000/tourGuide/profile*

- Create itinerary
**POST**: *http://localhost:4000/tourGuide/create*

- Read itineraries
**GET**: *http://localhost:4000/tourGuide/itineraries*

- Read itinerary by ID
**GET**: *http://localhost:4000/tourGuide/itineraries/:id*

- Get my created itineraries

**GET**: *http://localhost:4000/tourGuide/myItineraries*

**NOTE**: The input to that API is through request headers

-**Example**: *http://localhost:4000/tourGuide/myItineraries?myID={the_user_id_that_you_want_to_fetch_the_created_activities_for}*

- Update itinerary

**PUT**: *http://localhost:4000/tourGuide/itineraries/:id*

- Delete itinerary

**DELETE**: *http://localhost:4000/tourGuide/itineraries/:id*

- Activate itinerary

**PATCH**: *http://localhost:4000/tourGuide/itinerary/activate/:id*

- Deactivate itinerary

**PATCH**: *http://localhost:4000/tourGuide/itinerary/deactivate/:id*

-Rate TourGuide
**POST**: *http://localhost:4000/tourGuide/rate/:id*

-Comment on a TourGuide
**POST**: *http://localhost:4000/tourGuide/comment/:id*

- Get Notifications
**GET**: *http://localhost:4000/tourGuide/notifs*

- Get Specific Notifications
**GET**: *http://localhost:4000/tourGuide/notifs/:id*

- Mark all Notifications as read
**PATCH**: *http://localhost:4000/tourGuide/notifs*

- Upload Photo
**POST**: *http://localhost:4000/tourGuide/uploadPhoto*

- Get photo
**GET**: *http://localhost:4000/tourGuide/photo*

- Get Sales Report
**GET**: *http://localhost:4000/tourGuide/salesReport*

- Get Tourist Report
**GET**: *http://localhost:4000/tourGuide/touristReport*

- Get Tour Guide info
**GET**: *http://localhost:4000/tourGuide/tourGuideInfo*

- Get all Tags
**GET**: *http://localhost:4000/tourGuide/tags*

- Get all Activities
**GET**: *http://localhost:4000/tourGuide/activities*

&nbsp;

```
/tourismGovernor
```
This is the **tourism governor** route.
Contains all the API methods that are related to the tourism governor functionalities
#### Tourism Governor methods
- Get all places

**GET**: *http://localhost:4000/tourismGovernor/places*

- Get place by ID

**PUT**: *http://localhost:4000/tourismGovernor/places/:id*

- Get my created places

**GET**: *http://localhost:4000/tourGuide/myPlaces*

**NOTE**: The input to that API is through inserting the token in the cookies sent in the request


- Add place

**POST**: *http://localhost:4000/tourismGovernor/addPlace*

- Update place

**PATCH**: *http://localhost:4000/tourismGovernor/updatePlace/:id*

- Delete place

**DELETE**: *http://localhost:4000/tourismGovernor/deletePlace/:id*

- Get tags

**GET**: *http://localhost:4000/tourismGovernor/tags*

- Add tag

**POST**: *http://localhost:4000/tourismGovernor/addTag*

&nbsp;

```
/activityRoutes
```
This is the **activity** route.
Contains all the API methods that are related to the activity functionalities
#### Activity methods
- Get activities

**GET**: *http://localhost:4000/activityRoutes/activities*

- Get activity by ID

**GET**: *http://localhost:4000/activityRoutes/activity/:id*

- Create activity

**POST**: *http://localhost:4000/activityRoutes/activity*

- Update activity

**PUT**: *http://localhost:4000/activityRoutes/activity/:id*

- Delete activity

**DELETE**: *http://localhost:4000/activityRoutes/activity/:id*

- Get my created activities

**GET**: *http://localhost:4000/activityRoutes/myActivities*

- Get upcoming activites

**GET**: *http://localhost:4000/activityRoutes/upcomingActivities*

- Get upcoming itineraries

**GET**: *http://localhost:4000/activityRoutes/upcomingItineraries*

- Get all advertisers

**GET**: *http://localhost:4000/activityRoutes/allAdvertisers*

-Rate an activity
**POST**: *http://localhost:4000/activityRoutes/activity/rate/:id*

-Comment on activity
**POST**: *http://localhost:4000/activityRoutes/comment/:id*
&nbsp;

```
"/itinerary"
```
This is the **itinerary** route.
Contains all the API methods that are related to the itinerary functionalities
#### Itinerary methods
- Create itinerary

**POST**: *http://localhost:4000/itinerary/create*

- Read itineraries

**GET**: *http://localhost:4000/itinerary/itineraries*

- Read itinerary by ID

**GET**: *http://localhost:4000/itinerary/itineraries/:id*

- Get my created itineraries

**GET**: *http://localhost:4000/itinerary/myItineraries*

**NOTE**: The input to that API is through sending the token in the cookies field


- Update itinerary

**PUT**: *http://localhost:4000/itinerary/itineraries/:id*

- Delete itinerary

**DELETE**: *http://localhost:4000/itinerary/itineraries/:id*

-Rate itinerary
**POST**: *http://localhost:4000/itinerary/rate/:id*

-Comment on an itinerary
**POST**: *http://localhost:4000/itinerary/comment/:id*

&nbsp;

```
/authentication
```
This is the **authentication** route.
Contains all the API methods that are related to the authentication functionalities
#### Authentication methods

- Register for Website
**POST**: *http://localhost:4000/authentication/register*

- Log into Website
**POST**: *http://localhost:4000/authentication/login*

- Get users on website
**GET**: *http://localhost:4000/authentication/users*

- Change Password
**POST**: *http://localhost:4000/authentication/changePassword*

- Upload documents
**POST**: *http://localhost:4000/authentication/uploadDocuments*

- Get User's documents
**GET**: *http://localhost:4000/authentication/getDocuments/:id*

- Get Users requesting Acceptance
**GET**: *http://localhost:4000/authentication/getUsersRequestingAcceptance*

- Get Document by File Id
**GET**: *http://localhost:4000/authentication/getDocumentByFileID/:id*

- Accept a specific user
**PATCH**: *http://localhost:4000/authentication/acceptUser/:id

- Accept Terms and Conditions
**PATCH**: *http://localhost:4000/authentication/acceptTerms

- Request Account Deletion
**PATCH**: *http://localhost:4000/authentication/requestAccountDeletion

- Request Forget Password Email
**POST**: *http://localhost:4000/authentication/requestForgetPasswordEmail

- Reset Password
**POST**: *http://localhost:4000/authentication/resetPassword

- Log out
**POST**: *http://localhost:4000/authentication/logout
```
"/booking"
```
This is the **booking** route.
Contains all the API methods that are related to the booking functionalities
#### Booking methods
- Book Activity

**POST**: "http://localhost:4000/booking/activity"
**NOTE**: The input to that API is through request body, you need to provide the bookingType(must be 'activity'), and activityId 

- Book Itinerary

**POST**: "http://localhost:4000/booking/itinerary"
**NOTE**: The input to that API is through request body, you need to provide the bookingType(must be 'itinerary'), itineraryId, and startDate (the date that the user chose out of the available dates)

- Cancel booking

**PATCH**: "http://localhost:4000/booking/cancel"
**NOTE**: The input to that API is through request body, you need to provide the bookingId

- Book Flight

**POST**: "http://localhost:4000/booking/flight"
**NOTE**: The input to that API is through request body, you need to provide the bookingType(must be 'flight'), from (From date), and to (To date)

- Book Hotel

**POST**: "http://localhost:4000/booking/hotel"
**NOTE**: The input to that API is through request body, you need to provide the bookingType(must be 'hotel'), hotelName, rating, description, price, stars, checkIn (Check-in date), and checkOut (Check-out date)

- Book Transportation

**POST**: "http://localhost:4000/booking/transportation"
**NOTE**: The input to that API is through request body, you need to provide bookingType (must be 'transportation'), company, type, price, departure (city), arrival (city), date, pickUpLocation and dropOffLocation

- Get Hotel bookings by a user

**GET**: "http://localhost:4000/booking/hotels"

- Get Flight bookings by a user

**GET**: "http://localhost:4000/booking/flights"

- Get itinerary bookings by a user

**GET**: "http://localhost:4000/booking/itineraries"

- Get activity bookings by a user

**GET**: "http://localhost:4000/booking/activities"

- Get activity bookings by a user

**GET**: "http://localhost:4000/booking/transportations"

--------------

-Payment Routes 

-  Route to handle booking payment
**POST**: "http://localhost:4000/payment/handleBookingPayment"

-Route to mark booking as paid
**POST**: "http://localhost:4000/payment/markBookingAsPaid"

-Route to pay order with wallet
**POST**: "http://localhost:4000/payment/payOrderWithWallet"

-Route to pay order with Stripe
**POST**: "http://localhost:4000/payment/payOrderWithStripe"

-Route to mark order as paid
**POST**: "http://localhost:4000/payment/markOrderAsPaid"

- Route to pay order with cash on delivery
**POST**: "http://localhost:4000/payment/payOrderCashOnDelivery"

-Route to get payment multiplier
**GET**: "http://localhost:4000/payment/getPaymentMultiplier"


&nbsp;
#### Request and Response Examples
Examples of request bodies and expected responses for each endpoint.

```markdown
Sending a request to create an itinerary
POST: http://localhost:4000/itinerary/create
```
Request Body
```json
{
    "title": "My Itinerary",
    "description": "A detailed description of my itinerary",
    "startDate": "2023-10-01",
    "endDate": "2023-10-10",
    "activities": [
        {
            "name": "Visit Museum",
            "date": "2023-10-02"
        }
    ]
}



Some API tests
```
```API 1
Send a request to Log in as a tourist
POST: http://localhost:4000/authentication/login
```
Request Body
```json
{
    "username":"testTourist",
    "password":"Test@123"
}
```
Response Body
```json
{
    "role": "tourist",
    "email": "torist@test.com",
    "id": "674709389f8a17b02f53dfb3"
}
```
```API 2
Send a Request to Get Profile
GET: http://localhost:4000/tourist/profile
```
Response Body
```json
{
    "activeAddress": null,
    "_id": "674709389f8a17b02f53dfb3",
    "username": "testTourist",
    "email": "torist@test.com",
    "password": "$2b$12$tZVlBjp9KdBm7trU3I0csOp0Di4Uob2oCZKSIu/FYwbl.JUTmgVOK",
    "role": "tourist",
    "rejected": true,
    "requestToBeDeleted": false,
    "nationality": "United Arab Emirates",
    "mobileNumber": "01010101010",
    "dob": "1993-02-01T00:00:00.000Z",
    "job": "student",
    "wallet": 997576.4998,
    "preferredCurrency": "EGP",
    "totalPoints": 1292.7501,
    "availablePoints": 1292.7501,
    "level": 1,
    "accepted": true,
    "isTermsAccepted": true,
    "documents": [
        {
            "filename": "1733250169050-tour Guide pic 1.jpg",
            "contentType": "image/jpeg",
            "fileID": "674f4c79fc91a1a7fad15556",
            "_id": "674f4c7c3b54f7be7363d417"
        },
        {
            "filename": "1733250169051-company logo 2.jpg",
            "contentType": "image/jpeg",
            "fileID": "674f4c79fc91a1a7fad15557",
            "_id": "674f4c7c3b54f7be7363d418"
        }
    ],
    "__v": 74,
    "savedEvents": [
        {
            "notify": false,
            "eventType": "Activity",
            "eventId": "674a488451261c734a627bf4",
            "_id": "674a4f3e51261c734a627c1e"
        },
        {
            "eventType": "Activity",
            "eventId": "674a47f251261c734a627bec",
            "_id": "674a54bcb9cccf752f15c714",
            "notify": true
        },
        {
            "eventType": "itinerary",
            "eventId": "674a4e9b51261c734a627c0d",
            "_id": "674a54e0b9cccf752f15c726",
            "notify": true
        }
    ],
    "wishlist": [
        "67033095681e74db673e8484",
        "6730f075dc71ecb78456212b",
        "674b6ff986153c78a2ddfda5",
        "674b706386153c78a2ddfdb0",
        "674b70a086153c78a2ddfdb6"
    ],
    "otp": {
        "otp": "4f74d8",
        "expiry": "2024-12-03T16:10:58.963Z",
        "_id": "674f2b3a1ae32f3ee860c396"
    },
    "cart": [],
    "deliveryAddresses": [
        {
            "_id": "675647aac5612e29af2209ba",
            "street": "123",
            "city": "cairo",
            "state": "",
            "postalCode": "123",
            "country": "egypt",
            "googleMapsUrl": "123"
        }
    ],
    "activePromoCodes": [
        {
            "code": "seifElKing",
            "type": "PERCENTAGE",
            "discount": 0.01,
            "expiryDate": "2024-12-15T23:48:09.919Z",
            "createdBy": "6747087b9f8a17b02f53dfac",
            "touristId": null,
            "_id": "675630390c1a5f61ce417200",
            "createdAt": "2024-12-08T23:48:09.978Z",
            "updatedAt": "2024-12-08T23:48:09.978Z",
            "__v": 0
        }
    ],
    "updatedAt": "2024-12-09T02:36:47.691Z",
    "redeemedPromoCodes": [
        {
            "code": "cristianoSUIIII",
            "type": "FIXED",
            "discount": 100000000000,
            "expiryDate": "2024-12-15T14:45:08.648Z",
            "createdBy": "6747087b9f8a17b02f53dfac",
            "touristId": null,
            "_id": "6755b0f4b71bbdfa34ee0ba0",
            "createdAt": "2024-12-08T14:45:08.707Z",
            "updatedAt": "2024-12-08T14:45:08.707Z",
            "__v": 0
        },
        {
            "code": "seifElKing",
            "type": "PERCENTAGE",
            "discount": 0.01,
            "expiryDate": "2024-12-15T23:48:09.919Z",
            "createdBy": "6747087b9f8a17b02f53dfac",
            "touristId": null,
            "_id": "675630390c1a5f61ce417200",
            "createdAt": "2024-12-08T23:48:09.978Z",
            "updatedAt": "2024-12-08T23:48:09.978Z",
            "__v": 0
        }
    ]
}
```
```API 3
Send a Request to Get Redeemable PromoCodes
Get: http://localhost:4000/tourist/codes
```
Response Body
```json
{
    "promoCodes": {
        "_id": "675630390c1a5f61ce417200",
        "code": "seifElKing",
        "type": "PERCENTAGE",
        "discount": 0.01,
        "expiryDate": "2024-12-15T23:48:09.919Z",
        "createdBy": "6747087b9f8a17b02f53dfac",
        "touristId": null,
        "createdAt": "2024-12-08T23:48:09.978Z",
        "updatedAt": "2024-12-08T23:48:09.978Z",
        "__v": 0
    }
}
```
```API 4
Send a Request to Mark all notifications as read
PATCH: http://localhost:4000/tourist/notifs
```
Response Body
```json
{
    "message": "Notifications updated",
    "result": {
        "acknowledged": true,
        "modifiedCount": 9,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 12
    }
}
```
```API 5
Send a Request to Clear all notifications
DELETE: http://localhost:4000/tourist/notifications
```
Response Body
```json
{
    "message": "All notifications cleared successfully.",
    "deletedCount": 12
}
```

```API 6
Send a Request to Get available Promocodes
GET: http://localhost:4000/tourist/codes
```
Response Body
```json
{
    "promoCodes": {
        "_id": "675636a7d4248c045f3f0c9d",
        "code": "SeifPromo",
        "type": "FIXED",
        "discount": 50,
        "expiryDate": "2024-12-16T00:15:35.884Z",
        "createdBy": "6747087b9f8a17b02f53dfac",
        "touristId": null,
        "createdAt": "2024-12-09T00:15:35.947Z",
        "updatedAt": "2024-12-09T00:15:35.947Z",
        "__v": 0
    }
}
```

```API 7
Send a Request to Redeem PromoCode
PATCH: http://localhost:4000/tourist/redeemCode
```
Request Body
```json
{
    "code":"SeifPromo"
}
```
Response Body
```json
{
    "message": "Promocode redeemed successfully!",
    "activePromoCodes": [
        {
            "code": "seifElKing",
            "type": "PERCENTAGE",
            "discount": 0.01,
            "expiryDate": "2024-12-15T23:48:09.919Z",
            "createdBy": "6747087b9f8a17b02f53dfac",
            "touristId": null,
            "_id": "675630390c1a5f61ce417200",
            "createdAt": "2024-12-08T23:48:09.978Z",
            "updatedAt": "2024-12-08T23:48:09.978Z",
            "__v": 0
        },
        {
            "code": "SeifPromo",
            "type": "FIXED",
            "discount": 50,
            "expiryDate": "2024-12-16T00:15:35.884Z",
            "createdBy": "6747087b9f8a17b02f53dfac",
            "touristId": null,
            "_id": "675636a7d4248c045f3f0c9d",
            "createdAt": "2024-12-09T00:15:35.947Z",
            "updatedAt": "2024-12-09T00:15:35.947Z",
            "__v": 0
        }
    ]
}
```

```API 8
Send a Request to Log in as an admin
POST: http://localhost:4000/authentication/login
```
Request Body
```json
{
    "username":"testAdmin",
    "password":"Test@123"
}
```
Response Body
```json
{
    "role": "Admin",
    "id": "6747087b9f8a17b02f53dfac"
}
```
```API 9
Send a Request to Get a specific complaint
GET: http://localhost:4000/admin/complaints/672a920b53693b19f9672174
```
Response Body
```json
{
    "_id": "672a920b53693b19f9672174",
    "title": "Delayed Service",
    "body": "The service was delayed by over an hour.",
    "status": "Resolved",
    "date": "2024-11-05T00:00:00.000Z",
    "createdBy": "6702dcb44d7aa925eae92c5c",
    "__v": 0,
    "reply": "The issue is solved"
}
```
```API 10
Send a Request to Flag an Itinerary
PATCH: http://localhost:4000/admin/flagItinerary/67565525d4fd4be70932c260
```
Response Body
```json
{
    "message": "Notification created successfully.",
    "retItinerary": {
        "_id": "67565525d4fd4be70932c260",
        "title": "New Itinerary",
        "activities": [
            "675644969e4995e9a9358c06"
        ],
        "locations": [
            "Cairo"
        ],
        "timeline": "Day 1: Cairo",
        "duration": "10 am to 12 pm",
        "language": "Arabic",
        "price": 50,
        "availableDates": [
            "2024-12-11T00:00:00.000Z"
        ],
        "time": [
            "12:20"
        ],
        "accessibility": true,
        "pickUpLocation": "Cairo",
        "dropOffLocation": "Giza",
        "tags": [],
        "ratings": [],
        "rating": null,
        "comments": [],
        "BookingAlreadyMade": true,
        "NoOfBookings": 0,
        "touristsCount": 0,
        "revenueOfThisItinerary": 0,
        "createdBy": "67470c2f50bb3589eab32816",
        "bookingIsOpen": true,
        "flagged": true,
        "createdAt": "2024-12-09T02:25:41.446Z",
        "updatedAt": "2024-12-09T03:20:21.294Z",
        "__v": 0
    },
    "notification": {
        "userID": "67470c2f50bb3589eab32816",
        "message": "Your Itinerary New Itinerary has been flagged as inappropriate.",
        "reason": "Inappropriate content",
        "ReasonID": "67565525d4fd4be70932c260",
        "seen": false,
        "_id": "675661f5f97bdd3f05225196",
        "createdAt": "2024-12-09T03:20:21.637Z",
        "__v": 0
    }
}
```
```API 11
Send a Request to get Notifications as a tourGuide
GET: http://localhost:4000/tourGuide/notifs
```
Response Body
```json
[
    {
        "_id": "674c519f7ecba75c98817bb5",
        "userID": "67470c2f50bb3589eab32816",
        "message": "You've been flagged as inappropriate.",
        "reason": "Inappropriate content flagged",
        "ReasonID": "674b6baba8e5aee39a8595e7",
        "seen": true,
        "createdAt": "2024-12-01T12:07:59.141Z",
        "__v": 0
    },
    {
        "_id": "674c81109340c275510fcbf6",
        "userID": "67470c2f50bb3589eab32816",
        "message": "Your Itinerary has been flagged as inappropriate.",
        "reason": "Inappropriate content",
        "ReasonID": "674b6baba8e5aee39a8595e7",
        "seen": true,
        "createdAt": "2024-12-01T15:30:24.173Z",
        "__v": 0
    },
    {
        "_id": "674f65677703850b7dec398c",
        "userID": "67470c2f50bb3589eab32816",
        "message": "Your Itinerary has been flagged as inappropriate.",
        "reason": "Inappropriate content",
        "ReasonID": "674b6baba8e5aee39a8595e7",
        "seen": true,
        "createdAt": "2024-12-03T20:09:11.265Z",
        "__v": 0
    },
    {
        "_id": "674f656f7703850b7dec3994",
        "userID": "67470c2f50bb3589eab32816",
        "message": "Your Itinerary has been flagged as inappropriate.",
        "reason": "Inappropriate content",
        "ReasonID": "674b6baba8e5aee39a8595e7",
        "seen": true,
        "createdAt": "2024-12-03T20:09:19.905Z",
        "__v": 0
    },
    {
        "_id": "674f681b0ba002420cea9425",
        "userID": "67470c2f50bb3589eab32816",
        "message": "Your Itinerary has been flagged as inappropriate.",
        "reason": "Inappropriate content",
        "ReasonID": "674b6baba8e5aee39a8595e7",
        "seen": true,
        "createdAt": "2024-12-03T20:20:43.795Z",
        "__v": 0
    },
    {
        "_id": "674f75f93c868b0b5445876b",
        "userID": "67470c2f50bb3589eab32816",
        "message": "Your Itinerary New try has been flagged as inappropriate.",
        "reason": "Inappropriate content",
        "ReasonID": "674b6baba8e5aee39a8595e7",
        "seen": true,
        "createdAt": "2024-12-03T21:19:53.306Z",
        "__v": 0
    },
    {
        "_id": "675661f5f97bdd3f05225196",
        "userID": "67470c2f50bb3589eab32816",
        "message": "Your Itinerary New Itinerary has been flagged as inappropriate.",
        "reason": "Inappropriate content",
        "ReasonID": "67565525d4fd4be70932c260",
        "seen": false,
        "createdAt": "2024-12-09T03:20:21.637Z",
        "__v": 0
    }
]
```
```API 12
Send a Request to get a specific Notification as a tourGuide
GET: http://localhost:4000/tourGuide/notif/675661f5f97bdd3f05225196
```
Response Body
```json
{
    "_id": "675661f5f97bdd3f05225196",
    "userID": "67470c2f50bb3589eab32816",
    "message": "Your Itinerary New Itinerary has been flagged as inappropriate.",
    "reason": "Inappropriate content",
    "ReasonID": "67565525d4fd4be70932c260",
    "seen": false,
    "createdAt": "2024-12-09T03:20:21.637Z",
    "__v": 0
}
```
```API 13
Send a Request to add a Product to cart
POST: http://localhost:4000/tourist/cart/add
```
Request Body
```json
{
        "productId": "674b6ff986153c78a2ddfda5",
        "quantity":2
}
```
Response Body
```json
{
    "message": "Product added to cart successfully",
    "cart": [
        {
            "productId": "674b6ff986153c78a2ddfda5",
            "quantity": 2,
            "_id": "675663a0f97bdd3f052251f5"
        }
    ]
}
```
```API 14
Send a Request to change products in cart
PATCH: http://localhost:4000/tourist/cart/change
```
Request Body
```json
{
        "productId": "674b6ff986153c78a2ddfda5",
        "quantity":1
}
```
Response Body
```json
{
    "message": "Product quantity updated successfully",
    "cart": [
        {
            "productId": "674b6ff986153c78a2ddfda5",
            "quantity": 1,
            "_id": "675663a0f97bdd3f052251f5"
        }
    ]
}
```

```API 15
Send a Request to delete products from cart
DELETE: http://localhost:4000/tourist/cart/remove
```
Request Body
```json
{
        "productId": "674b6ff986153c78a2ddfda5"
}
Response Body
```json
{
    "message": "Successfully removed the product from the cart"
}