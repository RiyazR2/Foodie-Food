# FoodieFinder — Interview Questions & Answers

> **Project**: FoodieFinder (Foodie Food) — A Swiggy-like food delivery web app
> **Tech Stack**: React 18, Redux Toolkit, React Router v6, Tailwind CSS, Parcel, Jest, Netlify
> **Live**: https://foodiefinder2.netlify.app/
> **GitHub**: https://github.com/RiyazR2/Foodie-Food

---

## Q1. Give me a brief overview of your FoodieFinder project.

**A:** FoodieFinder is a food delivery web application that fetches real-time restaurant data from Swiggy's live API. Users can browse restaurants based on their location, view restaurant menus, search/filter restaurants, add items to a cart, and go through a checkout flow. I built it using React 18 with functional components and hooks, Redux Toolkit for cart state management, React Router v6 for client-side routing, and Tailwind CSS for styling. It's bundled with Parcel and deployed on Netlify with serverless functions acting as a backend proxy.

---

## Q2. What is the overall architecture / folder structure of this project?

**A:** The project follows a modular structure:

- **`src/components/`** — All UI components (Body, Header, RestaurantCard, RestaurantMenu, Cart, etc.)
- **`src/utils/`** — Business logic, custom hooks (`useRestaurantMenu`, `useOnlineStatus`), context providers (`LocationContext`, `UserContext`), Redux store (`appStore`, `cartSlice`), and constants
- **`src/components/__tests__/`** — Jest + React Testing Library test files
- **`src/components/Mocks/`** — Mock JSON data for tests
- **`netlify/functions/`** — Serverless functions for production API proxying
- **`server.js`** — Local Express proxy server for development

The entry point is `App.js` which sets up the Provider hierarchy: `Redux Provider` → `LocationProvider` → `UserContext.Provider` → `Router (Outlet)`.

---

## Q3. How did you solve the CORS problem when calling Swiggy's API?

**A:** Swiggy's API doesn't set `Access-Control-Allow-Origin` headers, so browsers block direct cross-origin requests from my domain. CORS is a **browser-only** security restriction — server-to-server calls don't have it. So I created a **proxy layer**:

- **In Development**: An Express server (`server.js`) on `localhost:3000` with `app.use(cors())`. My React app calls `localhost:3000/api/menu`, and the server fetches from Swiggy server-side, then returns the data to the browser.
- **In Production (Netlify)**: I use **Netlify Serverless Functions** (`netlify/functions/menu.js` and `restaurants.js`). My React app calls `/.netlify/functions/menu`, and the function makes the server-side request to Swiggy.

In `constants.js`, I detect the environment using `window.location.hostname` — if it's `localhost`, API calls go to the Express proxy; in production, they go to Netlify Functions. The React components don't need to know the difference.

**Extra challenge — AWS WAF**: Swiggy added AWS WAF on their `/dapi/menu` endpoint which returns a `202` status with a JavaScript challenge. Servers can't solve this. I discovered that Swiggy's **mobile API** (`/mapi/menu/pl`) returns the same data without WAF protection. So my proxy uses `/mapi/` for menu requests.

```
Browser → /.netlify/functions/menu → Swiggy /mapi/menu  (Production)
Browser → localhost:3000/api/menu  → Swiggy /mapi/menu  (Development)
```

---

## Q4. How does the user location feature work?

**A:** I built a location system using **Context API + useReducer**:

- **`LocationContext.js`** manages the entire location state — current coordinates, selected city, loading, errors, and whether geolocation is active.
- **Two ways to get location**:
  1. **Manual city selection** — User picks from a dropdown (Delhi, Mumbai, Pune, Solapur, etc.). Each city has pre-defined `lat/lng` in `CITY_COORDINATES`.
  2. **Browser Geolocation API** — `navigator.geolocation.getCurrentPosition()` gets the user's actual coordinates. I handle all error cases (permission denied, timeout, unavailable).
- **Persistence** — I save the selected location to `localStorage`, so on refresh the last location is remembered.
- **Data flow**: When location changes → `LocationContext` updates → `Body.js` re-fetches restaurant list with new coordinates → `useRestaurantMenu` re-fetches menu with new coordinates.

I chose `useReducer` over `useState` because the location state has multiple related fields (lat, lng, name, type, loading, error) and multiple action types (SET_CITY, SET_GEOLOCATION, SET_LOADING, SET_ERROR, CLEAR_ERROR).

