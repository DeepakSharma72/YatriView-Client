export default function DateFormat(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const monthString = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear().toString();
    const formattedDate = `${day}-${monthString}-${year}`;
    return formattedDate;
}