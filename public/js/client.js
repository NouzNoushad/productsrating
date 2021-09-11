//Ratings
document.addEventListener('DOMContentLoaded', () => {

    const rating = document.getElementById('rating').textContent;
    getRatings(rating);
})

function getRatings(rating) {

    let starRatings = 5;
    //rating percentage
    const ratingPercentage = (rating / starRatings) * 100;
    //round to nearest 10
    const ratingRounded = `${Math.round(ratingPercentage / 10) * 10}%`;

    document.querySelector('.star-inner').style.width = ratingRounded;

}