---

## Q5. Why did you use `useReducer` instead of `useState` for LocationContext?

**A:** The location state is complex — it has `currentLocation` (lat, lng, name, type), `selectedCity`, `isLoading`, `error`, and `isGeolocationEnabled`. There are 6 different action types that modify this state in different ways. With `useState`, I'd need multiple `setState` calls that could cause inconsistent intermediate states. `useReducer` gives me:

1. **Atomic state transitions** — Each action updates all related fields at once
2. **Predictable state logic** — All state transitions are in one reducer function
3. **Easier debugging** — I can log dispatched actions to trace state changes
4. **Scalability** — Adding new actions (like SET_GEOLOCATION) is just adding a new case

---

## Q6. Explain the routing setup in your application.

**A:** I use `createBrowserRouter` from React Router v6 with a nested route structure:

```
AppLayout (/)          ← Layout with Header + Outlet + Footer
  ├── Body (/)         ← Restaurant listing (home page)
  ├── RestaurantMenu (/restaurants/:resId)  ← Dynamic route
  ├── Cart (/cart)
  ├── About (/about)   ← Lazy loaded
  ├── Grocery (/grocery) ← Lazy loaded
  ├── Contact (/contact)
  ├── Login (/login)
  ├── SignIn (/signin)
  └── Payment (/payment)
errorElement: Error     ← Catches all routing errors
```

`AppLayout` renders `<Header />`, `<Outlet />` (where child routes render), and `<Footer />`. The `Outlet` component from React Router acts as a placeholder for the matched child route.

For the restaurant menu page, I use a **dynamic route** `/restaurants/:resId` where `:resId` is the restaurant ID. Inside `RestaurantMenu`, I extract it using `useParams()`.

---

## Q7. What is lazy loading and how did you implement it?

**A:** Lazy loading (code splitting) means loading components only when they're needed, not upfront. This reduces the initial bundle size and improves first load performance.

I used React's `lazy()` and `Suspense`:

```js
const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));
```

In the route config, I wrap them with `<Suspense fallback={...}>`:

```jsx
{
  path: "/about",
  element: (
    <Suspense fallback={<h1>Loading About Page.......</h1>}>
      <About />
    </Suspense>
  ),
}
```

**How it works**: `lazy()` returns a special component that triggers a dynamic `import()` when first rendered. Parcel (my bundler) sees this and creates a separate chunk file. When the user navigates to `/about`, React loads that chunk, and `Suspense` shows the fallback UI while it's loading.

I chose to lazy load `About` and `Grocery` because they're not critical for the initial page load — users visit them less frequently.

---

## Q8. How does the Redux cart work in your project?

**A:** I use **Redux Toolkit** for cart state management:

- **Store** (`appStore.js`): Created with `configureStore({ reducer: { cart: cartReducer } })`
- **Slice** (`cartSlice.js`): Has 3 reducers:
  - `addItem` — Pushes an item to the `items` array
  - `removeItem` — Filters out item by `id`
  - `clearCart` — Sets `items.length = 0`

**Why Redux over Context for cart?** The cart is accessed by multiple unrelated components — `Header` (shows cart count badge), `ItemList_Category` (add/remove buttons), `Cart` page (displays items, total, clear). With Context, every cart update would re-render all consumers. Redux with `useSelector` only re-renders components that read the specific slice of state that changed.

**Data flow**: User clicks "ADD" → `dispatch(addItem(item))` → Redux updates `state.cart.items` → `useSelector` in Header re-renders showing updated count → Cart page shows the item.

**Note**: Redux Toolkit uses Immer internally, so I can write "mutating" code like `state.items.push(action.payload)` — Immer converts it to an immutable update behind the scenes.

---

## Q9. Why did you use Redux Toolkit instead of plain Redux?

**A:** Redux Toolkit solves several pain points of plain Redux:

1. **Less boilerplate** — `createSlice` auto-generates action creators and action types. In plain Redux, I'd need separate files for actions, action types, and reducers.
2. **Immer built-in** — I can write `state.items.push(item)` instead of `return { ...state, items: [...state.items, item] }`. Immer handles immutability.
3. **`configureStore`** — Automatically sets up Redux DevTools and middleware (thunk). In plain Redux, I'd need to manually compose enhancers.
4. **It's the official recommendation** — The Redux team says "Redux Toolkit is the standard way to write Redux logic."

---

## Q10. What is a Higher-Order Component (HOC)? How did you use it?

