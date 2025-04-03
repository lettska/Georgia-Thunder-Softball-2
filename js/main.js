document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dynamic team cards loading
    const teamGrid = document.querySelector('.team-grid');
    if (teamGrid) {
        const teams = [
            { name: '8U Team', image: 'images/teams/8u.jpg' },
            { name: '10U Team', image: 'images/teams/10u.jpg' },
            { name: '12U Team', image: 'images/teams/12u.jpg' },
            { name: '14U Team', image: 'images/teams/14u.jpg' },
            { name: '16U Team', image: 'images/teams/16u.jpg' },
            { name: '18U Team', image: 'images/teams/18u.jpg' }
        ];

        teams.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.className = 'team-card';
            teamCard.innerHTML = `
                <img src="${team.image}" alt="${team.name}">
                <h3>${team.name}</h3>
                <a href="teams.html">Teams</a>
            `;
            teamGrid.appendChild(teamCard);
        });
    }

    // Masonry grid for news feed
    const masonryGrid = document.querySelector('.masonry-grid');
    if (masonryGrid) {
        const newsItems = [
            { title: 'Team Victory', image: 'images/news/victory.jpg', likes: 45 },
            { title: 'New Recruits', image: 'images/news/recruits.jpg', likes: 32 },
            { title: 'Tournament Results', image: 'images/news/tournament.jpg', likes: 67 },
            { title: 'Training Camp', image: 'images/news/training.jpg', likes: 89 },
            { title: 'Community Event', image: 'images/news/community.jpg', likes: 54 },
            { title: 'Player Spotlight', image: 'images/news/spotlight.jpg', likes: 78 }
        ];

        newsItems.forEach(item => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            newsCard.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="news-content">
                    <h3>${item.title}</h3>
                    <div class="likes">
                        <i class="fas fa-heart"></i>
                        <span>${item.likes}</span>
                    </div>
                </div>
            `;
            masonryGrid.appendChild(newsCard);
        });
    }

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}); 