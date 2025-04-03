document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const division = urlParams.get('division');
    const team = urlParams.get('team');

    if (!division || !team) {
        document.getElementById('team-title').textContent = 'Team Not Found';
        document.getElementById('team-subtitle').textContent = 'Please check the URL and try again.';
        return;
    }

    // Fetch team data (replace with your actual data source or API)
    const teamData = getTeamData(division, team);

    if (!teamData) {
        document.getElementById('team-title').textContent = 'Team Not Found';
        document.getElementById('team-subtitle').textContent = 'The specified team could not be found.';
        return;
    }

    // Update the page with team data
    document.getElementById('team-title').textContent = `${division.toUpperCase()} ${teamData.name}`;
    document.getElementById('team-subtitle').textContent = teamData.subtitle;
    document.getElementById('team-record').textContent = teamData.record;
    document.getElementById('team-ranking').textContent = teamData.ranking;
    document.getElementById('team-roster').textContent = teamData.rosterSize;
    document.getElementById('team-season').textContent = teamData.season;
    document.getElementById('team-description').textContent = teamData.description;

    // Populate schedule
    const scheduleList = document.getElementById('team-schedule');
    teamData.schedule.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.textContent = `${game.date} - ${game.opponent}`;
        scheduleList.appendChild(gameItem);
    });

    // Populate gallery
    const galleryGrid = document.getElementById('team-gallery');
    teamData.gallery.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = `${teamData.name} Gallery Image`;
        galleryGrid.appendChild(img);
    });
});

// Mock function to get team data (replace with actual API or data source)
function getTeamData(division, team) {
    const data = {
        '8u': {
            thunder: {
                name: 'Thunder',
                subtitle: 'The unstoppable 8U Thunder team!',
                record: '10-2',
                ranking: '1st',
                rosterSize: '12',
                season: 'Spring 2024',
                description: 'The 8U Thunder team is known for their energy and teamwork.',
                schedule: [
                    { date: 'March 20, 2024', opponent: 'Lightning' },
                    { date: 'March 27, 2024', opponent: 'Storm' }
                ],
                gallery: [
                    'images/8u_thunder_1.jpg',
                    'images/8u_thunder_2.jpg'
                ]
            }
        }
        // Add more divisions and teams as needed
    };

    return data[division]?.[team] || null;
}