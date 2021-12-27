/**
 * Dave's version - just text, not CSV.
 */

/** {Array<EventRecord>} is used to put EventRecord, and finally all calendar event data are in this array */
let eventRecords = [];

const MAX_SHOW_RECORD = 10;

const KEY_WORDS = {
  /** The beginning string of the field to be read from the ICS file */
  WORDS: [
    'BEGIN:VEVENT',
    'DTSTART',
    'DTEND',
    'DESCRIPTION',
    'SUMMARY',
    'END:VEVENT',
  ],
  /** Corresponding to the above-mentioned beginning string, this is "The field should be cut from the first character to the substring" */
  SUBSTRING: [0, 8, 6, 12, 8, 0],
};

/** EventRecord Object is used to hold a single calendar event */
class EventRecord {
  constructor(start, end, title, more) {
    this.start = start.trim();
    this.end = end.trim();
    /** {string} csv */
    this.title = title.trim().replace(/\\,/g, '，');
    this.more = more.trim().replace(/\\,/g, '，');
  }
}

$(function () {
  $('#input_file').change(function (e) {
    $('#div_download').empty();
    $('#div_result_file_name').empty();
    $('#div_result_table').empty();

    const INPUT_FILE = e.target.files[0];
    if (INPUT_FILE === null) {
      return;
    }
    $('#div_result_file_name').append('File name：' + INPUT_FILE.name + '<hr/>');

    let fileReader = new FileReader();
    fileReader.readAsText(INPUT_FILE);
    fileReader.onload = function () {
      eventRecords = [];
      parse(fileReader.result.split('\n'));
      sortResult();
      createDownloadableContent();
    };
  });
});

/**
 * Analyze the imported ICS file, compare it with KEY_WORDS whether it is a field we are interested in, and place it in the temporary storage field array.
  * @param {Array<string>} input [Read the string array]
 */
function parse(input) {
  let _keywordIndex = 0;
  let tempArray = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i].match('^' + KEY_WORDS.WORDS[_keywordIndex])) {
      tempArray[_keywordIndex] = input[i].substring(
        KEY_WORDS.SUBSTRING[_keywordIndex]
      );
      _keywordIndex++;

      if (_keywordIndex === KEY_WORDS.WORDS.length) {
        handleEventRecord(tempArray);
        _keywordIndex = 0;
        tempArray = [];
      }
    }
  }
}

/**
 * Check the temporarily stored field array again and store it in the final eventRecords array.
  * @param {Array<string>} arr Temporary field array
 */
function handleEventRecord(arr) {
  /** If a calendar event is an "all day" event, its time format is different from "what time to time", and you need to cut a little bit later */
  if (arr[1].match('^VALUE')) {
    arr[1] = arr[1].substring(11);
  }
  if (arr[2].match('^VALUE')) {
    arr[2] = arr[2].substring(11);
  }
  eventRecords.push(new EventRecord(arr[1], arr[2], arr[4], arr[3]));
}

function sortResult() {
  eventRecords.sort(function (a, b) {
    return a.start.substr(0, 8) - b.start.substr(0, 8);
  });
}

function createDownloadableContent() {
  const eventStrings = eventRecords.map(({ start, end, title, more }) => {
    return `${start} - ${title}`;
  });

  const eventsAsText = eventStrings.join('\n');

  const fileName = 'Google_calendar' + getDateTime() + '.txt';
  const buttonDownload = `<a id="button_download" class="btn btn-block btn-lg btn-success" href="${getblobUrl(
    eventsAsText
  )}" download="${fileName}" >.txt</a>`;

  $('#div_download').append(buttonDownload);
}

//////////////////////
// Helper Functions //
//////////////////////

function getblobUrl(content) {
  const _MIME_TYPE = 'text/plain';
  const _UTF8_BOM = '\uFEFF';
  const blob = new Blob([_UTF8_BOM + content], {
    type: _MIME_TYPE,
  });
  return window.URL.createObjectURL(blob);
}

function getDateTime() {
  // If the current time is 2014/11/1, 21:07, 02, you will get 2014111_2172
   // and what we want is 20141101_210702
  const _DATE = new Date();
  const DATE_TIME = String(
    _DATE.getFullYear() +
      fixOneDigit(_DATE.getMonth() + 1) +
      fixOneDigit(_DATE.getDate()) +
      '_' +
      fixOneDigit(_DATE.getHours()) +
      fixOneDigit(_DATE.getMinutes()) +
      fixOneDigit(_DATE.getSeconds())
  );
  return DATE_TIME;
}

function fixOneDigit(x) {
  return x < 10 ? '0' + x : x;
}