**A:** A HOC is a function that takes a component and returns a new enhanced component. It's a pattern for reusing component logic.

In my project, I created `withDiscountLabel` HOC in `RestaurantCard.js`:

```js
export const withDiscountLabel = (RestaurantCard) => {
  return (props) => {
    const { header } = props?.restData?.info?.aggregatedDiscountInfoV3;
    return (
      <div className="relative">
        <label className="absolute bg-black text-white ...">
          {!header.includes("OFF") ? "Discount Soon 🤗" : header}
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
```

**Usage in Body.js**:
```js
const RestaurantCardDiscount = withDiscountLabel(RestaurantCard);

// In JSX:
{restaurant?.info?.aggregatedDiscountInfoV3?.header ? (
  <RestaurantCardDiscount restData={restaurant} />
) : (
  <RestaurantCard restData={restaurant} />
)}
```

This way, restaurants with discounts get a label overlay without modifying the original `RestaurantCard` component. The HOC **adds** behavior without changing the base component — following the Open/Closed Principle.

---

## Q11. What custom hooks did you create and why?

**A:** I created two custom hooks:

### 1. `useRestaurantMenu(resId)`
- **Purpose**: Fetches restaurant menu data by ID
- **Returns**: `{ resInfo, isLoading, error }`
- **Why a custom hook?** It separates data-fetching logic from the UI component (`RestaurantMenu.js`). The component only cares about rendering — the hook handles the API call, loading state, and error handling. This follows the **Single Responsibility Principle** and makes the hook reusable if I need menu data elsewhere.
- It also re-fetches when `currentLocation` changes (from `LocationContext`).

### 2. `useOnlineStatus()`
- **Purpose**: Detects if the user is online or offline
- **Returns**: `boolean` (true/false)
- **How**: Listens to `window.addEventListener("online")` and `window.addEventListener("offline")` events
- **Usage**: In `Body.js`, if offline, it shows "Looks Like You're Offline!!" message. In `Header.js`, it shows a green/red dot indicator.

Custom hooks let me extract and reuse stateful logic without changing the component hierarchy. They're just functions that use other hooks.

---

## Q12. Explain the Shimmer UI pattern you implemented.

**A:** Shimmer UI is a loading placeholder that mimics the layout of the actual content with animated gray blocks. It's better than a spinner because:

1. **Perceived performance** — Users see the page structure immediately, so it feels faster
2. **Reduces layout shift** — The shimmer blocks occupy the same space as real content, so there's no jarring jump when data loads

I have two shimmer components:
- **`Shimmer`** — For the restaurant list page (20 card-shaped blocks)
- **`RestaurantInfoShimmer`** — For the menu page (6 wide blocks)

The animation uses CSS `background: linear-gradient(...)` with `background-size: 200%` and a `@keyframes` animation that shifts the gradient position, creating the "shimmering" effect.

**Conditional rendering**: In `Body.js`, if `listOfRestaurants.length === 0`, I show `<Shimmer />`. Once data loads, React re-renders with actual restaurant cards.

---

## Q13. How does the search and filter functionality work?

**A:** I maintain two state arrays:
- `listOfRestaurants` — The **original** full list from the API (never modified after fetch)
- `filteredRestaurant` — The **displayed** list (modified by search/filter)

### Search:
```js
const handleSearch = () => {
  const filterByName = listOfRestaurants.filter((res) =>
    res.info.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const filterByCuisines = listOfRestaurants.filter((res) =>
    res.info.cuisines.some((cuisine) =>
      cuisine.toLowerCase().includes(searchText.toLowerCase())
    )
  );
  setFilteredRestaurant([...filterByName, ...filterByCuisines]);
};
```

It searches both restaurant **name** and **cuisines**, then combines results. I always filter from `listOfRestaurants` (the original), not from `filteredRestaurant`, so previous filters don't stack.

### Top Rated Filter:
```js
const filteredList = listOfRestaurants.filter((res) => res?.info?.avgRating > 4.4);
setFilteredRestaurant(filteredList);
```

---

## Q14. What is the Controlled Component pattern you used in the accordion?

**A:** In `RestaurantMenu.js`, I have an accordion for menu categories. The **parent** (`RestaurantMenu`) controls which accordion section is open:

```js
const [showIndex, setShowIndex] = useState(1);

{categories?.map((category, index) => (
  <RestaurantCategory
    showItems={index === showIndex}
    setShowIndex={() => setShowIndex(index)}
  />
))}
```

