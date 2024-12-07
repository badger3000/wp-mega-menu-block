(function () {
	// Check if already initialized
	if (window.megaMenuInitialized) {
		console.log("Mega Menu already initialized, skipping");
		return;
	}

	document.addEventListener("DOMContentLoaded", function () {
		console.log("DOM Content Loaded");

		const megaMenus = document.querySelectorAll(
			".wp-block-create-block-mega-menu",
		);
		console.log("Found Mega Menus:", megaMenus.length);

		megaMenus.forEach((menu, index) => {
			console.log(`Processing menu ${index}`);
			const trigger = menu.querySelector(".mega-menu-trigger");
			const content = menu.querySelector(".mega-menu-content");
			const arrow = menu.querySelector(".dropdown-arrow");

			console.log("Menu elements:", {
				trigger: trigger ? "found" : "not found",
				content: content ? "found" : "not found",
				arrow: arrow ? "found" : "not found",
			});

			if (trigger && content) {
				function handleClick(e) {
					console.log("Click event fired");
					e.stopPropagation();
					e.preventDefault();

					const isOpen = content.classList.contains("open");
					console.log("Current state:", isOpen ? "open" : "closed");
					content.classList.toggle("open");

					if (arrow) {
						arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
					}

					trigger.setAttribute("aria-expanded", !isOpen);
					console.log(
						"New state:",
						content.classList.contains("open") ? "open" : "closed",
					);
				}

				trigger.addEventListener("click", handleClick);
				console.log("Click event listener added to trigger");
			}
		});

		// Close menus when clicking outside
		document.addEventListener("click", function (e) {
			console.log("Outside click detected");
			megaMenus.forEach((menu) => {
				if (!menu.contains(e.target)) {
					const content = menu.querySelector(".mega-menu-content");
					const arrow = menu.querySelector(".dropdown-arrow");
					const trigger = menu.querySelector(".mega-menu-trigger");

					if (content) content.classList.remove("open");
					if (arrow) arrow.style.transform = "rotate(0deg)";
					if (trigger) trigger.setAttribute("aria-expanded", "false");
				}
			});
		});

		// Set initialization flag
		window.megaMenuInitialized = true;
		console.log("Mega Menu initialization complete");
	});
})();
