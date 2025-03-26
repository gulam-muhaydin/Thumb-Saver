// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    hamburgerMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});

function getThumbnail() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoId = extractVideoId(videoUrl);
    
    if (!videoId) {
        alert('Please enter a valid YouTube URL');
        return;
    }

    // Show the thumbnail container
    document.getElementById('thumbnailContainer').style.display = 'block';
    
    // Generate thumbnail URLs for different sizes
    const thumbnails = [
        {
            url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            size: 'Max Resolution (1280x720)'
        },
        {
            url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            size: 'High Quality (480x360)'
        },
        {
            url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            size: 'Medium Quality (320x180)'
        },
        {
            url: `https://img.youtube.com/vi/${videoId}/default.jpg`,
            size: 'Default (120x90)'
        }
    ];

    // Set the preview image
    document.getElementById('thumbnailPreview').src = thumbnails[0].url;

    // Generate thumbnail list
    const thumbnailList = document.getElementById('thumbnailList');
    thumbnailList.innerHTML = '';

    thumbnails.forEach(thumbnail => {
        const thumbnailItem = document.createElement('div');
        thumbnailItem.className = 'thumbnail-item';
        thumbnailItem.innerHTML = `
            <img src="${thumbnail.url}" alt="${thumbnail.size}">
            <span>${thumbnail.size}</span>
        `;
        
        // Add click event to download the thumbnail
        thumbnailItem.addEventListener('click', () => downloadThumbnail(thumbnail.url, videoId, thumbnail.size));
        
        thumbnailList.appendChild(thumbnailItem);
    });
}

function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function downloadThumbnail(url, videoId, size) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `youtube-thumbnail-${videoId}-${size.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add event listener for Enter key
document.getElementById('videoUrl').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getThumbnail();
    }
}); 