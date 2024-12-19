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

<img width="1787" alt="Sign up page " src="https://github.com/user-attachments/assets/554cb639-83e7-45e7-bcbf-959bfaec0470">

</details>

<details>
<summary>User Authentication 🔐</summary>
- Login and logout securely.

<img width="1786" alt="Sign in page" src="https://github.com/user-attachments/assets/f2c99997-0327-464f-9f83-b3819b10351e">


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

<img width="1788" alt="Admin Home Page" src="https://github.com/user-attachments/assets/3015f1d3-33e7-4e26-a49e-5d75b1ec7e40">

<img width="1779" alt="Add admin" src="https://github.com/user-attachments/assets/c2c0c2f8-9108-4dcb-83d6-b4d8072cea0b" />

<img width="1792" alt="Admin complaints" src="https://github.com/user-attachments/assets/60a5ca3a-71b6-48e7-9ef8-7366ae5d3761" />

<img width="1787" alt="Admin delete account" src="https://github.com/user-attachments/assets/d3dc8a3b-83b2-4bb5-b6e4-16e78ccabda3" />

<img width="1792" alt="Admin Promo Code" src="https://github.com/user-attachments/assets/fed0c7db-1021-4c18-a0a2-1aabf4649094" />

<img width="1785" alt="Admin requests" src="https://github.com/user-attachments/assets/a0843cde-5da1-4710-b7cb-14bcf00efe1f" />

<img width="1780" alt="Preference Tags" src="https://github.com/user-attachments/assets/c0c1ff37-6c51-4238-a550-55868527d7ba" />

</details>

<details>
<summary>Account Management 🔄</summary>
  
- Change password.
- Reset forgotten password via email.
- Request to delete account.

