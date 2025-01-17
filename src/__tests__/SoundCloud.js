import cases from 'jest-in-case';

import { getHTML, shouldTransform } from '../SoundCloud';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-SoundCloud url': {
      url: 'https://not-a-soundcloud-url.com',
      valid: false,
    },
    "non-SoundCloud url ending with 'soundcloud.com'": {
      url: 'https://this-is-not-soundcloud.com',
      valid: false,
    },
    'url with SoundCloud track id': {
      url: 'https://api.soundcloud.com/tracks/151129490',
      valid: false,
    },
    'url with SoundCloud playlist id': {
      url: 'https://api.soundcloud.com/playlists/703823211',
      valid: false,
    },
    'url with widget SoundCloud subdomain': {
      url:
        'https://w.soundcloud.com/player?url=https://soundcloud.com/clemenswenners/africa',
      valid: false,
    },
    'valid SoundCloud url with https protocol': {
      url: 'https://soundcloud.com/clemenswenners/africa',
      valid: true,
    },
    'valid SoundCloud url with http protocol': {
      url: 'http://soundcloud.com/clemenswenners/africa',
      valid: true,
    },
  }
);

test('Gets the correct SoundCloud iframe', async () => {
  const html = await getHTML('https://soundcloud.com/clemenswenners/africa');

  expect(html).toMatchInlineSnapshot(
    `"<iframe width=\\"100%\\" height=\\"300\\" scrolling=\\"no\\" frameborder=\\"no\\" src=https://w.soundcloud.com/player?url=https://soundcloud.com/clemenswenners/africa&color=ff5500&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true></iframe>"`
  );
});
