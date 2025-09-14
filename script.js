/* ======================================================================
   script.js
   Reconstructed, annotated, and improved version of your original file.
   - Preserves original data and behavior
   - Adds robust event handling and keyboard navigation
   - Detailed comments explain each block / function / decision
   ====================================================================== */

/* ============================
   TIMESTAMP / CLOCK
   - updateTimestamp(): formats and writes a live timestamp into #timestamp
   - setInterval at bottom keeps it updating every second
   ============================ */

/**
 * Update the #timestamp element with the current date/time formatted.
 * Using toLocaleString so it respects local formatting; options tune the output.
 */
function updateTimestamp() {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true // now using 12-hour format with AM/PM
  };

  const el = document.getElementById("timestamp");
  if (el) {
    el.textContent = now.toLocaleString("en-US", options);
  }
}

/* ============================
   MEDIA GALLERY DATA
   - mediaData: array of gallery sections (title, date, desc, files)
   - Each file in files[] has { type: "img"|"video", src: "path" }
   - This data drives renderMediaGallery()
   ============================ */

const mediaData = [
  {
    title: "Final Capstone Defense",
    date: "Last week of September - First week of October, 2025",
    desc:
      "Ito ang huling defense ng aming Capstone Project. Ipapakita namin ang final prototype at buong system sa panel at iba pang stakeholders. Tatalakayin namin ang buong proseso mula sa pagbuo, testing, at refinement ng software at hardware, at sasagutin ang mga huling katanungan upang maipakita ang kabuuang kahusayan ng proyekto. Stay tuned para sa resulta ng aming Capstone Project!",
    files: []
  },
  {
    title: "Prototype Testing sa Tubig ng Barangay",
    date: "Third week of September, 2025",
    desc:
      "Susubukan namin ang aming prototype sa mismong pinagkukunan ng tubig sa barangay upang masuri ang aktwal na kondisyon ng tubig at makita ang pagiging epektibo ng aming system.",
    files: []
  },
  {
    title: "Interview with Barangay Official & Residents",
    date: "Sep 10, 2025",
    desc:
      "Sa petsang ito isinagawa ang panayam kasama ang kapitan ng barangay at mga residente upang higit na maunawaan ang kanilang pangangailangan at reaksyon tungkol sa aming proyekto, at malaman din namin kung paano ikakabit ang aming prototype.",
    files: [
      { type: "img", src: "media/09-01.jpg" },
      { type: "img", src: "media/09-02.jpg" },
      { type: "img", src: "media/09-03.jpg" },
      { type: "img", src: "media/09-04.jpg" },
      { type: "img", src: "media/09-05.jpg" },
      { type: "img", src: "media/09-06.jpg" },
      { type: "img", src: "media/09-07.jpg" },
      { type: "img", src: "media/09-08.jpg" },
      { type: "img", src: "media/09-09.jpg" }
    ]
  },
  {
    title: "Mature Software Development and Final Document Revision",
    date: "August - September 2025",
    desc:
      "Sa yugtong ito, pinaunlad at pinino namin ang software ng system. Isinama ang feedback mula sa mga naunang testing upang mapahusay ang functionalities. Sinigurado rin na stable at maayos ang integration ng hardware at software bago ang mas malawak na deployment.",
    files: [
      { type: "img", src: "media/08-01.jpg" },
      { type: "img", src: "media/08-02.jpg" },
      { type: "img", src: "media/08-03.jpg" }
    ]
  },
  {
    title: "Mature Prototype Development",
    date: "July - September 2025",
    desc:
      "Sa mga araw na ito, nagtrabaho kami bilang isang team sa paggawa at pagsasaayos ng prototype. Pinagsama-sama namin ang mga components at sinigurado na gumagana ito ayon sa plano bago dalhin sa barangay para sa aktwal na testing.",
    files: [
      { type: "video", src: "media/06-01.mp4" },
      { type: "video", src: "media/06-02.mp4" },
      { type: "video", src: "media/06-03.mp4" },
      { type: "video", src: "media/06-04.mp4" },
      { type: "video", src: "media/06-05.mp4" },
      { type: "video", src: "media/06-06.mp4" },
      { type: "video", src: "media/06-07.mp4" },
      { type: "video", src: "media/06-08.mp4" },
      { type: "img", src: "media/06-09.jpg" },
      { type: "img", src: "media/06-10.jpg" },
      { type: "img", src: "media/06-11.jpg" },
      { type: "img", src: "media/06-12.jpg" },
      { type: "img", src: "media/06-13.jpg" },
      { type: "img", src: "media/06-14.jpg" },
      { type: "img", src: "media/06-15.jpg" },
      { type: "img", src: "media/06-16.jpg" },
      { type: "img", src: "media/06-17.jpg" },
      { type: "img", src: "media/06-18.jpg" },
      { type: "img", src: "media/06-19.jpg" }
    ]
  },
  {
    title: "Initial Capstone Defense",
    date: "May 2, 2025",
    desc:
      "Sa petsang ito isinagawa ang Initial Capstone Defense. Ipinakita namin ang aming panimulang ideya, research background, at planong disenyo ng sistema. Tumanggap kami ng mga suhestiyon mula sa panel na naging gabay sa mas maayos na direksyon ng aming proyekto.",
    files: [
      { type: "img", src: "media/04-01.jpg" },
      { type: "img", src: "media/04-02.jpg" }
    ]
  },
  {
    title: "Initial Software Development",
    date: "April - May 2025",
    desc:
      "Sa panahong ito, nagsimula kami sa paggawa ng unang bersyon ng software. Nakatuon kami sa pagbuo ng core features tulad ng data collection at basic interface upang makita ang takbo ng sistema at masimulan ang testing kasama ng hardware.",
    files: [
      { type: "img", src: "media/03-01.jpg" },
      { type: "video", src: "media/03-02.mp4" },
      { type: "video", src: "media/03-03.mp4" }
    ]
  },
  {
    title: "Initial Prototype Development",
    date: "April - May 2025",
    desc:
      "Dito nagsimula ang aktwal na pagbubuo ng prototype gamit ang mga nabiling hardware components. Pinagsama-sama namin ang mga pangunahing sensors at microcontroller sa isang functional setup. Layunin nitong makita kung gumagana nang maayos ang basic na disenyo bago pa ito paunlarin at isailalim sa mas malalim na testing at calibration.",
    files: [
      { type: "img", src: "media/07-01.jpg" },
      { type: "img", src: "media/07-02.jpg" },
      { type: "video", src: "media/07-03.mp4" }
    ]
  },
  {
    title: "Testing and Calibrating of Hardware Components",
    date: "February - April 2025",
    desc:
      "Isinagawa ang serye ng testing at calibration para sa mga hardware components tulad ng sensors at microcontrollers. Tiniyak na tama at reliable ang mga readings upang makuha ang wastong datos para sa water quality monitoring.",
    files: [
      { type: "img", src: "media/02-01.jpg" },
      { type: "img", src: "media/02-02.jpg" },
      { type: "img", src: "media/02-03.jpg" },
      { type: "img", src: "media/02-04.jpg" },
      { type: "video", src: "media/02-05.mp4" },
      { type: "video", src: "media/02-06.mp4" },
      { type: "video", src: "media/02-07.mp4" },
      { type: "video", src: "media/02-08.mp4" },
      { type: "video", src: "media/02-09.mp4" },
      { type: "video", src: "media/02-10.mp4" },
      { type: "video", src: "media/02-11.mp4" },
      { type: "video", src: "media/02-12.mp4" },
      { type: "video", src: "media/02-13.mp4" },
      { type: "video", src: "media/02-14.mp4" },
      { type: "video", src: "media/02-15.mp4" }
    ]
  },
  {
    title: "Purchasing of Hardware Components",
    date: "February 2025",
    desc:
      "Bumili at nangalap kami ng mga kinakailangang hardware components para sa aming proyekto. Kasama rito ang mga sensors, microcontrollers, at iba pang electronic parts na magsisilbing pundasyon ng aming prototype.",
    files: [
      { type: "img", src: "media/01-01.jpg" },
      { type: "img", src: "media/01-02.jpg" },
      { type: "img", src: "media/01-03.jpg" },
      { type: "img", src: "media/01-04.jpg" },
      { type: "img", src: "media/01-05.jpg" },
      { type: "img", src: "media/01-06.jpg" }
    ]
  },
  {
    title: "Title Defense",
    date: "January 31, 2025",
    desc:
      "Sa araw na ito, ipinresenta namin ang aming proyekto na Water Quality Monitoring System para sa Title Defense. Ibinahagi namin ang konsepto at mga magiging proseso sa paggawa ng prototype. Ipinaliwanag din namin kung paano ito gagana at sinagot ang mga katanungan ng panel upang ipagtanggol ang aming ideya. Sa tulong din ng mga panel, mas pinalawak ang aming thesis bilang Smart Water Quality Monitoring System with Data Analytics",
    files: []
  }
];