![Account Management](https://github.com/user-attachments/assets/883cd94d-eb9e-4522-b330-d279c72acf9f)

</details>

<details>
<summary>Seller Functions🛍️</summary>
  
- Accept Terms and Conditions.
- Create/Read/Update their profile with their information including name and description. If accepted on the system.
- View a list of all available products.
- Search/Filter/Sort for a product based on product name/price/ratings.
- Add/Edit/View a product with its details, price and available quantity.
- Upload a picture.
- View/Filter sales report
- Archive/unarchive products.
- Search/Filter/Sort for a product based on product name/price/ratings.

<img width="1788" alt="Seller home page" src="https://github.com/user-attachments/assets/506f2875-2ddc-4e02-94f4-3642abaa090e">


</details>

<details>
<summary>Advertiser Functions📢</summary>
  
- Accept Terms and Conditions.
- Create/Read/Update their profile with their information. If accepted on the system.
- View a list of all advertisers.
- Create/update/delete activities.
- View created activities.
- Create/view transportation posts.
- Get/mark as read notifications.

<img width="1788" alt="Advertiser Home page" src="https://github.com/user-attachments/assets/943786e2-54c8-44ce-853c-10966c0c2a15">


</details>

<details>
<summary>Tourist Functions🌍</summary>
  
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

<img width="1792" alt="Tourist Home page" src="https://github.com/user-attachments/assets/e2f424a1-9238-45f9-b99c-0ff49de8c0d9">

<img width="1792" alt="Historical Places" src="https://github.com/user-attachments/assets/cb86690f-999e-464e-bab8-49556e8ad1b0" />

<img width="1792" alt="My bookings" src="https://github.com/user-attachments/assets/72a44ae7-256a-46c0-88c9-3c984bdabc87" />

<img width="1775" alt="Tourist Transportation" src="https://github.com/user-attachments/assets/1cb0692d-288e-4f7d-a075-4a5d0aaf7442" />


</details>

<details>
<summary>Tour Guide Functions🗺️</summary>
  
- Accept Terms and Conditions.
- Create/Read/Update their profile with their information. If accepted on the system.
- View a list of all advertisers.
- Create/update/delete/view/activate/deactivate itineraries.
- Rate/comment on tour guide.
- Manage notifications.

<img width="1787" alt="Tour Guide home page" src="https://github.com/user-attachments/assets/4884fda4-8c6b-4268-b903-406bc5d45eb2">

<img width="1780" alt="Tour guide sales report" src="https://github.com/user-attachments/assets/d38bc28b-0aa3-4be6-b2f1-c2d105d21e6e" />

  
</details>

<details>
<summary>Tourism Governor Functions🏛️</summary>
  
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
  
<summary>BE Authentication Routes</summary>
  
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

- How to run: Add a `.env` in the `backend` of this repo `WanderQuest`

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


## 📚 API References

<details>
<summary>API 1: Tourist Registration</summary>

`POST: http://localhost:4000/auth/register`

*Request Body*
```json
{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "Password123!",
    "role": "tourist",
    "nationality": "Egyptian",
    "mobileNumber": "+201234567890",
    "dob": "1990-01-01",
    "job": "Engineer"
}
```

*Success Response (201)*
```json
{
    "userId": "675661f5f97bdd3f05225196",
    "username": "johndoe",
    "role": "tourist",
    "accepted": true
}
```
</details>

<details>
<summary>API 2: Tour Guide Registration</summary>

`POST: http://localhost:4000/auth/register`

*Request Body*
```json
{
    "username": "guidejohn",
    "email": "guide@example.com",
    "password": "Guide123!",
    "role": "tourGuide",
    "yearsOfExperience": 5,
    "mobileNumber": "+201234567891",
    "previousWork": ["Pyramids Tours", "Nile Cruises"]
}
```

*Success Response (201)*
```json
{
    "userId": "675661f5f97bdd3f05225197",
    "username": "guidejohn",
    "role": "tourGuide",
    "accepted": false
}
```
</details>

<details>
<summary>API 3: Create Activity</summary>

`POST: http://localhost:4000/advertiser/activity`

*Request Body*
```json
{
    "title": "Desert Safari",
    "description": "Experience the thrill of desert adventure",
    "price": 150,
    "category": "675661f5f97bdd3f05225198",
    "location": "Dubai Desert",
    "date": "2024-12-25",
    "time": "14:00",
    "capacity": 20,
    "tags": ["675661f5f97bdd3f05225199", "675661f5f97bdd3f05225200"]
}
```

*Success Response (201)*
```json
{
    "activityId": "675661f5f97bdd3f05225201",
    "title": "Desert Safari",
    "price": 150,
    "capacity": 20,
    "createdBy": "675661f5f97bdd3f05225202"
}
```
</details>

<details>
<summary>API 4: Create Product</summary>

`POST: http://localhost:4000/seller/addProduct`

*Request Body*
```json
{
    "name": "Traditional Scarf",
    "price": 299.99,
    "description": "Handmade Egyptian cotton scarf",
    "availableAmount": 50,
    "picture": {
        "filename": "scarf.jpg",
        "contentType": "image/jpeg",
        "fileID": "675661f5f97bdd3f05225203"
    }
}
```

*Success Response (201)*
```json
{
    "productId": "675661f5f97bdd3f05225204",
    "name": "Traditional Scarf",
    "price": 299.99,
    "seller": "675661f5f97bdd3f05225205"
}
```
</details>

<details>
<summary>API 5: Create Booking</summary>

`POST: http://localhost:4000/booking/activity`

*Request Body*
```json
{
    "bookingType": "activity",
    "activityId": "675661f5f97bdd3f05225201",
    "paid": false,
    "startDate": "2024-12-25",
    "details": {
        "numberOfParticipants": 2,
        "specialRequests": "Vegetarian meals"
    }
}
```

*Success Response (201)*
```json
{
    "bookingId": "675661f5f97bdd3f05225206",
    "status": "booked",
    "totalAmount": 300
}
```
</details>

<details>
<summary>API 6: Create Order</summary>

`POST: http://localhost:4000/tourist/cart/checkout`

*Request Body*
```json
{
    "products": [
        {
            "productId": "675661f5f97bdd3f05225204",
            "quantity": 2
        }
    ],
    "deliveryAddress": "675661f5f97bdd3f05225207"
}
```

*Success Response (201)*
```json
{
    "orderId": "675661f5f97bdd3f05225208",
    "totalPrice": 599.98,
    "status": "pending",
    "paymentStatus": "pending"
}
```
</details>

<details>
<summary>API 7: Process Payment</summary>

`POST: http://localhost:4000/payment/handleBookingPayment`

*Request Body*
```json
{
    "bookingId": "675661f5f97bdd3f05225206",
    "amount": 300,
    "currency": "EGP",
    "method": "wallet"
}
```

*Success Response (200)*
```json
{
    "paymentId": "675661f5f97bdd3f05225209",
    "status": "completed",
    "paidAmount": 300
}
```
</details>

<details>
<summary>API 8: Add Delivery Address</summary>

`POST: http://localhost:4000/tourist/addDeliveryAddresses`

*Request Body*
```json
{
    "street": "123 Main St",
    "city": "Cairo",
    "state": "Cairo Governorate",
    "postalCode": "11511",
    "country": "Egypt",
    "googleMapsUrl": "https://maps.google.com/?q=30.0444,31.2357"
}
```

*Success Response (201)*
```json
{
    "addressId": "675661f5f97bdd3f05225207",
    "message": "Delivery address added successfully"
}
```
</details>

<details>
<summary>API 9: File Complaint</summary>

`POST: http://localhost:4000/tourist/fileComplaint`

*Request Body*
```json
{
    "title": "Late Tour Guide",
    "body": "The tour guide was 30 minutes late for the scheduled tour",
    "date": "2024-01-15T10:30:00.000Z"
}
```

*Success Response (201)*
```json
{
    "complaintId": "675661f5f97bdd3f05225210",
    "status": "Pending",
    "createdAt": "2024-01-15T10:30:00.000Z"
}
```
</details>

<details>
<summary>API 10: Rate Activity</summary>

`POST: http://localhost:4000/tourist/activity/rate/:id`

*Request Body*
```json
{
    "rating": 4,
    "comment": "Great experience, very well organized",
    "touristId": "675661f5f97bdd3f05225196"
}
```

*Success Response (200)*
```json
{
    "activityId": "675661f5f97bdd3f05225201",
    "newAverageRating": 4.5,
    "totalRatings": 15
}
```
</details>

<details>
<summary>API 11: Create Itinerary</summary>

`POST: http://localhost:4000/tourGuide/create`

*Request Body*
```json
{
    "title": "Cairo Historical Tour",
    "description": "Explore ancient Egyptian history",
    "activities": ["675661f5f97bdd3f05225201", "675661f5f97bdd3f05225202"],
    "price": 2500,
    "duration": 5,
    "maxParticipants": 15,
    "startDates": ["2024-02-01", "2024-02-15"]
}
```

*Success Response (201)*
```json
{
    "itineraryId": "675661f5f97bdd3f05225211",
    "title": "Cairo Historical Tour",
    "tourGuideId": "675661f5f97bdd3f05225197",
    "status": "active"
}
```
</details>

<details>
<summary>API 12: Create Promo Code</summary>

`POST: http://localhost:4000/admin/promo`

*Request Body*
```json
{
    "code": "SUMMER2024",
    "type": "PERCENTAGE",
    "discount": 15,
    "expiryDate": "2024-08-31T23:59:59.999Z",
    "birthday": false
}
```

*Success Response (201)*
```json
{
    "promoId": "675661f5f97bdd3f05225212",
    "code": "SUMMER2024",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z"
}
```
</details>

<details>
<summary>API 13: Book Transportation</summary>

`POST: http://localhost:4000/booking/transportation`

*Request Body*
```json
{
    "bookingType": "transportation",
    "details": {
        "transportationId": "675661f5f97bdd3f05225200",
        "passengers": 2,
        "luggageCount": 3
    },
    "paid": false,
    "startDate": "2024-02-01T09:00:00.000Z"
}
```

*Success Response (201)*
```json
{
    "bookingId": "675661f5f97bdd3f05225213",
    "status": "booked",
    "totalAmount": 100
}
```
</details>

<details>
<summary>API 14: Update User Profile</summary>

`PUT: http://localhost:4000/tourist/profile`

*Request Body*
```json
{
    "mobileNumber": "+201234567892",
    "nationality": "American",
    "job": "Software Engineer",
    "email": "newemail@example.com"
}
```

*Success Response (200)*
```json
{
    "userId": "675661f5f97bdd3f05225196",
    "message": "Profile updated successfully",
    "updatedFields": ["mobileNumber", "nationality", "job", "email"]
}
```
</details>

<details>
<summary>API 15: View Sales Report</summary>

`GET: http://localhost:4000/seller/salesReport`

*Response Body*
```json
{
    "totalRevenue": 15000,
    "totalSales": 50,
    "productDetails": [
        {
            "productId": "675661f5f97bdd3f05225204",
            "name": "Traditional Scarf",
            "sales": 20,
            "revenue": 5999.80
        }
    ],
    "periodStart": "2024-01-01T00:00:00.000Z",
    "periodEnd": "2024-01-31T23:59:59.999Z"
}
```
</details>

<details>
<summary>API 16: Get User Notifications</summary>

`GET: http://localhost:4000/tourist/notifs`

*Response Body*
```json
{
    "notifications": [
        {
            "_id": "675661f5f97bdd3f05225214",
            "message": "Your booking has been confirmed",
            "reason": "booking_confirmation",
            "ReasonID": "675661f5f97bdd3f05225206",
            "seen": false,
            "createdAt": "2024-01-15T10:30:00.000Z"
        }
    ],
    "unreadCount": 1
}
```
</details>

<details>
<summary>API 17: Rate Tour Guide</summary>

`POST: http://localhost:4000/tourGuide/rate/:tourGuideId`

*Request Body*
```json
{
    "rating": 5,
    "comment": "Excellent knowledge and communication skills",
    "touristId": "675661f5f97bdd3f05225196"
}
```

*Success Response (200)*
```json
{
    "tourGuideId": "675661f5f97bdd3f05225197",
    "newAverageRating": 4.8,
    "totalRatings": 25
}
```
</details>

<details>
<summary>API 18: Create Place</summary>

`POST: http://localhost:4000/tourGoverner/addPlace`

*Request Body*
```json
{
    "title": "Great Pyramids of Giza",
    "description": "One of the Seven Wonders of the Ancient World",
    "location": "Al Haram, Giza Governorate",
    "openingHours": "8:00 AM - 5:00 PM",
    "ticketPrices": [400, 200, 100],
    "tags": [
        { "type": "Historical" },
        { "type": "UNESCO" }
    ],
    "pictures": ["base64EncodedImage1", "base64EncodedImage2"]
}
```

*Success Response (201)*
```json
{
    "placeId": "675661f5f97bdd3f05225215",
    "title": "Great Pyramids of Giza",
    "message": "Place added successfully"
}
```
</details>

## 🧪 Test Routes

<details>
<summary>Test 1: User Registration Flow</summary>

`POST: http://localhost:4000/auth/register`

*Test Cases:*
```json
{
    "validCase": {
        "input": {
            "username": "testuser",
            "email": "test@example.com",
            "password": "Password123",
            "role": "tourist"
        },
        "expectedResponse": {
            "status": 201,
            "body": {
                "message": "Registration successful"
            }
        }
    },
    "invalidCase": {
        "input": {
            "username": "test",
            "email": "invalid-email",
            "password": "123"
        },
        "expectedResponse": {
            "status": 400,
            "body": {
                "error": "Invalid input data"
            }
        }
    }
}
```
</details>

<details>
<summary>Test 2: Authentication Flow</summary>

`POST: http://localhost:4000/auth/login`

*Test Cases:*
```json
{
    "validLogin": {
        "input": {
            "username": "testuser",
            "password": "Password123"
        },
        "expectedResponse": {
            "status": 200,
            "body": {
                "token": "jwt_token"
            }
        }
    },
    "invalidLogin": {
        "input": {
            "username": "testuser",
            "password": "wrongpass"
        },
        "expectedResponse": {
            "status": 401,
            "body": {
                "error": "Invalid credentials"
            }
        }
    }
}
```
</details>

<details>
<summary>Test 3: Activity Booking Flow</summary>

`POST: http://localhost:4000/booking/activity`

*Test Cases:*
```json
{
    "validBooking": {
        "input": {
            "activityId": "675661f5f97bdd3f05225197",
            "date": "2024-12-25",
            "participants": 2
        },
        "expectedResponse": {
            "status": 201,
            "body": {
                "bookingId": "675661f5f97bdd3f05225198"
            }
        }
    },
    "invalidBooking": {
        "input": {
            "activityId": "675661f5f97bdd3f05225197",
            "participants": 100
        },
        "expectedResponse": {
            "status": 400,
            "body": {
                "error": "Insufficient capacity"
            }
        }
    }
}
```
</details>

<details>
<summary>Test 4: Payment Processing Flow</summary>

`POST: http://localhost:4000/payment/handleBookingPayment`

*Test Cases:*
```json
{
    "validPayment": {
        "input": {
            "bookingId": "675661f5f97bdd3f05225198",
            "amount": 200,
            "method": "wallet"
        },
        "expectedResponse": {
            "status": 200,
            "body": {
                "transactionId": "675661f5f97bdd3f05225199"
            }
        }
    },
    "insufficientFunds": {
        "input": {
            "bookingId": "675661f5f97bdd3f05225198",
            "amount": 10000,
            "method": "wallet"
        },
        "expectedResponse": {
            "status": 400,
            "body": {
                "error": "Insufficient funds"
            }
        }
    }
}
```
</details>

<details>
<summary>Test 5: Cart Management Flow</summary>

`POST: http://localhost:4000/tourist/cart/add`

*Test Cases:*
```json
{
    "addToCart": {
        "input": {
            "productId": "675661f5f97bdd3f05225196",
            "quantity": 2
        },
        "expectedResponse": {
            "status": 200,
            "body": {
                "message": "Added to cart"
            }
        }
    },
    "invalidQuantity": {
        "input": {
            "productId": "675661f5f97bdd3f05225196",
            "quantity": -1
        },
        "expectedResponse": {
            "status": 400,
            "body": {
                "error": "Invalid quantity"
            }
        }
    }
}
```
</details>

<details>
<summary>Test 6: Itinerary Creation Flow</summary>

`POST: http://localhost:4000/tourGuide/create`

*Test Cases:*
```json
{
    "validItinerary": {
        "input": {
            "title": "Egypt Explorer",
            "activities": ["675661f5f97bdd3f05225197"],
            "duration": 7,
            "price": 1500
        },
        "expectedResponse": {
            "status": 201,
            "body": {
                "itineraryId": "675661f5f97bdd3f05225200"
            }
        }
    },
    "invalidItinerary": {
        "input": {
            "title": "",
            "duration": -1
        },
        "expectedResponse": {
            "status": 400,
            "body": {
                "error": "Invalid itinerary data"
            }
        }
    }
}
```
</details>

<details>
<summary>Test 7: Rating System Flow</summary>

`POST: http://localhost:4000/tourist/activity/rate/:id`

*Test Cases:*
```json
{
    "validRating": {
        "input": {
            "rating": 5,
            "comment": "Great experience!"
        },
        "expectedResponse": {
            "status": 200,
            "body": {
                "newAverageRating": 4.5
            }
        }
    },
    "invalidRating": {
        "input": {
            "rating": 6,
            "comment": ""
        },
        "expectedResponse": {
            "status": 400,
            "body": {
                "error": "Invalid rating value"
            }
        }
    }
}
```
</details>

<details>
<summary>Test 8: Profile Update Flow</summary>

`PUT: http://localhost:4000/tourist/profile`

*Test Cases:*
```json
{
    "validUpdate": {
        "input": {
            "name": "John Doe",
            "phone": "+1234567890"
        },
        "expectedResponse": {
            "status": 200,
            "body": {
                "message": "Profile updated"
            }
        }
    },
    "invalidUpdate": {
        "input": {
            "phone": "invalid-phone"
        },
        "expectedResponse": {
            "status": 400,
            "body": {
                "error": "Invalid phone format"
            }
        }
    }
}
```
</details>

<details>
<summary>Test 9: Complaint System Flow</summary>

`POST: http://localhost:4000/tourist/fileComplaint`

*Test Cases:*
```json
{
    "validComplaint": {
        "input": {
            "subject": "Booking Issue",
            "description": "Activity cancelled"
        },
        "expectedResponse": {
            "status": 201,
            "body": {
                "complaintId": "675661f5f97bdd3f05225201"
            }
        }
    },
    "invalidComplaint": {
        "input": {
            "subject": ""
        },
        "expectedResponse": {
            "status": 400,
            "body": {
                "error": "Subject required"
            }
        }
    }
}
```
</details>

<details>
<summary>Test 10: Notification System Flow</summary>

`GET: http://localhost:4000/tourist/notifs`

*Test Cases:*
```json
{
    "validRequest": {
        "expectedResponse": {
            "status": 200,
            "body": {
                "notifications": [
                    {
                        "message": "Booking confirmed",
                        "seen": false
                    }
                ]
            }
        }
    }
}
```
</details>

<details>
<summary>Test 11: Promo Code Flow</summary>

`POST: http://localhost:4000/tourist/redeemCode`

*Test Cases:*
```json
{
    "validPromo": {
        "input": {
            "code": "SUMMER2024",
            "orderId": "675661f5f97bdd3f05225203"
        },
        "expectedResponse": {
            "status": 200,
            "body": {
                "discountAmount": 50
            }
        }
    },
    "invalidPromo": {
        "input": {
            "code": "INVALID"
        },
        "expectedResponse": {
            "status": 400,
            "body": {
                "error": "Invalid promo code"
            }
        }
    }
}
```
</details>

<details>
<summary>Test 12: Transportation Booking Flow</summary>

`POST: http://localhost:4000/booking/transportation`

*Test Cases:*
```json
{
    "validBooking": {
        "input": {
            "transportationId": "675661f5f97bdd3f05225204",
            "seats": 2,
            "date": "2024-12-25"
        },
        "expectedResponse": {
            "status": 201,
            "body": {
                "bookingId": "675661f5f97bdd3f05225205"
            }
        }
    },
    "invalidBooking": {
        "input": {
            "seats": -1
        },
        "expectedResponse": {
            "status": 400,
            "body": {
                "error": "Invalid seats number"
            }
        }
    }
}
```
</details>

<details>
<summary>Test 13: User Statistics Flow</summary>

`GET: http://localhost:4000/admin/userStats`

*Test Cases:*
```json
{
    "validRequest": {
        "expectedResponse": {
            "status": 200,
            "body": {
                "totalUsers": 1000,
                "newUsersPerMonth": [
                    {
                        "month": "January",
                        "count": 50
                    }
                ]
            }
        }
    }
}
```
</details>

<details>
<summary>Test 14: Activity Creation Flow</summary>

`POST: http://localhost:4000/advertiser/activity`

*Test Cases:*
```json
{
    "validActivity": {
        "input": {
            "title": "Desert Safari",
            "price": 100,
            "capacity": 20
        },
        "expectedResponse": {
            "status": 201,
            "body": {
                "activityId": "675661f5f97bdd3f05225206"
            }
        }
    },
    "invalidActivity": {
        "input": {
            "price": -100
        },
        "expectedResponse": {
            "status": 400,
            "body": {
                "error": "Invalid price"
            }
        }
    }
}
```
</details>

<details>
<summary>Test 15: Password Reset Flow</summary>

`POST: http://localhost:4000/auth/resetPassword`

*Test Cases:*
```json
{
    "validReset": {
        "input": {
            "email": "user@example.com",
            "otp": "123456",
            "newPassword": "NewPassword123"
        },
        "expectedResponse": {
            "status": 200,
            "body": {
                "message": "Password reset successful"
            }
        }
    },
    "invalidReset": {
        "input": {
            "email": "user@example.com",
            "otp": "wrong-otp"
        },
        "expectedResponse": {
            "status": 400,
            "body": {
                "error": "Invalid OTP"
            }
        }
    }
}
```
</details>

## 🧪 Tests

We use `Postman` to manually test all our api references by making sure the response is as expected.

![image](https://github.com/user-attachments/assets/790808a2-a080-4e50-a3e9-bb86ac19c21f)


## 🧑🏻‍🏫 How to Use

Make sure to follow the [Installation](#-installation) steps first

<details> <summary>Tourist 🌍 </summary>
  
Sign Up & Profile Management:

- Register with email, username, password, mobile number, nationality, DOB, and occupation.
- Update your profile, including wallet information and vacation preferences (historic areas, beaches, shopping, etc.).

Planning Your Vacation:

- Search for specific museums, activities, or itineraries by name, category, or tag.
- Filter activities and itineraries by budget, date, category, preferences, or language.
- Sort upcoming events or itineraries by price or ratings.

Booking & Payments:

- Book flights, hotels, transportation, and tickets to events directly through the app.
- Pay online via credit/debit card (Stripe) or wallet balance.
- Receive payment receipts via email.

Personalized Experience:

- Bookmark events to view later or request notifications when bookings open.
- Redeem loyalty points for wallet cash and earn badges based on your level.
  
Ratings & Feedback:

- Rate and comment on events, activities, or itineraries you participated in.
- Rate and review your tour guide.

Notifications & Updates:

- Get reminders for upcoming bookings via app and email.
- View all your upcoming and past paid activities.

Cancellations & Refunds:

- Cancel bookings 48 hours before the event to receive a wallet refund.

Complaints & Support:

- File complaints with title, description, and date for admin review.

</details>

<details> <summary>Tour Guide 🗺️</summary>
  
Sign Up & Profile Management:

- Register with email, username, and password.
- Upload required documents for admin approval.
- Create or update your profile with personal details, experience, and work history.

Itinerary Management:

- Create, read, update, or delete itineraries with details like activities, locations, timeline, price, accessibility, and language.
- Activate/deactivate itineraries with bookings.

Analytics & Sales:

- View a sales report with revenue from your itineraries.
- Filter sales reports by itinerary, date, or month.
- View a report of tourists using your itineraries and filter by month.

Notifications:

- Receive alerts if an itinerary is flagged as inappropriate.
- Get notified of bookings or cancellations for your itineraries.

</details>

<details> <summary>Advertiser 📢</summary>
  
Sign Up & Profile Management:

- Register with email, username, and password.
- Upload required documents for admin approval.
- Create or update your profile with company details like website, hotline, and company profile.

Activity Management:

- Create, read, update, or delete activities with details like date, time, location, price, category, tags, and discounts.
- View a list of all your created activities.

Analytics & Sales:

- View a sales report with revenue from your activities.
- Filter sales reports by activity, date, or month.
- View a report of tourists attending your activities and filter by month.

Notifications:

- Receive alerts if an activity is flagged as inappropriate.
- Get notified of bookings or cancellations for your activities.

</details>

<details> <summary>Seller 🛍️</summary>
  
Sign Up & Profile Management:

- Register with email, username, and password.
- Upload required documents for admin approval.
- Create or update your profile with name and description of your store.

Gift Shop Management:

- Add and manage products in the in-app gift shop.
- View sales reports for your store.
- Filter sales reports by product, date, or month.

</details>

<details> <summary>Tourism Governor 🏛️</summary>
  
Sign Up & Management:

- Create museums and historical places with details like description, pictures, location, hours, and ticket prices.
- Create tags for categorizing historical places (e.g., type, historical period).
- Update or delete museums and tags as needed.

Overview:

- View a list of all museums and historical places you’ve created.

</details>

<details> <summary>Administrator 👩‍💼</summary>
  
User Management:

- Accept or reject registration requests for tour guides, advertisers, and sellers based on uploaded documents.
- Add or remove other admins and tourism governors.
- View the total number of users and monthly new user stats.

Content Management:

- Create, read, update, or delete activity categories and preference tags.
- Flag events or itineraries deemed inappropriate.

Complaint Management:

- View and manage complaints from users.
- Mark complaints as pending, resolved, or reply directly.

Analytics & Reports:

- View and filter sales reports by product, date, or month.
- Access a comprehensive revenue report for events, itineraries, and gift shop sales.

</details>


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
