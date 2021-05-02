# Generate google meet URL from Slack
This is solution to use `/meet` command from your Slack.

## Setup
### 1. Clone this repository.
```bash
git clone git@github.com:psbss/slack-meet-bot.git

// or if using GitHub CLI
gh repo clone psbss/slack-meet-bot
```

### 2. Install npm packages.
```bash
npm install

// or if using yarn
yarn add
```


### 3. Push script to GAS(Google App Script).
Open link and enable GAS API. https://script.google.com/home/usersettings

Then, push script to GAS.
```bash
npx clasp login // Login and Authority your Google account
npx clasp create --title "slack-meet-bot" --type webapp  --rootDir ./src
npx clasp push
npx clasp open // Open brower to add some secret key infomation
```

Set secret key infomation in your browser.

1. Open Slack App page and click `Create New App`. https://api.slack.com/apps/

> Notice: If you have already created your Slack App, You can add new feature for your Slack App. 

2. Copy `Bot User OAuth Token` from `OAuth Tokens for Your Workspace`.
3. Paste code for `BOT_USER_OAUTH_TOKEN` in editor.

### 4. Deploy GAS.
In App script editor
1. Click deploy button -> new deploy.
2. Type is `Web Application`
3. Description is `my meet bot`
4. Execute by `Me`
5. Access user `Everyone`
6. Ship your code `Deploy`
7. Copy exec URL

### 5. Setup your Slack Bot.
Open your Slack App. https://api.slack.com/apps/

Set these functionaly.

- Slash Commands

| title       | Value                     |
| ----------- | ------------------------- |
| Command     | /meet                     |
| Request URL | Copied exec URL by Step 4 |

- Permissions

Add `Commands` scope for your bot.

Now you can use `/meet` command in your Slack 🎉
