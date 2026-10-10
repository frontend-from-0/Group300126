# Authentication vs Authorisation




# How auth0 works with NextJS?

## Step 1: The user clicks Login

Suppose our Next.js application has a Login button. When the user clicks it, our application does not ask for a password. Instead, it redirects the browser to Auth0.

## Step 2: OAuth
Auth0 owns the login process. The rules that define this communication are called OAuth 2.0. 

**OAuth is a protocol that lets one application ask another application to authenticate a user safely.**

After login, Auth0 sends the user back useing callback url.

Important:
- Our application never sees the password.
- Our application never stores the password.

OAuth is responsible for delegating authentication.

## Step 3: OpenID Connect

OAuth only answers "Can this application access something?". It doesn't define how to identify the user. That's why another layer was added: OpenID Connect (OIDC).

** OpenID Connect is an extension of OAuth that adds user identity. **

OAuth says: "The login succeeded."
OpenID Connect also says: "Here is the user's information."

Almost every modern login system (Google, Microsoft, GitHub, Auth0) uses OpenID Connect on top of OAuth.

## Step 4: Redirect back
When Auth0 redirects the user back using a callback url that we specify during setup, it sends proof that the login succeeded. That proof is usually a token.

Auth0 sends back something like this: https://myapp.com/auth/callback?code=abc123xyz

This is called an authorization code. It is not a token. It's a code that NextJs app can now exchange for real token. Next.js server sends a request directly to Auth0. The request includes: Authorization Code, Client ID, PKCE verifier. Auth0 checks everything and returns ID Token, Access Token, Refresh Token (optional).

This communication happens between Nextjs Server and Auth0.

## Step 5: Token
Imagine the receptionist gives you a visitor badge. Instead of showing your passport every five minutes, you show your badge.

The badge proves: "I have already been verified."

A token is exactly that. A token is proof of authentication.

## Step 6: JWT
Many Auth0 tokens are JWTs (JSON Web Token).

Inside a JWT is information like:
``` 
{
  "name": "Anna",
  "email": "anna@example.com",
  "sub": "auth0|12345"
}
```

No password, only identity information.

JWTs are digitally signed, which means someone cannot change the contents without invalidating the signature.

A JWT is like a passport with a tamper-proof government stamp. You can read what's inside, but if someone changes it, the stamp no longer matches.

## Step 7: ID Token
OpenID Connect introduces the ID Token. It contains identity information. The ID Token is mainly for the application itself.

## Step 8: Access Token

Now imagine your application also needs to call an API.

The API asks: Are you allowed to call me?
Instead of sending the ID Token, the application sends an Access Token. The purpose is to prove that the application has permission to use an API.

Example:
GET /api/orders

Authorization:
Bearer eyJhbGciOi...

The API checks the Access Token.

ID Token → tells who the user is
Access Token → proves permission to call an API

## Step 9: Refresh Token

Access Tokens usually expire quickly (e.g. 15 minutes). Otherwise, if someone stole one, they could use it for a long time.

The user shouldn't have to log in again every 15 minutes. That's where the Refresh Token comes in.
The device (browser session) where user logged in before has permission to quietly request a new Access Token.

## Step 10: Putting everything together
User
 │
 │ Click Login
 ▼
Next.js (server side)
 │
 │ Redirect
 ▼
Auth0
 │
 │ User enters email/password
 │
 │ OAuth + OpenID Connect
 │
 │ Authentication succeeds
 ▼
Auth0 sends back

ID Token
Access Token
(optional Refresh Token)

 ▼
Next.js
 │
 │ Reads user information
 │
 │ Creates a session
 ▼
User sees Dashboard


....


User opens Orders

↓

Next.js

↓

Calls API

↓

Access Token

↓

API validates token

↓

Returns data or Return error (401 - authentication missing, 403 - authorization denied)


... 

Access Token expires

↓

Next.js

↓

Uses Refresh Token

↓

Gets new Access Token

↓

User continues normally