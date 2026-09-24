/* =========================
   HAMBURGER MENU
========================= */

const menuIcon = document.getElementById("menuIcon");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const menuOverlay = document.getElementById("menuOverlay");

function openMenu() {
    sideMenu.classList.add("active");
    menuOverlay.classList.add("active");
}

function closeSideMenu() {
    sideMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
}

menuIcon.addEventListener("click", openMenu);

closeMenu.addEventListener("click", closeSideMenu);

menuOverlay.addEventListener("click", closeSideMenu);


/* Close menu after clicking a link */

const menuLinks = document.querySelectorAll(".side-menu a");

menuLinks.forEach(function(link) {
    link.addEventListener("click", closeSideMenu);
});


/* =========================
   RESOURCE SEARCH
========================= */

const searchInput = document.getElementById("resourceSearch");
const searchButton = document.getElementById("searchButton");
const searchMessage = document.getElementById("searchMessage");

const resourceItems = document.querySelectorAll(".resource-item");
const resourceCategories = document.querySelectorAll(".resource-category");


function searchResources() {

    const searchTerm = searchInput.value
        .toLowerCase()
        .trim();

    let foundResults = 0;


    /* Show everything if search is empty */

    if (searchTerm === "") {

        resourceItems.forEach(function(item) {
            item.classList.remove("hidden");
        });

        resourceCategories.forEach(function(category) {
            category.classList.remove("hidden");
        });

        searchMessage.textContent = "";

        return;
    }


    /* Search each resource */

    resourceItems.forEach(function(item) {

        const resourceText =
            item.textContent.toLowerCase() +
            " " +
            item.dataset.resource.toLowerCase();

        if (resourceText.includes(searchTerm)) {

            item.classList.remove("hidden");

            foundResults++;

        } else {

            item.classList.add("hidden");

        }

    });


    /* Hide categories that have no results */

    resourceCategories.forEach(function(category) {

        const visibleResources =
            category.querySelectorAll(
                ".resource-item:not(.hidden)"
            );

        if (visibleResources.length === 0) {

            category.classList.add("hidden");

        } else {

            category.classList.remove("hidden");

        }

    });


    /* Search message */

    if (foundResults === 0) {

        searchMessage.textContent =
            "No resources found. Try another search.";

    } else {

        searchMessage.textContent =
            foundResults +
            " resource" +
            (foundResults === 1 ? "" : "s") +
            " found.";

    }

}


/* Search when button is clicked */

searchButton.addEventListener(
    "click",
    searchResources
);


/* Search while typing */

searchInput.addEventListener(
    "input",
    searchResources
);


/* Search when Enter is pressed */

searchInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            searchResources();
        }

    }
);


/* =========================
   SURVEY QR CODE MODAL
========================= */

const surveyButton =
    document.getElementById("surveyButton");

const surveyModal =
    document.getElementById("surveyModal");

const closeSurvey =
    document.getElementById("closeSurvey");


/* Open QR code */

surveyButton.addEventListener(
    "click",
    function() {

        surveyModal.classList.add("active");

        surveyModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }
);


/* Close QR code */

closeSurvey.addEventListener(
    "click",
    function() {

        surveyModal.classList.remove("active");

        surveyModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }
);


/* Close by clicking outside the QR box */

surveyModal.addEventListener(
    "click",
    function(event) {

        if (event.target === surveyModal) {

            surveyModal.classList.remove("active");

            surveyModal.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    }
);


/* Close QR modal with Escape */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            surveyModal.classList.contains("active")
        ) {

            surveyModal.classList.remove("active");

            surveyModal.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    }
);
