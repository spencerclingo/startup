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

I used AI to help me make a temporary logo. But, I plan on getting a new logo from Adobe Illustrator in the future.

[//]: # (```html)

[//]: # (<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">)

[//]: # (  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />)

[//]: # (  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>)

[//]: # (</svg>)

[//]: # (```)

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

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