/* ============================
   RENDERING: MEDIA GALLERY
   - renderMediaGallery(): build DOM nodes for each section and file
   - Creates lazy-friendly elements for images and video wrappers
   - Calls bindMediaClicks() to attach interactivity
   ============================ */

/**
 * Helper: create an <img> element safely
 * - sets alt text to improve accessibility
 * - defers loading using loading="lazy"
 */
function createImageElement(src, alt = "") {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "Gallery image";
  img.loading = "lazy";
  img.classList.add("gallery-thumb");
  return img;
}

/**
 * Helper: create a video wrapper element
 * - contains a muted video tag for inline preview (autoplay not set)
 * - overlay element clickable to open full modal
 * - data-src attribute used to store the video source for modal playback
 */
function createVideoWrapper(src) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("video-wrapper");
  wrapper.setAttribute("data-src", src);

  // Inline preview video (muted so browsers allow autoplay if enabled)
  const video = document.createElement("video");
  video.muted = true;
  video.loop = true;
  video.playsInline = true; // mobile-friendly inline playback
  video.preload = "metadata"; // only fetch metadata first

  const source = document.createElement("source");
  source.src = src;
  source.type = "video/mp4";

  video.appendChild(source);

  // overlay play icon (click target)
  const overlay = document.createElement("div");
  overlay.classList.add("video-overlay");
  overlay.setAttribute("role", "button");
  overlay.setAttribute("aria-label", "Play video in modal");
  overlay.tabIndex = 0; // keyboard focusable
  overlay.textContent = "▶";

  wrapper.appendChild(video);
  wrapper.appendChild(overlay);

  // Attempt to load thumbnail frame for preview
  // Some browsers will block autoplay — so we don't rely on it.
  // If video play fails, it still shows the poster frame (if any).
  video.addEventListener("error", () => {
    // Fallback: show a static poster if video fails (optional)
    wrapper.classList.add("video-failed");
  });

  return wrapper;
}

