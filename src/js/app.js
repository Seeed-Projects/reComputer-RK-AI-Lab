document.addEventListener('DOMContentLoaded', function() {
    // Current selected chip
    let currentChip = 'rk3576(3588)'; // Default to rk3576(3588)

    // Page navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // Set home page as active by default
    document.getElementById('home-page').classList.add('active');
    document.querySelector('.nav-link[data-page="home"]').classList.add('active-page');

    // Store loaded markdown content to avoid reloading
    const markdownCache = {};

    // Add click handlers to navigation links (except home)
    navLinks.forEach(link => {
        const targetPage = link.getAttribute('data-page');

        if (targetPage !== 'home') {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                // Update active nav link
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active-page');
                });
                this.classList.add('active-page');

                // Toggle submenu visibility
                const submenu = document.getElementById(`${targetPage}-submenu`);
                if (submenu) {
                    // Hide all other submenus first
                    document.querySelectorAll('.sub-menu').forEach(menu => {
                        if (menu !== submenu) {
                            menu.style.display = 'none';
                        }
                    });

                    // Toggle current submenu
                    if (submenu.style.display === 'block') {
                        submenu.style.display = 'none';
                    } else {
                        submenu.style.display = 'block';
                    }
                }

                // Update active page
                pages.forEach(page => {
                    page.classList.remove('active');
                    if (page.id === `${targetPage}-page`) {
                        page.classList.add('active');
                    }
                });
            });
        } else {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                // Update active nav link
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active-page');
                });
                this.classList.add('active-page');

                // Hide all submenus
                document.querySelectorAll('.sub-menu').forEach(menu => {
                    menu.style.display = 'none';
                });

                // Show home page
                pages.forEach(page => {
                    page.classList.remove('active');
                    if (page.id === 'home-page') {
                        page.classList.add('active');
                    }
                });
            });
        }
    });

    // Add click handlers for Help page
    const helpLink = document.querySelector('.nav-link[data-page="help"]');
    if (helpLink) {
        helpLink.addEventListener('click', function(e) {
            e.preventDefault();

            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active-page');
            });
            this.classList.add('active-page');

            // Hide all submenus
            document.querySelectorAll('.sub-menu').forEach(menu => {
                menu.style.display = 'none';
            });

            // Update active page
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === 'help-page') {
                    page.classList.add('active');
                }
            });
        });
    }

    // Chip folder selection
    const chipFolders = document.querySelectorAll('.chip-folder');

    chipFolders.forEach(folder => {
        folder.addEventListener('click', function(e) {
            e.preventDefault();

            const chipType = this.getAttribute('data-chip');
            let targetPage;
            if (this.closest('.sub-menu')) {
                targetPage = this.closest('.sub-menu').id.replace('-submenu', '');
            } else {
                // Handle the case where the folder is directly in the main menu
                targetPage = this.closest('.nav-item').querySelector('.nav-link').getAttribute('data-page');
            }

            // Update current chip
            currentChip = chipType;

            // Toggle submenu visibility for this chip
            let chipSubmenuId = `${targetPage}-${chipType}-submenu`;
            // Replace any special characters in the ID to make it valid
            chipSubmenuId = chipSubmenuId.replace(/\(/g, '\\(').replace(/\)/g, '\\)');
            const chipSubmenu = document.getElementById(chipSubmenuId.replace(/\\/g, '')); // Simple approach for this case

            if (chipSubmenu) {
                // Hide all other chip submenus in this page
                document.querySelectorAll(`#${targetPage}-submenu .chip-submenu`).forEach(menu => {
                    if (menu !== chipSubmenu) {
                        menu.style.display = 'none';
                    }
                });

                // Toggle current chip submenu
                if (chipSubmenu.style.display === 'block') {
                    chipSubmenu.style.display = 'none';
                } else {
                    // Load directory content for this chip and page
                    loadDirectoryContent(targetPage, chipType);
                    chipSubmenu.style.display = 'block';
                }
            }
        });
    });

    // Function to load markdown content - update to handle help page
    async function loadMarkdownContent(page, mdFile) {
        let contentContainer;

        // Determine the correct content container based on the page
        switch(page) {
            case 'cv':
                contentContainer = document.getElementById('cv-content');
                break;
            case 'llm':
                contentContainer = document.getElementById('llm-content');
                break;
            case 'vlm':
                contentContainer = document.getElementById('vlm-content');
                break;
            case 'ui':
                contentContainer = document.getElementById('ui-content');
                break;
            case 'help':
                contentContainer = document.getElementById('help-content');
                break;
            default:
                contentContainer = document.getElementById(`${page}-content`);
        }

        if (!contentContainer) return;

        const cacheKey = `${currentChip}-${page}-${mdFile}`;

        // Check if content is already loaded
        if (markdownCache[cacheKey]) {
            contentContainer.innerHTML = markdownCache[cacheKey];
            return;
        }

        try {
            // Show loading indicator
            contentContainer.innerHTML = '<p>Loading content...</p>';

            let response;
            // For help page, content is not chip-specific
            if (page === 'help') {
                response = await fetch(`content/help/${mdFile}`);
            } else {
                // Fetch markdown file from the selected chip directory
                response = await fetch(`content/${currentChip}/${page}/${mdFile}`);
            }

            if (!response.ok) {
                throw new Error(`Failed to load content for ${page}/${mdFile}`);
            }

            const markdownText = await response.text();

            // Convert markdown to HTML (simplified - in a real implementation you'd use a library like marked)
            const htmlContent = convertMarkdownToHtml(markdownText);

            // Cache the content
            markdownCache[cacheKey] = htmlContent;

            // Display the content
            contentContainer.innerHTML = htmlContent;

            // Scroll to the content
            contentContainer.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error(`Error loading content for ${page}/${mdFile}:`, error);
            contentContainer.innerHTML = `<p>Content for ${page}/${mdFile} is not available.</p>`;
        }
    }

    // Function to get static file list as fallback
    function getStaticFileList(page) {
        let mdFiles = [];

        switch(page) {
            case 'cv':
                mdFiles = ['index.md', 'image-recognition.md', 'object-detection.md', 'scene-understanding.md'];
                break;
            case 'llm':
                mdFiles = ['index.md', 'model-optimization.md', 'hardware-acceleration.md', 'edge-deployment.md'];
                break;
            case 'vlm':
                mdFiles = ['index.md', 'multimodal-understanding.md', 'cross-modal-learning.md', 'efficient-architectures.md'];
                break;
            case 'ui':
                mdFiles = ['index.md', 'ai-enhanced-interfaces.md', 'responsive-design.md', 'performance-optimization.md'];
                break;
            case 'help':
                mdFiles = ['index.md', 'quick-start.md', 'demo1.md', 'demo2.md'];
                break;
            case 'rk3576(3588)':  // Special case for chip-specific content
                mdFiles = ['index.md', 'demo1.md', 'demo2.md'];
                break;
            default:
                mdFiles = ['index.md'];
        }

        return mdFiles;
    }

    // Function to generate directory HTML from a list of files
    function generateDirectoryHtmlFromList(mdFiles) {
        let html = '';
        mdFiles.forEach(file => {
            const displayName = file.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            html += `<a href="#" class="md-link" data-md-file="${file}">${displayName}</a>`;
        });

        return html;
    }

    // Function to load directory content
    async function loadDirectoryContent(page, chip = currentChip) {
        const contentContainer = document.getElementById(`${page}-${chip}-submenu`);
        if (!contentContainer) return;

        try {
            // Show loading indicator
            contentContainer.innerHTML = '<a href="#" class="loading">Loading...</a>';

            // Try to fetch directory listing from the global chip index file
            const response = await fetch(`content/${chip}.json`);

            let mdFiles = [];
            if (response.ok) {
                try {
                    // If the global index file exists, get the list for the specific page
                    const indexData = await response.json();
                    if (indexData && indexData[page] && Array.isArray(indexData[page])) {
                        mdFiles = indexData[page];
                    } else {
                        console.warn(`Invalid index file format for ${chip}, using fallback`);
                        mdFiles = getStaticFileList(page);
                    }
                } catch (parseError) {
                    console.warn(`Error parsing ${chip}.json, using fallback:`, parseError);
                    mdFiles = getStaticFileList(page);
                }
            } else {
                // Fallback to static directory structure if global index doesn't exist
                mdFiles = getStaticFileList(page);
            }

            // Generate directory HTML based on the actual files
            const directoryHtml = generateDirectoryHtmlFromList(mdFiles);

            // Display the directory
            contentContainer.innerHTML = directoryHtml;

            // Add event listeners to markdown links
            const mdLinks = contentContainer.querySelectorAll('.md-link');
            mdLinks.forEach(link => {
                link.addEventListener('click', async function(e) {
                    e.preventDefault();

                    const mdFile = this.getAttribute('data-md-file');
                    await loadMarkdownContent(page, mdFile);
                });
            });
        } catch (error) {
            console.error(`Error loading ${page} directory:`, error);
            // Fallback to static directory structure
            const directoryHtml = generateDirectoryHtml(page, chip);
            contentContainer.innerHTML = directoryHtml;
        }
    }

    // Function to generate directory HTML
    function generateDirectoryHtml(page, chip) {
        // This would normally fetch from the server
        // For now, we'll create a static directory structure based on what we know exists
        // In a real implementation, you would fetch the actual directory listing from the server
        let mdFiles = [];

        // For demonstration purposes, we'll use the same files for both chips
        // but in a real implementation, you would have different files for each chip
        switch(page) {
            case 'cv':
                mdFiles = ['index.md', 'image-recognition.md', 'object-detection.md', 'scene-understanding.md'];
                break;
            case 'llm':
                mdFiles = ['index.md', 'model-optimization.md', 'hardware-acceleration.md', 'edge-deployment.md'];
                break;
            case 'vlm':
                mdFiles = ['index.md', 'multimodal-understanding.md', 'cross-modal-learning.md', 'efficient-architectures.md'];
                break;
            case 'ui':
                mdFiles = ['index.md', 'ai-enhanced-interfaces.md', 'responsive-design.md', 'performance-optimization.md'];
                break;
            default:
                mdFiles = ['index.md'];
        }

        let html = '';
        mdFiles.forEach(file => {
            const displayName = file.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            html += `<a href="#" class="md-link" data-md-file="${file}">${displayName}</a>`;
        });

        return html;
    }

    // Function to load markdown content
    async function loadMarkdownContent(page, mdFile) {
        const contentContainer = document.getElementById(`${page}-content`);
        if (!contentContainer) return;

        const cacheKey = `${currentChip}-${page}-${mdFile}`;

        // Check if content is already loaded
        if (markdownCache[cacheKey]) {
            contentContainer.innerHTML = markdownCache[cacheKey];
            return;
        }

        try {
            // Show loading indicator
            contentContainer.innerHTML = '<p>Loading content...</p>';

            // Fetch markdown file from the selected chip directory
            const response = await fetch(`content/${currentChip}/${page}/${mdFile}`);
            if (!response.ok) {
                throw new Error(`Failed to load content/${currentChip}/${page}/${mdFile}`);
            }

            const markdownText = await response.text();

            // Convert markdown to HTML (simplified - in a real implementation you'd use a library like marked)
            const htmlContent = convertMarkdownToHtml(markdownText);

            // Cache the content
            markdownCache[cacheKey] = htmlContent;

            // Display the content
            contentContainer.innerHTML = htmlContent;

            // Scroll to the content
            contentContainer.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error(`Error loading content/${currentChip}/${page}/${mdFile}:`, error);
            contentContainer.innerHTML = `<p>Content for ${currentChip}/${page}/${mdFile} is not available.</p>`;
        }
    }

    // Simplified markdown to HTML converter (for demonstration)
    // In a real implementation, you would use a library like marked.js
    function convertMarkdownToHtml(md) {
        // Convert headers
        let html = md.replace(/^### (.*$)/gm, '<h3>$1</h3>')
                    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                    .replace(/^# (.*$)/gm, '<h1>$1</h1>');

        // Convert bold and italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Convert links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

        // Convert code blocks
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

        // Convert inline code
        html = html.replace(/`(.*?)`/g, '<code>$1</code>');

        // Convert paragraphs
        html = html.replace(/^\s*([^#<].*?)$/gm, '<p>$1</p>');

        // Remove empty paragraphs
        html = html.replace(/<p><\/p>/g, '');

        return html;
    }

    // Initialize home page content if needed
    // Home page content is already in HTML, so no need to load markdown
});