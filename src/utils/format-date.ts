export function formatDate ( date: Date | null ) {
    if (!date) return '-';
    return date.toLocaleDateString( 'en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    } );
}
