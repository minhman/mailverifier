# Bulk Free Email Verifier
We were looking for a cost effective way to bulk verify some of our emails in our database, looked everywhere online for a solid solution and the prices were just absolutely insane! 

We looked at multiple open source solutions and nothing was straight forward and easy to use. 

So we went to the drawing board and found a few cool open source projects and modified them for a simple administration of bulk verifying emails 🎉

If you encounter any bugs or issues, or have any suggestions, please let us know or feel free to create a PR and we will merge it.

---

## Requirement’s
- Docker
- Nodejs

---

## Running the application
- Start Docker and then run -> docker-compose up -d
- Install the NPM packages -> npm install
- Copy the .env.example contents, create a .env and paste and your mail details to the variables in the .env
- Start the web UI -> node index.js and open http://localhost:3000 in your browser

---

## How to use the UI
- Select a CSV file containing email addresses.
- Watch the upload and verification progress indicators.
- The status area will show each email and whether it was valid.

---
## Things left to do
- [ ]  Optimize the progress bar and outut the validated emails on every file parsed.
- [ ]  Convert the nodejs project to GoLang for faster processing


---

## CURL
``` bash
curl —request GET \
  —url ‘http://localhost:9292/?email=testemail@domain.com’ \
  —header ‘Accept: application/json’ \
  —header ‘Authorization: xxxyyy’
```


---
## Stuck? Let’s help you
Send us a email at opensource@rudybekker.com

----

## Need Help Monetizing Your List? 💰
Send us a email at growth@rudybekker.com

---
## Follow us
Facebook -> [Facebook](https://www.facebook.com/rudy.bekker.391)
Linkedin -> https://www.linkedin.com/in/rudybekker/
Blog -> https://rudybekker.com/