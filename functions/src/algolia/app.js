// Replace with your own values
const searchClient = algoliasearch(
    'E5B06OWAG5',
    'NjI3YzdjZTFkZjk1ZTg5NTA2YzY3N2Q1YmE1NzYwMDJlOTljMzRiZGVhNzBhMjczM2Y2ZGE0M2ZmMjM3MzQwOGZpbHRlcnM9d2F0Y2hfbGlzdF9vZiUzQTE');

const search = instantsearch({
    indexName: 'movies',
    searchClient,
    routing: true,
});

search.addWidgets([
    instantsearch.widgets.configure({
    hitsPerPage: 10,
    })
]);

search.addWidgets([
    instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for contacts',
    })
]);

search.addWidgets([
    instantsearch.widgets.hits({
    container: '#hits',
    templates: {
        item: document.getElementById('hit-template').innerHTML,
        empty: `We didn't find any results for the search <em>"{{query}}"</em>`,
    },
    })
]);

search.start();
