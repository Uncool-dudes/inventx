export function formatDate ( date: Date ) {
    return date.toLocaleDateString( 'en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    } );
}
