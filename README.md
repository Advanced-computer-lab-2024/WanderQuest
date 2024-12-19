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

<img width="1788" alt="Seller home page" src="https://github.com/user-attachments/assets/506f2875-2ddc-4e02-94f4-3642abaa090e">


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

<img width="1788" alt="Advertiser Home page" src="https://github.com/user-attachments/assets/943786e2-54c8-44ce-853c-10966c0c2a15">


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

<img width="1792" alt="Tourist Home page" src="https://github.com/user-attachments/assets/e2f424a1-9238-45f9-b99c-0ff49de8c0d9">

<img width="1792" alt="Historical Places" src="https://github.com/user-attachments/assets/cb86690f-999e-464e-bab8-49556e8ad1b0" />

<img width="1792" alt="My bookings" src="https://github.com/user-attachments/assets/72a44ae7-256a-46c0-88c9-3c984bdabc87" />

<img width="1775" alt="Tourist Transportation" src="https://github.com/user-attachments/assets/1cb0692d-288e-4f7d-a075-4a5d0aaf7442" />


</details>

<details>
<summary>Tour Guide Functions</summary>
  
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

## 📚 API Reference

<details>
<summary>Authentication APIs</summary>

`POST: http://localhost:4000/auth/register`
*Register a new user*
```json
{
    "username": "newUser",
    "email": "user@example.com",
    "password": "Password123",
    "role": "tourist"
}
```

`POST: http://localhost:4000/auth/login`
*Login existing user*
```json
{
    "username": "existingUser",
    "password": "Password123"
}
```

`POST: http://localhost:4000/auth/resetPassword`
*Reset user password*
```json
{
    "otp": "123456",
    "newPassword": "NewPassword123",
    "username": "existingUser"
}
```
</details>

<details>
<summary>Payment APIs</summary>

`POST: http://localhost:4000/payment/handleBookingPayment`
*Process a booking payment*
```json
{
    "bookingId": "123456789",
    "amount": 100,
    "currency": "USD"
}
```

`POST: http://localhost:4000/payment/payOrderWithWallet`
*Pay using wallet balance*
```json
{
    "orderId": "123456789"
}
```
</details>

<details>
<summary>Booking APIs</summary>

`POST: http://localhost:4000/booking/activity`
*Book an activity*
```json
{
    "activityId": "123456789",
    "date": "2024-12-25"
}
```

`POST: http://localhost:4000/booking/itinerary`
*Book an itinerary*
```json
{
    "itineraryId": "123456789",
    "startDate": "2024-12-25"
}
```
</details>

<details>
<summary>Cart & Order APIs</summary>

`POST: http://localhost:4000/tourist/cart/add/:id`
*Add item to cart*
```json
{
    "quantity": 1
}
```

`POST: http://localhost:4000/tourist/cart/checkout`
*Checkout cart items*
```json
{
    "deliveryAddress": "123 Main St",
    "paymentMethod": "wallet"
}
```
</details>

## 🧪 Test Routes

<details>
<summary>Authentication Tests</summary>

```bash
# Register new user
POST /auth/register

# Login user
POST /auth/login

# Reset password
POST /auth/resetPassword

# Change password
POST /auth/changePassword
```
</details>

<details>
<summary>Payment Tests</summary>

```bash
# Process payment
POST /payment/handleBookingPayment

# Wallet payment
POST /payment/payOrderWithWallet

# Get currency conversion
GET /payment/getPaymentMultiplier
```
</details>

<details>
<summary>Booking Tests</summary>

```bash
# Create booking
POST /booking/activity
POST /booking/itinerary
POST /booking/flight

# View bookings
GET /booking/activities
GET /booking/itineraries

# Cancel booking
PATCH /booking/cancel
```
</details>

<details>
<summary>Cart Tests</summary>

```bash
# Cart operations
POST /tourist/cart/add/:id
GET /tourist/cart
DELETE /tourist/cart/remove
PATCH /tourist/cart/change

# Checkout process
POST /tourist/cart/checkout
```
</details>

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
