// Display current year in the footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Scroll to Top Button functionality
const scrollTopBtn = document.getElementById("scrollTopBtn");

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

// When the user clicks on the button, scroll to the top of the document
scrollTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});