# Online-Food-Delivery-System
# Directory structure:
└── maheshbodkhe66-quickbites/
    ├── README.md
    ├── FrontEnd/
    │   └── quickbites/
    │       ├── README.md
    │       ├── package-lock.json
    │       ├── package.json
    │       ├── tailwind.config.js
    │       ├── .gitignore
    │       ├── public/
    │       │   ├── index.html
    │       │   ├── manifest.json
    │       │   └── robots.txt
    │       └── src/
    │           ├── App.css
    │           ├── App.js
    │           ├── App.test.js
    │           ├── index.css
    │           ├── index.js
    │           ├── reportWebVitals.js
    │           ├── setupTests.js
    │           ├── Admin/
    │           │   ├── Admin.jsx
    │           │   ├── AdminNavbar.jsx
    │           │   ├── AdminSidebar.jsx
    │           │   ├── AddRestaurants/
    │           │   │   ├── CreateRestaurantForm.jsx
    │           │   │   └── Demo.jsx
    │           │   ├── Category/
    │           │   │   ├── Category.jsx
    │           │   │   └── CreateCategory.jsx
    │           │   ├── Details/
    │           │   │   └── Details.jsx
    │           │   ├── Events/
    │           │   │   ├── EventCard.jsx
    │           │   │   └── Events.jsx
    │           │   ├── Food/
    │           │   │   ├── AddMenuForm.jsx
    │           │   │   ├── MenuItemTable.jsx
    │           │   │   └── RestaurantsMenu.jsx
    │           │   ├── Footer/
    │           │   │   └── Footer.jsx
    │           │   ├── Ingredients/
    │           │   │   ├── CreateIngredientCategory.jsx
    │           │   │   ├── CreateIngredientForm.jsx
    │           │   │   └── Ingredients.jsx
    │           │   ├── Orders/
    │           │   │   ├── OrderTable.jsx
    │           │   │   └── RestaurantsOrder.jsx
    │           │   ├── ReportCard/
    │           │   │   └── ReportCard.jsx
    │           │   └── utils/
    │           │       └── UploadToCloudnary.js
    │           ├── Data/
    │           │   ├── Demo.jsx
    │           │   ├── Ingredients.js
    │           │   ├── index.html
    │           │   ├── restaurents.js
    │           │   └── topMeels.js
    │           ├── Routers/
    │           │   ├── AdminRouters.jsx
    │           │   ├── CustomerRoutes.jsx
    │           │   └── Routers.jsx
    │           ├── State/
    │           │   ├── Admin/
    │           │   │   ├── Ingredients/
    │           │   │   │   ├── Action.js
    │           │   │   │   ├── ActionType.js
    │           │   │   │   └── Reducer.js
    │           │   │   ├── Order/
    │           │   │   │   ├── ActionType.js
    │           │   │   │   ├── restaurants.order.action.js
    │           │   │   │   └── restaurants.order.reducer.js
    │           │   │   └── Restaurants/
    │           │   │       ├── ActionType.js
    │           │   │       ├── Reducer.js
    │           │   │       └── admin.action.js
    │           │   ├── Authentication/
    │           │   │   ├── Action.js
    │           │   │   ├── ActionType.js
    │           │   │   └── Reducer.js
    │           │   ├── Customers/
    │           │   │   ├── Cart/
    │           │   │   │   ├── ActionCreators.js
    │           │   │   │   ├── ActionTypes.js
    │           │   │   │   ├── Reducer.js
    │           │   │   │   └── cart.action.js
    │           │   │   ├── Menu/
    │           │   │   │   ├── ActionCreators.js
    │           │   │   │   ├── ActionType.js
    │           │   │   │   ├── Reducer.js
    │           │   │   │   └── menu.action.js
    │           │   │   ├── Orders/
    │           │   │   │   ├── Action.js
    │           │   │   │   ├── ActionCreators.js
    │           │   │   │   ├── ActionTypes.js
    │           │   │   │   └── order.reducer.js
    │           │   │   └── Restaurant/
    │           │   │       ├── ActionCreateros.js
    │           │   │       ├── ActionTypes.js
    │           │   │       ├── Reducer.js
    │           │   │       └── restaurant.action.js
    │           │   └── Store/
    │           │       └── store.js
    │           ├── assets/
    │           ├── config/
    │           │   ├── api.js
    │           │   └── logic.jsx
    │           └── customers/
    │               ├── components/
    │               │   ├── Address/
    │               │   │   ├── AddressCard.jsx
    │               │   │   └── NewAdressModal.jsx
    │               │   ├── CartItem/
    │               │   │   └── CartItemCard.jsx
    │               │   ├── Footer/
    │               │   │   └── Footer.jsx
    │               │   ├── Login/
    │               │   │   └── login.jsx
    │               │   ├── MenuItem/
    │               │   │   └── MenuItemCard.jsx
    │               │   ├── MultiItemCarousel/
    │               │   │   ├── CarouselItem.jsx
    │               │   │   └── MultiItemCarousel.jsx
    │               │   ├── Navbar/
    │               │   │   ├── Navbar.css
    │               │   │   └── Navbar.jsx
    │               │   ├── Order/
    │               │   │   └── OrderCard.jsx
    │               │   ├── ProfileNavigation/
    │               │   │   └── ProfileNavigation.jsx
    │               │   ├── Register/
    │               │   │   └── Register.jsx
    │               │   ├── RestaurantCard/
    │               │   │   ├── Restaurant.css
    │               │   │   └── RestaurantCard.jsx
    │               │   └── Search/
    │               │       ├── PopularCuisines.jsx
    │               │       ├── Search.jsx
    │               │       └── SearchDishCard.jsx
    │               ├── pages/
    │               │   ├── Auth/
    │               │   │   ├── Auth.jsx
    │               │   │   ├── PasswordChangeSuccess.jsx
    │               │   │   ├── ResetPasswordForm.jsx
    │               │   │   └── ResetPaswordRequest.jsx
    │               │   ├── Cart/
    │               │   │   ├── Cart.jsx
    │               │   │   └── totalPay.js
    │               │   ├── Favorite/
    │               │   │   └── Favorite.jsx
    │               │   ├── Home/
    │               │   │   ├── Home.css
    │               │   │   ├── HomePage copy.jsx
    │               │   │   └── HomePage.jsx
    │               │   ├── NotFound/
    │               │   │   └── NotFound.jsx
    │               │   ├── Orders/
    │               │   │   └── Orders.jsx
    │               │   ├── PaymentSuccess/
    │               │   │   └── PaymentSuccess.jsx
    │               │   ├── Profile/
    │               │   │   ├── CustomerEvents.jsx
    │               │   │   ├── Notifications.jsx
    │               │   │   ├── Profile.jsx
    │               │   │   └── UserProfile.jsx
    │               │   ├── Restaurant/
    │               │   │   ├── Restaurant copy.jsx
    │               │   │   └── Restaurant.jsx
    │               │   └── UsersAdresses/
    │               │       └── UsersAddresses.jsx
    │               └── util/
    │                   ├── CategorizeIngredients.js
    │                   └── ValidToOrder.jsx
    └── QuickBites_Backend/
        ├── mvnw
        ├── mvnw.cmd
        ├── pom.xml
        ├── .gitattributes
        ├── .gitignore
        ├── src/
        │   ├── main/
        │   │   ├── java/
        │   │   │   └── com/
        │   │   │       └── quickbites/
        │   │   │           ├── QuickBitesBackendApplication.java
        │   │   │           ├── Exception/
        │   │   │           │   ├── CartException.java
        │   │   │           │   ├── CartItemException.java
        │   │   │           │   ├── FoodException.java
        │   │   │           │   ├── OrderException.java
        │   │   │           │   ├── RestaurantException.java
        │   │   │           │   ├── ReviewException.java
        │   │   │           │   └── UserException.java
        │   │   │           ├── config/
        │   │   │           │   ├── AppConfig.java
        │   │   │           │   ├── JwtConstant.java
        │   │   │           │   ├── JwtProvider.java
        │   │   │           │   └── JwtTokenValidator.java
        │   │   │           ├── controller/
        │   │   │           │   ├── AdminMenuItemController.java
        │   │   │           │   ├── AdminRestaurantController.java
        │   │   │           │   ├── AuthController.java
        │   │   │           │   ├── CartController.java
        │   │   │           │   ├── OrderController.java
        │   │   │           │   ├── RestaurantController.java
        │   │   │           │   └── UserController.java
        │   │   │           ├── dto/
        │   │   │           │   ├── AddCartItemRequest.java
        │   │   │           │   ├── ApiResponse.java
        │   │   │           │   ├── AuthResponse.java
        │   │   │           │   ├── CreateFoodRequest.java
        │   │   │           │   ├── CreateOrderRequest.java
        │   │   │           │   ├── CreateRestaurantRequest.java
        │   │   │           │   ├── LoginRequest.java
        │   │   │           │   ├── ResetPasswordRequest.java
        │   │   │           │   ├── RestaurantDto.java
        │   │   │           │   ├── ReviewRequest.java
        │   │   │           │   └── UpdateCartItemRequest.java
        │   │   │           ├── entities/
        │   │   │           │   ├── Address.java
        │   │   │           │   ├── Cart.java
        │   │   │           │   ├── CartItem.java
        │   │   │           │   ├── Category.java
        │   │   │           │   ├── ContactInformation.java
        │   │   │           │   ├── Coupon.java
        │   │   │           │   ├── Events.java
        │   │   │           │   ├── Food.java
        │   │   │           │   ├── IngredientCategory.java
        │   │   │           │   ├── IngredientsItem.java
        │   │   │           │   ├── Notification.java
        │   │   │           │   ├── Order.java
        │   │   │           │   ├── OrderItem.java
        │   │   │           │   ├── PasswordResetToken.java
        │   │   │           │   ├── Payment.java
        │   │   │           │   ├── PaymentResponse.java
        │   │   │           │   ├── Restaurant.java
        │   │   │           │   ├── Review.java
        │   │   │           │   ├── User.java
        │   │   │           │   └── enums/
        │   │   │           │       ├── OrderStatus.java
        │   │   │           │       └── USER_ROLE.java
        │   │   │           ├── repository/
        │   │   │           │   ├── AddressRepository.java
        │   │   │           │   ├── CartItemRepository.java
        │   │   │           │   ├── CartRepository.java
        │   │   │           │   ├── CategoryRepository.java
        │   │   │           │   ├── IngredientsCategoryRepository.java
        │   │   │           │   ├── IngredientsItemRepository.java
        │   │   │           │   ├── NotificationRepository.java
        │   │   │           │   ├── OrderItemRepository.java
        │   │   │           │   ├── OrderRepository.java
        │   │   │           │   ├── PasswordResetTokenRepository.java
        │   │   │           │   ├── RestaurantRepository.java
        │   │   │           │   ├── UserRepository.java
        │   │   │           │   └── foodRepository.java
        │   │   │           └── service/
        │   │   │               ├── CartSerive.java
        │   │   │               ├── CartServiceImplementation.java
        │   │   │               ├── CategoryService.java
        │   │   │               ├── CategoryServiceImplementation.java
        │   │   │               ├── CustomeUserServiceImplementation.java
        │   │   │               ├── FoodService.java
        │   │   │               ├── FoodServiceImplementation.java
        │   │   │               ├── IngredientsService.java
        │   │   │               ├── IngredientsServiceImplementation.java
        │   │   │               ├── NotificationService.java
        │   │   │               ├── NotificationServiceImplementation.java
        │   │   │               ├── OrderItemService.java
        │   │   │               ├── OrderItemServiceImplementation.java
        │   │   │               ├── OrderService.java
        │   │   │               ├── OrderServiceImplementation.java
        │   │   │               ├── PasswordResetTokenService.java
        │   │   │               ├── PasswordResetTokenServiceImplementation.java
        │   │   │               ├── PaymentService.java
        │   │   │               ├── PaymentServiceImplementation.java
        │   │   │               ├── RestaurantService.java
        │   │   │               ├── RestaurantServiceImplementation.java
        │   │   │               ├── UserService.java
        │   │   │               └── UserServiceImplementation.java
        │   │   └── resources/
        │   │       └── application.properties
        │   └── test/
        │       └── java/
        │           └── com/
        │               └── quickbites/
        │                   └── QuickBitesBackendApplicationTests.java
        └── .mvn/
            └── wrapper/
                └── maven-wrapper.properties