`RestaurantCategory` is a **controlled component** — it doesn't manage its own open/close state. The parent passes `showItems` (boolean) and `setShowIndex` (callback). When user clicks a category header, it calls `setShowIndex()` which updates the parent's state, and only one section is open at a time.

**Why controlled?** If each category managed its own state, multiple sections could be open simultaneously. By lifting state up to the parent, I ensure only one is open — a single source of truth.

---

## Q15. How does your app handle the `useParams` hook for dynamic routes?

**A:** When a user clicks a restaurant card, they navigate to `/restaurants/751967` (for example). In the route config:

```js
{ path: "/restaurants/:resId", element: <RestaurantMenu /> }
```

`:resId` is a URL parameter. Inside `RestaurantMenu`:

```js
const { resId } = useParams();
const { resInfo, isLoading, error } = useRestaurantMenu(resId);
```

`useParams()` extracts `751967` from the URL. This `resId` is passed to my custom hook which fetches the menu for that specific restaurant. If the user navigates to a different restaurant, `resId` changes → the `useEffect` in the hook re-runs → new menu data is fetched.

---

## Q16. How did you handle error boundaries and error states?

**A:** I handle errors at multiple levels:

1. **Route-level errors** — `errorElement: <Error />` in the router config catches any routing errors (404, etc.). The `Error` component uses `useRouteError()` to display the error status and message.

2. **API-level errors** — In `useRestaurantMenu`, I have try/catch with error state:
   ```js
   try { ... }
   catch (err) { setError(err.message); setResInfo(null); }
   ```
   In `RestaurantMenu.js`, I check `error` **before** checking `isLoading` — so if the API fails, the user sees an error message instead of an infinite shimmer.

3. **Network status** — `useOnlineStatus` hook detects offline state. `Body.js` shows "Looks Like You're Offline!!" before attempting any API calls.

4. **Location errors** — `LocationContext` handles geolocation errors (permission denied, timeout, unavailable) with specific error messages shown in the `LocationSelector` dropdown.

---

## Q17. Explain the `useEffect` dependency arrays in your project.

**A:** I use `useEffect` with different dependency patterns:

1. **`useEffect(() => { fetchData() }, [currentLocation])`** in `Body.js` — Re-fetches restaurants whenever the user changes their location. Without `currentLocation` in the dependency array, it would only fetch once on mount.

2. **`useEffect(() => { fetchData() }, [resId, currentLocation])`** in `useRestaurantMenu` — Re-fetches menu when either the restaurant ID or location changes.

3. **`useEffect(() => { ... }, [])`** in `useOnlineStatus` — Empty array means it runs once on mount to set up event listeners. The listeners persist for the component's lifetime.

4. **`useEffect(() => { localStorage.setItem(...) }, [state.currentLocation])`** in `LocationProvider` — Saves to localStorage whenever location changes.

**Common mistake I avoid**: Not including dependencies causes stale closures. For example, if I omitted `currentLocation` from Body's useEffect, it would always use the initial location value.

---

## Q18. How does your Netlify deployment work?

**A:** My `netlify.toml` configures:

```toml
[build]
  command = "npm run build"      # Runs parcel build
  publish = "dist"               # Serves the dist folder
  functions = "netlify/functions" # Serverless functions directory
```

**Build process**: Netlify detects a push to GitHub → runs `npm run build` (Parcel bundles the app into `dist/`) → deploys static files + serverless functions.

**Serverless functions**: `netlify/functions/menu.js` and `restaurants.js` are auto-deployed as AWS Lambda functions. When my frontend calls `/.netlify/functions/menu?lat=17.6&lng=75.9&restaurantId=751967`, Netlify routes it to the function, which fetches from Swiggy server-side and returns the response.

**SPA routing**: The `[[redirects]]` rule sends all routes to `index.html` so React Router handles client-side routing. Without this, refreshing on `/restaurants/751967` would give a 404.

---

## Q19. What is the Virtual DOM and how does React use it in your project?

**A:** The Virtual DOM is a lightweight JavaScript representation of the actual DOM. When state changes in my app:

1. React creates a **new Virtual DOM tree**
2. It **diffs** the new tree with the previous one (Reconciliation using the Fiber algorithm)
3. It calculates the **minimum set of changes** needed
4. It **batches** those changes and updates only the affected real DOM nodes