/**
 * Main renderer for the media gallery.
 * - Clears previous content and rebuilds from mediaData.
 * - Keeps structure: section -> files container with thumbs/previews
 */
function renderMediaGallery() {
  const gallery = document.querySelector(".media-gallery");
  if (!gallery) return;

  // Clear existing content (safe re-render)
  gallery.innerHTML = "";

  // Iterate every section in the mediaData array
  mediaData.forEach((section, sectionIndex) => {
    // Section wrapper: holds title, date, description, and files
    const mediaItem = document.createElement("div");
    mediaItem.classList.add("media-item");

    // Title, date, description markup
    const title = document.createElement("h3");
    title.textContent = section.title || "Untitled";

    const date = document.createElement("p");
    date.classList.add("media-date");
    date.textContent = section.date || "";

    const desc = document.createElement("p");
    desc.classList.add("media-desc");
    desc.textContent = section.desc || "";

    // Files container: holds thumbnails & video wrappers
    const filesContainer = document.createElement("div");
    filesContainer.classList.add("media-files");

    // If there are no files, show a subtle note (keeps layout consistent)
    if (!Array.isArray(section.files) || section.files.length === 0) {
      const emptyNote = document.createElement("p");
      emptyNote.classList.add("media-empty-note");
      emptyNote.textContent = "";
      filesContainer.appendChild(emptyNote);
    } else {
      // Build thumbnails for every file
      section.files.forEach(file => {
        if (file.type === "img") {
          const img = createImageElement(file.src, `${section.title} — image`);
          // add small data attributes to track origin (optional debug)
          img.dataset.sectionIndex = sectionIndex;
          filesContainer.appendChild(img);
        } else if (file.type === "video") {
          const wrapper = createVideoWrapper(file.src);
          wrapper.dataset.sectionIndex = sectionIndex;
          filesContainer.appendChild(wrapper);
        }
      });
    }

    // Append constructed parts to the mediaItem
    mediaItem.appendChild(title);
    mediaItem.appendChild(date);
    mediaItem.appendChild(desc);
    mediaItem.appendChild(filesContainer);

    // Append the whole section into the gallery
    gallery.appendChild(mediaItem);
  });

  // After rendering all DOM nodes, (re)bind click handlers for interaction
  bindMediaClicks();
}

