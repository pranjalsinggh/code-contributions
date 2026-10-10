function createCard(contributor) {
    const iframe = document.createElement('iframe');
    iframe.className = 'card col col-6-md col-3-lg bd-grey';
    iframe.src = `contributors/${contributor}`;
    const username = contributor.replace(/\.html$/i, '');
    iframe.dataset.contributorUsername = username.toLowerCase();
    iframe.title = `Contributor card for ${username}`;
    iframe.loading = 'lazy';
    document.getElementById('contributor-cards').appendChild(iframe);
}

contributorFiles.forEach(contributor => createCard(contributor));

const searchInput = document.getElementById('contributor-search-input');
const searchStatus = document.getElementById('contributor-search-status');
const cards = Array.from(document.querySelectorAll('#contributor-cards iframe'));

function filterCards() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
        const matches = card.dataset.contributorUsername.includes(query);
        card.hidden = !matches;
        if (matches) {
            visibleCount += 1;
        }
    });

    searchStatus.textContent = query
        ? `Showing ${visibleCount} of ${cards.length} contributors`
        : `${cards.length} contributors`;
}

searchInput.addEventListener('input', filterCards);
filterCards();
