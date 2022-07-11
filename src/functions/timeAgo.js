import * as moment from 'moment';

export function timeAgo(timestamp, ago = true) {
    let seconds = Math.floor(moment().diff(moment.unix(timestamp)) / 1000);

    let interval = Math.floor(seconds / 31536000);

    // let result;

    if (interval >= 1) {
        if (ago) {
            return interval + 'y ago';
        }
        return interval + 'y';
    }

    interval = Math.floor(seconds / 2592000);

    if (interval >= 1) {
        if (ago) {
            return interval + 'm ago';
        }
        return interval + 'm';
    }

    interval = Math.floor(seconds / 86400);

    if (interval >= 1) {
        if (ago) {
            return interval + 'd ago';
        }
        return interval + ' d';

    }

    interval = Math.floor(seconds / 3600);

    if (interval >= 1) {
        if (ago) {
            return interval + 'h ago';
        }
        return interval + ' h';
    }

    interval = Math.floor(seconds / 60);

    if (interval >= 1) {
        if (ago) {
            return interval + 'min ago';
        }
        return interval + ' min';
    }

    if (ago) {
        return interval + 's ago';
    }
    return Math.floor(seconds) + ' s';

}

export function timeAgoFull(timestamp) {
    let seconds = Math.floor(moment().diff(moment.unix(timestamp)) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval === 1) {
        return interval + ' year ago';
    }

    if (interval > 1) {
        return interval + ' years ago';
    }

    interval = Math.floor(seconds / 2592000);

    if (interval === 1) {
        return interval + ' month ago';
    }

    if (interval > 1) {
        return interval + ' months ago';
    }

    interval = Math.floor(seconds / 86400);

    if (interval === 1) {
        return interval + ' day ago';
    }

    if (interval > 1) {
        return interval + ' days ago';
    }

    interval = Math.floor(seconds / 3600);

    if (interval === 1) {
        return interval + ' hour ago';
    }

    if (interval > 1) {
        return interval + ' hours ago';
    }

    interval = Math.floor(seconds / 60);
    if (interval === 1) {
        return interval + ' minutes ago';

    }
    if (interval >= 1) {
        return interval + ' minute ago';
    }

    interval = Math.floor(seconds);
    if (interval === 1) {
        return interval + ' second ago';
    }

    return interval + ' seconds ago';
}