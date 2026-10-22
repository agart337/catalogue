(() => {
    const colors = [
        '#00c9e3', '#fde546', '#f97639', '#ee90af',
        '#53872e', '#f71c32', '#16ce3b', '#5b86d3'
    ];

    const svgNS = 'http://www.w3.org/2000/svg';

    function init() {
        const source = document.querySelector('#source-map svg');
        const grid = document.querySelector('#grid');

        if (!source || !grid) {
            console.error(
                'Could not find #source-map svg or #grid. Check the HTML.'
            );
            return;
        }

        // Prevent duplicate grids if the script runs more than once.
        grid.replaceChildren();

        const paths = [
            ...source.querySelectorAll('#Asia path')
        ];

        paths.forEach((path, index) => {
            // Measure the shape in its original SVG coordinates.
            const measureSvg = document.createElementNS(svgNS, 'svg');
            measureSvg.setAttribute('viewBox', '0 0 800 600');

            measureSvg.style.cssText =
                'position:absolute;width:800px;height:600px;' +
                'visibility:hidden;overflow:visible;';

            const measurePath = path.cloneNode(true);
            measureSvg.appendChild(measurePath);
            document.body.appendChild(measureSvg);

            let bounds;

            try {
                bounds = measurePath.getBBox();
            } catch (error) {
                measureSvg.remove();
                console.warn('Could not measure SVG shape', index + 1);
                return;
            }

            measureSvg.remove();

            if (!bounds.width || !bounds.height) return;

            const name = path.id
                .replaceAll('_', ' ')
                .trim();

            const tile = document.createElement('button');
            tile.type = 'button';
            tile.className = 'tile';
            tile.setAttribute('aria-label', name);
            tile.setAttribute('aria-pressed', 'false');
            tile.style.setProperty(
                '--country-color',
                colors[index % colors.length]
            );

            const number = document.createElement('span');
            number.className = 'number';
            number.textContent = String(index + 1).padStart(2, '0');

            const miniSvg = document.createElementNS(svgNS, 'svg');

            const padX = Math.max(2, bounds.width * 0.08);
            const padY = Math.max(2, bounds.height * 0.08);

            miniSvg.setAttribute(
                'viewBox',
                `${bounds.x - padX} ${bounds.y - padY} ` +
                `${bounds.width + padX * 2} ${bounds.height + padY * 2}`
            );

            miniSvg.setAttribute('aria-hidden', 'true');
            miniSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

            const shape = path.cloneNode(true);
            shape.classList.add('shape');

            miniSvg.appendChild(shape);

            const label = document.createElement('span');
            label.className = 'name';
            label.textContent = name;

            tile.append(number, miniSvg, label);

            function toggleName() {
                const named = tile.classList.toggle('is-named');
                tile.setAttribute('aria-pressed', String(named));
            }

            // Mouseenter interaction on hover
            tile.addEventListener('mouseenter', () => {
                if (window.matchMedia('(hover: hover)').matches) {
                    toggleName();
                }
            });

            tile.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleName();
                }
            });

            grid.appendChild(tile);
        });

        if (count) {
            count.textContent = `${grid.children.length} SVG shapes`;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();