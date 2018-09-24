/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: `https://api.unsplash.com/search/photo?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID 7c73a87c1950891be15b7aaa64e66af11f907a8ef17dbf428998833012fab46b'
            }
        }).done(addImage)

    });

    function addImage(images) {
    const firstImage = images.results[0]

    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`
    )
    }

    function addArticle(data) {
        let htmlContent = ''
        
        if (data.response && data.response.docs && data.response.docs.length > 1) {
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                </li>`).join('') + '</ul>';
        } else {
            htmlContent = '<div class="error-no-articles">No article available</div>';
        }

        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }

})();