/* ============================
   MODAL: single fullscreen viewer for images and videos
   - openModal(index): opens modal for the selected index in `items`
   - closeModal(): hides and cleans up media playback
   - supports prev/next navigation and keyboard controls
   - items: NodeList of clickable elements (.media-gallery img and .video-overlay)
   - currentIndex: numeric index into items NodeList
   ============================ */

// Cached modal elements (grabbed once)
const modal = document.getElementById("mediaModal");
const modalImg = document.getElementById("mediaContent");
const modalVideo = document.getElementById("mediaVideo");
const closeBtn = document.querySelector(".media-close");
const prevBtn = document.querySelector(".media-prev");
const nextBtn = document.querySelector(".media-next");

// items will be a live NodeList (converted to array when needed)
let items = [];
let currentIndex = 0;

/**
 * Open the modal and display the item at `index`.
 * - Supports both images and videos (video wrappers store source in parent data-src)
 */
function openModal(index) {
  // Defensive bounds check
  if (!items || items.length === 0) return;
  if (index < 0 || index >= items.length) {
    index = ((index % items.length) + items.length) % items.length; // wrap
  }

  currentIndex = index;
  const clicked = items[index];

  if (!modal) return;

  // Make modal visible (flex used in CSS)
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");

  // If the clicked element is an <img>
  if (clicked.tagName === "IMG") {
    // Show image element, hide video element
    modalImg.style.display = "block";
    modalImg.src = clicked.src;
    modalImg.alt = clicked.alt || "Full-size image";
    // Video cleanup
    modalVideo.pause();
    modalVideo.src = "";
    modalVideo.style.display = "none";
  } else {
    // If clicked element is a video-overlay inside a video-wrapper
    // The wrapper stores the real src in data-src on the parent
    const wrapper =
      clicked.classList.contains("video-overlay") ? clicked.parentElement : clicked.closest(".video-wrapper");

    if (wrapper && wrapper.dataset && wrapper.dataset.src) {
      const videoSrc = wrapper.dataset.src;

      // Show video element, load and play it
      modalVideo.style.display = "block";
      modalVideo.src = videoSrc;
      modalVideo.load();

      // Try to play, catching any promise rejections on autoplay
      const playPromise = modalVideo.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // Autoplay blocked — user can click play manually
        });
      }

      // Hide image element
      modalImg.style.display = "none";
      modalImg.src = "";
    } else {
      // If wrapper not found, hide both and close
      modalImg.style.display = "none";
      modalVideo.style.display = "none";
      modal.style.display = "none";
    }
  }

  // Focus management: move focus to close button to help keyboard users
  if (closeBtn) closeBtn.focus();
}

/**
 * Close the media modal and cleanup resources.
 */
function closeModal() {
  if (!modal) return;
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");

  // Stop and unload video if any
  if (modalVideo) {
    modalVideo.pause();
    // remove src to force network release
    modalVideo.removeAttribute("src");
    modalVideo.load();
    modalVideo.style.display = "none";
  }

  // Clear image src
  if (modalImg) {
    modalImg.src = "";
    modalImg.style.display = "none";
  }
}

/* ============================
   BINDING: attach click handlers to thumbnails / overlays
   - makes items[] reflect current thumbnails available in gallery
   - binds keyboard accessibility (Enter/Space) on video overlays
   ============================ */

function bindMediaClicks() {
  // Query all thumbnails and overlays inside the media-gallery
  const imgNodes = Array.from(document.querySelectorAll(".media-gallery img"));
  const overlayNodes = Array.from(document.querySelectorAll(".media-gallery .video-overlay"));

  // Combine into a single ordered list as they appear in DOM flow
  // To ensure consistent indexing, re-query all clickable elements inside gallery in DOM order
  const gallery = document.querySelector(".media-gallery");
  if (!gallery) {
    items = [];
    return;
  }

  // Query for clickable selectors and convert NodeList to array (keeps DOM order)
  const clickable = Array.from(gallery.querySelectorAll("img, .video-overlay"));
  items = clickable;

  // Remove previous listeners to avoid duplicates (simple approach: clone nodes)
  // We rebind listeners fresh so we duplicate interest-free.
  items.forEach((node, idx) => {
    // Make sure node is focusable for keyboard users if it's a .video-overlay
    if (node.classList && node.classList.contains("video-overlay")) {
      node.tabIndex = 0;
    }

    // Click handler (open modal)
    const onClick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      openModal(idx);
    };

    // Key handler for Enter / Space to open modal (accessibility)
    const onKey = function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(idx);
      }
    };

    // Remove by cloning then re-adding. Safer than trying to remove anonymous listeners.
    // But to keep things simple and reliable we set handlers directly on DOM properties.
    node.onclick = onClick;
    node.onkeydown = onKey;
  });
}

