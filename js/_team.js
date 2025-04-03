document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const division = urlParams.get('division');
    const team = urlParams.get('team');

    // Team data (replace with actual data from backend)
    const teamData = {
        '10u': {
            'thunder': {
                title: '10U Thunder',
                subtitle: 'Elite Competitive Team',
                record: '25-5',
                ranking: '#3 in Georgia',
                roster: '12 Players',
                season: '2024 Spring/Summer',
                description: 'The 10U Thunder team is a competitive squad focused on developing fundamental skills while competing at the highest level. Our players are dedicated to excellence both on and off the field.',
                schedule: [
                    { date: '2024-03-15', opponent: 'Atlanta Vipers', location: 'Home' },
                    { date: '2024-03-22', opponent: 'Georgia Force', location: 'Away' },
                    { date: '2024-03-29', opponent: 'Marietta Magic', location: 'Home' }
                ],
                gallery: [
                    { image: 'images/gallery_1.jpg', caption: 'Team Photo 2024' },
                    { image: 'images/gallery_2.jpg', caption: 'Tournament Victory' },
                    { image: 'images/gallery_3.jpg', caption: 'Practice Session' }
                ]
            },
            'lightning': {
                title: '10U Lightning',
                subtitle: 'Select Competitive Team',
                record: '20-8',
                ranking: '#8 in Georgia',
                roster: '11 Players',
                season: '2024 Spring/Summer',
                description: 'The 10U Lightning team is a select competitive team that emphasizes skill development and teamwork. We focus on building strong fundamentals while maintaining a competitive edge.',
                schedule: [
                    { date: '2024-03-16', opponent: 'Roswell Raiders', location: 'Away' },
                    { date: '2024-03-23', opponent: 'Alpharetta Angels', location: 'Home' },
                    { date: '2024-03-30', opponent: 'Sandy Springs Stars', location: 'Away' }
                ],
                gallery: [
                    { image: 'images/gallery_4.jpg', caption: 'Team Photo 2024' },
                    { image: 'images/gallery_5.jpg', caption: 'Tournament Action' },
                    { image: 'images/gallery_6.jpg', caption: 'Team Practice' }
                ]
            },
            'storm': {
                title: '10U Storm',
                subtitle: 'Development Team',
                record: '15-12',
                ranking: '#15 in Georgia',
                roster: '13 Players',
                season: '2024 Spring/Summer',
                description: 'The 10U Storm team is our development squad, perfect for players looking to improve their skills and gain competitive experience. We focus on individual growth and team chemistry.',
                schedule: [
                    { date: '2024-03-17', opponent: 'Dunwoody Dragons', location: 'Home' },
                    { date: '2024-03-24', opponent: 'Decatur Devils', location: 'Away' },
                    { date: '2024-03-31', opponent: 'Chamblee Chargers', location: 'Home' }
                ],
                gallery: [
                    { image: 'images/gallery_7.jpg', caption: 'Team Photo 2024' },
                    { image: 'images/gallery_8.jpg', caption: 'Game Action' },
                    { image: 'images/gallery_9.jpg', caption: 'Team Bonding' }
                ]
            }
        }
        // Add data for other divisions (12U, 14U, 16U, 18U) here
    };

    // Update page content
    function updateTeamPage() {
        if (division && team && teamData[division] && teamData[division][team]) {
            const data = teamData[division][team];
            
            // Update title and subtitle
            document.getElementById('team-title').textContent = data.title;
            document.getElementById('team-subtitle').textContent = data.subtitle;
            
            // Update stats
            document.getElementById('team-record').textContent = data.record;
            document.getElementById('team-ranking').textContent = data.ranking;
            document.getElementById('team-roster').textContent = data.roster;
            document.getElementById('team-season').textContent = data.season;
            
            // Update description
            document.getElementById('team-description').textContent = data.description;
            
            // Update schedule
            const scheduleList = document.getElementById('team-schedule');
            scheduleList.innerHTML = data.schedule.map(game => `
                <div class="schedule-item">
                    <div class="date">${formatDate(game.date)}</div>
                    <div class="event">vs ${game.opponent}</div>
                    <div class="location">${game.location}</div>
                </div>
            `).join('');
            
            // Update gallery
            const galleryGrid = document.getElementById('team-gallery');
            galleryGrid.innerHTML = data.gallery.map(item => `
                <div class="gallery-item">
                    <img src="${item.image}" alt="${item.caption}">
                    <div class="gallery-caption">${item.caption}</div>
                </div>
            `).join('');
        } else {
            // Handle invalid team/division
            document.getElementById('team-title').textContent = 'Team Not Found';
            document.getElementById('team-subtitle').textContent = 'Please select a valid team from the Teams page.';
        }
    }

    // Format date helper function
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Initialize page
    updateTeamPage();
}); 