**Example in my project**: When a user searches for "pizza", `setFilteredRestaurant(...)` triggers a re-render. React doesn't destroy and recreate all restaurant cards — it diffs and only removes/adds the cards that changed. The `key={restaurant.info.id}` prop on each card helps React identify which items changed, were added, or removed.

---

## Q20. Why do you use `key` prop in lists? What happens without it?

**A:** In `Body.js`:
```jsx
{filteredRestaurant.map((restaurant) => (
  <Link to={"/restaurants/" + restaurant.info.id} key={restaurant.info.id}>
    <RestaurantCard restData={restaurant} />
  </Link>
))}
```

The `key` helps React's reconciliation algorithm identify which items changed. Without keys (or with index as key):
- React can't efficiently track items — it re-renders the entire list
- It may reuse DOM nodes incorrectly, causing bugs with component state
- Performance degrades significantly for large lists

I use `restaurant.info.id` (a unique, stable identifier) — not the array index, because the index changes when items are filtered or reordered.

---

## Q21. How does `useSelector` work and why is it better than `useContext` for the cart?

**A:** `useSelector` from react-redux subscribes to a specific slice of the Redux store:

```js
const cartItems = useSelector((store) => store.cart.items);
```

**Why better than Context for cart?**

With `useContext`, when **any** value in the context changes, **all** consumers re-render — even if they only use one field. If I had cart in Context, changing the cart count would re-render every component that uses the context (Header, Body, Footer, etc.).

With `useSelector`, React-Redux does a **shallow comparison** of the selected value. Only components whose selected value actually changed will re-render. So when I add an item to cart, only `Header` (cart badge) and `Cart` page re-render — not `Body` or `Footer`.

---

## Q22. Explain the `withDiscountLabel` HOC vs using a simple conditional inside RestaurantCard.

**A:** I could have put the discount label logic inside `RestaurantCard` with an `if` check. But the HOC approach is better because:

1. **Single Responsibility** — `RestaurantCard` only renders a restaurant card. It doesn't know about discounts.
2. **Open/Closed Principle** — I extended behavior without modifying the original component.
3. **Reusability** — I could create `withPromotedLabel`, `withNewLabel`, etc. using the same pattern.
4. **Composition** — I can stack HOCs: `withPromotedLabel(withDiscountLabel(RestaurantCard))`.

The trade-off is slightly more complexity. For a simple case, a conditional inside the component is fine. But as the number of variations grows, HOCs scale better.

---

## Q23. How did you write tests for this project?

**A:** I use **Jest** as the test runner and **React Testing Library** for rendering components. I have 5 test files:

1. **`Contact.test.js`** — Tests that the Contact form renders correctly (heading, button, input fields). Uses `getByRole`, `getByText`, `getByPlaceholderText`, `getAllByRole`.

2. **`Header.test.js`** — Tests Header renders with Login button, cart count, and that Login/Logout toggle works with `fireEvent.click`.

3. **`RestaurantCard.test.js`** — Tests that RestaurantCard renders with mock data and displays the restaurant name.

4. **`Search.test.js`** — Integration test: renders `Body`, mocks `global.fetch`, then tests search filtering (9 cards → search "c" → 4 cards) and top-rated filter (9 → 5).

5. **`Cart.test.js`** — End-to-end flow: renders RestaurantMenu + Header + Cart, clicks accordion, adds items, verifies cart count updates, clears cart.

**Key testing patterns**:
- `global.fetch = jest.fn(...)` — Mocking API calls with mock JSON data
- `act(async () => render(...))` — Wrapping async renders
- `screen.getAllByTestId("resCard")` — Using `data-testid` attributes for reliable querying
- Testing user interactions with `fireEvent.click` and `fireEvent.change`

---

## Q24. What is Parcel and why did you choose it over Webpack/Vite?

**A:** Parcel is a zero-configuration bundler. I chose it because:

1. **Zero config** — No `webpack.config.js` needed. Parcel auto-detects React, JSX, Tailwind, PostCSS, etc.
2. **Fast HMR** — Hot Module Replacement works out of the box
3. **Built-in support** — CSS, images, code splitting, tree shaking — all automatic
4. **Dev server** — `parcel index.html` starts a dev server with live reload

**Trade-offs vs Vite**: Vite is faster for large projects (uses esbuild for dev). Parcel is simpler for medium projects. For this project's size, Parcel's zero-config approach saved setup time.