/* ============================
   MODAL: controls (prev/next/close) and keyboard navigation
   - prevBtn / nextBtn wired to openModal with wrapped index
   - closeBtn wired to closeModal
   - Esc closes modal, ArrowLeft/ArrowRight navigate
   - click outside modal content also closes it
   ============================ */

// Close button wiring
if (closeBtn) {
  closeBtn.addEventListener("click", e => {
    e.stopPropagation();
    closeModal();
  });
}

// Previous / Next buttons wiring (if present)
if (prevBtn) {
  prevBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (!items || items.length === 0) return;
    openModal((currentIndex - 1 + items.length) % items.length);
  });
}
if (nextBtn) {
  nextBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (!items || items.length === 0) return;
    openModal((currentIndex + 1) % items.length);
  });
}

// Close when clicking outside the inner content; modal background has id #mediaModal
if (modal) {
  modal.addEventListener("click", e => {
    // If the user clicks directly on the backdrop (modal), close it
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Keyboard navigation for modal (global listener)
// - Esc to close
// - Left/Right arrows to navigate gallery while modal is open
document.addEventListener("keydown", e => {
  if (!modal || modal.style.display !== "flex") return;

  if (e.key === "Escape") {
    closeModal();
  } else if (e.key === "ArrowLeft") {
    if (!items || items.length === 0) return;
    openModal((currentIndex - 1 + items.length) % items.length);
  } else if (e.key === "ArrowRight") {
    if (!items || items.length === 0) return;
    openModal((currentIndex + 1) % items.length);
  }
});

/* ============================
   DEVELOPER CV DATA & MODAL
   - cvData: object map of developer entries (christian, clarence, etc.)
   - populateDeveloperCards(): renders small dev cards into .developers-container
   - initializeDeveloperModals(): attaches click handlers to each dev card that open a CV modal
   - The CV modal HTML is dynamically composed; contact icons included conditionally
   ============================ */

const cvData = {
  christian: {
    fullName: "Christian V. Nolasco",
    role: "Documentation & Hardware Support",
    imageSrc: "./media/profile-christian.jpg",
    personal: {
      email: "nolascochristian66@gmail.com",
      phone: "09817955431",
      linkedin: "https://www.linkedin.com/in/christian-nolasco-504750366",
      github: null,
      facebook: "https://www.facebook.com/christian.nolasco.9235",
      address: "Purok 3, Barangay Fundado, Labo, Camarines Norte",
      birthday: "September 8, 2003",
      gender: "Male",
      religion: "Born Again"
    },
    summary:
      "I contribute in preparing documentation and provide support in finalizing IoT hardware design. In addition, I have hands-on experience in developing the RM Sole and Apparel Inventory System. My main skills include technical writing, and hardware integration support.",
    skills: [
      "Python (Basics)",
      "Java (Basics)",
      "C++ (Basics)",
      "Web Development (HTML, CSS, JavaScript)",
      "Prototyping",
      "Technical Documentation",
      "Research"
    ],
    experience: [
      {
        title: "Documentation Support, BSIT Academic Projects (2023–Present)",
        description:
          "Contributed to project documentation and supported the completion of IoT hardware design (e.g., Raspberry Pi case) for school projects."
      },
      {
        title: "Developer, RM Sole and Apparel Inventory system (2024)",
        description: "Developed the RM Sole and Apparel shop inventory management system."
      }
    ],
    education: {
      tertiary:
        "<strong>B.S. in Information Technology (Ongoing)</strong><br>Our Lady of Lourdes College Foundation (2022–Present)",
      secondary:
        "<strong>Senior High School (STEM)</strong><br>Mabini Colleges (2020–2022)<br><br><strong>Junior High School</strong><br>Camarines Norte College (2016–2020)",
      elementary:
        "<strong>Elementary</strong><br>L. Villamonte Elementary School (2010–2016)"
    }
  },

  clarence: {
    fullName: "Clarence P. Español",
    role: "Frontend Developer",
    imageSrc: "./media/profile-clarence.jpg",
    personal: {
      email: "clarence.espanol0123@gmail.com",
      phone: "09286394903",
      linkedin: "https://www.linkedin.com/in/clarence-español-595742317",
      github: "https://github.com/ClarenceEspanol",
      facebook: "https://www.facebook.com/clrnxvt",
      address: "Purok 1B, Barangay Anahaw, Labo, Camarines Norte",
      birthday: "January 23, 2003",
      gender: "Male",
      religion: "Roman Catholic"
    },
    summary:
      "I contribute to the frontend optimization of the project, helping improve its functionality, usability, and overall user experience. I also assist in preparing documentation, provide support in finalizing IoT hardware design, and contribute as one of the researchers. In addition, I participated in prototyping and designing the user interface to ensure usability and visual consistency. I also have hands-on experience developing a full-stack e-commerce website with online database integration. My main skills include frontend web technologies, technical writing, prototyping, UI design, and hardware integration support.",
    skills: [
      "Python (Basics)",
      "Java (Basics)",
      "C++ (Basics)",
      "Web Development (HTML, CSS, JavaScript)",
      "Frontend Design",
      "Backend Development",
      "Online Database Integration",
      "Technical Documentation",
      "Prototyping",
      "UI/UX Design",
      "Research"
    ],
    experience: [
      {
        title: "Frontend Developer, Prototyping & Research Support, BSIT Academic Projects (2023–Present)",
        description:
          "Contributed to frontend optimization, UI design, prototyping, documentation, and assisted in finishing IoT hardware design (e.g., Raspberry Pi case) while serving as one of the researchers in school projects."
      },
      {
        title: "Full-Stack Developer, JBC School Supplies & Hardware E-Commerce Website (2024)",
        description: "Developed both the frontend and backend of an e-commerce website with online database integration. Website: https://jbcstore2009.web.app"
      }
    ],
    education: {
      tertiary:
        "<strong>B.S. in Information Technology (Ongoing)</strong><br>Our Lady of Lourdes College Foundation (2022–Present)",
      secondary:
        "<strong>Senior High School (GAS)</strong><br>Our Lady of Lourdes College Foundation (2020–2022)<br><br><strong>Junior High School</strong><br>St. John the Apostle Academy (2016–2020)",
      elementary: "<strong>Elementary</strong><br>Daet Elementary School (2010–2016)"
    }
  },

  christianLuis: {
    fullName: "Christian Luis S. Aceron",
    role: "Backend Developer & Data Scientist",
    imageSrc: "./media/profile-christianLuis.jpg",
    personal: {
      email: "christianluis.aceron@gmail.com",
      phone: "09519712807",
      linkedin: "https://www.linkedin.com/in/christianluisaceron/",
      github: "https://github.com/aceaceron",
      facebook: "https://www.facebook.com/christianluisaceron",
      address: "Purok 2, Brgy. Kalamunding, Labo, Camarines Norte",
      birthday: "October 22, 2004",
      gender: "Male",
      religion: "Roman Catholic"
    },
    summary:
      "I contribute to some of the frontend and the full backend of the project, implementing machine learning, database, sensor calibration and other core function of the project, making the project possible and able to be used.",
    skills: [
      "Python",
      "Java (Basics)",
      "C++ (Basics)",
      "Web Development (HTML, CSS, JavaScript, PHP)",
      "Database Implementation (MySQL, Firebase, SQLite)"
    ],
    experience: [
      {
        title: "Full Stack Developer, Data Scientist, BSIT Academic Projects (2022–Present)",
        description:
          "Contributed full stack web app of BantayTubig, frontend, backend, machine learning, database implementation."
      },
      { title: "Full Stack Developer", description: "Developed Transient House Management System as a Requirement for System Integration and Architecture Subject." }
    ],
    education: {
      tertiary:
        "<strong>B.S. in Information Technology</strong><br>Our Lady of Lourdes College Foundation (2022-2026)",
      secondary:
        "<strong>Senior High School (STEM)</strong><br>Camarines Norte College (2020-2022)<br><br><strong>Junior High School</strong><br>Camarines Norte College (2016-2020)",
      elementary: "<strong>Elementary</strong><br>Labo Elementary School (2010-2016)"
    }
  }
};

/**
 * Renders developer cards into .developers-container
 * - Each card has data-dev attribute which contains the cvData key
 * - Cards are interactive and will open the CV modal when clicked
 */
function populateDeveloperCards() {
  const container = document.querySelector(".developers-container");
  if (!container) return;

  container.innerHTML = ""; // clear any existing content

  // Build cards
  for (const key in cvData) {
    if (!cvData.hasOwnProperty(key)) continue;
    const dev = cvData[key];

    const card = document.createElement("div");
    card.classList.add("dev-card");
    card.dataset.dev = key;
    card.tabIndex = 0; // make it keyboard focusable

    const img = document.createElement("img");
    img.src = dev.imageSrc || "";
    img.alt = `Profile photo of ${dev.fullName}`;

    const h3 = document.createElement("h3");
    h3.textContent = dev.fullName;

    const p = document.createElement("p");
    p.textContent = dev.role;

    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(p);

    container.appendChild(card);
  }

  // After cards are inserted into DOM, wire up their event listeners
  initializeDeveloperModals();
}

/**
 * Utility: returns minimal contact icon markup for use in the CV modal
 * - These small inline SVGs are intentionally simple and styled by CSS
 */
function getContactIcons() {
  const emailIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';
  const phoneIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
  const facebookIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>';
  const githubIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>';
  const linkedinIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>';
  return { emailIcon, phoneIcon, facebookIcon, githubIcon, linkedinIcon };
}

/**
 * Initializes the developer CV modal interactivity.
 * - Binds click and keyboard events to each .dev-card
 * - Dynamically composes modal content from cvData
 */
function initializeDeveloperModals() {
  const devCards = Array.from(document.querySelectorAll(".dev-card"));
  const cvModal = document.getElementById("cvModal");
  const cvModalBody = document.getElementById("cvModalBody");
  const cvModalTitle = document.getElementById("cvModalTitle");

  // Safety: if container doesn't exist, bail out
  if (!cvModal || !cvModalBody) return;

  const icons = getContactIcons();

  // For each developer card, set up an event handler
  devCards.forEach(card => {
    const onActivate = () => {
      const devKey = card.dataset.dev;
      const data = cvData[devKey];
      if (!data) return;

      // Compose header (profile image + title)
      const headerHTML = `
        <div class="cv-header-content">
          <img src="${data.imageSrc}" alt="Profile of ${data.fullName}" class="cv-profile-pic">
          <div class="cv-title-wrap">
            <h2 class="cv-modal-title">About ${data.fullName}</h2>
            <p class="cv-role">${data.role}</p>
          </div>
        </div>
      `;

      // Compose contact icons conditionally (if property exists)
      const contactParts = [];
      if (data.personal.email) contactParts.push(`<a href="mailto:${data.personal.email}" title="Email" target="_blank">${icons.emailIcon}</a>`);
      if (data.personal.phone) contactParts.push(`<a href="tel:${data.personal.phone}" title="Call" target="_blank">${icons.phoneIcon}</a>`);
      if (data.personal.linkedin) contactParts.push(`<a href="${data.personal.linkedin}" title="LinkedIn" target="_blank">${icons.linkedinIcon}</a>`);
      if (data.personal.github) contactParts.push(`<a href="${data.personal.github}" title="GitHub" target="_blank">${icons.githubIcon}</a>`);
      if (data.personal.facebook) contactParts.push(`<a href="${data.personal.facebook}" title="Facebook" target="_blank">${icons.facebookIcon}</a>`);

      const contactHTML = `<div class="cv-contact-icons">${contactParts.join(" ")}</div>`;

      // Compose skills list
      const skillsHTML = `<ul class="cv-skills">${data.skills.map(s => `<li>${s}</li>`).join("")}</ul>`;

      // Experience block (if provided)
      const experienceHTML =
        data.experience && data.experience.length
          ? `<div class="cv-section"><h4>Experience</h4>${data.experience
              .map(exp => `<p><strong>${exp.title}</strong><br>${exp.description}</p>`)
              .join("")}</div>`
          : "";

      // Education block
      const educationHTML = `
        <div class="cv-section">
          <h4>Education</h4>
          <p>${data.education.tertiary || ""}</p>
          <p>${data.education.secondary || ""}</p>
          <p>${data.education.elementary || ""}</p>
        </div>
      `;

      // Compose final body HTML
      const finalBody = `
        ${contactHTML}
        <div class="cv-section">
          <h4>Summary</h4>
          <p>${data.summary}</p>
        </div>
        <div class="cv-section">
          <h4>Skills</h4>
          ${skillsHTML}
        </div>
        ${experienceHTML}
        ${educationHTML}
        <div class="cv-section cv-personal-info">
          <h4>Personal Details</h4>
          <p><strong>Address:</strong> ${data.personal.address || "N/A"}</p>
          <p><strong>Birthday:</strong> ${data.personal.birthday || "N/A"}</p>
          <p><strong>Gender:</strong> ${data.personal.gender || "N/A"}</p>
          <p><strong>Religion:</strong> ${data.personal.religion || "N/A"}</p>
        </div>
      `;

      // Set header title (if exists) and body
      if (cvModalTitle) cvModalTitle.textContent = `Developer CV — ${data.fullName}`;
      // Ensure modal header area is updated (some markup exists already in HTML)
      const modalHeader = cvModal.querySelector(".modal-header");
      if (modalHeader) modalHeader.innerHTML = `${headerHTML}<button id="closeCvModalBtn" class="modal-close-btn" aria-label="Close CV modal">&times;</button>`;

      cvModalBody.innerHTML = finalBody;

      // Show modal
      cvModal.style.display = "flex";
      cvModal.setAttribute("aria-hidden", "false");

      // Attach close listener to the newly created button
      const createdCloseBtn = document.getElementById("closeCvModalBtn");
      if (createdCloseBtn) {
        createdCloseBtn.addEventListener("click", () => {
          cvModal.style.display = "none";
          cvModal.setAttribute("aria-hidden", "true");
        });
      }
    };

    // Mouse click opens modal
    card.addEventListener("click", onActivate);

    // Keyboard activation (Enter/Space)
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onActivate();
      }
    });
  });

  // Clicking outside modal content closes it
  cvModal.addEventListener("click", event => {
    if (event.target === cvModal) {
      cvModal.style.display = "none";
      cvModal.setAttribute("aria-hidden", "true");
    }
  });

  // ESC key also closes CV modal
  document.addEventListener("keydown", e => {
    if (!cvModal) return;
    if (cvModal.style.display === "flex" && e.key === "Escape") {
      cvModal.style.display = "none";
      cvModal.setAttribute("aria-hidden", "true");
    }
  });
}

