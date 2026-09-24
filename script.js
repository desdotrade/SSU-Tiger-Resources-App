/* =========================================
   HAMBURGER MENU
========================================= */

const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

function openMenu() {
    sideMenu.classList.add("active");
    menuOverlay.classList.add("active");
}

function closeNavigation() {
    sideMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
}

menuButton.addEventListener("click", openMenu);

closeMenu.addEventListener("click", closeNavigation);

menuOverlay.addEventListener("click", closeNavigation);


/* Close menu after selecting a link */

const menuLinks = document.querySelectorAll(".side-menu a");

menuLinks.forEach(function(link) {

    link.addEventListener("click", function() {
        closeNavigation();
    });

});


/* =========================================
   RESOURCE SEARCH
========================================= */

const searchInput = document.getElementById("resourceSearch");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");

const resourceItems = document.querySelectorAll(".resource-item");
const resourceCategories = document.querySelectorAll(".resource-category");


function searchResources() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    /* If search box is empty */

    if (searchTerm === "") {

        resourceItems.forEach(function(item) {

            item.classList.remove("hidden");

        });


        resourceCategories.forEach(function(category) {

            category.classList.remove("search-hidden");

        });


        searchResults.textContent = "";

        return;
    }


    let numberFound = 0;


    resourceCategories.forEach(function(category) {

        let categoryHasResult = false;

        const resources =
            category.querySelectorAll(".resource-item");


        resources.forEach(function(resource) {

            const searchableText =
                (
                    resource.innerText +
                    " " +
                    resource.dataset.resource
                ).toLowerCase();


            if (searchableText.includes(searchTerm)) {

                resource.classList.remove("hidden");

                categoryHasResult = true;

                numberFound++;

            } else {

                resource.classList.add("hidden");

            }

        });


        if (categoryHasResult) {

            category.classList.remove("search-hidden");

        } else {

            category.classList.add("search-hidden");

        }

    });


    /* Search message */

    if (numberFound === 0) {

        searchResults.textContent =
            "No resources found. Try another search.";

    } else {

        searchResults.textContent =
            numberFound +
            " resource" +
            (numberFound === 1 ? "" : "s") +
            " found.";

    }

}


/* Search button */

searchButton.addEventListener(
    "click",
    searchResources
);


/* Search while typing */

searchInput.addEventListener(
    "input",
    searchResources
);


/* Press ENTER to search */

searchInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            searchResources();

        }

    }
);
