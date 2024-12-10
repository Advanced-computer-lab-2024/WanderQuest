<p align="center">
<img src="https://github.com/Advanced-computer-lab-2024/WanderQuest/blob/main/Front-End/wanderquest/public/logo.png" width="400" />

<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=40&pause=1000&color=F7F7F7&center=true&vCenter=true&random=false&width=1200&height=100&lines=WanderQuest%3A+Where+Your+Adventures+Come+to+Life" alt="Typing SVG" /></a>

</p>

# WanderQuest

## Table of Contents

1. [🚀 Motivation](#-motivation)
2. [🧱 Build Status](#-build-status)
3. [🎨 Code Style](#-code-style)
4. [⚒️ Tech and Frameworks used](#%EF%B8%8F-tech-and-frameworks-used)
5. [🔥 Features & Screenshots](#-features--screenshots)
6. [💻 Code Examples](#-code-examples)
7. [⚙️ Installation](#%EF%B8%8F-installation)
8. [📚 API Reference](#-api-reference)
9. [🧪 Tests](#-tests)
10. [🧑🏻‍🏫 How to Use](#-how-to-use)
11. [🤝 Contribute](#-contribute)
12. [©️ Credits](#-credits)
13. [📜 License](#-license)

## 🚀 Motivation

Welcome to WanderQuest, your ultimate travel companion designed to transform vacation planning into an effortless and unforgettable experience! Whether you're longing for serene beaches, historic landmarks, or thrilling family adventures, our platform caters to every travel dream.

## 🧱 Build Status

![example workflow](https://github.com/Advanced-Computer-Lab-2023/Copilot-and-Sons-Clinic/actions/workflows/test.yml/badge.svg)

- This project is under development and should not be used in a production settings
- Check **Issues** for a list of all the reported issues
- More automated tests should be added in the future
- More documentation should be added

## 🎨 Code Style

We use [Prettier](https://prettier.io/) to enforce a consistent code style.

<details>
<summary>Useful Commands</summary>

### Useful Commands

- Check formatting using Prettier

```bash
npm run format
```

- And then fix formatting using Prettier

```bash
npm run format:fix
```

</details>

## ⚒️ Tech and Frameworks used

- [NodeJs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [ReactJs](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Prettier](https://prettier.io/)
- [MUI](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Query](https://react-query.tanstack.com/)
- [Formik](https://formik.org/)
- [Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [Socket.io](https://socket.io/)
- [Firebase Storage](https://firebase.google.com/docs/storage)
- [NodeMailer](https://nodemailer.com/about/)
- [JsonWebToken](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Postman](https://www.postman.com/)

## 🔥 Features & Screenshots

<details>
<summary>User Registration 📝</summary>

- Register as a tourist/advertiser/tour guide/seller with essential details.
- Submit a request to register as an advertiser/tour guide/seller with professional details.
- Upload required documents for advertiser/tour guide/seller registration.

</details>

<details>
<summary>User Authentication 🔐</summary>
- Login and logout securely.


</details>

<details>
<summary>Administrator Functions 👩‍💼</summary>
  
- Add/remove another administrator.
- Add/remove a tourism governor.
- Manage all users.
- Add/edit/remove/view products/activities/itineraries/categories/tags.
- Archive/unarchive products.
- Accept or reject advertiser/tour guide/seller registration requests.
- View information uploaded by advertiser/tour guide/seller.
- View complaints.
- Mark a complaint as pending or resolved or reply to it.
- Create/delete/view promocodes.
- Search/Filter/Sort for a product based on product name/price/ratings.


</details>

<details>
<summary>Account Management 🔄</summary>
  
- Change password.
- Reset forgotten password via email.
- Request to delete account.


</details>

<details>
<summary>Seller Functions</summary>
  
- Accept Terms and Conditions.
- Create/Read/Update their profile with their information including name and description. If accepted on the system.
- View a list of all available products.
- Search/Filter/Sort for a product based on product name/price/ratings.
- Add/Edit/View a product with its details, price and available quantity.
- Upload a picture.
- View/Filter sales report
- Archive/unarchive products.
- Search/Filter/Sort for a product based on product name/price/ratings.


</details>

<details>
<summary>Advertiser Functions</summary>
  
- Accept Terms and Conditions.
- Create/Read/Update their profile with their information. If accepted on the system.
- View a list of all advertisers.
- Create/update/delete activities.
- View created activities.
- Create/view transportation posts.
- Get/mark as read notifications.


</details>

<details>
<summary>Tourist Functions</summary>
  
- Read/Update their profile with their information.
- Book trips.
- Pay for bookings using wallet or credit card.
- Add to/remove from/view wishlist.
- View saved events.
- View all orders.
- Issue/cancel an order.
- View available products/ upcoming activities/itineraries/places.
- Search/Filter/Sort for a product based on product name/price/ratings.
- Rate/review a product.
- Redeem points/promocode.
- File a complaint.
- View my complaints/level/available points.
- Change preferred currency.
- Manage notifications.
- Be notified/request to be notified for when a saved event is open for bookings.
- Be reminded of your Booked Events getting Within 4 days of check.
- Recieve a promocode on your birthday in notifications.
- View/add/remove/edit/checkout to/from cart.
  

</details>

<details>
<summary>Tour Guide Functions</summary>
  
- Accept Terms and Conditions.
- Create/Read/Update their profile with their information. If accepted on the system.
- View a list of all advertisers.
- Create/update/delete/view/activate/deactivate itineraries.
- Rate/comment on tour guide.
- Manage notifications.
  
</details>

<details>
<summary>Tourism Governor Functions</summary>
  
- Create/update/delete/view places.
- Add/view tags.

</details>


## 💻 Code Examples


<details>
<summary>FE Admin Dashboard Routes Example</summary>

```js

        <ul>
            <li>
              <Link href="/admin/Requests">Users Management</Link>
            </li>
            <li>
              <Link href="/admin/deleteAccount">Delete Account</Link>
            </li>
            <li>
              <Link href="/admin/addGovernor">Add Tourism Governor</Link>
            </li>
            <li>
              <Link href="/admin/addAdmin">Add Admin</Link>
            </li>
            <li>
              <Link href="/admin/editprod">Add Product</Link>
            </li>
            <li>
              <Link href="/admin/complaints">Complaints</Link>
            </li>
            <li>
              <Link href="/admin/promoCodes">Create Promocode</Link>
            </li>
            <li>
              <Link href="/admin/prefTags">Preference Tags</Link>
            </li>
            
          </ul>
```

</details>


<details>
  
<summary>BE authentication Routes</summary>
  
  ```js
  
  router.post('/register', registerUser);
  
  router.post('/login', login);
  
  router.get('/user', requireAuth(), getUser);
  
  router.post('/changePassword', requireAuth(), changePassword);
  
  router.post('/uploadDocuments', requireAuth(), uploadDocuments);
  
  router.get('/getDocuments/:id', requireAuth(), getUserDocuments);
  
  router.get('/getUsersRequestingAcceptance', requireAuth({ role: 'Admin' }), getUsersRequestingAcceptance);
  
  router.get('/getDocumentByFileID/:id', requireAuth(), getDocumentByFileID);
  
  router.patch('/acceptUser/:id', requireAuth({ role: 'Admin' }), acceptUser);
  
  router.patch('/acceptTerms', requireAuth(), acceptTerms);
  
  router.patch('/requestAccountDeletion', requireAuth(), requestAccountDeletion);
  
  router.post('/requestForgetPasswordEmail', requestForgetPasswordEmail);
  
  router.post('/resetPassword', resetPassword);
  
  router.post('/logout', logout);
  ```
</details>


<details>
  
<summary>BE Promocode Creation Controller</summary>
  
  ```js
  
  const createPromo = async (req, res) => {
    const { code, type, discount, birthday, touristId } = req.body;
    const admin = req.user._id;
    const expiry = Date.now() + (7 * 24 * 60 * 60 * 1000);
    // Validate input
    if (!code || !type || !discount) {
        return res.status(400).json({ error: ' fields are required' });
    }
    try {
        // Checking if the username already exists
        const existingPromo = await PromoCode.findOne({ code });

        if (existingPromo) {
            return res.status(400).json({ error: 'Promocode already exists' });
        }

        const promocode = await PromoCode.create({
            code,
            type,
            discount,
            expiryDate: expiry,
            createdBy: admin
        });
        const tourists = await Tourist.find();

        // Create notifications for each tourist
        const notifications = tourists.map(tourist => ({
            userID: tourist._id,
            message: `New promo code available: ${code}`,
            reason: 'New Promo Code',
            ReasonID: promocode._id // Optional reference to the promo code
        }));

        // Insert all notifications at once
        await NotificationModel.insertMany(notifications);

        res.status(200).json(promocode)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
  ```
</details>


<details>
  
<summary>BE Promocode Schema</summary>
  
  ```js
  
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const promoCodeSchema = new Schema({
      code: { type: String, required: true, unique: true },
      type: { type: String, enum: ['PERCENTAGE', 'FIXED'], required: true },
      discount: { type: Number, required: true },
      expiryDate: { type: Date, required: true },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: false },
      birthday: { type: Boolean, required: false },
      touristId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tourist",
          required: false,
          default:null,
          validate: {
              validator: function (value) {
                  return !this.birthday || (this.birthday && value);
              },
              message: 'touristId is required to create a birthday promocode'
          }
      }
  }, { timestamps: true });
  
  const PromoCode = mongoose.model('PromoCode', promoCodeSchema);
  module.exports = {PromoCode};

  ```
</details>

<details>
  
<summary>BE Promocode Applier in Payment </summary>
  
  ```js
  async function applyPromoCodes(userId, amount) {
    try {
        const user = await User.findById(userId);

        if (!user || !user.activePromoCodes || user.activePromoCodes.length === 0) {
            console.log('No active promo codes found for this user.');
            return amount; // Return original amount if no promo codes
        }

        let finalAmount = amount;

        for (const promo of user.activePromoCodes) {
            switch (promo.type) {
                case 'FIXED':
                    const fixedDiscount = await convertCurrency(promo.discount, 'USD', user.preferredCurrency);
                    finalAmount = Math.max(0, finalAmount - fixedDiscount);
                    break;

                case 'PERCENTAGE':
                    finalAmount = Math.max(0, finalAmount - (finalAmount * promo.discount) / 100);
                    break;

                default:
                    console.log('Unknown promo type:', promo.type);
            }
        }

        user.activePromoCodes = [];
        await user.save();

        return finalAmount;
    } catch (error) {
        console.error('Error applying promo codes:', error);
        throw error;
    }
}
  
  ```
</details>


<details>
  
<summary>BE Deduction from Wallet Helper </summary>
  
  ```js

    TouristSchema.methods.deduceFromWallet = async function (amount) {
    try {
        if (amount > this.wallet) {
            throw new Error('Insufficient wallet balance');
        }
        this.wallet -= amount;
        let pointsEarned;
        switch (this.level) {
            case 1:
                pointsEarned = amount * 0.5;
                break;
            case 2:
                pointsEarned = amount * 1;
                break;
            case 3:
                pointsEarned = amount * 1.5;
                break;
            default:
                pointsEarned = 0;
                break;
        }
        this.totalPoints += pointsEarned;
        this.availablePoints += pointsEarned;
        // await sendEmail(this.email,'Payment regarding WanderQuest',`${amount} has been deducted from your wallet`);
        await this.save();
    } catch (error) {
        console.error('Error deducting from wallet:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}
  ```
</details>



## ⚙️ Installation

- Make sure you have [Node](https://nodejs.org/en) and [Git](https://git-scm.com/) installed

```bash
mkdir WanderQuest
cd WanderQuest
```

- Clone this repo

```bash
git clone https://github.com/Advanced-computer-lab-2024/WanderQuest.git
```

- Install dependencies

```bash
cd WanderQuest
npm install
```

## 📚 API Reference

<details>
<summary>API 1 : Send a request to Log in as a tourist</summary>
`POST: http://localhost:4000/authentication/login`

*Request Body*
```json
{
    "username":"testTourist",
    "password":"Test@123"
}
```
*Response Body*
```json
{
    "role": "tourist",
    "email": "torist@test.com",
    "id": "674709389f8a17b02f53dfb3"
}
```
</details>
API 2 : Send a Request to Get Profile
`GET: http://localhost:4000/tourist/profile`

*Response Body*
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
API 3 : Send a Request to Get Redeemable PromoCodes
`Get: http://localhost:4000/tourist/codes`

*Response Body*
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
API 4 : Send a Request to Mark all notifications as read
`PATCH: http://localhost:4000/tourist/notifs`

*Response Body*
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
API 5 : Send a Request to Clear all notifications
`DELETE: http://localhost:4000/tourist/notifications`

*Response Body*
```json
{
    "message": "All notifications cleared successfully.",
    "deletedCount": 12
}
```

API 6 : Send a Request to Get available Promocodes
`GET: http://localhost:4000/tourist/codes`

*Response Body*
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

API 7 : Send a Request to Redeem PromoCode
`PATCH: http://localhost:4000/tourist/redeemCode`

*Request Body*

```json
{
    "code":"SeifPromo"
}
```
*Response Body*

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

API 8 : Send a Request to Log in as an admin
`POST: http://localhost:4000/authentication/login`

*Request Body*

```json
{
    "username":"testAdmin",
    "password":"Test@123"
}
```
*Response Body*

```json
{
    "role": "Admin",
    "id": "6747087b9f8a17b02f53dfac"
}
```
API 9 : Send a Request to Get a specific complaint
`GET: http://localhost:4000/admin/complaints/672a920b53693b19f9672174`

*Response Body*

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
API 10 : Send a Request to Flag an Itinerary
`PATCH: http://localhost:4000/admin/flagItinerary/67565525d4fd4be70932c260`

*Response Body*

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
API 11 : Send a Request to get Notifications as a tourGuide
`GET: http://localhost:4000/tourGuide/notifs`

*Response Body*

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
API 12 : Send a Request to get a specific Notification as a tourGuide
`GET: http://localhost:4000/tourGuide/notif/675661f5f97bdd3f05225196`

*Response Body*

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
API 13 : Send a Request to add a Product to cart
`POST: http://localhost:4000/tourist/cart/add`

*Request Body*

```json
{
        "productId": "674b6ff986153c78a2ddfda5",
        "quantity":2
}
```
*Response Body*

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
API 14: Send a Request to change products in cart
`PATCH: http://localhost:4000/tourist/cart/change`

*Request Body*

```json
{
        "productId": "674b6ff986153c78a2ddfda5",
        "quantity":1
}
```
*Response Body*

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

API 15: Send a Request to delete products from cart
`DELETE: http://localhost:4000/tourist/cart/remove`

*Request Body*

```json
{
        "productId": "674b6ff986153c78a2ddfda5"
}
```

*Response Body*
```json
{
    "message": "Successfully removed the product from the cart"
}
```



## 🧪 Tests

We use `Postman` to manually test all our api references by making sure the response is as expected.

![image](https://github.com/user-attachments/assets/790808a2-a080-4e50-a3e9-bb86ac19c21f)


## 🧑🏻‍🏫 How to Use

- Make sure to follow the [Installation](#-installation) steps first

- Add a `.env` in the `backend` of this repo `WanderQuest`

```bash
PORT=4000
MONGO_URI=mongodb+srv://wndrqstaclproj:0kJPyXZCpwhA2vwB@wanderquest.ysdlc.mongodb.net/?retryWrites=true&w=majority&appName=WanderQuest
SECRET=thisisatestsecretcode1234!
EXCHANGE_RATE_API_KEY=878b382f87f70b368b1a1b77
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=81331d001@smtp-brevo.com
SMTP_PASS=xsmtpsib-f4616267d504380fe69fed5abead6b1cca0de777b8b51ca4e11529084c48d7d0-Egz8brFnH0tZ1a9q
SMTP_EMAIL=wanderquest.noreply@gmail.com
STRIPE_SECRET_KEY=rk_test_51QRfekFYbqa6jLuacYBGvdPJNTTSb5JIjiHUaNFnFzC2OpONxNoMy8QlE3tEVFP4fwnKo2hUfaburyCbjjWoDWWN00M07wztsy
```

- Start Front-End

```bash
cd Front-End
cd wanderquest
npm run dev
```

- Start Back-End in a different terminal

```bash
cd Back-End
npm run dev
```

## 🤝 Contribute

We welcome contributions to Copilot & Sons El7a2ny Clinic. If you want to contribute, it's as easy as:

1. Fork the repo
2. Create a new branch (`git checkout -b my-new-feature`)
3. Make changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create a new Pull Request
7. Wait for your PR to be reviewed and merged

> **NOTE**
>
> We welcome all contributions, but please make sure to follow our code style and linting rules. You can check the [Code Style](#-code-style) section for more details.

## 🫡 Credits

### Docs

- [Mongoose docs](https://mongoosejs.com/docs/)
- [Express docs](https://expressjs.com/en/4x/api.html)
- [ReactJs docs](https://reactjs.org/docs/getting-started.html)
- [NodeJs docs](https://nodejs.org/en/docs/)
- [Prettier docs](https://prettier.io/docs/en/index.html)
- [MUI docs](https://mui.com/getting-started/usage/)
- [React Router docs](https://reactrouter.com/en/6.21.0)
- [React Hook Form docs](https://react-hook-form.com/get-started)
- [React Query docs](https://react-query.tanstack.com/overview)
- [Formik docs](https://formik.org/docs/overview)
- [Toastify docs](https://fkhadra.github.io/react-toastify/introduction)

### YouTube Videos

- [Mongoose Crash Course](https://www.youtube.com/watch?v=DZBGEVgL2eE)
- [Express Crash Course](https://www.youtube.com/watch?v=SccSCuHhOw0)
- [ReactJs Crash Course](https://www.youtube.com/watch?v=w7ejDZ8SWv8)
- [MUI Crash Course](https://www.youtube.com/watch?v=vyJU9efvUtQ)
- [React Router Crash Course](https://www.youtube.com/watch?v=Law7wfdg_ls)
- [React Hook Form Crash Course](https://www.youtube.com/watch?v=-mFXqOaqgZk)
- [React Query Crash Course](https://www.youtube.com/watch?v=seU46c6Jz7E)

## 📜 License

The software is open source under the `Apache 2.0 License`.

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