/* ============================
   STARTUP: initial invocation order
   - DOMContentLoaded ensures all DOM nodes are present
   - We render gallery, then dev cards, then bind modals/listeners
   ============================ */

document.addEventListener("DOMContentLoaded", () => {
  // 1) Render media gallery into .media-gallery
  renderMediaGallery();

  // 2) Render developer cards
  populateDeveloperCards();

  // 3) Initialize timestamp updates
  updateTimestamp();
  setInterval(updateTimestamp, 1000);

  // 4) Preload small set of images to make UI feel snappier (non-blocking)
  try {
    const toPreload = [];
    mediaData.forEach(section => {
      if (Array.isArray(section.files)) {
        section.files.forEach(f => {
          if (f.type === "img") toPreload.push(f.src);
        });
      }
    });

    // Limit preload to first 12 images to avoid heavy bandwidth use
    toPreload.slice(0, 12).forEach(src => {
      const img = new Image();
      img.src = src;
    });
  } catch (err) {
    // Non-critical — ignore preload errors
    console.warn("Preload error:", err);
  }
});

/* ============================
   OPTIONAL: Expose some helpers to global for debugging
   - window._gallery = { renderMediaGallery, openModal, closeModal }
   - convenient when debugging in browser console
   ============================ */

window._gallery = {
  renderMediaGallery,
  openModal,
  closeModal,
  renderData: mediaData
};

/* ======================================================================
   End of script.js
   - This file contains:
     * A live timestamp updater
     * A data-driven media gallery renderer with thumbnails & preview videos
     * A robust modal viewer supporting images and videos + keyboard navigation
     * Developer CV modal system with dynamic content and icons
   - If you want any small UI changes (e.g., autoplay behavior, change
     timestamp locale, or alternate overlay icons), tell me and I can
     update the script quickly.
   ====================================================================== */
