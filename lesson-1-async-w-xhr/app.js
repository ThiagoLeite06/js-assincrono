(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
	
        const imgRequest = new XMLHttpRequest();
        imgRequest.onload = addImage;
        imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        imgRequest.setRequestHeader('Authorization', 'Client-ID 7c73a87c1950891be15b7aaa64e66af11f907a8ef17dbf428998833012fab46b');
				imgRequest.send();
				
				const articleRequest = new XMLHttpRequest();
				articleRequest.onload = addArticle;
				articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=1920956aa52c4ea7989679dc551017a4`);
				articleRequest.send();

    });

    function addImage() {
			let htmlContent = ''
			const data = JSON.parse(this.responseText)
			const firstImage = data.results[0]

			htmlContent = `<figure>
					<img src="${firstImage.urls.regular}" alt="${searchedForText}">
					<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
				</figure>`

				responseContainer.insertAdjacentHTML('afterbegin', htmlContent)
		}
		
		function addArticle() {
			let htmlContent = ''
			const data = JSON.parse(this.responseText)

			if(data.response && data.response.docs && data.response.docs.length > 1){
				htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
						<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
						<p>${article.snippet}</p>
					</li>`
				).join('') + '</ul>';
			} else {
				htmlContent = '<div class="error-no-articles">No article available</div>';
			}

			responseContainer.insertAdjacentHTML('beforeend', htmlContent);
		}

})();

