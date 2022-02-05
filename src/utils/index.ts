function getMainByPopularity(items: Array<any>, length: number) {
  let sorted = items.sort((a, b) => {
    if (a.popularity > b.popularity) return -1;
    if (b.popularity > a.popularity) return 1;
    return 0;
  });
  sorted.length = length;
  return sorted;
}

function formatDate(date: string | undefined) {
  if (!date) return;
  return date?.split('-').reverse().join('/');
}

function convertMinutesToHours(number: number | undefined) {
  if (!number) return;

  let hours = (number / 60);
  let rhours = Math.floor(number / 60);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}m`;
}


export { getMainByPopularity, formatDate, convertMinutesToHours }