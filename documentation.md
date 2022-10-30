# Installation

```bash
git clone git@gitlab.ucode.world:connect-khpi/connect-fullstack-usof-frontend/mbabichiev.git
```

Install and run the server API from repository `usof-backend`.

Return to the project directory and install node modules by command:

```bash
npm install
```
Run application:
```bash
npm start
```

Your application is working on http://127.0.0.1:3000.

# Structure

It's standart React application. So, you have **two** directories:
- **public**
- **src**

In directory `public` you have only `index.html`, it's root of your application and you should't change it.

****

In directory `src` you have:

- file `App.js` which just checks cookies, draw `Header` and connects **routers** (later about it).
- **Main** file `index.js` which add DOM-container in project and connect it with `App.js`
- dir `/API` with services for connecting to **Server API**. Use it if you want send request or get data from server.
- dir `/components` with components for your pages such as **header**, **publication item**, **comment item** and others. ***We use bootstrap for styles, but if you create own one (for components) create dir for it with files: .jsx, .css - in dir `/components/UI`***. For example:

    `/components/UI/Loader` has files: `Loader.jsx` and `Loader.module.css`
    
    Also in dir `/components` you have **`Routers.jsx`** with routers for pages:

    ```JavaScript
    import Main from "../pages/Main";
    import CreatePublication from '../pages/CreatePublication';
    ...

    const Routers = (props) => {

        return (
            <div>
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route exach path="/posts/create" element={<CreatePublication/>}/>
                    ...
                </Routes>
            </div>
        )
    }
    ```

    To **add route** just create **page** in dir `/pages` and add route to `/components/Routers.jsx`.

- dir `/pages` with pages for app. Every page should has own **url** from **/components/Routers.jsx**.
- dir `/scripts` with scripts for your app such as:
  - `getCookie.js` (**parameters**: string "id" or "role");
  - `getPartOfText.js` (for drawing publications with part text. **parameters**: text (string), limit symbols (int) for text, limit `'/n'` symbols (int));
  - `saveRole.js` (save admin or user in cookies. **parameters**: string "admin" or "user");
  - `sortPost.js` (**parameters**: array of posts and string: "popular", "newest" or "oldest"), return **sorted array of posts**;
  - `sortUsers.js` (**parameters**: array of users), return **sorted array of users by rating**;
  
  - `usePagination.js`, **parameters:**
    
    - **ref** (referense of element which call when in line of sight). 
    
        To create it:
        ```JavaScript
        const ref = useRef();
        ```
        And define it in html element, for example:
        ```html
        <div ref={ref} style={{height:"10px"}}>
        ```
    - **noLoad** - condition `true` or `false`. If `true`: pagination stops and callback function do not call (for example, when posts array is empty). 
    - **isLoading** - `true` or `false`, it's parameter which `true` when app waits data from server and `false` when app don't wait anything. 
    - **callback** - callback function whick call when **ref** in line of sight.

        

