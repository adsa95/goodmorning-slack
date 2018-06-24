function buildMessage(day) {
  let weekday = day.weekday.toLowerCase();
  let message = `Godmorgon! Idag är det ${weekday} vecka ${day.week}`;

  if (day.holiday !== null) {
    message += `, men även ${day.holiday}`
  }

  if (day.nameDays.length !== 0) {
    let names = collapseNames(day.nameDays);

    message += `. Glöm inte att gratta ${names} på namnsdagen`;
  }

  message += ', ha en bra dag!';

  return message;
}

function collapseNames(names) {
  let collapsed = '';

  for (let i = 0; i < names.length; i++) {
    let name = names[i];

    if (i === 0) {
      collapsed += name;
    } else if (i === names.length - 1) {
      collapsed += ' och ' + name;
    } else {
      collapsed += ', ' + name;
    }
  }

  return collapsed;
}

exports.buildMessage = buildMessage;
exports.collapseNames = collapseNames;
