const BOT_USER_OAUTH_TOKEN = 'Paste your Bot user OAuth Token'
const SLACK_POST_URL = 'https://slack.com/api/chat.postMessage';

// Generate GoogleMeetURL
function getMeetUrl() {
  const calendarId = 'primary';
  const dt = new Date();
  const date = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
  const requestId = Math.random().toString(32).substring(2);
  const details = {
    summary: 'tmp_event',
    singleEvents: true,
    allDayEvent: true,
    start: { date },
    end: { date },
    conferenceData: {
      createRequest: {
        requestId,
        conferenceSolutionKey: {
          type: 'hangoutsMeet'
        },
      }
    }
  }

  const conferenceDataVersion = 1
  const events = Calendar.Events.insert(details, calendarId, { conferenceDataVersion });

  Calendar.Events.remove(calendarId, events.id);

  if (events.conferenceData.createRequest.status.statusCode === 'success') {
    const meetUrl = events.conferenceData.entryPoints[0].uri;
    return meetUrl;
  }
};

// Post message
function doPost(e) {
  const meetUrl = getMeetUrl();
  let message;
  if (meetUrl === undefined) {
    message = '何らかの不具合によりURLを生成できませんでした'
  } else {
    message = `Meetの部屋を作りました : ${meetUrl}`
  };

  let response = {
    response_type: 'in_channel',
    text: message,
  };

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
};
