/* Author: 
Inayatullah
*/

var MovieList = document.querySelector('.movie-list'),
  wrapper = document.querySelector('.wrapper'),
  offset = 0,
  totalMovie = 200,
  limit = 10,
  counter = 1;

//first page 10 review calling
ShowMovie(offset);

//function for fetching review list 
function ShowMovie(offset) {
  fetch(`https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=KggA9THGRHUHTICnDwdbmo8kaCpGru27&offset=${offset}`)
    .then(function (response) {
      if (response.status === 429) {
        alert("Too many request, Please wait for a minute");
      }
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(function (res) {
      console.log(res);
      var results = res.results;
      MovieList.innerHTML = "";
      //movie review list appended here
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
      var pagination = document.createElement('ul'),
        pageAction = document.querySelector('.pagination');
      if (pageAction) {
        pageAction.parentElement.removeChild(pageAction);
      };
      //pagination appending 
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
    })
    .catch(function (error) {
      alert(error);
    });
};
//grabbing pagination element
var prevBtn = document.querySelector('.prev-btn'),
  nextBtn = document.querySelector('.next-btn'),
  lastPageBtn = document.querySelector('.lastpage'),
  hasMore = document.querySelector('.has-more'),
  clickPageNo = document.querySelector('.click-page'),
  body = document.querySelector('body');

body.addEventListener('click', function (e) {
  if (e.target.classList.contains('next-btn')) {
    e.preventDefault();
    offset += limit;
    ShowMovie(offset);
    counter++;
    console.log('check');
  }
  //last page event
  if (e.target.classList.contains('last-page')) {
    e.preventDefault();
    offset = totalMovie - limit;
    ShowMovie(offset);
    counter = totalMovie / limit;
  }
  //previous button event
  if (e.target.classList.contains('prev-btn')) {
    e.preventDefault();
    offset -= limit;
    ShowMovie(offset);
    counter--;
    console.log('prev btn');
  }
  //page no event added
  if (e.target.classList.contains('click-page')) {
    e.preventDefault();
    offset += limit;
    ShowMovie(offset);
    counter++;
  };
});

//removing next arrow btn when we are on last page
if (counter === 20) {
  hasMore.remove();
  lastPageBtn.remove();
  nextBtn.remove();
  clickPageNo.remove();
}

//on page hiding the prev arrow btn
if (prevBtn) {
  console.log(prevBtn);
  prevBtn.remove();
}
