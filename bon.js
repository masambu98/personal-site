document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.icon');
    const windows = document.querySelectorAll('.window');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Open windows when icons are clicked
    icons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const iconId = event.currentTarget.id;
            const windowId = (iconId === 'icon3') ? 'carouselWindow' : `window${iconId.slice(-1)}`;
            const targetWindow = document.getElementById(windowId);
            targetWindow.style.display = 'block';
        });
    });

    // Close windows when close buttons are clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const windowElement = event.currentTarget.closest('.window');
            windowElement.style.display = 'none';
        });
    });

    // Make the windows draggable
    windows.forEach(win => {
        dragElement(win);
    });

    function dragElement(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        element.querySelector('.window-header').onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // Simple carousel control (manual swipe)
    const carousel = document.querySelector('.carousel');
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        carousel.scrollLeft = scrollLeft - walk;
    });
});

