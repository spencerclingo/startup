# CS 260 Notes

[My startup - DayFlow](https://startup.dayflow.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 34.195.212.79
I've done this before, but I have not ssh'ed into the system before to access the files.

➜  ssh -i [key pair file] ubuntu@[yourdomainnamehere]

## Caddy

No problems. It worked just like it said in the [instructions](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between pages work great using the `a` element combined with `button`.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

Creating and duplicating the table is also a hassle, I hope that React will be able to streamline time generation.  

## CSS

I really enjoy using CSS combined with because of the challenge it presents. Elements don't always respond the way you expect to different styles. However, with enough work, they start to align with your will (although aligning center can be harder). It looks great on all kinds of screen sizes.

I did learn that the form method POST causes issues if I don't yet have the backend set up. So for now, all forms are using GET. 

I also learned about the !important tag, allowing elements to override previous style that might have been given.

[//]: # ()
[//]: # (```html)

[//]: # (      <nav class="navbar navbar-expand-lg bg-body-tertiary">)

[//]: # (        <div class="container-fluid">)

[//]: # (          <a class="navbar-brand">)

[//]: # (            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />)

[//]: # (            Calmer)

[//]: # (          </a>)

[//]: # (          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">)

[//]: # (            <span class="navbar-toggler-icon"></span>)

[//]: # (          </button>)

[//]: # (          <div class="collapse navbar-collapse" id="navbarSupportedContent">)

[//]: # (            <ul class="navbar-nav me-auto mb-2 mb-lg-0">)

[//]: # (              <li class="nav-item">)

[//]: # (                <a class="nav-link active" href="play.html">Play</a>)

[//]: # (              </li>)

[//]: # (              <li class="nav-item">)

[//]: # (                <a class="nav-link" href="about.html">About</a>)

[//]: # (              </li>)

[//]: # (              <li class="nav-item">)

[//]: # (                <a class="nav-link" href="index.html">Logout</a>)

[//]: # (              </li>)

[//]: # (            </ul>)

[//]: # (          </div>)

[//]: # (        </div>)

[//]: # (      </nav>)

[//]: # (    </header>)

[//]: # (```)

I used AI to help me make a temporary logo. But, I plan on making a new logo with Adobe Illustrator in the future.

[//]: # (```html)

[//]: # (<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">)

[//]: # (  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />)

[//]: # (  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>)

[//]: # (</svg>)

[//]: # (```)

## React Part 1: Routing

Setting up Vite and React was pretty simple. I tend to use in-line styling for my HTML if only one element requires something or if I know that something is quick. However, React does not like in-line styling. So, I had to refactor everything to be in classes and IDs. This wasn't too bad, but took some extra time. 

I also learned how to set up a callable element, such that different pages can call the same table to be printed in the same way. This makes it very convenient to change. 

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the data directly.

Using delete buttons made it far easier to handle task finishing than check boxes. 

I love being able to see that the code is going to be able to automatically change. 

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
## node.js/Express: Service

This was harder than I thought it would be. Getting the endpoints just right and passing information around to get those endpoints working properly was very difficult. 

I learned that useEffects can't be async, so if you need to make an asynchronous call, you need to wrap it in a function.

I also learned that using Loading variables for calls that normally would be await'ed help if you don't think that your data will be collected immediately. 

## MongoDB: Login/DB

Connecting to the database was easier than I thought it would be because I set it up nicely in the previous project. However, I struggled with the difference between getting a user via username and getting them by token.

I learned that using that setAuthCookie function will automatically set a cookie for the user and that cookie will be returned in the future, allowing you to access the same user. 

The longest bug was probably because I forgot that I would need to update the authToken stored in the database otherwise a user would login, get a new auth token, and they would be rejected because their token doesn't match the database. 

Another error I faced was making sure I was interpreting returned objects properly when I pinged the database. 