**Build command**: `parcel build index.html` outputs optimized files to `dist/` with minification, tree shaking, and content hashing.

---

## Q25. How does Tailwind CSS work in your project? Why not regular CSS?

**A:** Tailwind is a utility-first CSS framework. Instead of writing custom CSS classes, I compose styles directly in JSX:

```jsx
<div className="flex flex-wrap justify-between items-center text-xs sm:text-base text-gray-600 mt-2">
```

**Why Tailwind?**
1. **No CSS file management** — No separate `.css` files to maintain
2. **Responsive design** — `sm:`, `md:`, `lg:` prefixes make responsive design easy
3. **Consistency** — Predefined spacing, colors, and typography scales
4. **Small bundle** — Tailwind purges unused classes in production, so only used utilities are in the final CSS
5. **Fast development** — No context-switching between JSX and CSS files

**Responsive example in my Header**: Desktop shows full nav links, mobile shows compact pill-shaped links with `md:hidden` and `hidden md:flex` classes.

---

## Q26. What is `React.createContext` and how did you use `UserContext`?

**A:** `createContext` creates a context object for sharing data across the component tree without prop drilling.

I have `UserContext` for the logged-in user:

```js
const UserContext = createContext({ loggedInUser: "Default User" });
```

In `App.js`, I wrap the app with the provider:
```jsx
<UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
  <div className="app">...</div>
</UserContext.Provider>
```

Any child component can consume it with `useContext(UserContext)`. The default value `"Default User"` is used only when a component reads the context without a Provider above it in the tree.

I have two contexts in this project — `UserContext` (simple, uses `useState`) and `LocationContext` (complex, uses `useReducer`). I chose the right tool for each complexity level.

---

## Q27. How does the `LocationSelector` dropdown work? How do you handle click-outside-to-close?

**A:** The `LocationSelector` is a custom dropdown component with:

1. **`useRef`** — `dropdownRef` references the dropdown DOM element
2. **Click outside detection** — An `useEffect` adds a `mousedown` event listener on `document`. If the click target is not inside `dropdownRef.current`, it closes the dropdown:
   ```js
   const handleClickOutside = (event) => {
     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
       setIsOpen(false);
     }
   };
   ```
3. **Cleanup** — The `useEffect` returns a cleanup function that removes the event listener when the component unmounts, preventing memory leaks.

This is a common pattern for custom dropdowns, modals, and tooltips in React.

---

## Q28. Explain the class component (`UserClass`) in your project. How is it different from functional components?

**A:** `UserClass.js` (About page) is a **class component** that fetches GitHub profile data:

- **`constructor`** — Initializes `this.state` with `userInfo`, `isLoading`, `error`
- **`componentDidMount`** — Lifecycle method that runs after first render. I fetch GitHub API data here.
- **`this.setState`** — Updates state (triggers re-render)
- **`render()`** — Returns JSX

**Key differences from functional components**:

| Feature | Class Component | Functional Component |
|---------|----------------|---------------------|
| State | `this.state` + `this.setState` | `useState` hook |
| Side effects | `componentDidMount`, `componentDidUpdate` | `useEffect` hook |
| Context | `this.context` or `contextType` | `useContext` hook |
| Code | More verbose | More concise |
| `this` keyword | Required everywhere | Not needed |

I kept this as a class component intentionally to demonstrate I understand both patterns. In a real project, I'd use functional components everywhere.

---

## Q29. How does the Swiggy API data structure work? How do you handle it changing?

**A:** Swiggy's API returns deeply nested JSON. The restaurant list is at different card indices depending on the response:

```js
// Try path 1
json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
// Try path 2
json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
// Fallback: loop through all cards
for (let i = 0; i < json?.data?.cards?.length; i++) { ... }
```

For the menu page, instead of hardcoding indices, I **dynamically find** the correct cards:

```js
const infoCard = restaurantInfo?.cards?.find(c => c.card?.card?.info?.name);
const groupedCardEntry = restaurantInfo?.cards?.find(
  c => c.groupedCard?.cardGroupMap?.REGULAR
);
```

**Why?** Swiggy frequently changes their API structure — card indices shift, new cards are added. By searching for the data by its **shape** (e.g., "find the card that has `info.name`") instead of by **index**, my code is resilient to these changes.

I also use **optional chaining** (`?.`) extensively to prevent crashes when a nested property doesn't exist.

---

## Q30. What is `useEffect` cleanup and where do you use it?

