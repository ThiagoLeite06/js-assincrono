(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
			e.preventDefault();
			responseContainer.innerHTML = '';
			searchedForText = searchField.value;
			
			fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
					headers: {
						Authorization: 'Client-ID 7c73a87c1950891be15b7aaa64e66af11f907a8ef17dbf428998833012fab46b'
					}
				})
				.then(response => response.json())
				.then(addImage)
				.catch(err => requestError(err, 'image'))

			fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=1920956aa52c4ea7989679dc551017a4`)
			.then(response => response.json())
			.then(addArticles)
			.catch(err => requestError(err, 'articles'))

		});
		
		function addArticles(data) {
			let htmlContent = ''

			if (data.response && data.response.docs && data.response.docs.length > 1) {
				const articles = data.response.docs
				htmlContent = '<ul>' + articles.map(article => `<li class="article">
						<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
						<p>${article.snippet}</p>
					</li>`).join('') + '</ul>';
			} else {
				htmlContent = '<div class="error-no-articles">No article available</div>';
			}

			responseContainer.insertAdjacentHTML('beforeend', htmlContent);
		}

		

    function addImage(data) {
        let htmlContent = '';
        const firstImage = data.results[0];

        if (firstImage) {
            htmlContent = `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
        } else {
            htmlContent = 'Unfortunately, no image was returned for your search.'
        }

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
		}
		
		function requestError(e, part) {
    	console.log(e);
    responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
}

})();
