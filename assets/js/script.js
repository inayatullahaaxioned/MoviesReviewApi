/* Author: 
Inayatullah
*/

var MovieList = document.querySelector('.movie-list'),
  wrapper = document.querySelector('.wrapper'),
  offset = 0,
  totalMovie = 200,
  limit = 10,
  counter = 1;

ShowMovie(offset);
function ShowMovie(offset) {
  console.log(offset);
  fetch(`https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=KggA9THGRHUHTICnDwdbmo8kaCpGru27&offset=${offset}`)
    .then(function (response) {
      if(response.status === 429){
        alert("Too many request, Please wait for a minute");
        // return offset;
      }
      if(response.status === 200){
        return response.json();
      }
    })
    .then(function (res) {
      var results = res.results;
      MovieList.innerHTML = "";
      for (let i = 0; i < limit; i++) {
        var movie = results[i];
        var title = movie.display_title,
          summary = movie.summary_short,
          publicationDate = movie.publication_date,
          detail = movie.link.url,
          image = movie.multimedia.src,
          author = movie.byline,
          reviewList = document.createElement('li');
        reviewList.className = "review-list";
        reviewList.innerHTML = `<a href="${detail}" title="${title}" class="detail-page" target="_blank">${title}</a>
            <figure class="image-div">
              <img src="${image}" alt="${title}" class="movie-img">
              <figcaption class="publication-date">${publicationDate}</figcaption>
            </figure>
            <div class="content">
              <h2 class="title">${title}</h2>
              <p class="summary">${summary}</p>
              <h3 class="author">By ${author}</h3>
            </div>`
        MovieList.appendChild(reviewList);
      }
      // if(offset <= (totalMovie - limit)){}
      var pagination = document.createElement('ul'),
        pageAction = document.querySelector('.pagination');
      if (pageAction) {
        pageAction.parentElement.removeChild(pageAction);
      };
      pagination.className = "pagination";
      pagination.innerHTML = `<li class="page-btn">
                    <a href="#FIXME" class="page-cta prev-btn" title="Previous page">Previous Page</a>
                  </li>
                  <li class="page-list">
                    <a href="#FIXME" class="page-cta active" title="${counter}">${counter}</a>
                  </li>
                  <li class="page-list">
                    <a href="#FIXME" class="page-cta click-page" title="${counter + 1}">${counter + 1}</a>
                  </li>
                  <li class="page-list">
                    <a href="#FIXME" class="page-cta has-more" title="More Movie Reviews">...</a>
                  </li>
                  <li class="page-list">
                    <a href="#FIXME" class="page-cta lastpage" title="${totalMovie / limit}">${totalMovie / limit}</a>
                  </li>
                  <li class="page-btn">
                    <a href="#FIXME" class="page-cta next-btn" title="Next Page">Next Page</a>
                  </li>`;

      wrapper.appendChild(pagination);
      var prevBtn = document.querySelector('.prev-btn'),
        nextBtn = document.querySelector('.next-btn'),
        lastPageBtn = document.querySelector('.lastpage'),
        hasMore = document.querySelector('.has-more'),
        clickPageNo = document.querySelector('.click-page');

        prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        offset -= limit;
        ShowMovie(offset);
        counter--;
      });
      if (counter == 1) {
        prevBtn.remove();
      }
      if (counter == 20) {
        hasMore.remove();
        lastPageBtn.remove();
        nextBtn.remove();
        clickPageNo.remove();
      }

      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        offset += limit;
        console.log(offset);
        ShowMovie(offset);
        counter++;
      });

      lastPageBtn.addEventListener('click', function (e) {
        e.preventDefault();
        offset = totalMovie - limit;
        ShowMovie(offset);
        counter = totalMovie/limit;
      })

      var pageNoBtn = document.querySelector('.click-page');
      pageNoBtn.addEventListener('click', function (e) {
        e.preventDefault();
        offset += limit;
        ShowMovie(offset);
        counter++;
      })
    })
};
