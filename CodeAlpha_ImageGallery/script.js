
document.addEventListener("DOMContentLoaded", function () {

    const heading = document.getElementById("heading");
    const folders = document.querySelectorAll(".folder-box");
    const gallery = document.getElementById("mainGalleryGrid");

    const lightbox = document.getElementById("lightbox");
    const lightboximage = document.getElementById("lightboxImage");
    const caption = document.getElementById("caption");
    const counter = document.getElementById("counter");
    const thumbnails = document.getElementById("thumbnails");

    const closeBtn = document.getElementById("closeBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Gallery image/nature paths
   const galleryData = {
    nature: Array.from(
        { length: 20 },
        (_, index) => `image/nature/image${index + 1}.jpeg`
    ),

    fruit: Array.from(
        { length: 20 },
        (_, index) => `image/fruit/image${index + 1}.jpeg`
    ),

    landscape: Array.from(
        { length: 18 },
        (_, index) => `image/landscape/image${index + 1}.jpeg`
    ),

    cars: Array.from(
        { length: 20 },
        (_, index) => `image/cars/image${index + 1}.jpeg`
    ),

    animals: Array.from(
        { length: 19 },
        (_, index) => `image/animals/image${index + 1}.jpeg`
    )
};

    let currentimage = [];
    let currentIndex = 0;
    let currentCategory = "nature";

    // Display image for the selected folder
    function displayGallery(category) {
    if (!galleryData[category]) {
        console.error("Category not found:", category);
        return;
    }

    currentCategory = category;
    currentimage = galleryData[category];
    currentIndex = 0;

    const categoryNames = {
        nature: "Nature Gallery",
        fruit: "Fruit Gallery",
        landscape: "Landscape Gallery",
        cars: "Cars Gallery",
        animals: "Animals Gallery"
    };

    heading.textContent = categoryNames[category] || "Photo Gallery";

    // Clear previous images
    gallery.innerHTML = "";

    // Create images for selected category
    currentimage.forEach((src, index) => {
        const item = document.createElement("div");
        item.className = "gallery-item";

        const img = document.createElement("img");
        img.src = src;
        img.alt = `${currentCategory} ${index + 1}`;
        img.loading = "lazy";

        img.addEventListener("click", () => {
            openLightbox(index);
        });

        item.appendChild(img);
        gallery.appendChild(item);
    });

    console.log(`Opened ${category} gallery`);
}
    // Open the lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    // Update the displayed image/nature and thumbnail strip
    function updateLightbox() {
        if (!currentimage.length) return;

        lightboximage.src = currentimage[currentIndex];
        lightboximage.alt = `${currentCategory} ${currentIndex + 1}`;

        caption.textContent =
            `${currentCategory.charAt(0).toUpperCase() +
            currentCategory.slice(1)} ${currentIndex + 1}`;

        counter.textContent =
            `${currentIndex + 1}/${currentimage.length}`;

        thumbnails.innerHTML = "";

        currentimage.forEach((src, index) => {
            const thumb = document.createElement("img");

            thumb.src = src;
            thumb.alt = `Thumbnail ${index + 1}`;
            thumb.className = "thumbnail";

            if (index === currentIndex) {
                thumb.classList.add("active");
            }

            thumb.addEventListener("click", () => {
                currentIndex = index;
                updateLightbox();
            });

            thumbnails.appendChild(thumb);
        });
    }

    // Next image/nature
    function nextimage() {
        if (!currentimage.length) return;

        currentIndex = (currentIndex + 1) % currentimage.length;
        updateLightbox();
    }

    // Previous image/nature
    function previousimage() {
        if (!currentimage.length) return;

        currentIndex =
            (currentIndex - 1 + currentimage.length) %
            currentimage.length;

        updateLightbox();
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Folder click events
    folders.forEach(folder => {
        folder.addEventListener("click", function () {
            const category = this.dataset.category;

            console.log("Clicked folder:", category);
            displayGallery(category);
        });
    });

    // Lightbox buttons
    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", nextimage);
    prevBtn.addEventListener("click", previousimage);

    // Close by clicking the dark background
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard controls
    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "ArrowRight") nextimage();
        if (event.key === "ArrowLeft") previousimage();
        if (event.key === "Escape") closeLightbox();
    });

    // Initial gallery
    displayGallery("nature");

});

