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


## 🧪 Tests



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