**A:** The cleanup function runs when the component unmounts or before the effect re-runs. It prevents memory leaks.

**In `useOnlineStatus`**:
```js
useEffect(() => {
  window.addEventListener("offline", () => setOnlineStatus(false));
  window.addEventListener("online", () => setOnlineStatus(true));
}, []);
```
Ideally, this should return a cleanup to remove the listeners. Currently it doesn't — this is a minor improvement I'd make.

**In `LocationSelector`**:
```js
useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
```
The cleanup removes the event listener when the component unmounts, preventing the handler from running on a destroyed component.

---

## Q31. How does the cart total calculation work?

**A:** In `Cart.js`:

```js
const totalToPay = cartItems
  .map(item => item.card.info.price / 100 || item.card.info.defaultPrice / 100)
  .reduce((acc, cur) => acc + cur, 0);
```

1. `.map()` extracts the price of each item (Swiggy stores prices in paise, so divide by 100)
2. `||` handles items that have `defaultPrice` instead of `price`
3. `.reduce()` sums all prices, starting from 0

This is a **derived value** — I don't store the total in Redux. I compute it from `cartItems` on every render. This follows the principle of **not storing derived state** — the total is always in sync with the items.

---

## Q32. What is the Provider hierarchy in your app and why does order matter?

**A:** In `App.js`:

```jsx
<Provider store={appStore}>          {/* Redux — outermost */}
  <LocationProvider>                  {/* Location Context */}
    <UserContext.Provider>             {/* User Context */}
      <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UserContext.Provider>
  </LocationProvider>
</Provider>
```

**Order matters because**: A provider can only be consumed by components **below** it in the tree. Since `LocationProvider` needs Redux (if it ever does), Redux must be above it. `Header` and `Body` need both location and cart data, so both providers must be above them.

If I put `LocationProvider` outside `Provider`, location-related components couldn't access Redux. The hierarchy ensures every component has access to all the contexts it needs.

---

## Q33. How would you optimize performance in this app?

**A:** Several optimizations I've implemented or would implement:

1. **Code splitting** — Already done with `lazy()` for About and Grocery pages
2. **Memoization** — Could use `React.memo()` on `RestaurantCard` to prevent re-renders when parent re-renders but props haven't changed
3. **`useCallback`** — For handler functions like `handleSearch`, `handleTopRated` passed as props
4. **`useMemo`** — For expensive computations like the cart total
5. **Image optimization** — Swiggy's CDN URL already includes `fl_lossy,f_auto,q_auto,w_660` for optimized images
6. **Debouncing search** — Currently search triggers on button click. Could add debounced live search with `useEffect` + `setTimeout`
7. **Redux selector optimization** — `useSelector` with specific selectors instead of selecting entire store slices

---

## Q34. What happens when a user adds an item to the cart? Trace the full flow.

**A:**

1. User clicks "ADD" button in `ItemList_Category.js`
2. `handleAddItem(item)` is called → `dispatch(addItem(item))`
3. Redux dispatches the `addItem` action to the store
4. `cartSlice` reducer runs: `state.items.push(action.payload)` (Immer handles immutability)
5. Redux store updates → notifies all subscribers
6. `useSelector((store) => store.cart.items)` in `Header.js` detects the change
7. Header re-renders → cart badge shows updated count: `{cartItems.length}`
8. `Cart.js` (if mounted) also re-renders with the new item in the list
9. The total price is recalculated from the updated `cartItems` array

**Important**: Only components that select `cart.items` re-render. `Body.js`, `Footer.js`, etc. are unaffected.

---

## Q35. How do you handle the case when Swiggy API returns no restaurants for a location?

**A:** In `Body.js`, after fetching:

```js
if (restaurants && restaurants.length > 0) {
  setListOfRestaurant(restaurants);
  setFilteredRestaurant(restaurants);
} else {
  setListOfRestaurant([]);
  setFilteredRestaurant([]);
}
```

And in the JSX:
```jsx
{filteredRestaurant.length === 0 ? (
  <NoRestaurantsFound locationName={currentLocation.name} searchText={searchText} />
) : (
  <div className="flex flex-wrap">...</div>
)}
```

I also have a `try/catch` that catches network errors and sets empty arrays, so the UI gracefully shows "No restaurants found" instead of crashing.

---

## Q36. What is the difference between `useContext` and Redux? When would you use each?

**A:** In my project, I use **both**:

