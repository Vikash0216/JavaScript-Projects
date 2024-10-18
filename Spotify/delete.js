function formatSeconds(seconds) {
    // Ensure the seconds is a non-negative number
    if (seconds < 0) {
        throw new Error('Seconds cannot be negative');
    }

    // Round to the nearest second
    const roundedSeconds = Math.round(seconds);
    
    // Calculate minutes and seconds
    const minutes = Math.floor(roundedSeconds / 60);
    const remainingSeconds = roundedSeconds % 60;

    // Format minutes and seconds to always have two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    // Return the formatted string
    return `${formattedMinutes}:${formattedSeconds}`;
}


console.log(formatSeconds(36.0010001));