
export function formatDuration(duration: number): string {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    let result = '';
    if (hours > 0) result += `${hours}: `;
    if (minutes > 0) result += `${minutes}: `;
    result += `${seconds}s`;
    return result.trim();
}



export function formatViews(views: number): string {
    if (views < 1000) return views.toString();
    if (views < 1000000) return `${(views / 1000).toFixed(1)}K`;
    return `${(views / 1000000).toFixed(1)}M`;
}