| | Context API | Redux |
|---|---|---|
| **Used for** | Location, User info | Cart |
| **Best for** | Low-frequency updates, theme, auth, locale | High-frequency updates, complex state |
| **Re-renders** | All consumers re-render on any change | Only components whose selected value changed |
| **DevTools** | No built-in | Redux DevTools for time-travel debugging |
| **Middleware** | None | Thunk, Saga for async logic |
| **Boilerplate** | Minimal | More setup (but RTK reduces it) |

**My rule of thumb**: Use Context for "global settings" that change rarely (location, theme, auth). Use Redux for "application state" that changes frequently and is read by many components (cart, notifications, filters).

---

## Q37. How does `optional chaining (?.)` help in your project?

**A:** Swiggy's API has deeply nested objects that may or may not exist. Without optional chaining:

```js
// This would crash if cards[2] or card or info is undefined
const name = restaurantInfo.cards[2].card.card.info.name;
```

With optional chaining:
```js
const infoCard = restaurantInfo?.cards?.find(c => c.card?.card?.info?.name);
const { name } = infoCard?.card?.card?.info || {};
```

If any property in the chain is `null` or `undefined`, it short-circuits and returns `undefined` instead of throwing `TypeError: Cannot read property of undefined`. This is critical when working with third-party APIs where the response structure isn't guaranteed.

---

## Q38. If you had to scale this project, what would you add?

**A:**

1. **Authentication** — Implement real login with JWT/OAuth (currently UI-only)
2. **Backend** — Move from serverless functions to a proper Node.js/Express backend with a database
3. **Database** — Store user profiles, order history, saved addresses (MongoDB or PostgreSQL)
4. **Payment integration** — Razorpay/Stripe for real payments (currently just a success page)
5. **Real-time order tracking** — WebSockets for live delivery updates
6. **PWA** — Service workers for offline support and push notifications
7. **Infinite scroll** — Load more restaurants as user scrolls (pagination)
8. **TypeScript** — Add type safety across the codebase
9. **State management upgrade** — RTK Query for API caching and automatic refetching
10. **CI/CD** — GitHub Actions for automated testing and deployment

---

## Q39. What was the most challenging problem you faced in this project?

**A:** The **CORS + AWS WAF** issue with Swiggy's menu API. The restaurant list worked fine through a CORS proxy, but the menu endpoint kept showing infinite shimmer.

**Debugging process**:
1. First, I found the `restaurantId` was being appended outside the encoded CORS proxy URL — fixed the URL construction
2. Then the CORS proxy returned 500 — tested multiple public CORS proxies, all failed
3. Inspected the raw response — found Swiggy returns `202` with `x-amzn-waf-action: challenge` header
4. Tried Puppeteer to solve the WAF challenge — Swiggy blocks headless browsers entirely (`chrome-error://chromewebdata/`)
5. Finally discovered the `/mapi/` (mobile API) endpoint doesn't have WAF — **same data, different endpoint**

This taught me to always check the **actual HTTP response** (status codes, headers) rather than assuming the issue is in my code. The fix was simple, but finding it required systematic debugging.

---

## Q40. Walk me through what happens from the moment a user opens your app to seeing restaurants.

**A:**

1. **Browser loads `index.html`** → Parcel-bundled JS loads → `ReactDOM.createRoot` renders `<RouterProvider>`
2. **Provider hierarchy initializes**: Redux store → LocationProvider (checks localStorage for saved location, defaults to Solapur) → UserContext
3. **`AppLayout` renders**: Header + Outlet (matches `/` → `Body`) + Footer
4. **`Body` mounts**: `useEffect` fires with `currentLocation` dependency
5. **`fetchData()` runs**: Calls `getSwiggyAPI(lat, lng)` which returns either `localhost:3000/api/restaurants` (dev) or `/.netlify/functions/restaurants` (prod)
6. **Proxy/function fetches from Swiggy**: `https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.6599&lng=75.9064&...`
7. **Response parsed**: Code tries multiple card indices to find restaurant array, handles Swiggy's changing API structure
8. **State updates**: `setListOfRestaurant(restaurants)` and `setFilteredRestaurant(restaurants)`
9. **React re-renders**: Shimmer disappears, restaurant cards appear with images from Swiggy's CDN
10. **User sees restaurants** with name, cuisines, rating, delivery time, and discount labels (via HOC)

The entire flow takes ~1-2 seconds, with shimmer UI providing visual feedback during the loading phase.
